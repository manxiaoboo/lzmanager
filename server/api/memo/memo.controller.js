/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samplepractitionerss              ->  index
 * POST    /api/samplepractitionerss              ->  create
 * GET     /api/samplepractitionerss/:id          ->  show
 * PUT     /api/samplepractitionerss/:id          ->  update
 * DELETE  /api/samplepractitionerss/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Memos = require('./memo.model');

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(function (updated) {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(function () {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Samplepractitionerss
exports.index = function (req, res) {
    Memos.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};


// Gets a single Samplepractitioners from the DB
exports.show = function (req, res) {
    Memos.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

exports.getByCreatedPerson = function(req, res){
    Memos.findAsync({CreatedPerson:req.params.id})
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Samplepractitioners in the DB
exports.create = function (req, res) {
    req.body.CreatedDate = new Date();
    Memos.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Samplepractitioners in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Memos.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Samplepractitioners from the DB
exports.destroy = function (req, res) {
    Memos.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};
