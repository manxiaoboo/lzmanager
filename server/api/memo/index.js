'use strict';

var express = require('express');
var controller = require('./memo.controller');
import * as auth from '../../auth/auth.service';


var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.index);
router.get('/:id', auth.isAuthenticated(),controller.show);
router.get('/getByCreatedPerson/:id',auth.isAuthenticated(),controller.getByCreatedPerson);
router.post('/', auth.isAuthenticated(),controller.create);
router.put('/:id', auth.isAuthenticated(),controller.update);
router.patch('/:id', auth.isAuthenticated(),controller.update);
router.delete('/:id', auth.isAuthenticated(),controller.destroy);

module.exports = router;
