/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import fileupload from 'express-fileupload';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' },
);

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  methods: 'GET,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(fileupload({
  createParentPath: true,
}));
app.use(cors(corsOptions));
app.use(morgan('combined', { stream: accessLogStream }));
// app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/public', express.static('public'));

routes(app);
app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada');
});

app.listen(process.env.API_PORT, () => {
  console.log(`MINHA API running in ${process.env.API_PORT}`);
});
