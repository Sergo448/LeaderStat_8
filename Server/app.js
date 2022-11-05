const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const { NODE_ENV, DB_PATH, PORT = 3005 } = process.env;
const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 200 * 1024 * 1024 * 1024, //200MB max file(s) size
    },
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// выгрузка сметы и справочников
app.post('/upload', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'Файл отсутствует!',
      });
    } else {
      let data = [];

      //loop all files
      if (req.files.docs.length > 1) {
        _.forEach(_.keysIn(req.files.docs), (key) => {
          let doc = req.files.docs[key];

          //move doc to upload directory
          doc.mv('../public/uploads/' + doc.name);

          //push file details
          data.push({
            name: doc.name,
            mimetype: doc.mimetype,
            size: doc.size,
          });
        });

        //return response
        res.send({
          status: true,
          message: 'Выгрузка завершена успешно',
          data: data,
        });
      } else if ((req.files.docs.length = 1)) {
        let docs = req.files.docs;

        docs.mv('../public/uploads/' + docs.name);

        //send response
        res.send({
          status: true,
          message: 'Файл выгружен',
          data: {
            name: docs.name,
            mimetype: docs.mimetype,
            size: docs.size,
          },
        });
      }
    }
  }
    catch (err) {
    res.status(500).send(err);
  }
});

//make uploads directory static
app.use(express.static('uploads'));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));
