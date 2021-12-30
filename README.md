# gchecker - Vaccination Status Manager

<p align="center">
  <img src="frontend-vue/src/assets/gchecker-logo.svg" height=150px alt="gchecker" style="filter: invert(10%) sepia(98%) saturate(7351%) hue-rotate(294deg) brightness(71%) contrast(106%);" />
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

### API

To start your local dev enviroment run once `npm install` in the `api` folder.

To start the api run `npm run dev` afterwards. The api will be then available at `http://localhost:3000`

Please make sure a `.env` file is available. There are already two examples available `.env.dev.docker` and `.env.dev.vscode`

```sh
$ cd api
$ npm run install
$ npm run dev
```
### Frontend


To start your local dev enviroment run once `npm install` or  `yarn install`in the `frontend-vue` folder.

To start the frontend run `npm run serve` or `yarn serve` afterwards. The frontend will be then available at `http://localhost:8080`

```sh
$ cd frontend-vue
$ npm run install
$ npm run serve
```

### MySQL

For the dev enviroment a `docker-compose.mysql-dev.yml` file is provided on the top-level. Run `docker-compose -f docker-compose.mysql-dev.yml up -d` to start an msql docker container.

```sh
$ docker-compose -f docker-compose.mysql-dev.yml up -d
```

MySQL port is mapped to 3307.


## Visual Studio Code

Open `frontend-vue` and `api` in seperate windows. Press `F5` to start debugging. Run `yarn serve` in `frontend-vue`
## Docker Compose

For testing production setup a `docker-compose.yml` file is provided on the top-level. Run `docker-compose up -d` to build api and frontend and start all containers.

```sh
$ docker-compose up -d
```

Once docker containers are up, then you can access services with below URL.

| Service  | Endpoint |
| -------- | -------- |
| API      | /api     |
| Frontend | /        |



## Software used

- API
  - Node.js, Express, Webpack, Express Validator, JWT, Bunyan, Promise MySQL,
	Node Mailer, Jest, Supertest, Nodemon, DB
    migrate
- Frontend - Vue.js
  - Vue.js, Vuex, Vue Router,

