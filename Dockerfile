FROM node:20 as application_base

WORKDIR /usr/app

COPY ["package.json", "yarn.lock", "/usr/app/"]

RUN yarn install --silent

#################################
# Starting from application_base image above
# Build the application for development environment
#################################
FROM application_base as development

# We are not copying anything because we are using bind mount in docker-compose file

# Bind to 0.0.0.0 so the dev server is accessible outside the container
ENV HOST=0.0.0.0
# Don't attempt to open a browser inside the container
ENV NO_OPEN_BROWSER=true

CMD ["yarn", "start"]

#################################
# Starting from application_base image above
# Build the application for production environment
#################################
# step1 => build react app
FROM application_base as build

COPY . ./

RUN yarn build

# step2 => copy react build into nginx (update it to meet your needs)
FROM nginx:alpine as production

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from build stage
COPY --from=build /usr/app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
