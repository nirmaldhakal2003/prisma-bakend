import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma/enums";
import { ENV } from "./env";

type TTokenPayLoad = {
    id : number;
    email: string;
    role : Role;
    username: string;
}

export function generateToken(userPayload: TTokenPayLoad ){
   const token =  jwt.sign( userPayload, ENV.JWT_SECRET, 
        {
            expiresIn: ENV.JWT_EXPIRATION_TIME_IN_SECONDS //15 minutes 

    })
    return token;
}


export function verifyToken(token : string)  {
    try{
        const userPyload = jwt.verify(token, ENV.JWT_SECRET) as TTokenPayLoad;
    return userPyload as TTokenPayLoad;
    }
    catch(error){
        console.log("failed to verify the token",error)
        return null;
    }
    }