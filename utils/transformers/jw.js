const { urls } = require('../../configs/urls');

const jw = {};

// ===============================================================================
// =========================== Parse Helpers  ====================================

/**
 * TODO: add documentation
 * @param {Array<object>} jwCredits
 * @returns {Promise} the credits object
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
 * TODO: add documentation
 * @param {string} jwPoster
 * @param {Array<string>} jwBackdrops
 * @param {string} jwLink the general link to this movie's page on JustWatch
 * @returns {Promise}
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
 * TODO: add documentation
 * @param {Array<object>} jwRatings
 * @returns {Promise}
 */
const parseJWRatings = async jwRatings => {
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

  if (!jwRatings) return ratings;

  jwRatings.forEach(({ provider_type, value }) => {
    // is imdb data
    if (provider_type.includes('imdb')) {
      if (provider_type.includes('score')) {
        ratings.imdb.value = value;
        ratings.imdb.rate = `${value}/10`;
      }
      // TODO: get this from external_ids
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
 * TODO: add documentation
 * @param {Array<object>} jwVideos
 */
const parseJWVideos = async jwVideos => {
  if (!jwVideos) return [];
  const videos = [];
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
 * TODO: add documentation
 * @param {Array<object>} jwOffers
 */
const parseJWOffers = async jwOffers => {
  const offers = {
    buy: [],
    rent: [],
    stream: [],
  };

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
    let currOffer = arrayToSearch.find(
      anOffer => anOffer.provider_id === offer.provider_id,
    );

    const type = offer.presentation_type === '4k' ? 'fourk' : offer.presentation_type;
    if (currOffer) {
      currOffer[type] = priceLink;
    } else {
      currOffer = {
        provider_id: offer.provider_id,
        [type]: priceLink,
      };
    }

    arrayToSearch.push(currOffer);
  });

  return offers;
};

// ===============================================================================
// ================================ Parse ========================================

// TODO: add documentation
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
      parseJWRatings(data.scoring),
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
