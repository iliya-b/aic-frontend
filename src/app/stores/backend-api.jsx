'use strict';

var AppConfig = require('../configs/app-config.jsx');

var BackendAPI = {

  ERROR: 0,

  apiCall: function(url, data, cb, headers, method){
    method = (typeof method === 'undefined') ? 'POST' : method;
    headers = (typeof headers === 'undefined') ? {} : headers;
    $.ajax({
      url:  url,
      data: data,
      method: method,
      contentType: 'application/json;charset=UTF-8',
      processData: false,
      dataType: 'json',
      headers: headers,
      // timeout: AppConfig.backend.timeout
    })
    .always(function(data, textStatus, errorThrown) {
      cb(data, textStatus, errorThrown);
    });
  },

  apiCallAuth: function(url, data, cb, token, method){
    this.apiCall(url, data, cb, { "X-Auth-Token": token }, method);
  },

  userLogin: function (email, pass, cb) {
    var url = AppConfig.backend.api + "/back/user/login";
    // var data = '{"auth":{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}}';
    var data = '{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}';
    this.apiCall(url, data, cb);
  },

  userRegister: function (email, pass, name, cb) {
    var url = AppConfig.backend.api + "/back/user/register";
    var data = '{"user":{"email":"'+email+'","password":"'+pass+'","name":"'+name+'"}}';
    this.apiCall(url, data, cb);
  },

  userLogout: function() {
    // TODO!!
  },

  userProjects: function (token, cb) {
    var url = AppConfig.backend.api + "/back/project";
    this.apiCallAuth(url, null, cb, token, 'GET');
  },

  apkUpload: function (token, projectId, files, cb) {
    // {"name": " ","projectId": " "}
    // var url = AppConfig.backend.api + "/back/application";
    // // var data = { name:'', projectId: projectId }
    // // var data = 'name=&projectId=' + projectId;
    // var data = '';
    // $.each(files, function(key, value){
    //   console.log(value);
    //   data = data + '&filenames[]=' + value.name;
    // });
    // this.apiCall(url, data, cb);




    // var formData, xhr;

    // formData = new FormData();
    // formData.append( 'file', files[0] );

    // xhr = new XMLHttpRequest();


    // xhr.open( 'POST', AppConfig.backend.api + "/back/application", true );
    // xhr.setRequestHeader("X-Auth-Token", token);
    // xhr.onreadystatechange = function ( response ) { cb(response) };
    // xhr.send( formData );




    // e.preventDefault();

    var formData = new FormData();
    formData.append( 'file', files[0] );

    // var formData = '';

    $.ajax({
      url: AppConfig.backend.api + "/back/application",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      headers: { "X-Auth-Token": token },
      xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
    })
    .always(function(data, textStatus, errorThrown) {
      cb(data, textStatus, errorThrown);
    });

    // $.ajax({
    //   url: AppConfig.backend.api + "/back/application",
    //   type: 'POST',
    //   data: formData,
    //   // async: false,
    //   // cache: false,
    //   // contentType: false,
    //   // processData: false,
    //   // headers: { "X-Auth-Token": token },
    //   // always: function (returndata) {
    //   //   console.log(returndata);
    //   // }
    // });
    console.log('end');
  },

  apkList: function (token, cb) {
    var url = AppConfig.backend.api + "/back/applications";
    this.apiCallAuth(url, null, cb, token, 'GET');
  },

};

function progressHandlingFunction(e){
  console.log(e);
  // if(e.lengthComputable){
  //   console.log({value:e.loaded,max:e.total});
  // }
}

module.exports = BackendAPI;