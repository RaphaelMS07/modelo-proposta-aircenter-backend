import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';
import db from './connectDb';
import cors from 'cors';


db.on("error", console.log.bind(console, "Erro de conexao"));
db.once("open", () => {
  console.log("Conexao com banco feita com sucesso");
});

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

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));