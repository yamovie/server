const controllers = require('../controllers');

module.exports.genres = async ({ name, id }) => {
  return {
    name,
    external_ids: {
      tmdb_id: id,
    },
  };
};

module.exports.movie = async (data, configs) => {
  return Object.assign(
    {
      adult: data.adult,
      homepage: data.homepage,
      original_language: data.original_language,
      original_title: data.original_title,
      overview: data.overview,
      release_date: data.release_date,
      runtime: data.runtime,
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      external_ids: data.external_ids,
    },
    ...(await Promise.all([
      parseMovieCredits(data.credits),
      parseMovieGenres(data.genres),
      parseMovieProductionCompanies(data.production_companies, configs),
      parseMovieRatings(data.ratings),
      parseMovieImages(data.images, configs),
      parseMovieVideos(data.videos.results, configs),
    ])),
  );
};

const parseMovieCredits = async ({ cast = [], crew = [] }) => {
  return {
    credits: {
      cast: cast.map(({ character, name, order }) => {
        return { character, name, order };
      }),
      crew: crew.map(({ department, job, name }) => {
        return { department, job, name };
      }),
    },
  };
};

const parseMovieGenres = async (genres = []) => {
  return {
    genre_ids: (await Promise.all(
      genres
        .map(async genre => await controllers.genre.readOneByKey(genre.id))
        .map(async req => await req),
    )).map(res => res._id),
  };
};

const parseMovieProductionCompanies = async (companies = [], configs) => {
  return {
    production_companies: companies.map(
      ({ name, logo_path, origin_country }) => {
        return {
          name,
          origin_country,
          logo_url: `${configs.images.secure_base_url}${
            configs.images.logo_sizes[6]
          }${logo_path}`,
        };
      },
    ),
  };
};

const parseMovieRatings = async (ratings = []) => {
  return {
    ratings: ratings.map(({ Source, Value }) => {
      return { source: Source, value: Value };
    }),
  };
};

const parseMovieImages = async ({ backdrops = [], posters = [] }, configs) => {
  return {
    images: {
      backdrops: backdrops.map(({ aspect_ratio, file_path, height, width }) => {
        return {
          aspect_ratio,
          height,
          width,
          backdrop_url: `${configs.images.secure_base_url}${
            configs.images.backdrop_sizes[3]
          }${file_path}`,
        };
      }),
      posters: posters.map(({ aspect_ratio, file_path, height, width }) => {
        return {
          aspect_ratio,
          height,
          width,
          poster_url: `${configs.images.secure_base_url}${
            configs.images.poster_sizes[6]
          }${file_path}`,
        };
      }),
    },
  };
};

const parseMovieVideos = async (videos = [], configs) => {
  return {
    videos: videos.map(({ key, name, site, size, type }) => {
      return {
        name,
        site,
        size,
        type,
        url: site.includes('YouTube')
          ? `${configs.urls.YT_EMBED_BASE_URL}${key}`
          : key,
      };
    }),
  };
};
