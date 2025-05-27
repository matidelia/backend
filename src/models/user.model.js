import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('User', userSchema)