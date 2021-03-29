const normalizeUrl = require('../utils/url')

/**
 * Context middleware
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  if (req.body && req.body.context) {
    req.context = req.body.context;
    next();
    return;
  }

  req.context = {
    host: process.env.STORE_DOMAIN || req.hostname,
    url: normalizeUrl(req.originalUrl),
    baseUrl: req.originalUrl,
    cookie: req.headers.cookie,
    isRender: false,
    isPreview: req.query.preview === 'true',
    previewId: 0,
  };

  if (req.context.isPreview && typeof req.query.theme_preview_id === 'string') {
    req.context.previewId = parseInt(req.query.theme_preview_id, 10);
  }

  next();
}
