import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cd(null, uniqueSuffix + "-" + file.originalname);
  },
});
const storageCategory = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/category");
  },
  filename: (req, file, cd) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cd(null, uniqueSuffix + "-" + file.originalname);
  },
});
const uploadCategory = multer({ storage: storageCategory });
const upload = multer({ storage: storage });

export { upload, uploadCategory };
