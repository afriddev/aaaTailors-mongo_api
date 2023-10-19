"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const credentials_1 = __importDefault(require("./mongoDB/credentials/credentials"));
const add_user_1 = __importDefault(require("./routes/user_routes/add_user"));
const get_user_1 = __importDefault(require("./routes/user_routes/get_user"));
const update_param_1 = __importDefault(require("./routes/user_routes/update_param"));
const push_array_1 = __importDefault(require("./routes/user_array_routes/push_array"));
const delete_array_1 = __importDefault(require("./routes/user_array_routes/delete_array"));
const helmet_1 = __importDefault(require("helmet"));
const cloudMessageing_1 = __importDefault(require("./routes/cloud_messageing/cloudMessageing"));
/**
 * if database connected then run below function
 *
 *
 */
const DBServer = (0, express_1.default)();
DBServer.use((0, helmet_1.default)());
DBServer.use(express_1.default.json());
DBServer.use(get_user_1.default);
DBServer.use(add_user_1.default);
DBServer.use(delete_array_1.default);
DBServer.use(update_param_1.default);
DBServer.use(push_array_1.default);
DBServer.use(cloudMessageing_1.default);
DBServer.get("/", (Req, res) => {
    res.json({
        message: "ameerunisaTailorsMongoDBAPI",
        sreverStatus: {
            "status": "running",
            "dbStatus": "connected",
            "version": 2.3,
        },
        // help:{
        //     routes:["getUser/:email","addUser","updateParam","pushArray","deleteIndex"],
        //     methods:["get","post","patch","put","delete"]
        // }
    });
});
DBServer.use(((err, req, res, next) => {
    if (err.status == 400) {
        res.json({
            message: "wrongInput"
        });
    }
}));
DBServer.use((req, res) => {
    res.json({
        message: "wrongUrl"
    });
});
/**
 * if DATBASE not connexted then run below function
 * gives dbStatus == notConnected
 */
const DBServerError = (0, express_1.default)();
DBServerError.use((0, helmet_1.default)());
DBServerError.use(express_1.default.json());
DBServerError.get("/", (Req, res) => {
    res.json({
        message: "ameerunisaTailorsMongoDBAPI",
        sreverStatus: {
            "status": "running",
            "dbStatus": "notConnected",
            "version": 2.3,
        }
    });
});
DBServerError.use((req, res) => {
    res.json({
        message: "wrongUrl"
    });
});
/**
 * connecting mongoDB with mongoose
 *
 *
 */
const DBConnected = () => {
    DBServer.listen(8000);
};
const DBNotConnected = () => {
    DBServerError.listen(8000);
};
mongoose_1.default.connect(credentials_1.default)
    .then(() => {
    DBConnected();
})
    .catch(() => {
    DBNotConnected();
});
