var express = require('express');
var router = express.Router();
var UserModel = require('../public/javascripts/db');
var db2 = require('../public/javascripts/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Consultor' });
});

/* GET login admin */
router.get('/admin', function(req, res, next) {
	res.render('admin', { title: 'Sesion de administrador' });
});

/* GET login user */
router.get('/user', function(req, res, next) {
	res.render('user', { title: 'Sesion de usuario' });
});

router.get('/config', function(req, res, next) {
	res.json(200,{"Server_url":"localhost", "puerto":"3005", "BD":"Consultor", "contraseña BD":"portgas"});
});

/* GET crear cuenta */
router.get('/create_account', function(req, res, next) {
	res.render('create_account', { title: 'Crear cuenta'});
});

/* GET crear cuenta realizado*/
router.get('/account_done', function(req, res, next) {
	res.send( { title: 'Usuario creado con éxito' });
});

module.exports = router;
