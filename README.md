# Movie CRUD App

This repo is movie crud application, intended to be deployed serverlessly.

## Stack

Next.js
Next plays well with serverless setups and the api/client structure is intuitive. Vercel is its default target, but AWS also supports Next applications/services.

MongoDB Atlas
Atlas's free tier should be sufficient to handle the data and interactions for this project.

Amplify
Amplify allows (fairly) frictionless deployments without application sleep times (as with Heroku's free dynos).

## Development

To develop on the project, execute `yarn run dev`

## Hosting/Deployment

The app is hosted on AWS Amplify. Builds are triggered by a push to the main branch, therefore the main branch will also be considered the 'production' branch for this case.
