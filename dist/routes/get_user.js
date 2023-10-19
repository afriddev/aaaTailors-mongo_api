"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../mongoDB/models/user_model"));
const getUserRoute = (0, express_1.default)();
function checkEmail(email) {
    let regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexPattern.test(email);
}
getUserRoute.get("/getUser/:email", async (req, res) => {
    if (checkEmail(req.params.email)) {
        try {
            const findedUser = await user_model_1.default.find({ "email": req.params.email });
            if (findedUser.length >= 1) {
                res.json({
                    "message": "findedUser",
                    "user": findedUser[0]
                });
            }
            else {
                res.json({
                    message: "notFound"
                });
            }
        }
        catch (_a) {
            res.json({
                "message": "someThingWentWrong"
            });
        }
    }
    else {
        res.json({
            "message": "emailError"
        });
    }
});
exports.default = getUserRoute;
