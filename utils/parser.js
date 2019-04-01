const controllers = require('../controllers');

const YT_EMBED_BASE_URL = 'https://www.youtube.com/embed/';

module.exports.movie = async (data, config) => {
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
      genre_ids: await Promise.all(
        data.genres
          .map(async genre => await controllers.genre.getOneByKey(genre.id))
          .map(async req => await req)
          .map(res => res._id),
      ),
      production_companies: data.production_companies.map(
        ({ name, logo_path, origin_country }) => {
          return {
            name,
            origin_country,
            url: `${config.images.secure_base_url}${
              config.images.logo_sizes[6]
            }${logo_path}`,
          };
        },
      ),
      ratings: ratings.map(({ Source, Value }) => {
        return { source: Source, value: Value };
      }),
      images: {
        backdrops: data.images.backdrops.map(
          ({ aspect_ratio, file_path, height, width }) => {
            return {
              aspect_ratio,
              height,
              width,
              url: `${config.images.secure_base_url}${
                config.images.backdrop_sizes[3]
              }${file_path}`,
            };
          },
        ),
        posters: data.images.posters.map(
          ({ aspect_ratio, file_path, height, width }) => {
            return {
              aspect_ratio,
              height,
              width,
              url: `${config.images.secure_base_url}${
                config.images.poster_sizes[6]
              }${file_path}`,
            };
          },
        ),
      },
      videos: data.videos.results.map(({ key, name, site, size, type }) => {
        return {
          name,
          site,
          size,
          type,
          url: site.includes('YouTube') ? `${YT_EMBED_BASE_URL}${key}` : key,
        };
      }),
    },
  );
};

module.exports.genres = data => {
  const { name, id } = data;

  return {
    name,
    external_ids: {
      tmdb_id: id,
    },
  };
};
