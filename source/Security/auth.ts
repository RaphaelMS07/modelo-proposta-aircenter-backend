import passport from "passport";
import {JwtFromRequestFunction, Strategy as JwtStrategy} from "passport-jwt"
import { ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

export const getToken = (user : any) => {
    return jwt.sign(user, process.env.JWT_SECRET as jwt.Secret, {expiresIn: 60*60*12})
}

export const verifyUser = (next : any) => {
    passport.authenticate('jwt', {session: false})
}