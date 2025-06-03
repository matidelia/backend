import mongoose from "mongoose";


const auditoriaPlatoSchema = new mongoose.Schema({
    observacion: {
        type: String,
        required: true,
        trim: true
    },
    idPlato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plato",
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

export default mongoose.model('AuditoriaPlato', auditoriaPlatoSchema)