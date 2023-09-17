// Import the 'multer' library and the path module
const multer = require('multer');
const path = require('path');

// Configuration of the storage settings 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const fileName = file.fieldname + '-' + uniqueSuffix + ext;
        cb(null, fileName);
  },
});

// Function to filter uploaded files based on their extensions
const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
