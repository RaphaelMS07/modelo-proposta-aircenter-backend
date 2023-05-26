import passport from "passport";
import {JwtFromRequestFunction, Strategy as JwtStrategy} from "passport-jwt"
import { ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

export const getToken = (user : any) => {
    return jwt.sign(user, "503580d7b5508bd9b2e6997b00ad9110e2dd7fa7b8c5085bd0dec8d03d552310" as jwt.Secret, {expiresIn: 1*1*24*1})
}

export const verifyUser = (next : any) => {
    passport.authenticate('jwt', {session: false})
}