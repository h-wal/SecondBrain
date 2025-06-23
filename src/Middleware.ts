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
    try{
        if(!token){
            res.json({
                message: "token not sent"
            })
            return;
        }
        if(token){
            const decoded = jwt.verify(token, "secret1234") as { id: string };;
            req.user = { id: decoded.id};
            next();
        }
    } catch {
        res.status(401).json({
            message: "Incorrect Token"
        })
        return;
    }
}   

export { authenticateUser };
export type { AuthRequest };