'use strict';

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var APK = {

  uploadFiles: function (projectId, files, cb) {
    var token = Auth.getToken();
    BackendAPI.apkUpload(token, projectId, files, (res) => {
      console.log(res);
      cb(res);
      // res =
      // { tenants: [ {description: "test's project", enabled: true, id: "a532574a46954bf3a85dd6284ed8f5e8", name: "test"} ], tenants_links: [] }
      // project =
      // { projectId: 'project1', text: 'Project1' },
      // var projects = res.tenants.map(function (project) {
      //   return {
      //     id: project.id,
      //     name: project.name,
      //     text: project.name,
      //     description: project.description,
      //   }
      // })
      // cb(projects);
    });
  },

  getAll: function (cb) {
    var token = Auth.getToken();
    BackendAPI.apkList(token, (res) => {
      // console.log(res);
      // res =
      // { tenants: [ {description: "test's project", enabled: true, id: "a532574a46954bf3a85dd6284ed8f5e8", name: "test"} ], tenants_links: [] }
      // project =
      // { projectId: 'project1', text: 'Project1' },
      var apks = res.files.map(function (apk) {
        return {
          apkId: apk,
          text: apk,
          checkbox:true
        }
      })

      // { apkId: 'apk1', text: 'APK1', checkbox:true },
      cb(apks);
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


module.exports = APK;

