'use strict';

var $ = jQuery;

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var User = {

    getProjects: function (argument) {
        var token = Auth.getToken();
        BackendAPI.userProjects(token, (res) => {
            console.log(res);
        });
    }

};


module.exports = User;