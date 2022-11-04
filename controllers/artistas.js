const conn = require("../db");

const getArtistas = (_, res) => {
    conn.query("SELECT * FROM artistas", (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result);
        }
    })
};

const getArtista = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send("El id no es valido");
    }
    conn.query("SELECT * FROM artistas WHERE artistas.id = ?", [id], (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result[0]);
        }
    });
};

const createArtista = (req, res) => {
    conn.query("INSERT INTO artistas (nombre) VALUES (?)", [req.body.nombre], (error, result) =>{
        if(error){
            throw error;
        }
        else{
            res.status(200).json("Artista creado con exito");
        }
    })
};

const updateArtista = (req, res) => {
    const id = parseInt(req.params.id);
    if (typeof req.body.nombre === "string"){
        conn.query("UPDATE artistas SET nombre = ? WHERE artistas.id = ?", [req.body.nombre, id], (error, result) => {
            if(error){
                throw error;
            }
            else{
                res.status(200).json("Artista modificado con exito!");
            }
        })
    }
    else{
        res.json("El nombre ingresado no es valido");
    }
};

const deleteArtista = (req, res) => {
    const id = parseInt(req.params.id);
    conn.query("DELETE FROM artistas WHERE artistas.id = ?", [id], (error, result) => {
        if(error){
            throw error;
        }
        else{
            res.status(200).json("Artista eliminado exitosamente :(");
        }
    })
};

const getAlbumesByArtista = (req, res) => {
    const id = parseInt(req.params.id);
    conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.artista = ?", [id], (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result);
        }
    })
};

const getCanionesByArtista = (req, res) => {
    const id = parseInt(req.params.id);
    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON artistas.id = albumes.artista WHERE albumes.artista = ?", [id], (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result);
        }
    })
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCanionesByArtista,
};
