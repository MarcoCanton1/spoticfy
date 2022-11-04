const conn = require("../db");

const getAlbumes = (_, res) => {
    conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id", (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result);
        }
    })
};

const getAlbum = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send("El id no es valido");
    }//la query hay que cambiarla para incluir el nombre del artista, dado que no aparece en la 
    //tabla del album, para eso se requiere incluir un INNER JOIN y un AS que sera utilizado para
    //que no tire error porque hay 2 campos parecidos y la api no sabe que hacer
    conn.query("SELECT albumes.id, albumes.nombre, artistas.id AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id = ?", [id], (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result[0]);
        }
    });
};

const createAlbum = (req, res) => {
    conn.query("INSERT INTO albumes (nombre, artista) VALUES (?, ?)", [req.body.nombre, req.body.artista], (error, result) =>{
        if(error){
            throw error;
        }
        else{
            res.status(200).json("Album creado con exito");
        }
    })
};

const updateAlbum = (req, res) => {
    const id = parseInt(req.params.id);
    if (typeof req.body.nombre === "string" && typeof req.body.artista === "number"){
        conn.query("UPDATE albumes SET nombre = ?, artista = ? WHERE albumes.id = ?", [req.body.nombre, req.body.artista, id], (error, result) => {
            if(error){
                throw error;
            }
            else{
                res.status(200).json("Album modificado con exito!");
            }
        })
    }
    else{
        res.json("Algun campo ingresado no es valido");
    }
};

const deleteAlbum = (req, res) => {
    const id = parseInt(req.params.id);
    conn.query("DELETE FROM albumes WHERE albumes.id = ?", [id], (error, result) => {
        if(error){
            throw error;
        }
        else{
            res.status(200).json("Album eliminado exitosamente");
        }
    })
};

const getCancionesByAlbum = (req, res) => {
    const id = parseInt(req.params.id); 
    conn.query("SELECT canciones.id, canciones.nombre, artistas.id AS nombre_artista, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON artistas.id = albumes.artista WHERE canciones.album = ?", [id], (error, result) => {
        if (error) {
            throw error;
        }
        else {
            res.json(result);
        }
    })
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};
