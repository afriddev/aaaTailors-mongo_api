"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageing_model_1 = __importDefault(require("../../mongoDB/models/cloud_messageing/messageing_model"));
const cloudMessagingRoute = (0, express_1.default)();
function checkEmail(email) {
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexPattern.test(email);
}
const checkParams = async (req, res, next) => {
    const jsonResponse = req.body;
    if (jsonResponse.email != undefined && jsonResponse.email != null) {
        if (checkEmail(jsonResponse.email)) {
            if (jsonResponse.token != undefined && jsonResponse.token != null) {
                next();
            }
            else {
                res.json({
                    message: "inputToken"
                });
            }
        }
        else {
            res.json({
                message: "wrongEmail"
            });
        }
    }
    else {
        res.json({
            message: "inputEmail"
        });
    }
};
const addToken = async (req, res) => {
    try {
        if ((await messageing_model_1.default.find({ "email": req.body.email })).length >= 1) {
            res.json({
                message: "tokenAlreadyExists"
            });
        }
        else {
            try {
                await messageing_model_1.default.create(req.body);
                res.json({
                    message: "tokenCreated"
                });
            }
            catch (e) {
                res.json({
                    message: e
                });
            }
        }
    }
    catch (_a) {
        res.json({
            message: "someThingWentWrong"
        });
    }
};
cloudMessagingRoute.post("/addToken", checkParams, addToken);
exports.default = cloudMessagingRoute;
