import multer from "multer";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig.js";

initializeApp(firebaseConfig);

const upload = multer({ storage: multer.memoryStorage() });

export { upload };
