import {Router} from 'express';
//const Router = express.Router();
import { facebookAuth, googleAuth }  from "../controllers/authController.js";

const router = Router()

//router.get("/google", googleAuth);

router.route("/google").get(googleAuth);
router.route("/facebook").get(facebookAuth);


export default router;