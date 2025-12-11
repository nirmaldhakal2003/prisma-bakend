import {Request,Response, NextFunction } from "express";

export async function checkAuth(req:Request, res:Response, next:NextFunction) {
    const userRole= req.user?.role;
    if(userRole !=="SUPER_ADMIN"){
        res.status(403).json({
            message : "Forbidden! you are not allowed to access this."
        });
        return;
    }
    next();
}
export async function checkAdmin(req:Request, res:Response, next:NextFunction) {
    const userRole= req.user?.role;
    if(userRole !=="ADMIN"){
        res.status(403).json({
            message : "Forbidden! you are not allowed to access this."
        });
        return;
    }
    next();
}

export async function checkUserRole(req:Request, res:Response, next:NextFunction) {
    const userRole= req.user?.role;
    if(userRole !=="USER"){
        res.status(403).json({
            message : "Forbidden! you are not allowed to access this."
        });
        return;
    }
    next();
}