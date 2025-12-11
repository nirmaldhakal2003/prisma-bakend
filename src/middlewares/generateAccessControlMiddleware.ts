import { NextFunction, Request,Response } from "express";
type Role = "SUPER_ADMIN" | "ADMIN" | "USER";   

export function generateAccessControlMiddleware(roles: Role[]) {
    return function accessControlMiddleware( req:Request, res:Response, next:NextFunction) {
        const userRole = req.user?.role; 

        if(!userRole){
            res.status(401).json({
                message : "You are not logged in!"
            });
            return;
        }
        if(!roles.includes(userRole)){
            res.status(403).json({
                message : `Forbidden! you are not allowed to access this. Expected role:${roles}, but got:${userRole}`
            });
            return;
        }   
        next();   
}
}