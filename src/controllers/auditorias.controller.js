import AuditoriaUser from "../models/auditoriaUser.js";
import AuditoriaPlato from "../models/auditoriaPlato.js";
import UserModel from "../models/user.model.js";
import PlatoModel from "../models/plato.model.js"


export const listarAuditoriasUsers = async (req, res) => {
    try {
        const auditoriasUsers = await AuditoriaUser.find().populate({
            path: 'idUser',
            model: UserModel
        }).
            populate({

                path: 'idAdmin',
                model: UserModel

            }).sort({ createdAt: -1 });
        res.status(200).json(auditoriasUsers)
    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder a las auditorias de usuarios." })
    }
}
export const listarAuditoriasPlatos = async (req, res) => {
    try {
        const auditoriasPlatos = await AuditoriaPlato.find().populate({
            path: 'idPlato',
            model: PlatoModel
        }).
            populate({

                path: 'idAdmin',
                model: UserModel

            }).sort({ createdAt: -1 });
        res.status(200).json(auditoriasPlatos)
    } catch (error) {
        res.status(500).json({ message: "Error: hubo un error al intentar acceder a las auditorias de usuarios." })
    }
}