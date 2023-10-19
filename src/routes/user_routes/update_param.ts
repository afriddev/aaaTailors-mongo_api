import Router, { Request, Response } from "express";
import User from "../../mongoDB/models/user/user_model";
import { NextFunction } from "express-serve-static-core";

const updateParamRoute = Router();
const sendMessage: [string, string] = ["message", ""];

function checkEmail(email: string): boolean {
  let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regexPattern.test(email);
}
const checkParams: (req: Request, res: Response, next: NextFunction) => void = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (req.body.email != undefined) {
      if (checkEmail(req.body.email)) {
        if (req.body.key != undefined) {
          if (req.body.value != undefined) {
            sendMessage[1] = "userValid";
            next();
          } else {
            sendMessage[1] = "valueError";
            res.json({
              message: sendMessage[1],
            });
          }
        } else {
          sendMessage[1] = "keyError";
          res.json({
            message: sendMessage[1],
          });
        }
      } else {
        sendMessage[1] = "emailError";
        res.json({
          message: sendMessage[1],
        });
      }
    } else {
      sendMessage[1] = "inputEmail";
      res.json({
        message: sendMessage[1],
      });
    }
  } catch {
    res.json({
      message: "someThingWentWrong",
    });
  }
};

const update: (req: Request, res: Response) => void = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if ((await User.find({ email: req.body.email })).length >= 1) {
      try {
        let key = req.body.key;
        if (key == "userName") {
          await User.updateOne(
            { email: req.body.email },
            { $set: { userName: req.body.value } }
          );
          res.json({
            message: "updateCompleted",
          }); 
        } else if (key == "count") {
            if(req.body.position != null || req.body.position != undefined){

            const bagItemsIndex = `bagItems.${req.body.position}.count`;
            await User.updateOne(
              { email: req.body.email },
  
              {$set:{[bagItemsIndex]:req.body.value} }
            );
            res.json({
              message: "updateCompleted",
            });
            }
            else{
                res.json({
                    message:"requiredPosition"
                }
                )
            }
        } else if (key == "image") {
          await User.updateOne(
            { email: req.body.email },
            { $set: { image: req.body.value } }
          );
          res.json({
            message: "updateCompleted",
          });
        } else if (key == "gender") {
          await User.updateOne(
            { email: req.body.email },
            { $set: { gender: req.body.value } }
          );
          res.json({
            message: "updateCompleted",
          });
        } else if (key == "phoneNumber") {
          await User.updateOne(
            { email: req.body.email },
            { $set: { gender: req.body.value } }
          );
          res.json({
            message: "updateCompleted",
          });
        } else if (key == "age") {
          await User.updateOne(
            { email: req.body.email },
            { $set: { age: req.body.value } }
          );
          res.json({
            message: "updateCompleted",
          });
        } else if (key == -"email") {
          res.json({
            message: "cannotChange",
          });
        } else {
          res.json({
            message: "wrongKey",
          });
        }
      } catch {
        res.json({
          message: "updateError",
        });
      }
    } else {
      res.json({
        message: "userNotFound",
      });
    }
  } catch {
    res.json({
      message: "someThingWentWrong",
    });
  }
};

const updateParamMethods = [checkParams, update];
updateParamRoute.patch("/updateParam", updateParamMethods);
export default updateParamRoute;
