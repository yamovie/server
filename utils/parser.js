const TMDB_POSTER_BASE_URL = 'http://image.tmdb.org/t/p/original';

module.exports.movies = movie => {
  const { title, poster_path, genre_ids, release_date, id } = movie;

  return {
    title,
    poster_path: `${TMDB_POSTER_BASE_URL}${poster_path}`,
    genre_ids,
    release_date,
    _private: {
      external_ids: {
        tmdb: id
      }
    }
  };
};

module.exports.details = (data, movie_id) => {
  const { tmdbData, omdbData } = data;
  const { title, credits, overview, runtime, videos } = tmdbData;
  const { Ratings } = omdbData;

  return {
    movie_id,
    title,
    cast: credits.cast,
    crew: credits.crew,
    plot: overview,
    ratings: Ratings.map(rating => {
      return {
        source: rating.Source,
        value: rating.Value
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
            : `${video.key}`
      };
    })
  };
};

module.exports.genres = data => {
  const { name, id } = data;

  return {
    genre: name,
    key: id
  };
};
