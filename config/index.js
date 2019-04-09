const convict = require('convict');

convict.addParser({ extension: 'json', parse: JSON.parse });

const config = convict({
  ENV: {
    doc: 'The application environment.',
    format: ['production', 'staging', 'development'],
    default: 'development',
    arg: 'NODE_ENV',
  },
  PORT: {
    doc: 'The port to bind.',
    format: 'port',
    default: process.env.PORT,
    env: 'PORT',
  },
  DB_SCHEME: {
    doc: 'Database scheme.',
    format: '*',
    default: process.env.DB_SHEME,
    env: 'DB_SCHEME',
    sensitive: true,
  },
  DB_USER: {
    doc: 'Database username.',
    format: '*',
    default: process.env.DB_USER,
    env: 'DB_USER',
    sensitive: true,
  },
  DB_KEY: {
    doc: 'Database password.',
    format: '*',
    default: process.env.DB_KEY,
    env: 'DB_KEY',
    sensitive: true,
  },
  DB_HOST: {
    doc: 'Database host name/IP.',
    format: '*',
    default: process.env.DB_HOST,
    env: 'DB_HOST',
    sensitive: true,
  },
  DB_NAME: {
    doc: 'Database name.',
    format: String,
    default: process.env.DB_NAME,
    env: 'DB_NAME',
    sensitive: true,
  },
  DB_OPTIONS: {
    doc: 'Database options.',
    format: '*',
    default: process.env.DB_OPTIONS,
    env: 'DB_OPTIONS',
    sensitive: true,
  },
  TMDB_KEY: {
    doc: 'TMDB API key',
    format: '*',
    default: process.env.TMDB_KEY,
    env: 'TMDB_KEY',
    sensitive: true,
  },
  OMDB_KEY: {
    doc: 'OMDB API key',
    format: '*',
    default: process.env.OMDB_KEY,
    env: 'OMDB_KEY',
    sensitive: true,
  },
  GOOGLE_CLIENT_ID: {
    doc: 'Google Client ID',
    format: '*',
    default: process.env.GOOGLE_CLIENT_ID,
    env: 'GOOGLE_CLIENT_ID',
    sensitive: true,
  },
  GOOGLE_SECRET: {
    doc: 'Google Secret',
    format: '*',
    default: process.env.GOOGLE_SECRET,
    env: 'GOOGLE_SECRET',
    sensitive: true,
  },
  GOOGLE_CALLBACK: {
    doc: 'Google Callback',
    format: '*',
    default: process.env.GOOGLE_CALLBACK,
    env: 'GOOGLE_CALLBACK',
    sensitive: true,
  },
  CLIENT_ORIGIN: {
    doc: 'Client Origin',
    format: '*',
    default: process.env.CLIENT_ORIGIN,
    env: 'CLIENT_ORIGIN',
  },
  SECRET: {
    doc: 'Token Secret',
    format: '*',
    default: process.env.SECRET,
    env: 'SECRET',
    sensitive: true,
  },
});

config.loadFile('./config/.env.json');
config.validate({ allowed: 'strict' });

module.exports = config;
