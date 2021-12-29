#bin/bash

cd     api/
yarn lint
cd ..
cd frontennd-vue
yarn lint:eslint
