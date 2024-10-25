const multer = require('multer');

module.exports = () => {
  const limits = {
    fileSize: 8000000
  };
  return multer({
    storage: multer.memoryStorage({ limits }),
    limits
  }).single('file');
};
