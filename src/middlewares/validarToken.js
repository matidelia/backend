import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../libs/jwt.js";

export const authRequerida = (req, res, next) => {
    // verificar la existencia de la cookie
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No se encontro el token, auth denegada" })

    jwt.verify(
        token,
        TOKEN_SECRET,
        (err, data) => {
            if (err) return res.status(403).json({ message: "El token no es válido o ya expiro." })
            // si el token es correcto asignamos su data a una propiedad dentro de la petición.
            req.usuario = data;
            next();
        }
    )
}

export const adminRequerido = async (req, res, next) => {
    if (req.usuario.rol != 'admin') return res.status(403).json({ message: "Autorización denegada, debe poseer el rol adecuado." })
    next()
}