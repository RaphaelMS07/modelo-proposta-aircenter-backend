import express from 'express';
import controller from '../controllers/posts';
import passport from 'passport';
import { getToken } from '../Security/auth';
const router = express.Router();

router.post('/save-user', controller.createUser)
    .post('/login',  passport.authenticate("local", { session: false }),
    (req: any, res: any) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
            success: true,
            token: getToken({
                _id: req.body._id,
                username: req.body.username,
                email: req.body.email,
            }),
            status: "You are successfully logged in",
        });
    })

router.get('/propostas-airpress', passport.authenticate("jwt", {session: false}),controller.getAllPropostaAirpress);
router.get('/propostas-airpress/:id', controller.getPropostaAirPressById);
router.put('/propostas-airpress-update/:id', controller.updatePropostaAirpress);
router.delete('/propostas-airpress-delete/:id', controller.deletePropostaAirpress);
router.post('/propostas-airpress-save', controller.addPropostaAirpress);
router.post('/save-counter', controller.saveCounter)

export = router;