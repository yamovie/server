const { urls } = require('../../configs');
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
const parseJWImages = async (jwPoster, jwBackdrops, jwLink) => {
  const pSize = 592;
  let poster = '';
  if (jwPoster) {
    const posterLink = jwPoster.replace('{profile}', `s${pSize}`);
    poster = `${jwLink}${posterLink}`;
  }

  const bdSize = 1440;
  const backdrops = [];
  if (jwBackdrops) {
    jwBackdrops.forEach(backdrop => {
      const bdLink = backdrop.backdrop_url.replace('{profile}', `s${bdSize}`);
      backdrops.push(`${jwLink}${bdLink}`);
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
const parseJWRatings = async (jwRatings, jwExternalIds) => {
  const ratings = {
    imdb: {
      rate: '?/10',
      value: 0,
      url: urls.IMDB_BASE,
    },
    rotten_tomatoes: {
      rate: '?%',
      value: 0,
      url: urls.RT_BASE,
    },
    themdb: {
      rate: '?%',
      value: 0,
      url: urls.TMDB_BASE,
    },
  };

  if (!jwRatings) return { ratings };

  const imdbIdObj = jwExternalIds.find(idObj => idObj.provider === 'imdb');
  if (imdbIdObj) {
    ratings.imdb.url = `${urls.IMDB_MOVIE_BASE}/${imdbIdObj.external_id}`;
  }

  jwRatings.forEach(({ provider_type, value }) => {
    // is imdb data
    if (provider_type.includes('imdb')) {
      if (provider_type.includes('score')) {
        ratings.imdb.value = value;
        ratings.imdb.rate = `${value}/10`;
      }
      if (provider_type.includes('id')) {
        ratings.imdb.url = `${urls.IMDB_MOVIE_BASE}/${value}`;
      }
    } // end of imdb section

    // is tmdb data
    if (provider_type.includes('tmdb')) {
      if (provider_type.includes('score')) {
        ratings.themdb.value = value;
        ratings.themdb.rate = `${value * 10}%`;
      }
      if (provider_type.includes('id')) {
        ratings.themdb.url = `${urls.TMDB_MOVIE_BASE}/${value}`;
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
        ratings.rotten_tomatoes.url = `${urls.RT_MOVIE_BASE}/${value}`;
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
const parseJWVideos = async jwVideos => {
  const videos = [];
  if (!jwVideos) return { videos };
  jwVideos.forEach(video => {
    const transformedVideo = { type: video.type, name: video.name };
    if (video.provider === 'youtube') {
      transformedVideo.url = `${urls.YT_EMBED_BASE}/${video.external_id}`;
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

  jwOffers.forEach(offer => {
    let arrayToSearch = [];
    if (offer.monetization_type === 'buy') {
      arrayToSearch = offers.buy;
    } else if (offer.monetization_type === 'rent') {
      arrayToSearch = offers.rent;
    } else if (offer.monetization_type === 'flatrate') {
      arrayToSearch = offers.stream;
    }

    const priceLink = { price: offer.retail_price, url: offer.urls.standard_web };

    const objProviderId = controllers.provider.readOneByKey(offer.provider_id);
    // checking to see if there's already an object for this provider
    const currOffer = arrayToSearch.find(
      anOffer => anOffer.provider_id === objProviderId,
    );

    // need to alter the keyname just for this one because keys can't start with numbers
    const type = offer.presentation_type === '4k' ? 'fourk' : offer.presentation_type;

    if (currOffer) {
      currOffer[type] = priceLink;
    } else {
      arrayToSearch.push({
        provider_id: objProviderId,
        [type]: priceLink,
      });
    }
  });

  return { offers };
};

// ===============================================================================
// ================================ Parse ========================================

/**
 * Takes in data from the JustWatch API and parses and transforms it to be shaped
 * in a useful way for the YaMovie front-end to display
 * @param {Object} data the original data from the JW API call
 * @returns {Object} an object with the parsed and transformed data for a movie
 */
jw.movie = async data => {
  const jw_url = `${urls.JW_BASE}${data.full_path}`;
  return Object.assign(
    {
      jw_url,
      certification: data.age_certification,
      original_language: data.original_language,
      original_title: data.original_title,
      overview: data.short_description,
      release_date: data.cinema_release_date,
      release_year: data.original_release_year,
      runtime: data.runtime,
      title: data.title,
      genre_ids: data.genre_ids,
    },
    ...(await Promise.all([
      parseJWCredits(data.credits),
      parseJWRatings(data.scoring, data.external_ids),
      parseJWImages(data.poster, data.backdrops, jw_url),
      parseJWVideos(data.clips),
      parseJWOffers(data.offers),
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
    jw: id,
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
