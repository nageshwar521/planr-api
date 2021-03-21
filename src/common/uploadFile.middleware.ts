import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, 'uploads');
  },
  filename: (req: any, file: any, cb: any) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadFile = multer({ storage: storage, fileFilter: fileFilter });
