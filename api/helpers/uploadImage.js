const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './api/uploads')
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})
const upload =
module.exports = multer({storage: storage})
  // (req, res, next) => {
  // upload.single('avatar')
  // next()
// }
