import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const listarUsuarios = async (req, res) => {

    try {
        const listadoUsuarios = await User.find({ estado: true });
        res.status(200).json(listadoUsuarios)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de usuarios." })

    }
}
export const listarUsuariosPorNombre = async (req, res) => {

    const { busquedaNombre } = req.query;
    
    try {
        const listadoUsuarios = await User.find({ nombre: { $regex: busquedaNombre, $options: 'i' }, estado: true });
        res.status(200).json(listadoUsuarios)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de platos." })

    }
}

export const crearUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
        return res.status(400).json({ message: "Error: debe completar los campos obligatorios." })
    }

    try {
        const usuarioExistente = await User.findOne({ email })
        if (usuarioExistente) return res.status(400).json({ message: "Error: el email ingresado ya se encuentra registrado." })


        const hashPassword = await bcrypt.hash(password, 10)

        const nuevoUsuario = new User({
            nombre,
            email,
            password: hashPassword,
            rol
        })
        const usuarioRegistrado = await nuevoUsuario.save();

        res.status(200).json(usuarioRegistrado)
    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar crear el nuevo user." })

    }

}



export const modificarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, nuevaPassword, rol } = req.body;

    if (!nombre || !email || !rol) {
        return res.status(400).json({ message: "Error: debe completar los campos obligatorios." })
    }
    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ message: "Error: el id ingresado no pertenece a un user." })

        let modificacionesUser;
        /* verificar si la contraseña fue modificada */
        if (nuevaPassword) {
            let hashPassword = await bcrypt.hash(nuevaPassword, 10)
            modificacionesUser = {
                nombre, email, password: hashPassword, rol
            }
        } else {
            modificacionesUser = {
                nombre, email, password: user.password, rol
            }
        }

        const userActualizado = await User.findByIdAndUpdate(id, modificacionesUser, { new: true });
        res.status(200).json(userActualizado)


    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar modificar el nuevo user." })
    }
}


export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const userEliminado = await User.findByIdAndUpdate(id, { estado: false }, { new: true });
        if (!userEliminado) return res.status(404).json({ message: "Error: el id ingresado no pertenece a un usuario." })
        res.status(200).json(userEliminado)
    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar eliminar el usuario seleccionado." })

    }
}