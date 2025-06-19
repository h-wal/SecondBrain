"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!(token === null || token === void 0 ? void 0 : token.startsWith("Bearer "))) {
        res.status(401).json({
            message: "Unauthorised"
        });
        return;
    }
    const actualToken = token.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(actualToken, "secret1234");
        req.user = { id: decoded.id };
        next();
    }
    catch (_a) {
        res.status(401).json({
            message: "Incorrect Token"
        });
        return;
    }
};
exports.authenticateUser = authenticateUser;
