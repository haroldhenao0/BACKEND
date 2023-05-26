const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../Controllers/auth');
const { validarCampos } = require('../MiddleWares/validar-campos');
const { validarJWT } = require('../MiddleWares/validar-token')


router.post('/', loginUsuario)

router.post('/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password',).isLength({min: 6}),
        validarCampos
    ],
    crearUsuario)


router.get('/renew', validarJWT, revalidarToken)

module.exports = router;