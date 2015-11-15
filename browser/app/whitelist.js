import url from 'url';

const whitelist = (list) => {
  const setList = new Set(list);

  return (newUrl) => {
    const components = url.parse(newUrl).hostname.split('.');
    // Only care about the domain (i.e. google.com)
    const domain = components.slice(Math.max(components.length - 2, 0)).join('.');
    return setList.has(domain);
  };
};

export default whitelist;
