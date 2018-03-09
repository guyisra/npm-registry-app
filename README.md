# NPM REGISTRY

## INSTALLING AND RUNNING

1. brew install redis
2. make sure to have node installed
3. go to folders frontend and backend, and `yarn install`
4. run `redis-server` to run redis locally
5. run `yarn start` in frontend and in backend folders to run the stuff


## Operating

enter a npm module name, and then choose a version



## Some notes on production readiness

- Due to time limitation and life constraints, this was not deployed.
- Most of the heavy lifting was made via a npm module I wrote called "dependensee". However, due to time limitation, I had to take that code and put it in the backend to incorporate redis. To have redis in the dependensee module, I would rather write a cache layer which can have an adapter as a hash or as redis and abstract the implementation away. This is similarly done in the moneta gem in ruby.
