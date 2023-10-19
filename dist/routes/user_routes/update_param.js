"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../../mongoDB/models/user/user_model"));
const updateParamRoute = (0, express_1.default)();
const sendMessage = ["message", ""];
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
                        sendMessage[1] = "userValid";
                        next();
                    }
                    else {
                        sendMessage[1] = "valueError";
                        res.json({
                            message: sendMessage[1],
                        });
                    }
                }
                else {
                    sendMessage[1] = "keyError";
                    res.json({
                        message: sendMessage[1],
                    });
                }
            }
            else {
                sendMessage[1] = "emailError";
                res.json({
                    message: sendMessage[1],
                });
            }
        }
        else {
            sendMessage[1] = "inputEmail";
            res.json({
                message: sendMessage[1],
            });
        }
    }
    catch (_a) {
        res.json({
            message: "someThingWentWrong",
        });
    }
};
const update = async (req, res) => {
    try {
        if ((await user_model_1.default.find({ email: req.body.email })).length >= 1) {
            try {
                let key = req.body.key;
                if (key == "userName") {
                    await user_model_1.default.updateOne({ email: req.body.email }, { $set: { userName: req.body.value } });
                    res.json({
                        message: "updateCompleted",
                    });
                }
                else if (key == "count") {
                    if (req.body.position != null || req.body.position != undefined) {
                        const bagItemsIndex = `bagItems.${req.body.position}.count`;
                        await user_model_1.default.updateOne({ email: req.body.email }, { $set: { [bagItemsIndex]: req.body.value } });
                        res.json({
                            message: "updateCompleted",
                        });
                    }
                    else {
                        res.json({
                            message: "requiredPosition"
                        });
                    }
                }
                else if (key == "image") {
                    await user_model_1.default.updateOne({ email: req.body.email }, { $set: { image: req.body.value } });
                    res.json({
                        message: "updateCompleted",
                    });
                }
                else if (key == "gender") {
                    await user_model_1.default.updateOne({ email: req.body.email }, { $set: { gender: req.body.value } });
                    res.json({
                        message: "updateCompleted",
                    });
                }
                else if (key == "phoneNumber") {
                    await user_model_1.default.updateOne({ email: req.body.email }, { $set: { gender: req.body.value } });
                    res.json({
                        message: "updateCompleted",
                    });
                }
                else if (key == "age") {
                    await user_model_1.default.updateOne({ email: req.body.email }, { $set: { age: req.body.value } });
                    res.json({
                        message: "updateCompleted",
                    });
                }
                else if (key == -"email") {
                    res.json({
                        message: "cannotChange",
                    });
                }
                else {
                    res.json({
                        message: "wrongKey",
                    });
                }
            }
            catch (_a) {
                res.json({
                    message: "updateError",
                });
            }
        }
        else {
            res.json({
                message: "userNotFound",
            });
        }
    }
    catch (_b) {
        res.json({
            message: "someThingWentWrong",
        });
    }
};
const updateParamMethods = [checkParams, update];
updateParamRoute.patch("/updateParam", updateParamMethods);
exports.default = updateParamRoute;
