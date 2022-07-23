import  express  from 'express';
import { logIn ,signUp} from '../controllers/authController.js';
import { verifyToken, verifyUser } from './../middleware/VerifyToken.js';

 const router = express.Router();


router.post('/signup', signUp)
router.post('/login', logIn)
router.get('/checkOth',verifyToken,(req,res,next)=>{
    res.send('Hello user,You are login')
})
router.get("/checkOth/:id", verifyUser, (req, res, next) => {
  res.send("Hello user,You are login and you can delete account");
});

export default router;