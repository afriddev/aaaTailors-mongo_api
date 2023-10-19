"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 *
 *
 * mongodb user schema for user
 */
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        immutable: true
    },
    image: {
        type: String,
        required: false,
        default: ""
    },
    phoneNumber: {
        type: Number,
        required: false,
        length: 10,
        default: 1234567890
    },
    orders: {
        type: [{}],
        required: false,
        default: []
    },
    bagItems: {
        type: [{}],
        required: false,
        default: []
    },
});
/**
 *
 *
 * mongodb model for user schema
 */
const User = mongoose_1.default.model("users", userSchema);
exports.default = User;
