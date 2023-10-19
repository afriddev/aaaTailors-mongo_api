/**
 * 
 * 
 * deleteing a specific index according to user model in mongoDB
 */

import Routes,{Request,Response,NextFunction} from 'express'
import User from '../../mongoDB/models/user/user_model'



/**
 * 
 * 
 * 
 */
const deleteArrayRoute = Routes()
/**
 * 
 * check email is validate not
 * 
 */

function checkEmail(email: string): boolean {
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return regexPattern.test(email)
}
/**
 * 
 * checing given params 
 * 
 */
const checkParams= (req:Request,res:Response,next:NextFunction):void=>{
    try{
        if(req.body.email != undefined){
            if(checkEmail(req.body.email)){
                if(req.body.key != undefined){
                    
                        if(req.body.position != undefined){
                            next()

                        }
                        else{
                            res.json({
                                message:"positionError"
                            })
                        }
                    
                    

                }
                else{
                    res.json({
                        message:"keyError"
                    })
                }
            }
            else{
                res.json({
                    message:"emaiLError"
                })
            }
        }
        else{
            res.json({
                message:"inputEmail"
            })
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
 * core of the file
 * 
 */
const deleteElementAtIndex= async(req:Request,res:Response):Promise<void>=>{

    try{
        if((await User.find({"email":req.body.email})).length >= 1 ){

            
            try{
                let key:string= req.body.key
            
            
          
                if(key == "bagItems"){
                    const bagItemsIndex = `bagItems.${req.body.position}`;
                    await User.updateOne({"email":req.body.email},{$unset:{[bagItemsIndex]:1}})
                    await User.updateOne({"email":req.body.email},{$pull:{bagItems:null}})
                    

                    res.json({
                        message:"deleteSuccess"
                       
                    })
                }
                else if(key == "orders"){
                    const ordersIndex = `orders.${req.body.position}`;
                    await User.updateOne({"email":req.body.email},{$unset:{[ordersIndex]:1}})
                    await User.updateOne({"email":req.body.email},{$pull:{orders:null}})
                    

                    res.json({
                        message:"deleteSuccess"
                       
                    })
                }
                else{
                    res.json({
                        message:"keyError"
                    })
                }
            }
            catch{
                res.json({
                    message:"deleteError"
                })
            }



        }
        else{
            res.json({
                "message":"userNotFound"
            })
        }

    }
    catch{
        res.json({
            message:"someThingWentWrong"
        })
    }




}

deleteArrayRoute.delete("/deleteIndex", checkParams, deleteElementAtIndex)

export default deleteArrayRoute


