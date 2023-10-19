"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../mongoDB/models/user_model"));
const addUserRoute = (0, express_1.default)();
let sendMessage = ["message", ""];
/**
 * custom middlewares
 *
 */
function checkEmail(email) {
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexPattern.test(email);
}
const checkUser = (req, res, next) => {
    let jsonResponse = req.body;
    if (jsonResponse.userName != undefined) {
        if (jsonResponse.email != undefined) {
            if (checkEmail(req.body.email)) {
                sendMessage[1] = "userIsValid";
                next();
            }
            else {
                sendMessage[1] = "emailIsNotValid";
                res.json({
                    message: sendMessage[1]
                });
            }
        }
        else {
            sendMessage[1] = "emailError";
            res.json({
                message: sendMessage[1]
            });
        }
    }
    else {
        sendMessage[1] = "userNameErrror";
        res.json({
            message: sendMessage[1]
        });
    }
};
const addUser = async (req, res) => {
    try {
        if ((await user_model_1.default.find({ "email": req.body.email })).length >= 1) {
            res.json({
                message: "userAlreadyExists"
            });
        }
        else {
            try {
                await user_model_1.default.create(req.body);
                res.json({
                    message: "userCreated"
                });
            }
            catch (_a) {
                res.json({
                    message: "failedToCreate"
                });
            }
        }
    }
    catch (_b) {
        res.json({
            message: "someThingWentWrong"
        });
    }
};
/**
 *
 *
 */
addUserRoute.post("/addUser", checkUser, addUser);
exports.default = addUserRoute;
