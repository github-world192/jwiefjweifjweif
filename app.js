const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4();
    cb(null, `${uniqueFilename}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      message: '檔案上傳成功',
      filename: req.file.filename
    });
  } else {
    res.send({
      message: '檔案上傳失敗'
    });
  }
});

app.listen(port, () => {
  console.log(`伺服器正在監聽 ${port} 端口`);
});