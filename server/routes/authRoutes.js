import  express  from 'express';
import { logIn ,signUp} from '../controllers/authController.js';
import { verifyAdmin, verifyToken, verifyUser } from './../middleware/VerifyToken.js';

 const router = express.Router();

router.post('/signup', signUp)
router.post('/login', logIn)



export default router;