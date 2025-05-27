import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://deliamati03:2ntXWdHSIeSItuyO@clusterproyecto.cuykjee.mongodb.net/?retryWrites=true&w=majority&appName=clusterProyecto')
        console.log('DB CONNECTED');
    } catch (error) {
        console.log(error);
    }
}