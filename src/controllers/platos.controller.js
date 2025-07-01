import AuditoriaPlato from "../models/auditoriaPlato.js";
import Plato from "../models/plato.model.js"


export const listarPlatos = async (req, res) => {

    try {
        const listadoPlatos = await Plato.find({ estado: true }).sort({ createdAt: -1 });
        res.status(200).json(listadoPlatos)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de platos." })

    }
}

export const listarCategoriasPlatos = async (req, res) => {
    try {
        const listadoPlatos = await Plato.find({ estado: true }).sort({ createdAt: -1 });
        const categorias = [...new Set(listadoPlatos.map(plato => plato.categoria))];
        res.status(200).json(categorias)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de platos." })

    }
}


export const listarPlatoPorID = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const detallePlato = await Plato.findById(id);
        console.log(detallePlato);

        res.status(200).json(detallePlato)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de platos." })

    }
}


export const listarPlatosPorCategoria = async (req, res) => {
    const { categoria } = req.params;
    console.log(categoria);

    try {
        const listadoPlatos = await Plato.find({ categoria, estado: true });
        res.status(200).json(listadoPlatos)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de platos." })

    }
}

export const listarPlatosPrincipales = async (req, res) => {


    try {
        const listadoPlatos = await Plato.find({ categoria: "platos principales", estado: true });
        res.status(200).json(listadoPlatos)

    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder al listado de platos." })

    }
}

export const crearPlato = async (req, res) => {
    const { titulo, descripcion, ingredientes, alergenos, precio, categoria, subcategoria } = req.body;
    const portada = req.file?.filename || '';

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
    const { titulo, descripcion, ingredientes, alergenos, precio, categoria, subcategoria, estado } = req.body;
    let { portada } = req.body;
    const nuevaPortada = req.file?.filename || false;
    if (nuevaPortada) {
        portada = nuevaPortada;
    }
    if (!titulo || !descripcion || !ingredientes || !precio || !categoria || !portada) {
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
    const idAdmin = req.usuario.id
    try {
        const platoEliminado = await Plato.findByIdAndUpdate(id, { estado: false }, { new: true });
        if (!platoEliminado) return res.status(404).json({ message: "Error: el id ingresado no pertenece a un plato." })
        console.log('plato eliminado');

        const auditoria = new AuditoriaPlato({
            observacion: "Plato eliminado desde el panel de control",
            idPlato: id,
            idAdmin
        })
        const auditoriaRegistrada = await auditoria.save();
        console.log(auditoriaRegistrada);

        res.status(204).json(platoEliminado)
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Error: hubo un error al intentar eliminar el plato seleccionado." })

    }
}