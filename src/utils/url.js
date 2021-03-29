const allowQueryParams = ['q', 'page', 'limit', 'variant', 'sortby'];

/**
 * Normalize url
 * @param url
 */
module.exports = (url) => {
  const fullUrl = new URL(`http://domain.com${url}`);
  const searchParams = new URLSearchParams(fullUrl.search.slice(1));
  const newParams = new URLSearchParams();

  allowQueryParams.forEach((param) => {
    if (newParams.has(param)) {
      searchParams.set(param, newParams.get(param) || '');
    }
  });

  const params = newParams.toString();
  return `${fullUrl.pathname}${params ? `?${params}` : ''}`;
}
