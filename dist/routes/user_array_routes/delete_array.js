"use strict";
/**
 *
 *
 * deleteing a specific index according to user model in mongoDB
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../../mongoDB/models/user/user_model"));
/**
 *
 *
 *
 */
const deleteArrayRoute = (0, express_1.default)();
/**
 *
 * check email is validate not
 *
 */
function checkEmail(email) {
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexPattern.test(email);
}
/**
 *
 * checing given params
 *
 */
const checkParams = (req, res, next) => {
    try {
        if (req.body.email != undefined) {
            if (checkEmail(req.body.email)) {
                if (req.body.key != undefined) {
                    if (req.body.position != undefined) {
                        next();
                    }
                    else {
                        res.json({
                            message: "positionError"
                        });
                    }
                }
                else {
                    res.json({
                        message: "keyError"
                    });
                }
            }
            else {
                res.json({
                    message: "emaiLError"
                });
            }
        }
        else {
            res.json({
                message: "inputEmail"
            });
        }
    }
    catch (_a) {
        res.json({
            message: "someThingWentWrong"
        });
    }
};
/**
 *
 * core of the file
 *
 */
const deleteElementAtIndex = async (req, res) => {
    try {
        if ((await user_model_1.default.find({ "email": req.body.email })).length >= 1) {
            try {
                let key = req.body.key;
                if (key == "bagItems") {
                    const bagItemsIndex = `bagItems.${req.body.position}`;
                    await user_model_1.default.updateOne({ "email": req.body.email }, { $unset: { [bagItemsIndex]: 1 } });
                    await user_model_1.default.updateOne({ "email": req.body.email }, { $pull: { bagItems: null } });
                    res.json({
                        message: "deleteSuccess"
                    });
                }
                else if (key == "orders") {
                    const ordersIndex = `orders.${req.body.position}`;
                    await user_model_1.default.updateOne({ "email": req.body.email }, { $unset: { [ordersIndex]: 1 } });
                    await user_model_1.default.updateOne({ "email": req.body.email }, { $pull: { orders: null } });
                    res.json({
                        message: "deleteSuccess"
                    });
                }
                else {
                    res.json({
                        message: "keyError"
                    });
                }
            }
            catch (_a) {
                res.json({
                    message: "deleteError"
                });
            }
        }
        else {
            res.json({
                "message": "userNotFound"
            });
        }
    }
    catch (_b) {
        res.json({
            message: "someThingWentWrong"
        });
    }
};
deleteArrayRoute.delete("/deleteIndex", checkParams, deleteElementAtIndex);
exports.default = deleteArrayRoute;
