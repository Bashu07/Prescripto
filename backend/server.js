import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Correct import for dotenv
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()

const allowedOrigins =[' http://localhost:5173',' http://localhost:5174', 'https://prescripto-frontend-tau.vercel.app']

// Middleware 
app.use(express.json());
app.use(cors({origin:allowedOrigins , credentials:true}));

// API endpoints

app.use('/api/admin' , adminRouter)
// localport 5000/api/admin/add-doctor

app.use('/api/doctor' ,doctorRouter)
app.use('/api/user' , userRouter)

app.get('/', (req, res) => {
    res.send("API working");
});

// Listen on port
app.listen(port, () => {
    console.log("Server started at:", port);
});
