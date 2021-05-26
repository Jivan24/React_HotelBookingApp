import express from "express";
import { schema, graphql } from "../graphql/Schema";
const router = express.Router();


router.get("/graphqlhotels", (req, res) => {
    let query=`
    {
        hotels{
          id,
          name,
          city,
          available,
          cover
        }
      }
    `;

    graphql(schema, query).then(result => {
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json({err});
    });
});



router.get("/graphqlbookings",(req,res)=>{
    let query=`
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
      }`;

    graphql(schema, query).then(result => {
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json({err});
    });
});



router.post("/graphqlresrvation",(req,res)=>{
    const {variables} = req.body;
    let query=`
    mutation ($id:String!,$name:String!,$available:Int!,$city:String!,$cover:String!,$startdate:String!,$endDate:String!){
        addBooking(
            id: $id, 
            name: $name, 
            available: $available, 
            city: $city, 
            cover: $cover, 
            startdate: $startdate 
            endDate: $endDate) {
                id
            }
        }`;

    graphql(schema, query,undefined,undefined,variables).then(result => {
        res.status(200).json(result)
    }).catch(err=>{
        res.status(500).json({err});
    });
});

export default router;
