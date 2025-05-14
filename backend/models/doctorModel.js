import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    
    speciality: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,  // ✅ optional: by default doctor is available
    },
    fees: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,  // ✅ correct way for storing date
    },
    slots_booked: {
        type: [Object],  // ✅ array of booked slots (you can customize)
        default: [],     // ✅ default empty array so no error
    }
}, { minimize: false });

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;
