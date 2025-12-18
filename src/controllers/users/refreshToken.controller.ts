import { Request,Response } from "express";
import { generateToken } from "../../lib/token";
export async function refeshTokenController(req:Request,res:Response) {
const user = req.user
if(!user){
    res.status(401).json({
        message: "you are not logged in!"
    })
    return;
}

    generateToken(user)
    
}