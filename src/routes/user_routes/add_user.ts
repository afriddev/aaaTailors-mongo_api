import Express,{NextFunction, Request,Response} from 'express'
import Router from 'express'
import User from '../../mongoDB/models/user/user_model'
const addUserRoute = Router()
let sendMessage:[string,string] = ["message",""]
 
/**
 * custom middlewares
 *  
 */
function checkEmail(email:string):boolean{
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return regexPattern.test(email)
}
const checkUser:(req:Request,res:Response,next:NextFunction)=>void = (req:Request,res:Response,next:NextFunction):void=>{
    let jsonResponse = req.body
    if(jsonResponse.userName != undefined){
        if(jsonResponse.email != undefined){
            if(checkEmail(req.body.email)){
            sendMessage[1] = "userIsValid"
            next()
        }
            else{
                sendMessage[1] = "emailIsNotValid"
                res.json(
                    {
                        message:sendMessage[1]
                    }
                )
            }
        }
        else{
            sendMessage[1] = "emailError"
            res.json(
                {
                    message:sendMessage[1]
                }
            )
        }
    }
    else{
        sendMessage[1] = "userNameErrror"
        res.json(
            {
                message:sendMessage[1]
            }
        )
    }
    
}
const addUser:(req:Request,res:Response)=>void =  async(req:Request,res:Response):Promise<void>=>{
    
    try{
        if((await User.find({"email":req.body.email})).length >= 1){
            res.json(
                {
                    message:"userAlreadyExists"
                }
                    )
        }
        else{
            try{
                await User.create(req.body)
                res.json({
                    message:"userCreated"
                })

            }
            catch{
                res.json({
                    message:"failedToCreate"
                })
            }
        }
    }
    catch{
        res.json({
            message:"someThingWentWrong"
        })
    }


}
/**
 * 
 * 
 */


addUserRoute.post("/addUser",checkUser,addUser)

export default addUserRoute