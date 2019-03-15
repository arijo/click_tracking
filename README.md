This is my solution for task 10 (an API for tracking the number of clicks). 

# Demo

You can play with the demo at the following addresses:

    http://52.209.43.97:3000 # dashboard
    http://52.209.43.97:3001 # demo site


# Architecture

## Tag

Script that is embedded in the site for which the user wants to collect click statistics.

## Site

A demo site used for collecting click statistics.

## Dashboard

### Fronted

A frontend for the dashboard where the user can view click statistics via either a graph or an heatmap.

### Backend

#### API

Backend API for click stats collection and provisioning.

#### Server

Provides the frontend assets.

# Setup

## Using docker-compose

The complete solution can be started by running docker-compose at the project's root level:

    docker-compose build
    docker-compose up
    
There's a could formation template at the root level:

    cf_template.yml
    
I extracted this template from aws cloud formation (it was not hand coded).

You can also use the docker-compose file to upload to aws (which was what I did):

    docker-compose.aws.yml
    
The docker images were built in my local machine and then pushed to my amazon account (ECR) registry.

## Manually

Please follow the README files in each of the sub-folders.

# Testing

To run the dashboard API tests please run the following commands:

    docker run -d -p 27017:27017 mongo
    cd <project_root>/dashboard/backend
    npm install
    npm run-script testing &
    npm test
    
Due the limited amount of time available and the simplicity of the frontend code I've choosen not to provide frontend unit tests.


# Notes

I spent about 8 hours working on this solution. About half that time was spent on docker, docker-compose and AWS ECS configuration and deployment issues since I did not have much previous experience working with these tools.

I understand this will impact the way I'm going to be evaluated and would appreciate any feedback on how I could have better managed my time during the development of this solution if that would be ok with you guys :) 

I did not choose to work with a frontend javascript framework due to the simplicity of the client side part of the code and the flexibility pure javascript provides when coding a quick application - in a more complex frontend, given more planning time I would have likely choose something like Vue.js since to me it provides the best compromise between functionality and flexibility.

I choose existing template projects for the demo site and dashboard apps and decided to keep its included plugins (Chart.js) since it provided most of the functionality I was looking for for the dashboard - it gives the developers a chance to prototype and later decide if other libraries are more appropiate to the task.