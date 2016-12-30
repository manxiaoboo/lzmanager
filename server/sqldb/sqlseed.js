/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Stuff = sqldb.Stuff;

Stuff.sync()
    .then(() => {
        return Stuff.destroy({ where: {} });
    })
    .then(() => {
        Stuff.bulkCreate([
            {
                name: 'zb',
                desc: 'desc of zb',
                created_by: 'admin',
                active: true
            },
            {
                name: 'ga',
                desc: 'a little girl',
                created_by: 'admin'
            },

        ]);
    });

