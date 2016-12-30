'use strict';

var express = require('express');
var controller = require('./installer_cooperation.controller');
import * as auth from '../../auth/auth.service';


var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.index);
router.get('/:id', auth.isAuthenticated(),controller.show);
router.get('/getByInstaller/:id', auth.isAuthenticated(),controller.getByInstaller);
router.post('/', auth.isAuthenticated(),controller.create);
router.put('/:id', auth.isAuthenticated(),controller.update);
router.patch('/:id', auth.isAuthenticated(),controller.update);
router.delete('/:id', auth.isAuthenticated(),controller.destroy);

module.exports = router;
