const Promise = require("bluebird");
const request = require("request-promise");
const Redis = require("ioredis");
const BASE = "https://registry.npmjs.org";

const cache = new Redis();

const packageUrl = (modulePackage, version) => {
  return `${BASE}/${modulePackage}/${version}`;
};

const resolveDeps = async (modulePackage, version) => {
  const cached = await cache.get(`${modulePackage}:${version}`);
  if (cached && version !== "latest") {
    return JSON.parse(cached);
  }

  const response = await request({
    uri: packageUrl(modulePackage, version),
    json: true
  });
  const dependencies = response.dependencies || [];

  const deps = await Promise.map(
    Object.keys(dependencies),
    async dep => {
      const name = dep;
      const version = dependencies[dep];

      return { name, version, dependencies: await resolveDeps(name, version) };
    },
    { concurrency: 5 }
  );

  await cache.set(`${modulePackage}:${version}`, JSON.stringify(deps), "ex", 3600);
  return deps;
};

const dependensee = async (modulePackage, version) => {
  const tree = {};
  const deps = await resolveDeps(modulePackage, version);
  return { name: modulePackage, version: version, dependencies: deps };
};

module.exports = dependensee;
