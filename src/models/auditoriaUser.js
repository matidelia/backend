import mongoose from "mongoose";


const auditoriaUserSchema = new mongoose.Schema({
    observacion: {
        type: String,
        required: true,
        trim: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    idAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('AuditoriaUser', auditoriaUserSchema)