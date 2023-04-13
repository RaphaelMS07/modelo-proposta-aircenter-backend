import express from 'express';
import controller from '../controllers/posts';
import passport from 'passport';
const router = express.Router();

router.post('/save-user', controller.createUser);
router.post('/login', controller.login)

router.get('/propostas-airpress', controller.getAllPropostaAirpress);
router.get('/propostas-airpress/:id', controller.getPropostaAirPressById);
router.put('/propostas-airpress-update/:id', controller.updatePropostaAirpress);
router.delete('/propostas-airpress-delete/:id', controller.deletePropostaAirpress);
router.post('/propostas-airpress-save', controller.addPropostaAirpress);
router.post('/save-counter', controller.saveCounter)

export = router;