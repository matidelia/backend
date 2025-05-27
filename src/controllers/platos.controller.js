import Plato from "../models/plato.model.js"


export const listarPlatos = async (req, res) => {

    try {
        const listadoPlatos = await Plato.find({ estado: true });
        res.status(200).json(listadoPlatos)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de platos." })

    }
}


export const listarPlatosPorCategoria = async (req, res) => {
    const { categoria } = req.params;
    try {
        const listadoPlatos = await Plato.find({ categoria, estado: true});
        res.status(200).json(listadoPlatos)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de platos." })

    }
}

export const crearPlato = async (req, res) => {
    const { titulo, descripcion, ingredientes, alergenos, precio, portada, categoria, subcategoria } = req.body;

    if (!titulo || !descripcion || !ingredientes || !precio || !portada || !categoria) {
        return res.status(400).json({ message: "Error: debe completar los campos obligatorios." })
    }

    try {
        const nuevoPlato = new Plato({
            titulo,
            descripcion,
            ingredientes,
            alergenos,
            precio,
            portada,
            categoria,
            subcategoria
        })
        const platoGuardado = await nuevoPlato.save();

        res.status(200).json(platoGuardado)
    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar crear el nuevo plato." })

    }

}


export const modificarPlato = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, ingredientes, alergenos, precio, portada, categoria, subcategoria, estado } = req.body;
    if (!titulo || !descripcion || !ingredientes || !precio || !portada || !categoria || !estado) {
        return res.status(400).json({ message: "Error: debe completar los campos obligatorios." })
    }
    try {

        const plato = await Plato.findById(id)

        if (!plato) return res.status(404).json({ message: "Error: el id ingresado no pertenece a un plato." })

        const modificacionesPlato = {
            titulo,
            descripcion,
            ingredientes,
            alergenos,
            precio,
            portada,
            categoria,
            subcategoria,
            estado
        }

        const platoActualizado = await Plato.findByIdAndUpdate(id, modificacionesPlato, { new: true });
        res.status(200).json(platoActualizado)


    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar modificar el nuevo plato." })
    }
}

export const eliminarPlato = async (req, res) => {
    const { id } = req.params;
    try {
        const platoEliminado = await Plato.findByIdAndUpdate(id, {estado:false}, { new: true });
        if (!platoEliminado) return res.status(404).json({ message: "Error: el id ingresado no pertenece a un plato." })
        res.status(200).json(platoEliminado)
    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar eliminar el plato seleccionado." })

    }
}