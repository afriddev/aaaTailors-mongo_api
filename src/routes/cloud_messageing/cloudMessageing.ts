import Express,{NextFunction, Request,Response} from 'express'
import Router from 'express'
import messageingModel from '../../mongoDB/models/cloud_messageing/messageing_model'



const cloudMessagingRoute = Router()
function checkEmail(email:string):boolean{
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return regexPattern.test(email)
}

const checkParams:(req:Request,res:Response,next:NextFunction)=>void =  async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        const jsonResponse = req.body
        if(jsonResponse.email != undefined && jsonResponse.email != null ){
            if(checkEmail(jsonResponse.email)){
                if(jsonResponse.token != undefined && jsonResponse.token != null){
                    next()

                }
                else{
                    res.json({
                        message:"inputToken"
                    })
                }
            }
            else{
                res.json({
                    message:"wrongEmail"
                })
            }
        }
        else{
            res.json({
                message:"inputEmail"
            })

        }

    }
const addToken:(req:Request,res:Response)=>void =  async(req:Request,res:Response):Promise<void>=>{
        try{
            if((await messageingModel.find({"email":req.body.email})).length >= 1){
                res.json(
                    {
                        message:"tokenAlreadyExists"
                    }
                        )
            }
            else{
                try{
                    await messageingModel.create(req.body)
                    res.json({
                        message:"tokenCreated"
                    })
    
                }
                catch(e){
                    res.json({
                        message:e
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






cloudMessagingRoute.post("/addToken", checkParams, addToken)
export default cloudMessagingRoute