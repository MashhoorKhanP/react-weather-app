import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRouter.js';

dotenv.config();

const port = process.env.PORT || 4000

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
  next()
})

app.use(express.json({ limit: '10mb' }));

app.use('/', userRoute)
app.use('/user', userRoute)
app.use((req, res) => res.status(404).json({ success: false, messsage: 'Not Found' }))


const startServer = async () => {
  try {
    const conn= await mongoose.connect(process.env.MONGO_CONNECT);
    console.log(`MongoDB connected: ${conn.connection.host}`)
    app.listen(port, () => console.log(`Server listening on port: ${port}`))
  } catch (error) {
    console.log(error);
  }
}

startServer();