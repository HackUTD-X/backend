FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app  

COPY . .

# Install Python 3 and other necessary dependencies
RUN apk add --no-cache python3 make g++

RUN pip3 install -r requirements.txt

RUN npm install 

# RUN npm start

CMD ["npm", "start"]

EXPOSE 3000