const jw = {};

jw.movie = async data => ({
  certification: data.age_certification,
  original_language: data.original_language,
  original_title: data.original_title,
  overview: data.short_description,
  release_date: data.cinema_release_date,
  release_year: data.original_release_year,
  runtime: data.runtime,
  title: data.title,
  credits: data.credits,
  genre_ids: data.genre_ids,
  ratings: data.scoring,
  images: {
    poster: data.poster,
    backdrops: data.backdrops,
  },
  videos: data.clips,
  offers: data.offers,
});

jw.genre = async ({ id, translation, short_name, technical_name, slug }) => ({
  translation,
  short_name,
  technical_name,
  slug,
  external_ids: {
    jw: id,
  },
});

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

module.exports = jw;
