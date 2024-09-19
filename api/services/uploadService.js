const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../data/images'));
  },
  filename: (req, file, cb) => {
    // Create a unique filename with Date.now() to avoid naming conflicts
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false);
  }
};

// 10MB limit
const limits = { fileSize: 10 * 1024 * 1024 };

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});

module.exports = upload;
