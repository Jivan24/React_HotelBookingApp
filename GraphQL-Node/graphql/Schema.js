import { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull
 } from 'graphql/type';
import {graphql} from "graphql";
import Bookings from "../mongoose/booking"
import fs from "fs";
import path from "path";

const HotelsType = new GraphQLObjectType({
    name: 'Hotels',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        available:{type: GraphQLInt},
        cover:{type: GraphQLString}
    })
});

const BookingType = new GraphQLObjectType({
  name: 'Bookings',
  fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      city: { type: GraphQLString },
      available:{type: GraphQLInt},
      cover:{type: GraphQLString},
      startdate:{type: GraphQLString},
      endDate:{type: GraphQLString}
  })
});
  

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hotels: {
          type: new GraphQLList(HotelsType),
          resolve(parent, args) {
            try{
                const data = JSON.parse(fs.readFileSync(path.join(__dirname,'../hotel.json'), "utf8"));
                return ( data || [] );
            }catch(e){ 
               throw new Error("Unable to read hotels");
            }
          }
      },
      bookings: {
        type: new GraphQLList(BookingType),
        resolve:()=>{
          return new Promise((resolve, reject) => {
            Bookings.find((err, data) => {
              if (err){ reject(new Error("Unable to read Bookings")); } 
              else{ resolve( data || [] ); }
            });
          });
        }
    }
  }
});



const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addBooking: {
          type: BookingType,
          args: {
              id: { type: new GraphQLNonNull(GraphQLString) },
              name: { type: new GraphQLNonNull(GraphQLString) },
              city: { type: new GraphQLNonNull(GraphQLString) },
              available:{ type: new GraphQLNonNull(GraphQLInt) },
              cover:{ type: new GraphQLNonNull(GraphQLString) },
              startdate:{ type: new GraphQLNonNull(GraphQLString) },
              endDate:{ type: new GraphQLNonNull(GraphQLString) }
          },
          resolve(parent, args) {
              const { id, name, city,available,cover,startdate,endDate } = args;
              const new_booking = new Bookings({id, name, city,available,cover,startdate,endDate});
              return new_booking.save();
          }
      }
  }
});
  
  
  export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
  
export { graphql };
  
