const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.get('/', async function (req, res) {
    
    try {

        const medias = await Media.find();
        res.send(medias);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    
  });

    // POST 
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }


        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.descripcion = req.body.descripcion;
        media.url = req.body.url;
        media.foto = req.body.foto;
        media.estado = req.body.estado;
        media.fechaCreacion = new Date;
        media.fechaActualizacion = new Date;
        media.añoEstreno = req.body.añoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save(); 
        res.send(media);

    } catch(error) {media
        console.log(error);
        res.status(500).send('Ocurrió un error al crear media')
        
    }
    
  });

 // PUT 
 router.put('/:mediaId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let media = await Productora.findById(req.params.mediaId);
        if (!media) {
            return res.status(400).send('media no existe');
        }


        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.descripcion = req.body.descripcion;
        media.url = req.body.url;
        media.foto = req.body.foto;
        media.estado = req.body.estado;
        media.fechaActualizacion = new Date;
        media.añoEstreno = req.body.añoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save(); 
        res.send(media);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear media')
        
    }
    
  });


  module.exports = router;