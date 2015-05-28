'use strict';

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var User = {



    getProjects: function (cb) {
        var token = Auth.getToken();
        BackendAPI.userProjects(token, (res) => {
            // console.log(res);
            // res =
            // { tenants: [ {description: "test's project", enabled: true, id: "a532574a46954bf3a85dd6284ed8f5e8", name: "test"} ], tenants_links: [] }
            // project =
            // { projectId: 'project1', text: 'Project1' },
            var projects = res.tenants.map(function (project) {
                return {
                    projectId: project.id,
                    name: project.name,
                    text: project.name,
                    description: project.description,
                }
            })
            cb(projects);
        });
    }

};


module.exports = User;