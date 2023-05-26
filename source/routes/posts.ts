import express from 'express';
import controller from '../controllers/posts';
import passport from 'passport';
import { getToken } from '../Security/auth';
const router = express.Router();

router
    .put('/proposta-airpress/:id',
        passport.authenticate("jwt", { session: false }),
        controller.updatePropostaAirpress)
    .put('/proposta-aircenter/:id',
        passport.authenticate("jwt", { session: false }),
        controller.updatePropostaAircenter)
    .post('/save-user',
        controller.createUser)
    .post('/login',
        passport.authenticate("local", { session: false }),
        (req: any, res: any) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
                success: true,
                token: getToken({
                    _id: req.user._id,
                    username: req.user.username,
                    nome: req.user.nome,
                    telefone1: req.user.telefone1,
                    email: req.user.email,
                    funcao: req.user.funcao,

                }),
                status: "You are successfully logged in",
            });
        })
    .get('/user/:id',
        passport.authenticate("jwt", { session: false }),
        
    )
    .get('/propostas-airpress',
        passport.authenticate("jwt", { session: false }),
        controller.getAllPropostaAirpress)
    .get('/propostas-aircenter',
        passport.authenticate("jwt", { session: false }),
        controller.getAllPropostaAircenter)
    .get('/propostas-airpress/:id',
        passport.authenticate("jwt", { session: false }),
        controller.getPropostaAirPressById)
    .get('/propostas-aircenter/:id',
        passport.authenticate("jwt", { session: false }),
        controller.getPropostaAirCenterById)
    .delete('/propostas-airpress-delete/:id',
        passport.authenticate("jwt", { session: false }),
        controller.deletePropostaAirpress)
    .delete('/propostas-aircenter-delete/:id',
        passport.authenticate("jwt", { session: false }),
        controller.deletePropostaAircenter)
    .post('/propostas-airpress-save',
        passport.authenticate("jwt", { session: false }),
        controller.addPropostaAirpress)
    .post('/propostas-aircenter-save',
        passport.authenticate("jwt", { session: false }),
        controller.addPropostaAircenter)
    .post('/test-response',
        passport.authenticate("jwt", { session: false }),
        controller.getAllPropostaForResponseTest)
// .post('/save-counter', controller.saveCounter)

export = router; 