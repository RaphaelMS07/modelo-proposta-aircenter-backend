import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';
import db from './connectDb';
import cors from 'cors';
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import user, { User } from './models/user';


db.on("error", console.log.bind(console, "Erro de conexao"));
db.once("open", () => {
  console.log("Conexao com banco feita com sucesso");
});

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//     },
//     async (username, password, done) => {
//       try {
//         const foundUser = await user.findOne({ username });
//         console.log("password, foundUser!.password")
//         if (!foundUser) {
//           return done(null, false, { message: `${password} ${foundUser!.password}` });
//         }
//         // const isMatch = await user.comparePassword(password);
//         if (password !== foundUser.password) {
//           return done(null, false, { message: `${password} ${foundUser!.password}` });
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );
passport.use(new LocalStrategy(user.authenticate()))
passport.serializeUser((user: any, done: any) => done(null, user.id));
passport.deserializeUser(user.deserializeUser())

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

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
      message: error.message
    });
  });
  
  router.use(passport.initialize());
  /** Server */
  const httpServer = http.createServer(router);
  const PORT: any = process.env.PORT ?? 6060;
  httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));