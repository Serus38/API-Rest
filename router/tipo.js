const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

router.get('/', async function (req, res) {
    
    try {

        const tipos = await Tipo.find();
        res.send(tipos);

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


        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save(); 
        res.send(tipo);

    } catch(error) {tipo
        console.log(error);
        res.status(500).send('Ocurrió un error al crear tipo')
        
    }
    
  });

 // PUT 
 router.put('/:tipoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(400).send('Tipo no existe');
        }


        tipo.nombre = req.body.nombre;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save(); 
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear tipo')
        
    }
    
  });


  module.exports = router;