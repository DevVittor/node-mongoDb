/*import multer from 'multer';
import sharp from 'sharp';
sharp.cache(false);
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

export default upload;*/

import multer from  'multer';

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

export default upload;