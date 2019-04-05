/* eslint-disable object-curly-newline */
const controllers = require('../controllers');

const parseMovieCertifications = async (data = []) => {
  return {
    certifications: [
      ...new Set(
        data
          .filter(datum => datum.iso_3166_1 === 'US')[0]
          .release_dates.map(elem => elem.certification),
      ),
    ],
  };
};

const parseMovieCredits = async ({ cast = [], crew = [] }) => ({
  credits: {
    cast: cast.map(({ character, name, order }) => ({
      character,
      name,
      order,
    })),
    crew: crew.map(({ department, job, name }) => ({
      department,
      job,
      name,
    })),
  },
});

const parseMovieGenres = async (genres = []) => ({
  genre_ids: await Promise.all(
    genres.map(genre => controllers.genre.readOneByKey(genre.id)),
  ),
});

const parseMovieProductionCompanies = async (companies = [], configs) => ({
  production_companies: companies.map(
    ({ name, logo_path, origin_country }) => ({
      name,
      origin_country,
      logo_url: `${configs.images.secure_base_url}${
        configs.images.logo_sizes[6]
      }${logo_path}`,
    }),
  ),
});

const parseMovieRatings = async (ratings = []) => ({
  ratings: ratings.reduce((acc, { Source, Value }) => {
    const source = Source.toLowerCase()
      .split(' ')
      .join('_');

    acc[source] = {
      rate: Value,
      value: parseInt(Value),
    };
    return acc;
  }, {}),
});

const parseMovieImages = async ({ backdrops = [], posters = [] }, configs) => ({
  images: {
    backdrops: backdrops.map(({ aspect_ratio, file_path, height, width }) => ({
      aspect_ratio,
      height,
      width,
      backdrop_url: `${configs.images.secure_base_url}${
        configs.images.backdrop_sizes[3]
      }${file_path}`,
    })),
    posters: posters.map(({ aspect_ratio, file_path, height, width }) => ({
      aspect_ratio,
      height,
      width,
      poster_url: `${configs.images.secure_base_url}${
        configs.images.poster_sizes[6]
      }${file_path}`,
    })),
  },
});

const parseMovieVideos = async (videos = [], configs) => ({
  videos: videos.map(({ key, name, site, size, type }) => ({
    name,
    site,
    size,
    type,
    url: site.includes('YouTube')
      ? `${configs.urls.YT_EMBED_BASE_URL}${key}`
      : key,
  })),
});

const movie = async (data, configs) =>
  Object.assign(
    {
      adult: data.adult,
      budget: data.budget,
      homepage: data.homepage,
      original_language: data.original_language,
      original_title: data.original_title,
      overview: data.overview,
      release_date: data.release_date,
      release_year: data.release_date.split('-')[0],
      runtime: data.runtime,
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      external_ids: data.external_ids,
    },
    ...(await Promise.all([
      parseMovieCertifications(data.release_dates.results),
      parseMovieCredits(data.credits),
      parseMovieGenres(data.genres),
      parseMovieProductionCompanies(data.production_companies, configs),
      parseMovieRatings(data.ratings),
      parseMovieImages(data.images, configs),
      parseMovieVideos(data.videos.results, configs),
    ])),
  );

const genres = async ({ name, id }) => ({
  name,
  external_ids: {
    tmdb_id: id,
  },
});

const query = async url => {
  const index = url.indexOf('?');

  if (index === -1) return {};

  const queries = url.substring(index + 1).split('&');

  return queries.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});
};

module.exports = {
  movie,
  genres,
  query,
};
