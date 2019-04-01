const shortId = require('shortid');

/**
 * Logs requests
 */
module.exports = (req, res, next) => {
  const cleanup = () => {
    res.removeListener('finish', log);
    res.removeListener('close', abort);
    res.removeListener('error', error);
  };

  const log = () => {
    cleanup();
    const logger = getLoggerByStatusCode(res.statusCode);
    logger(
      `${getPrefix(req)} ${res.statusCode} ${res.statusMessage} ${res.get(
        'Content-Length',
      ) || 0}b sent`,
    );
  };

  const abort = () => {
    cleanup();
    console.warn(`${getPrefix(req)} Request aborted by client`);
  };

  const error = error => {
    cleanup();
    console.error(`${getPrefix(req)} Request pipeline error: ${error}`);
  };

  req.requestId = shortId.generate();

  console.info(`${getPrefix(req)} ${req.method} ${req.originalUrl}`);

  res.on('finish', log);
  res.on('close', abort);
  res.on('error', error);

  next();
};

const getPrefix = req => {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });

  return `[${timestamp}] (${req.requestId}) ${req.headers.host}`;
};

const getLoggerByStatusCode = status => {
  if (status >= 500) return console.error.bind(console);
  else if (status >= 400) return console.warn.bind(console);
  else return console.log.bind(console);
};
