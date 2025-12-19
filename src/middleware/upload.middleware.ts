import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  //only pdf files allowed
  fileFilter: (_, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Maximum size 5MB
  }
});
