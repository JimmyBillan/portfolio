'use strict';

var app = require('angular').module('jimPortfolio');

app.controller('accueil', require('./accueil'));
app.controller('projet', require('./projet'));
app.controller('contact', require('./contact'));
app.controller('map', require('./map'));

app.controller('navBar-header', require('./navBar-header'));
app.controller('menuFooter', require('./menuFooter'));

