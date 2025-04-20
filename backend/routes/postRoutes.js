import {Router} from 'express';
import { createPost, getPost } from '../controllers/postController.js';
import {verifyJWT} from "../middleware/auth.middleware.js";


const router = Router()

router.use(verifyJWT);


router.route("/create-post").post(createPost);
router.route("/get-post").get(getPost);

export default router;


//const Router = express.Router();
//import { googleAuth }  from "../controllers/authController.js";



//router.get("/google", googleAuth);

//router.route("/google").get(googleAuth)



