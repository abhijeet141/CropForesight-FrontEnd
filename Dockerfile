FROM node:14-alpine

WORKDIR /CropForesight-FrontEnd

COPY ./package*.json /CropForesight-FrontEnd

RUN npm install

COPY . /CropForesight-FrontEnd

CMD ["npm","start"]
