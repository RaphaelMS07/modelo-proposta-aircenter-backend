import express from 'express';
import controller from '../controllers/posts';
import passport from 'passport';
import { getToken } from '../Security/auth';
const router = express.Router();

router
.post('/save-user', controller.createUser)
.post('/login',  passport.authenticate("local", { session: false }),
(req: any, res: any) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
        success: true,
        token: getToken({
            _id: req.user._id,
            username: req.body.username,
        }),
        status: "You are successfully logged in",
    });
})
.get('/propostas-airpress', passport.authenticate("jwt", {session: false}),controller.getAllPropostaAirpress)
.get('/propostas-airpress/:id', controller.getPropostaAirPressById)
.put('/propostas-airpress-update/:id', controller.updatePropostaAirpress)
.delete('/propostas-airpress-delete/:id', controller.deletePropostaAirpress)
.post('/propostas-airpress-save', controller.addPropostaAirpress)
.post('/save-counter', controller.saveCounter)

export = router;