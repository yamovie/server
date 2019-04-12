const controllers = require('../../controllers');

const tmdb = {};

const parseCertifications = async (data = []) => ({
  certifications: [
    ...new Set(
      data
        .filter(datum => datum.iso_3166_1 === 'US')[0]
        .release_dates.map(elem => elem.certification),
    ),
  ],
});

const parseCredits = async ({ cast = [], crew = [] }) => ({
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

const parseGenres = async (genres = []) => ({
  genre_ids: await Promise.all(
    genres.map(genre => controllers.genre.readOneByKey(genre.id)),
  ),
});

const parseProductionCompanies = async (companies = [], configs) => ({
  production_companies: companies.map(({ name, logo_path, origin_country }) => ({
    name,
    origin_country,
    logo_url: `${configs.images.secure_base_url}${
      configs.images.logo_sizes[6]
    }${logo_path}`,
  })),
});

const parseRatings = async (ratings = []) => ({
  ratings: ratings.reduce((acc, { Source, Value }) => {
    const source = Source.toLowerCase()
      .split(' ')
      .join('_');

    acc[source] = {
      rate: Value,
      value: parseInt(Value, 10),
    };
    return acc;
  }, {}),
});

const parseImages = async ({ backdrops = [], posters = [] }, configs) => ({
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

const parseVideos = async (videos = [], configs) => ({
  videos: videos.map(({ key, name, site, size, type }) => ({
    name,
    site,
    size,
    type,
    url: site.includes('YouTube') ? `${configs.urls.YT_EMBED_BASE_URL}/${key}` : key,
  })),
});

tmdb.movie = async (data, configs) =>
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
      parseCertifications(data.release_dates.results),
      parseCredits(data.credits),
      parseGenres(data.genres),
      parseProductionCompanies(data.production_companies, configs),
      parseRatings(data.ratings),
      parseImages(data.images, configs),
      parseVideos(data.videos.results, configs),
    ])),
  );

tmdb.genre = async ({ name, id }) => ({
  name,
  external_ids: {
    tmdb_id: id,
  },
});

module.exports = tmdb;
