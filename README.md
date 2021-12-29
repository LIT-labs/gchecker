# Node.js (REST API) + Vue.js/Nuxt.js (Frontend/Backend) + MySQL Vaccination Status Manager

The German government requires companies to document the 3-G status (vaccinated, recovered or tested).

The G-Checker is intended to provide digital assistance here.

- API
  - Node.js, Express, Webpack, Express Validator, JWT, Bunyan, Promise MySQL, Node Mailer, Jest, Supertest, Nodemon, DB
    migrate
- Frontend - Vue.js
  - Vue.js, Vuex, Vue Router,

## Demo

| Service            | Endpoint                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| API                | [https://gchecker.de/api/](https://gchecker.de/api/)                     |
| Frontend  | [https://gchecker.de/](https://gchecker.de/) |

## How to start in your local environment

```bash
$ docker-compose up -d
```

Once docker containers are up, then you can access services with below URL.

| Service            | Endpoint                                                         |
| ------------------ | ---------------------------------------------------------------- |
| API                | [http://localhost/api](http://localhost/api)                     |
| Frontend  | [http://localhost](http://localhost/ )|



### API

API docker container will be launched as development mode with nodemon. However, it won't detect any changes unless
uncomment volumes.

To enable live change for the API, simply uncomment following lines in `docker-compose.yml`

```text
  volumes:
    - ./api:/srv
```

Please make sure you run `npm install` in the `api` folder.

### Frontend

Currently, Frontend docker container is configured to serve production mode due to the
limitation of setting development environment of Vue.js in sub directory.

If you want to have Hot Reload feature, then you should launch the Frontend separately by `npm run serve`.

```bash
cd frontend-vue
npm run serve
```

Then access Frontend  `http://localhost:8080` via your browser.

### MySQL

MySQL port is mapped to 3307.


## Todo

- [x] Unit tests
- [x] E2E tests
