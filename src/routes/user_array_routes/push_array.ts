import Routes, { NextFunction, Request, Response } from 'express'
import User from '../../mongoDB/models/user/user_model'



const arrayAddRoute = Routes()
const sendMessage: [string, string] = ["message", ""]
/**
 * 
 * check email is validate not
 * 
 */
function checkEmail(email: string): boolean {
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return regexPattern.test(email)
}

const checkParams: (req: Request, res: Response, next: NextFunction) => void = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.email != undefined) {
            if(checkEmail(req.body.email)){
                if (req.body.key != undefined) {


                    if (req.body.value != undefined) {
                        next()
                    }
                    else {
                        res.json({
                            message: "valueError"
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
                    message:"emailError"
                })
            }


        } else {
            res.json({
                message: "inputEmail"
            })
        }


    }
    catch {
        res.json({
            message: "someThingWentWrong"
        })
    }
}
/**
 * 
 * core of the file
 * 
 */

const addToArray: (req: Request, res: Response) => void = async (req: Request, res: Response): Promise<void> => {
    
    try{
        if((await User.find({"email":req.body.email})).length >= 1 ){
            try{
                let key = req.body.key
                if(key == "bagItems"){
                    await User.updateOne({"email":req.body.email},{$push:{bagItems:req.body.value}})
                    res.json({
                        message:"pushSuccess"
                    })
                }
                else if(key == "orders"){
                    await User.updateOne({"email":req.body.email},{$push:{orders:req.body.value}})
                    res.json({
                        message:"pushSuccess"
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
                    message:"pushError"
                })
            }

        }
        else{
            res.json(

                {
                    "message":"userNotFound"
                }
            )
        }
    }
    catch{
        res.json({
            message: "someThingWentWrong"
        })

    }

}


arrayAddRoute.put("/pushArray", checkParams, addToArray)

export default arrayAddRoute