import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface Message{
    message: String
}

interface AuthRequest extends Request {
    user?: {
        id: string;
    };

}

const authenticateUser = (req: AuthRequest, res: Response<Message>, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token?.startsWith("Bearer ")){
        res.status(401).json({
            message: "Unauthorised"
        })
        return;
    }
    const actualToken = token.split(" ")[1];
    try{
        const decoded = jwt.verify(actualToken, "secret1234") as {id: string}
        req.user = { id: decoded.id};
        next();
    } catch {
        res.status(401).json({
            message: "Incorrect Token"
        })
        return;
    }
}   

export { authenticateUser };
export type { AuthRequest };