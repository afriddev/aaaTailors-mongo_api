"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userStatusSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        immutable: true
    },
    status: {
        type: Number,
        default: 1,
        required: true
    },
    token: {
        type: String,
        required: true,
    }
});
const userStatusModel = mongoose_1.default.model("userStatus", userStatusSchema);
exports.default = userStatusModel;
