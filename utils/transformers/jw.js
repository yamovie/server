const jw = {};

// ===============================================================================
// =========================== Parse Helpers  ====================================

/**
 * TODO: finish this
 * @param {Array<object>} jwCredits
 * @returns {Promise} the credits object
 */
const parseJWCredits = async jwCredits => {
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
 * TODO: finish this
 * @param {string} jwPoster
 * @param {Array<string>} jwBackdrops
 * @param {string} jwLink the general link to this movie's page on JustWatch
 * @returns {Promise}
 */
const parseJWImages = async (jwPoster, jwBackdrops, jwLink) => {
  const pSize = 592;
  const posters = [];
  const posterLink = jwPoster.replace('{profile}', `s${pSize}`);
  const poster_url = `${jwLink}${posterLink}`;
  posters.push({ poster_url });

  const bdSize = 1440;
  const backdrops = [];
  jwBackdrops.forEach(backdrop => {
    const bdLink = backdrop.backdrop_url.replace('{profile}', `s${bdSize}`);
    const backdrop_url = `${jwLink}${bdLink}`;
    backdrops.push({ backdrop_url });
  });
  return { images: { posters, backdrops } };
};

// ===============================================================================

/**
 * TODO: finish this
 * @param {Array<object>} jwRatings
 * @returns {Promise}
 */
const parseJWRatings = async jwRatings => {
  const ratings = {
    imdb: {
      rate: '?/10',
      value: 0,
      url: 'http://www.imdb.com',
    },
    rotten_tomatoes: {
      rate: '?%',
      value: 0,
      url: 'http://www.rottentomatoes.com',
    },
    themdb: {
      rate: '?%',
      value: 0,
      url: 'https://www.themoviedb.org',
    },
  };

  jwRatings.forEach(({ provider_type, value }) => {
    // is imdb data
    if (provider_type.includes('imdb')) {
      if (provider_type.includes('score')) {
        ratings.imdb.value = value;
        ratings.imdb.rate = `${value}/10`;
      }
      if (provider_type.includes('id')) {
        ratings.imdb.url = `http://www.imdb.com/title/${value}`;
      }
    } // end of imdb section

    // is tmdb data
    if (provider_type.includes('tmdb')) {
      if (provider_type.includes('score')) {
        ratings.themdb.value = value;
        ratings.themdb.rate = `${value * 10}%`;
      }
      if (provider_type.includes('id')) {
        ratings.themdb.url = `https://www.themoviedb.org/movie/${value}`;
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
        ratings.rotten_tomatoes.url = `http://www.rottentomatoes.com/m/${value}`;
      }
      // also has tomato:rating, but idk what it is/does
    } // end of rotten tomatoes section
  }); // end of forEach

  return ratings;
};

// ===============================================================================

/**
 * TODO: finish this
 * @param {Array<object>} jwVideos
 */
const parseJWVideos = async jwVideos => {
  // do stuff
};

// ===============================================================================

/**
 * TODO: finish this
 * @param {Array<object>} jwOffers
 */
const parseJWOffers = async jwOffers => {
  // do stuff
};

// ===============================================================================
// ================================ Parse ========================================

const BASE_JW_URL = 'https://www.justwatch.com';

// TODO: add documentation
jw.movie = async data => {
  const jw_url = `${BASE_JW_URL}${data.full_path}`;
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
      parseJWImages(data.poster, data.backdrops, jw_url),
      parseJWVideos(data.clips),
      parseJWOffers(data.offers),
      parseJWRatings(data.scoring),
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
