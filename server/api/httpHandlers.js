'use strict';

export function responseMessage(res, statusCode) {
  statusCode = statusCode || 200;
  return function(message) {
    res.status(statusCode).send(message);
  };
}

export function responseJson(res, statusCode) {
  statusCode = statusCode || 200;
  return function(json) {
    res.status(statusCode).json(json);
  };
}

export function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

export function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

export function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    // return updated.saveAsync().spread(function(updated) {
      return updated.save()
        .then(function(updated) {
          return updated;
        });
  };
}

export function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

