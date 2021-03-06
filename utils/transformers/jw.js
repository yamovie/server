const controllers = require('../../controllers');

const jw = {};

// ===============================================================================
// =========================== Parse Helpers  ====================================

/**
 * Takes the single credits array supplied by the JW API and parses it into
 * an object containing an array each for the cast and the crew. Also formats the
 * roles to all be capitalized but not all caps
 * @param {Array<object>} jwCredits An array of objects containing cast/crew info
 * @returns {Promise} a Promise containing the completed credits object
 */
const parseJWCredits = async jwCredits => {
  if (!jwCredits) return { credits: { cast: [], crew: [] } };
  jwCredits.forEach(person => {
    const role = person.role.toLowerCase();
    person.role = `${role.charAt(0).toUpperCase()}${role.slice(1)}`;
  });
  const cast = jwCredits.filter(person => person.role === 'Actor');
  const crew = jwCredits.filter(person => person.role !== 'Actor');
  return { credits: { cast, crew } };
};

// ===============================================================================

/**
 * Parses the provided url endings to create the full urls for this movie's poster and backdrops
 * @param {string} jwPoster the end of the url link to this movie's poster, with a spot for size
 * @param {Array<string>} jwBackdrops an array containing the ends of all the strings
 *                         for this movie's backdrops, with a spot for size
 * @param {string} jwLink the general link to this movie's page on JustWatch
 * @returns {Promise} a promise containing the constructed images object, with the
 *                    poster link and array of backdrop links
 */
const parseJWImages = async (jwPoster, jwBackdrops, jwImageLink) => {
  const pSize = 592;
  let poster = '';
  if (jwPoster) {
    const posterLink = jwPoster.replace('{profile}', `s${pSize}`);
    poster = `${jwImageLink}${posterLink}`;
  }

  const bdSize = 1440;
  const backdrops = [];
  if (jwBackdrops) {
    jwBackdrops.forEach(backdrop => {
      const bdLink = backdrop.backdrop_url.replace('{profile}', `s${bdSize}`);
      backdrops.push(`${jwImageLink}${bdLink}`);
    });
  }
  return { images: { poster, backdrops } };
};

// ===============================================================================

/**
 * Takes in the scoring object and parses the various scores to create objects
 * including the scores and links for Rotten Tomatoes, IMDB, and TMDB ratings.
 * Keys are imdb, rotten_tomatoes, and themdb
 * @param {Array<object>} jwRatings an array of all the different types of scores for this movie
 * @param {Array<object} jwExternalIds an array of objects of ids to external content providers
 * @returns {Promise} a promise containing the constructed ratings object
 */
const parseJWRatings = async (jwRatings, jwExternalIds, config) => {
  const ratings = {
    imdb: {
      rate: '?/10',
      value: 0,
      url: config.urls.IMDB_BASE,
    },
    rotten_tomatoes: {
      rate: '?%',
      value: 0,
      url: config.urls.RT_BASE,
    },
    themdb: {
      rate: '?%',
      value: 0,
      url: config.urls.TMDB_BASE,
    },
  };

  if (!jwRatings) return { ratings };

  const imdbIdObj = jwExternalIds.find(idObj => idObj.provider === 'imdb');
  if (imdbIdObj) {
    ratings.imdb.url = `${config.urls.IMDB_MOVIE_BASE}/${
      imdbIdObj.external_id
    }`;
  }

  jwRatings.forEach(({ provider_type, value }) => {
    // is imdb data
    if (provider_type.includes('imdb')) {
      if (provider_type.includes('score')) {
        ratings.imdb.value = value;
        ratings.imdb.rate = `${value}/10`;
      }
      if (provider_type.includes('id')) {
        ratings.imdb.url = `${config.urls.IMDB_MOVIE_BASE}/${value}`;
      }
    } // end of imdb section

    // is tmdb data
    if (provider_type.includes('tmdb')) {
      if (provider_type.includes('score')) {
        ratings.themdb.value = value;
        ratings.themdb.rate = `${value * 10}%`;
      }
      if (provider_type.includes('id')) {
        ratings.themdb.url = `${config.urls.TMDB_MOVIE_BASE}/${value}`;
      }
      // also has tmdb:popularity, if we want to do something with that
    } // end of tmdb section

    // is rotten tomatoes data
    if (provider_type.includes('tomato')) {
      if (provider_type.includes('tomato:meter')) {
        ratings.rotten_tomatoes.value = value;
        ratings.rotten_tomatoes.rate = `${value}%`;
      }
      // above call needs full string to differentiate from tomato_userrating:meter
      // which is different from the critic ratings, if we want to use that too
      if (provider_type.includes('id')) {
        ratings.rotten_tomatoes.url = `${config.urls.RT_MOVIE_BASE}/${value}`;
      }
      // also has tomato:rating, but idk what it is/does
    } // end of rotten tomatoes section
  }); // end of forEach

  return { ratings };
};

// ===============================================================================

