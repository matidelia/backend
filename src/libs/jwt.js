import jwt from "jsonwebtoken";

export const TOKEN_SECRET = 'appMenuResto';

export function crearTokenDeAcceso(data) {
    console.log(data);
    
    return new Promise((resolve, reject) => {

        jwt.sign(
            data,
            TOKEN_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            })

    })

}