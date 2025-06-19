import express, { Request, Response, NextFunction } from "express"
const userRouter = express.Router();
import { userModel, contentModel, tagsModel } from "../db";
import { authenticateUser, AuthRequest } from "../Middleware";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
const saltRounds = 10;
import dotenv from "dotenv"
dotenv.config()


interface SignupReqBody {
    username: string,
    email: string,
    password: string,
}

interface MessageRes {
    message: string
}

interface TokenRes {
    message: string,
    token: string
}


async function userExists(
    req: Request<{}, {}, SignupReqBody>,
    res: Response<MessageRes>,
    next: NextFunction
){
    const {username , email} = req.body;
    const userFound = await userModel.findOne({username});
    if (userFound){
        console.log(userFound);
        res.status(511).json({
            message: "User already Exists",
        })
    }
    const emailFound = await userModel.findOne({email});
    if (emailFound){
        res.status(511).json({
            message: "email id already exists!"
        })
        console.log("Duplicate email")
    }
    next();
}

async function signinAuth(
    req: Request<{}, {}, SignupReqBody>,
    res: Response<MessageRes>, 
    next: NextFunction
){
    const { username , password } = req.body;
    const userFound = await userModel.findOne({username});
    if(!userFound){
        res.json({
            message: "You are not signed Up!"
        })
    } else {
        const isMatch =  await bcrypt.compare(password, userFound.password);
        if(!isMatch){
            res.status(419).json({
                message: "Incorrect Password"
            })
        }
        (req as AuthRequest).user = {
            id: userFound._id.toString()
        }
        next()
    }
}

userRouter.use(express.json());

userRouter.post("/signup", userExists, async (req: Request<{}, {}, SignupReqBody> ,res: Response<MessageRes>) => {
    const {username , email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    })
    res.json({
        message: "You are signed up"
    })
})

userRouter.post("/signin", signinAuth, async (req: AuthRequest ,res: Response<TokenRes>) => {
    const token = jwt.sign({
        id: req.user?.id
    }, "secret1234")
    res.send({
        message: "You are signed up",
        token: token
    })
})

userRouter.post("/content", authenticateUser, async( req: AuthRequest, res: Response, next: NextFunction) => {
    const {title, content, link, tags} = req.body;
    try{
        console.log(req.user?.id)
        const tagID = []
        for (let name of tags){
            const tagName = name.toLowerCase().trim();
            let tag = await tagsModel.findOne({title: tagName});
            if (!tag) {
                tag = await tagsModel.create({title: tagName , createdBy: req.user?.id });
            }
            tagID.push(tag._id)
        }
        const contentUpload =  await contentModel.create({
            title: title,
            content: content,
            tags: tagID,
            user: req.user?.id
        })

        if(contentUpload){
            res.json({
                message: "Content added Succefull!"
            })
        }} catch (e){
            res.json({
                message: "Error Adding Content Try Again"
            })
        }
})

userRouter.get("/content",authenticateUser, async(
    req: AuthRequest,
    res: Response,
) => {
        const userID = req.user?.id;
        const contents = await contentModel.find({user: userID});
        res.send(contents);
})

// userRouter.post("/tags", authenticateUser, async(
//     req: AuthRequest,
//     res:Response<MessageRes>
// )) => {
    
// }

export default userRouter