/**
 * Takes an array of objects containing info about videos for this movie, constructs
 * the full url for each video, and adds it to that video object
 * @param {Array<object>} jwVideos the array of video data objects
 * @returns {Promise} a promise containing the video object
 */
const parseJWVideos = async (jwVideos, config) => {
  const videos = [];
  if (!jwVideos) return { videos };
  jwVideos.forEach(video => {
    const transformedVideo = { type: video.type, name: video.name };
    if (video.provider === 'youtube') {
      transformedVideo.url = `${config.urls.YT_EMBED_BASE}/${
        video.external_id
      }`;
    }
    videos.push(transformedVideo);
  });
  return { videos };
};

// ===============================================================================

/**
 * Takes in the disorganized offers array and parses all of them. It splits them up by
 * type: buy, rent, or stream, and then groups by provider. Within each subarray of
 * objects, each object has a keys for provider_id, sd, hd, and fourk, with the latter
 * three containing the link to that particular offer and the price for that offer
 * @param {Array<object>} jwOffers the original offers array
 * @returns {Promise} a promise containing the offers object:
 * offers: { buy: [], rent: [], stream: [] }
 */
const parseJWOffers = async jwOffers => {
  const offers = {
    buy: [],
    rent: [],
    stream: [],
  };

  if (!jwOffers) return { offers };

  // eslint-disable-next-line no-restricted-syntax
  for await (const offer of jwOffers) {
    let arrayToSearch = [];
    if (offer.monetization_type === 'buy') {
      arrayToSearch = offers.buy;
    } else if (offer.monetization_type === 'rent') {
      arrayToSearch = offers.rent;
    } else if (offer.monetization_type === 'flatrate') {
      arrayToSearch = offers.stream;
    }

    const priceLink = {
      price: offer.retail_price,
      url: offer.urls.standard_web,
    };

    const objProviderId = (await controllers.provider.readOneByKey(
      offer.provider_id,
    ))._id.toString();

    // checking to see if there's already an object for this provider
    const currOffer = arrayToSearch.find(
      anOffer => anOffer.provider === objProviderId,
    );

    // need to alter the keyname just for this one because keys can't start with numbers
    const type =
      offer.presentation_type === '4k' ? 'fourk' : offer.presentation_type;

    if (currOffer) {
      currOffer[type] = priceLink;
    } else {
      arrayToSearch.push({
        provider: objProviderId,
        [type]: priceLink,
      });
    }
  }

  return { offers };
};

// ===============================================================================

/**
 *
 * @param {*} jwGenres
 */
const parseJWGenres = async jwGenres => {
  if (!jwGenres) return { genres: [] };

  // for await (let genre of jwGenres) {
  //   const newId = (await controllers.genre.readOneByKey(genre))._id.toString();
  //   genre = (await controllers.genre.readOneByKey(genre))._id.toString();
  //   console.log(newId, genre);
  // }

  // console.log(jwGenres);

  return {
    genres: await Promise.all(
      jwGenres.map(async genre =>
        (await controllers.genre.readOneByKey(genre))._id.toString(),
      ),
    ),
  };
};

// ===============================================================================
// ================================ Parse ========================================

/**
 * Takes in data from the JustWatch API and parses and transforms it to be shaped
 * in a useful way for the YaMovie front-end to display
 * @param {Object} data the original data from the JW API call
 * @returns {Object} an object with the parsed and transformed data for a movie
 */
jw.movie = async (data, config) => {
  const jw_image_url = 'https://images.justwatch.com';
  const jw_url = `${config.urls.JW_BASE}${data.full_path}`;
  return Object.assign(
    {
      jw_url,
      jw_image_url,
      certification: data.age_certification,
      original_language: data.original_language,
      original_title: data.original_title,
      overview: data.short_description,
      release_date: data.cinema_release_date,
      release_year: data.original_release_year,
      runtime: data.runtime,
      title: data.title,
    },
    ...(await Promise.all([
      parseJWCredits(data.credits),
      parseJWRatings(data.scoring, data.external_ids, config),
      parseJWImages(data.poster, data.backdrops, jw_image_url),
      parseJWVideos(data.clips, config),
      parseJWOffers(data.offers),
      parseJWGenres(data.genre_ids),
    ])),
  );
};

// ===============================================================================

// TODO: add documentation
jw.genre = async ({ id, translation, short_name, technical_name, slug }) => ({
  translation,
  short_name,
  technical_name,
  slug,
  external_ids: {
    jw_id: id,
  },
});

// ===============================================================================

// TODO: add documentation
jw.provider = async ({
  id,
  profile_id,
  technical_name,
  short_name,
  clear_name,
  priority,
  display_priority,
  domains,
  monetization_types,
  icon_url,
}) => ({
  technical_name,
  short_name,
  clear_name,
  priority,
  display_priority,
  domains,
  monetization_types,
  icon_url,
  external_ids: {
    jw_id: id,
    jw_profile: profile_id,
  },
});

// ===============================================================================

module.exports = jw;
