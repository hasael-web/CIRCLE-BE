import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/image"); // Menyimpan file di direktori './public/image'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Menetapkan nama file
  },
});

const uploadImage = multer({ storage: storage });

export default uploadImage;
