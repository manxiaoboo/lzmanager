/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function (app) {
  //安装商
  app.use('/api/installer', require('./api/installer'));
  app.use('/api/installer_personnelconfiguration', require('./api/installer_personnelconfiguration'));
  app.use('/api/installer_businesscontact', require('./api/installer_businesscontact'));
  app.use('/api/installer_cooperation', require('./api/installer_cooperation'));
  app.use('/api/installer_achievement', require('./api/installer_achievement'));
  app.use('/api/installer_investigate', require('./api/installer_investigate'));
  app.use('/api/installer_files', require('./api/installer_files'));

  //安装材料
  app.use('/api/material', require('./api/material'));

  //备忘录
  app.use('/api/memo', require('./api/memo'));

  
  app.use('/api/users', require('./api/user'));

  // app.use('/api/stuffs', require('./api/sqldata/stuff'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
