const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');


const router = Router();

router.get('/', async function (req, res) {
    
    try {

        const generos = await Genero.find();
        res.send(generos);

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


        let genero = new Generogenero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;

        genero = await genero.save(); 
        res.send(genero);

    } catch(error) {genero
        console.log(error);
        res.status(500).send('Ocurrió un error al crear genero')
        
    }
    
  });

 // PUT 
 router.put('/:generoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = await Genero.findById(req.params.generoId);
        if (!genero) {
            return res.status(400).send('Genero no existe');
        }


        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.fechaActualizacion = new Date;

        genero = await genero.save(); 
        res.send(genero);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear genero')
        
    }
    
  });


  module.exports = router;