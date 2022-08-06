# ExpressTS backend w/Mikro-ORM and PostgreSQL

This project is for Annalise-AI's API building takehome and a good example of how to setup Mikro-ORM with Express TS and Postgresql.

## ⚡ Quick Start
1. Install packages and dependencies with:
```
npm install
```
2. Create a `.env` file using `.env.template` and stick to the prefilled information

3. Create your docker containers using:
```
docker-compose up -d
```

4. Once the docker containers are running, you can access the Express API on [localhost:3000](http://localhost:3000). You can find the routes by uploading `Image handling.postman_collection.json` to [Postman](https://www.postman.com/).

## 💡 How to run tests?
You do not need to start the Express server for testing. Mocha will run the server before testing.
1. Start up just the PostgreSQL database with Docker using:
```
docker-compose up -d db
```

2. To access the PostgreSQL from outside the Docker containers, update the `CLIENT_URL` in your `.env` to: 
```
CLIENT_URL=postgresql://postgres@localhost:55432
```

3. To run all tests, use:

```
npm run test
```

## 🌟 Deployments!
When there are changes to the schema and you need to deploy changes to the Production database, use this to create the necessary migration scripts:
```
npm run create-migration
```
Mikro-ORM looks a the difference between your current database schema and generates new SQL code in the `/src/migrations` folder. To use these migrations scripts to update your database, run:
```
npm run migrate-up
```
For local development, to drop the database and migrate up, use:
```
npm run drop-and-migrate-up
```

## ❓ What's missing / Future work!

### Image Storage
I would use AWS S3 buckets to store these images and include a POST route in this backend service to upload. The filepaths of these images will be stored in the database to allow users to use a GET route to download the image they need.


### Security
In this project there are no security features at the moment. An easy start is to run the service this on AWS EC2 and to configure an API_KEY in the environment variables with Elastic Beanstalk. 

As for uploading and downloading images, these are some other features to add to improve security:

1. Sanitise filenames
2. Add timestamps to filenames to prevent file name collisions.
3. When downloading images, use presigned URLs that will expire in a set period of time. 


## 💭 Avoid downtime during deployments
From quick google search, there are strategies out there to achieve virtually 0 downtime. Blue-green deployments work by creating identical environments and using a load balancer to route traffic 'green' (updated) environment. 

An easier way is to reduce the likelihood of needing to deploy often by having a rigorous set of tests and testing features on a Staging/Dev environment that has very similar data to Production. 
