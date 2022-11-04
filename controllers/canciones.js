const conn = require("../db");

const getCanciones = (_, res) => {
    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON artistas.id = albumes.artista", (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result);
        }
    })
};

const getCancion = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send("El id no es valido");
    }
    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON artistas.id = albumes.artista WHERE canciones.id = ?", [id], (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result[0]);
        }
    });
};

const createCancion = (req, res) => {
    if (typeof req.body.nombre === "string" && typeof req.body.album === "number" && typeof req.body.duracion === "number") {
        conn.query("INSERT INTO canciones (nombre, album, duracion) VALUES (?, ?, ?)", [req.body.nombre, req.body.album, req.body.duracion], (error, result) => {
            if (error) {
                throw error;
            }
            else {
                res.status(200).json("Cancion creada con exito!");
            }
        })
    }
    else{
        res.json("Algun campo ingresado no es valido");
    }

};

const updateCancion = (req, res) => {
    const id = parseInt(req.params.id);
    if (typeof req.body.nombre === "string" && typeof req.body.artista === "string" && typeof req.body.album === "number" && typeof req.body.duracion === "number"){
        conn.query("UPDATE canciones SET nombre = ?, artista = ?, album = ?, duracion = ? WHERE canciones.id = ?", [req.body.nombre, req.body.artista, req.body.album, req.body.duracion], (error, result) => {
            if(error){
                throw error;
            }
            else{
                res.status(200).json("Cancion modificada con exito!");
            }
        })
    }
    else{
        res.json("Algun campo ingresado no es valido");
    }
};

const deleteCancion = (req, res) => {
    const id = parseInt(req.params.id);
    conn.query("DELETE FROM canciones WHERE canciones.id = ?", [id], (error, result) => {
        if(error){
            throw error;
        }
        else{
            res.status(200).json("Cancion eliminada exitosamente");
        }
    })
};

const reproducirCancion = (req, res) => {
    const id = parseInt(req.params.id);
    conn.query("UPDATE canciones SET canciones.reproducciones = canciones.reproducciones + 1 WHERE canciones.id = ?", [id],(error, result) => {
        if(error){
            throw error;
        }
        else{
            res.status(200).json("Cancion reproducida con exito");
        }
    })
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};
