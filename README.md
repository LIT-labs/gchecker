# gchecker - Vaccination Status Manager

<p align="center">
  <img src="frontend-vue/src/assets/gchecker-logo.svg" height=300px alt="gchecker" />
</p>
<p align="center">
  <a href="https://matrix.to/#/#gchecker:matrix.org" target="_blank">
    <img src="https://img.shields.io/matrix/gchecker:matrix.org" alt="martix chat" />
  </a>
</p>

-------------------




The German government requires companies to document the 3-G status (vaccinated,
recovered or tested). gchecker is intended to provide digital assistance.

A demo instance ist avalable at [gchecker.de](https://gchecker.de)

## How to start in your local environment

```sh
$ docker-compose up -d
```

Once docker containers are up, then you can access services with below URL.

| Service  | Endpoint |
| -------- | -------- |
| API      | /api     |
| Frontend | /        |


### API

API docker container will be launched as development mode with nodemon. However,
it won't detect any changes unless uncomment volumes.

To enable live change for the API, uncomment following lines in
`docker-compose.yml`

```yaml
  volumes:
    - ./api:/srv
```

Please make sure you run `npm install` in the `api` folder.

### Frontend

Currently, Frontend docker container is configured to serve production mode due
to the limitation of setting development environment of Vue.js in sub directory.

If you want to have Hot Reload feature, then you should launch the Frontend
separately by `npm run serve`.

```sh
cd frontend-vue
npm run serve
```

Then access Frontend  `http://localhost:8080` via your browser.

### MySQL

MySQL port is mapped to 3307.

## Software used

- API
  - Node.js, Express, Webpack, Express Validator, JWT, Bunyan, Promise MySQL,
	Node Mailer, Jest, Supertest, Nodemon, DB
    migrate
- Frontend - Vue.js
  - Vue.js, Vuex, Vue Router,

