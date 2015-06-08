'use strict';

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var Project = {

  getAll: function (cb) {
    var token = Auth.getToken();
    BackendAPI.userProjects(token, (res) => {
      // console.log(res);
      // res =
      // { tenants: [ {description: "test's project", enabled: true, id: "a532574a46954bf3a85dd6284ed8f5e8", name: "test"} ], tenants_links: [] }
      // project =
      // { projectId: 'project1', text: 'Project1' },
      var projects = [];
      if (res !== undefined && res.tenants !== undefined && res.tenants.length > 0){
        projects = res.tenants.map(function (project) {
          return {
            id: project.id,
            name: project.name,
            text: project.name,
            description: project.description,
          }
        });
      }
      cb(projects);
    });
  },

  getOneById: function (projectId, cb) {
    var project;
    this.getAll( (projectList) => {
        // console.log(projectId);
        // console.log(projectList);
        for (var i = projectList.length - 1; i >= 0; i--) {
          if(projectList[i].id === projectId) {
            project = projectList[i];
            break;
          }
        }
        cb(project);
      }
    );
  },

  getNameById: function (projectId, cb) {
    this.getOneById( projectId, (project) => {
        cb(project.name);
      }
    );
  }


};


module.exports = Project;

