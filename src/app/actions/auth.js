'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var AuthActions = Reflux.createActions({
  'login': { children: ["completed","failure"] },
  'logout': { children: ["completed","failure"] },
});

// Listeners for asynchronous Backend API calls
AuthActions.login.listen(function (login, pass) {
  BackendAPI.userLogin(login, pass, (result) => {
    // return { authenticated:false, errorMessage:'error' }
    // on error
    //    Object {readyState: 4, responseText: "{"error":{"code":400,"message":"Bad request","description":""}}", responseJSON: Object, status: 400, statusText: "Bad Request"}
    //    Object {readyState: 4, responseText: "{"error":{"code":401,"message":"Unauthorized","description":""}}", responseJSON: Object, status: 401, statusText: "Unauthorized"}
    // on success Object {X-Auth-Token: "e824cc2f6dd34c90b2e693dd8ceb8789"}
    // console.log('result');
    // console.log(result);
    if (result.hasOwnProperty('status') &&
       (result.status === 400 || result.status === 401 )){
      this.failure('It was not possible to login. Error: ' + result.statusText);
    }else if (result.hasOwnProperty('X-Auth-Token')){
      localStorage.token = result['X-Auth-Token'];
      this.completed();
    }else{
      this.failure('It was not possible to login.');
    }
  });
});

module.exports = AuthActions;
