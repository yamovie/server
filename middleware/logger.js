/* eslint-disable no-console */
const shortId = require('shortid');

const getPrefix = req => {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });

  return `[${timestamp}] (${req.requestId}) ${req.headers.host}`;
};

const getLoggerByStatusCode = status => {
  if (status >= 500) return console.error.bind(console);
  if (status >= 400) return console.warn.bind(console);
  return console.log.bind(console);
};

/**
 * Logs incoming requests
 */
const logger = (req, res, next) => {
  req.requestId = shortId.generate();

  console.info(`${getPrefix(req)} ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    getLoggerByStatusCode(res.statusCode)(
      `${getPrefix(req)} ${res.statusCode} ${res.statusMessage} ${res.get(
        'Content-Length',
      ) || 0}b sent`,
    );
  });

  // res.on('close', () =>
  //   console.warn(`${getPrefix(req)} Request aborted by client`),
  // );

  res.on('error', err =>
    console.error(`${getPrefix(req)} Request pipeline error: ${err}`),
  );

  next();
};

module.exports = logger;
