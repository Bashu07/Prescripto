import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API for adding doctors
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Checking for all required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validating password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hashing doctor's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Preparing doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        };

        // Saving doctor to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

};

//api for the admin login 
const loginAdmin = async(req, res)=>{
    try {

        const {email , password}= req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password , process.env.JWT_SECRET)
            res.json({success:true , token})

        }
        else{
            res.json({success:false , message:"Invalid Credential"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
        
    }
}

//API to get all doctors list for admin Panel
const allDoctors = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true , doctors})
        
    } catch (error) {
       console.log(error) 
       res.json({success:false , message:error.message})
    }
}

// API to get all the appointment list 
const appointmentAdmin = async(req,res)=>{
    try {
        const appointments  = await appointmentModel.find({})
        res.json({success:true , appointments})

    } catch (error) {
        console.log(error) 
        res.json({success:false , message:error.message})
        
    }
}
// API for appointment cancellation 
const appointmentCancel = async(req, res) => {
    try {
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // Check if appointment exists
        if (!appointmentData) {
            return res.json({success: false, message: "Appointment not found"})
        }



        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        
        // Check if slots_booked[slotDate] exists before using filter
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        }
        
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        
        // Fixed: Return success message instead of error message
        res.json({success: true, message: "Appointment cancelled successfully"})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//API to get the dashboard data
const adminDashboard = async (req , res)=>{

    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments  = await appointmentModel.find({})

       

        const dashData = {
            doctors: doctors.length,
           appointments: appointments.length,
           patients: users.length,
           latestAppointments: appointments.reverse().slice(0,5)

        }
        res.json({success:true , dashData})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { addDoctor , loginAdmin,allDoctors , appointmentAdmin , appointmentCancel ,adminDashboard };
