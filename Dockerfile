# FROM node:lts-alpine
FROM node:14-slim

# RUN apt-get update && apt-get install -y python3
RUN apt-get update && apt-get install -y python3 python3-pip
# RUN pip

# Create app directory
WORKDIR /usr/src/app  

COPY . .

# Install Python 3 and other necessary dependencies
# RUN apk add --no-cache python3 make g++
# RUN apt-get install gfortran
# RUN apk add --no-cache python3 py3-pip

# RUN pip3 install --upgrade pip
# RUN apt install -y libomp-dev


# RUN pip3 install -r ML/requirements.txt


RUN npm install 

# RUN npm start

CMD ["npm", "start"]

EXPOSE 3000