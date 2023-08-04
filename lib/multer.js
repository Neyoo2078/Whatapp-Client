import multer from 'multer';

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, callback) => {
    callback(
      null,
      `upload/images-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
