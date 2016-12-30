'use strict';

var express = require('express');
var controller = require('./installer_businesscontact.controller');
import * as auth from '../../auth/auth.service';


var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.index);
router.get('/:id', auth.isAuthenticated(),controller.show);
router.get('/getByInstallerId/:id',auth.isAuthenticated(),controller.getByInstallerId);
router.post('/', auth.isAuthenticated(),controller.create);
router.put('/:id', auth.isAuthenticated(),controller.update);
router.patch('/:id', auth.isAuthenticated(),controller.update);
router.delete('/:id', auth.isAuthenticated(),controller.destroy);

module.exports = router;
