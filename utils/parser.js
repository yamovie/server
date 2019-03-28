const controllers = require('../controllers');

const TMDB_POSTER_BASE_URL = 'http://image.tmdb.org/t/p/original';

module.exports.movies = movie => {
  const { title, poster_path, genre_ids, id } = movie;

  return {
    title,
    poster_path: `${TMDB_POSTER_BASE_URL}${poster_path}`,
    genre_keys: genre_ids,
    private: {
      external_ids: {
        tmdb: id,
      },
    },
  };
};

module.exports.detailedMovie = async data => {
  const {
    adult,
    homepage,
    original_language,
    original_title,
    overview,
    ratings,
    release_date,
    runtime,
    status,
    tagline = '',
    title,
    external_ids,
  } = data;

  console.log(`Parsed "${data.title}"...`);

  return Object.assign(
    {
      adult,
      homepage,
      original_language,
      original_title,
      overview,
      release_date,
      runtime,
      status,
      tagline,
      title,
      external_ids,
    },
    {
      credits: {
        cast: data.credits.cast.map(({ character, name, order }) => {
          return { character, name, order };
        }),
        crew: data.credits.crew.map(({ department, job, name }) => {
          return { department, job, name };
        }),
      },
      genre_ids: (await Promise.all(
        data.genres
          .map(genre => controllers.genre.getOneByKey(genre.id))
          .map(async req => await req),
      )).map(res => res._id),
      production_companies: data.production_companies.map(
        ({ name, logo_path, origin_country }) => {
          return { name, logo_path, origin_country };
        },
      ),
      ratings: ratings.map(({ Source, Value }) => {
        return { source: Source, value: Value };
      }),
      images: {
        backdrops: data.images.backdrops.map(
          ({ aspect_ratio, file_path, height, width }) => {
            return { aspect_ratio, file_path, height, width };
          },
        ),
        posters: data.images.posters.map(
          ({ aspect_ratio, file_path, height, width }) => {
            return { aspect_ratio, file_path, height, width };
          },
        ),
      },
      videos: data.videos.results.map(({ key, name, site, size, type }) => {
        return { key, name, site, size, type };
      }),
    },
  );
};

module.exports.details = (data, movie_id) => {
  const {
    title = '',
    credits = {},
    overview = '',
    runtime = 0,
    videos = {
      results: [],
    },
  } = data.tmdbData;
  const { Ratings = [] } = data.omdbData;

  return {
    movie_id,
    title,
    cast: credits.cast,
    crew: credits.crew,
    plot: overview,
    ratings: Ratings.map(rating => {
      return {
        source: rating.Source,
        value: rating.Value,
      };
    }),
    runtime,
    videos: videos.results.map(video => {
      return {
        name: video.name,
        site: video.site,
        size: video.size,
        type: video.trailer,
        src:
          video.site === 'YouTube'
            ? `https://www.youtube.com/embed/${video.key}`
            : `${video.key}`,
      };
    }),
  };
};

module.exports.genres = data => {
  const { name, id } = data;

  return {
    genre: name,
    key: id,
  };
};
