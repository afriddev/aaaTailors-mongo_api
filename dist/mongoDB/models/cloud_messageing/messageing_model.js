"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageingSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        immutable: true,
    },
    token: {
        type: String,
        required: true,
        immutable: true,
    },
});
const messageingModel = mongoose_1.default.model("userTokens", messageingSchema);
exports.default = messageingModel;
