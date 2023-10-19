"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../../mongoDB/models/user/user_model"));
const arrayAddRoute = (0, express_1.default)();
const sendMessage = ["message", ""];
/**
 *
 * check email is validate not
 *
 */
function checkEmail(email) {
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexPattern.test(email);
}
const checkParams = (req, res, next) => {
    try {
        if (req.body.email != undefined) {
            if (checkEmail(req.body.email)) {
                if (req.body.key != undefined) {
                    if (req.body.value != undefined) {
                        next();
                    }
                    else {
                        res.json({
                            message: "valueError"
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
                    message: "emailError"
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
const addToArray = async (req, res) => {
    try {
        if ((await user_model_1.default.find({ "email": req.body.email })).length >= 1) {
            try {
                let key = req.body.key;
                if (key == "bagItems") {
                    await user_model_1.default.updateOne({ "email": req.body.email }, { $push: { bagItems: req.body.value } });
                    res.json({
                        message: "pushSuccess"
                    });
                }
                else if (key == "orders") {
                    await user_model_1.default.updateOne({ "email": req.body.email }, { $push: { orders: req.body.value } });
                    res.json({
                        message: "pushSuccess"
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
                    message: "pushError"
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
arrayAddRoute.put("/pushArray", checkParams, addToArray);
exports.default = arrayAddRoute;
