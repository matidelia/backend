import mongoose from "mongoose";

const platoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    ingredientes: [String],
    alergenos: [String],
    precio: {
        type: Number,
        required: true
    },
    portada: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    subcategoria: {
        type: String,
        trim: true
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

export default mongoose.model('Plato', platoSchema)