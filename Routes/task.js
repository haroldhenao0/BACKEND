const express = require('express')
const router = express.Router();
const { validarJWT } = require('../MiddleWares/validar-token');
const { listarTasks, crearTask, actualizarTask, eliminarTask} = require('../Controllers/task');

router.use( validarJWT )

router.get('/', listarTasks)
router.post('/',crearTask)
router.put('/:id', actualizarTask)
router.delete('/:id', eliminatTask)

module.exports = router;