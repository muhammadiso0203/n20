import NodeCache from "node-cache";

const cacheConstructor = new NodeCache({ stdTTL: 300 });

export const cache = {
  setCache: (key, value) => cacheConstructor.set(key, value),
  getCache: (key) => cacheConstructor.get(key),
};
