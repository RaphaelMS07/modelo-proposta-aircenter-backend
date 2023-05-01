import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';
import db from './connectDb';
import cors from 'cors';
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import user, { User } from './models/user';
import { ExtractJwt, Strategy as JWTStrategy, StrategyOptions } from 'passport-jwt';
import dotenv from 'dotenv'
dotenv.config()

db.on("error", console.log.bind(console, "Erro de conexao"));
db.once("open", () => {
  console.log("Conexao com banco feita com sucesso"); 
});


passport.use(new LocalStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser() as any);
passport.deserializeUser(user.deserializeUser())

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "503580d7b5508bd9b2e6997b00ad9110e2dd7fa7b8c5085bd0dec8d03d552310"
};
passport.use(new JWTStrategy(opts as StrategyOptions, function (jwt_payload, done) {
  user.findOne({ _id: jwt_payload._id }

    //  (err: Error, user: User) => {
    //   if(err){
    //       return done(err, false);
    //   }else if (user) {
    //       return done(null, user);
    //   }else{
    //       return done(null, false);
    //   } 
  ).then((user: any) => { 

      return done(null, user);
  
   
  })
}))
const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());
// router.use(cors)
router.use(cors())

router.use('/', routes);

router.use(passport.initialize())

/** Error handling */
router.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

// router.use(passport.initialize());
/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));