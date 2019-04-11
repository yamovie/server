const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
  {
    technical_name: String,
    short_name: String,
    clear_name: {
      type: String,
      required: true,
    },
    priority: Number,
    display_priority: Number,
    domains: Array,
    icon_url: String,
    slug: String,
    external_ids: {
      type: Object,
      required: true,
      unique: true,
    },
  },
  { collection: 'providers' },
);

const Provider = mongoose.model('Provider', providerSchema);
module.exports = Provider;
