import Router, { Request, Response } from 'express'
import User from '../../mongoDB/models/user/user_model'



const getUserRoute = Router()
function checkEmail(email: string): boolean {
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return regexPattern.test(email)
}
getUserRoute.get("/getUser/:email", async (req: Request, res: Response) => {
    
    if (checkEmail(req.params.email)) {
        try {
            const findedUser = await User.find({ "email": req.params.email })
            if(findedUser.length >= 1){
                res.json(
                    {
                        "message": "findedUser",
                        "user": findedUser[0]
                    }
                )
            }
            else{
                res.json({
                    message:"notFound"
                })
            }
        }
        catch {
            res.json(
                {
                    "message": "someThingWentWrong"
                }
            )
        }
    }
    else{
        res.json(
            {
                "message":"emailError"
            }
        )
    }


})



export default getUserRoute