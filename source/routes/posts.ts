import express from 'express';
import controller from '../controllers/posts';
import passport from 'passport';
import { getToken } from '../Security/auth';
import { authenticate } from 'passport';
const router = express.Router();

router
    .put('/proposta-airpress/:id',
        passport.authenticate("jwt", { session: false }),
        controller.updatePropostaAirpress
    )
    .put('/proposta-aircenter/:id',
        passport.authenticate("jwt", { session: false }),
        controller.updatePropostaAircenter
    )
    .put('/nr13/:id',
        passport.authenticate("jwt", { session: false }),
        controller.updateNr13
    )
    .put('/update-user/:id',
        passport.authenticate("jwt", { session: false }),
        controller.updateUser
    )

    .post('/save-user',
        passport.authenticate("local", { session: false }),
        controller.createUser
    )
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
                    level: req.user.level

                }),
                status: "You are successfully logged in",
            });
        })
    .get('/user/:id',
        passport.authenticate("jwt", { session: false }),
        controller.getUserById
    )
    .get('/propostas-airpress',
        passport.authenticate("jwt", { session: false }),
        controller.getAllPropostaAirpress
    )
    .get('/propostas-airpress-page/:id',
        controller.getPaginatedPropostaAirpress
    )
    .get('/propostas-aircenter',
        passport.authenticate("jwt", { session: false }),
        controller.getAllPropostaAircenter
    )
    .get('/propostas-aircenter-page/:id',
        controller.getPaginatedPropostaAircenter
    )
    .get('/propostas-airpress/:id',
        passport.authenticate("jwt", { session: false }),
        controller.getPropostaAirPressById
    )
    .get('/propostas-aircenter/:id',
        passport.authenticate("jwt", { session: false }),
        controller.getPropostaAirCenterById
    )
    .get('/nr13/:id',
        passport.authenticate("jwt", { session: false }),
        controller.getNr13ById
    )
    .get('/nr13-page/:id',
        passport.authenticate("jwt", { session: false }),
        controller.getPaginatedNr13
    )
    .delete('/propostas-airpress-delete/:id',
        passport.authenticate("jwt", { session: false }),
        controller.deletePropostaAirpress
    )
    .delete('/propostas-aircenter-delete/:id',
        passport.authenticate("jwt", { session: false }),
        controller.deletePropostaAircenter
    )
    .delete('/nr13-delete/:id',
        passport.authenticate("jwt", { session: false }),
        controller.deleteNr13
    )
    .post('/propostas-airpress-save',
        passport.authenticate("jwt", { session: false }),
        controller.addPropostaAirpress
    )
    .post('/propostas-aircenter-save',
        passport.authenticate("jwt", { session: false }),
        controller.addPropostaAircenter
    )
    .post('/test-response',
        controller.getAllPropostaForResponseTest
    )
    .post('/nr13-save',
        passport.authenticate('jwt', { session: false }),
        controller.addNr13
    )
    .post('/save-counter', controller.saveCounter)

export = router; 