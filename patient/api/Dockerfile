FROM node:latest
# Create app directory
WORKDIR /usr

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY src ./src
RUN ls -a
RUN npm install

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

EXPOSE 3000
CMD ["npm","run","start"]