import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import router from './controllers/index.controller.js';
import { sequelize } from './models/index.js';

dotenv.config({ path: '.env' });

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(helmet());
app.use(express.json());

app.use('/api', router);

sequelize.sync()
  .then(() => {
    console.log('Database connected and synced successfully.');

    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });