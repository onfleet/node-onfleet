FROM node:latest

WORKDIR /home/node/app
COPY ./package.json ./package.json
RUN npm install
COPY --chown=node:node . .

# the default command test the onfleet library
CMD [ "npm", "run", "test" ]

# Run the image by running: docker-compose up --build
# Watch the test results by docker-compose logs