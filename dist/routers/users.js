"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const db_1 = require("../db");
const Middleware_1 = require("../Middleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function userExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email } = req.body;
        const userFound = yield db_1.userModel.findOne({ username });
        if (userFound) {
            console.log(userFound);
            res.status(511).json({
                message: "User already Exists",
            });
        }
        const emailFound = yield db_1.userModel.findOne({ email });
        if (emailFound) {
            res.status(511).json({
                message: "email id already exists!"
            });
            console.log("Duplicate email");
        }
        next();
    });
}
function signinAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const userFound = yield db_1.userModel.findOne({ username });
        if (!userFound) {
            res.json({
                message: "You are not signed Up!"
            });
        }
        else {
            const isMatch = yield bcrypt_1.default.compare(password, userFound.password);
            if (!isMatch) {
                res.status(419).json({
                    message: "Incorrect Password"
                });
            }
            req.user = {
                id: userFound._id.toString()
            };
            next();
        }
    });
}
userRouter.use(express_1.default.json());
userRouter.post("/signup", userExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    yield db_1.userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    res.json({
        message: "You are signed up"
    });
}));
userRouter.post("/signin", signinAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = jsonwebtoken_1.default.sign({
        id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
    }, "secret1234");
    res.send({
        message: "You are signed up",
        token: token
    });
}));
userRouter.post("/content", Middleware_1.authenticateUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { title, content, link, tags } = req.body;
    try {
        console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        const tagID = [];
        for (let name of tags) {
            const tagName = name.toLowerCase().trim();
            let tag = yield db_1.tagsModel.findOne({ title: tagName });
            if (!tag) {
                tag = yield db_1.tagsModel.create({ title: tagName, createdBy: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id });
            }
            tagID.push(tag._id);
        }
        const contentUpload = yield db_1.contentModel.create({
            title: title,
            content: content,
            tags: tagID,
            user: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id
        });
        if (contentUpload) {
            res.json({
                message: "Content added Succefull!"
            });
        }
    }
    catch (e) {
        res.json({
            message: "Error Adding Content Try Again"
        });
    }
}));
userRouter.get("/content", Middleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const contents = yield db_1.contentModel.find({ user: userID });
    res.send(contents);
}));
// userRouter.post("/tags", authenticateUser, async(
//     req: AuthRequest,
//     res:Response<MessageRes>
// )) => {
// }
exports.default = userRouter;
