import Express,{ErrorRequestHandler, NextFunction, Request,Response} from 'express'
import mongoose from 'mongoose'
import mongo_url from './mongoDB/credentials/credentials'
import addUserRoute from './routes/user_routes/add_user'
import getUserRoute from './routes/user_routes/get_user'
import updateParamRoute from './routes/user_routes/update_param'
import arrayAddRoute from './routes/user_array_routes/push_array'
import deleteArrayRoute from './routes/user_array_routes/delete_array'
import helmet from 'helmet'
import cloudMessagingRoute from './routes/cloud_messageing/cloudMessageing'


/**
 * if database connected then run below function
 * 
 * 
 */

const DBServer = Express()
DBServer.use(helmet())
DBServer.use(Express.json())
DBServer.use(getUserRoute)
DBServer.use(addUserRoute)
DBServer.use(deleteArrayRoute)
DBServer.use(updateParamRoute)
DBServer.use(arrayAddRoute)
DBServer.use(cloudMessagingRoute)

DBServer.get("/",(Req:Request,res:Response)=>{
    res.json({
        message:"ameerunisaTailorsMongoDBAPI",
        sreverStatus:{
            "status":"running",
            "dbStatus":"connected",
            "version":2.3,
        },
        // help:{
        //     routes:["getUser/:email","addUser","updateParam","pushArray","deleteIndex"],
        //     methods:["get","post","patch","put","delete"]

        // }
    })
})

DBServer.use(((err, req, res, next) => {
    if(err.status == 400){
        res.json({
            message:"wrongInput"
        })
    }
}) as ErrorRequestHandler);
DBServer.use((req,res)=>{
    res.json(
        {
            message:"wrongUrl"
        }
    )

})

/**
 * if DATBASE not connexted then run below function
 * gives dbStatus == notConnected
 */
const DBServerError = Express()
DBServerError.use(helmet())
DBServerError.use(Express.json())
DBServerError.get("/",(Req:Request,res:Response)=>{
    res.json({
        message:"ameerunisaTailorsMongoDBAPI",
        sreverStatus:{
            "status":"running",
            "dbStatus":"notConnected",
            "version":2.3,
        }
    })
})
DBServerError.use((req,res)=>{
    res.json(
        {
            message:"wrongUrl"
        }
    )

})

/**
 * connecting mongoDB with mongoose
 * 
 * 
 */
const DBConnected:()=> void = ():void=>{
    DBServer.listen(8000)
}
const DBNotConnected:()=>void = ():void=>{
    DBServerError.listen(8000)
}
mongoose.connect(mongo_url)
.then(():void=>{
    DBConnected()
})
.catch(
    ():void=>{
        DBNotConnected()

    }
)




