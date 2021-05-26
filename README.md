# Graph SQL Server 
* This is a short example to help setup a GraphQL server on Node using Express and connect to Mongo DB using Mongoose.
* This application will list out all the available hotels on the home page from where a user can search the desired hotel. 
* User can search their desired hotel.
* User can book a room at hotel and they can see the list of reserved hotels.

## Technologies Used
* NodeJs
* MongoDB
* GraphQL
* React
* Redux

## Pre-requisites for this example to work.
* mongodb installed on the local machine.
* NodeJs && npm

## How to install
*In the Root folder execute the command  "npm run install:dep" to install the dependencies for both client and server application.

## How to run
* start the Mongodb server locally.
* Execute the command in the root folder "npm start" to start server and client applications.
* This will launch the application with url "http://localhost:3007/" in the browser automatically.
* Additionly press y only if additional port is requierd for running.


## Testing the GraphQl Data.
* Navigate to http://localhost:3000/graphql

## For Hotels.
* Paste below code in graphiql  console and execute.
* Note on command at a time
{
  hotels{
    id,
    name,
    city,
    available,
    cover
  }
}

## For Reservations.
* Paste below code in graphiql  console and execute.
* Note on command at a time
{
  bookings{
		id,
        name,
        city,
        available,
        cover,
        startdate,
        endDate
  }
}
