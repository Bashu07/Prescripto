
// Api to register User
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'


const registerUser = async(req , res)=> {
try {
    const{name , email , password} = req.body
    if(!name || !password || !email){
        return res.json({success:false , messsage:"Missing Details"})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false , messsage:'Enter the valid Email'})
    }
    if(password.length <8){
        return res.json({success:false , messsage:"Password should be at least 8 characters"})
    }


    //Hashing User Password
    const salt  = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    const userData = {
        name,
        email,
        password : hashedPassword
    }
    const newUser = new userModel(userData)
    
    const user = await newUser.save()

    const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)
    res.json({success:true , token})

} catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
}
}

//APi for user Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body ;
        const user = await userModel.findOne({email})

        

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({id:user._id }, process.env.JWT_SECRET);
             res.json({ success: true, token });
    
        }
        else{
            res.json({success:false , message:"Invalid Credentials"})
        }

       
    } catch (error) {
        console.log(error);
         res.json({ success: false, message: error.message });
    }
};

// API to get user profile data
const getProfile = async(req, res)=>{


try {
    const {userId}= req.body
    const userData = await userModel.findById(userId).select('-password')
    res.json({success:true , userData})

    
} 
catch (error) {
    console.log(error)
    res.json({success:false , message:error.message})
}
}


// API to update user Profile
const updateProfile = async(req , res)=>{
    try {
        const {userId , name , phone , address , dob , gender} = req.body
        const imageFile = req.file 
        if(!name || !phone || !address || ! dob || ! gender){
            return res.json({success:false , message:"Data Missing"})
        }  
        await userModel.findByIdAndUpdate(userId , {name , phone , address:JSON.parse(address), dob , gender})       

        if(imageFile){

            // Upload image to the cloudinary
            const imageUpload  = await cloudinary.uploader.upload(imageFile.path , {resource_type:'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId , {image: imageUrl})
        }
        res.json({success:true , message:'Profile Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    
    }
}

//API to book appointment 
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Get doctor data
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' });
        }

        // Clone the slots_booked object
        let slots_booked = { ...docData.slots_booked };

        // Check if the slot is already booked
        if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
            return res.json({ success: false, message: 'Slot not available' });
        }

        // Initialize the date array if it doesn't exist
        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = [];
        }

        // Add the new slot time to the date's array
        slots_booked[slotDate].push(slotTime);

        // Get user data
        const userData = await userModel.findById(userId).select('-password');

        // Create a copy of docData to avoid reference issues
        const docDataCopy = docData.toObject();
        delete docDataCopy.slots_booked;

        // Create appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData: docDataCopy,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        // Save the appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update doctor's slots_booked
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment Booked' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API to get user appointment for frontend from my appointment page 
const listAppointment = async (req , res)=>{
    try {
        const {userId} =req.body
        const appointments = await appointmentModel.find({userId})
        res.json({success:true , appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}
// API to cancel appointment 
const cancelAppointment = async(req, res) => {
    try {
        const {userId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // Check if appointment exists
        if (!appointmentData) {
            return res.json({success: false, message: "Appointment not found"})
        }

        // Verify appointment user
        if(appointmentData.userId != userId) {
            return res.json({success: false, message: "Unauthorized action"})
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
export  {registerUser , loginUser , getProfile , updateProfile , bookAppointment,listAppointment,cancelAppointment}