// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.cloud','controller','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicCloudProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.backButton.text('Kembali').icon('ion-chevron-left');
 // $ionicConfigProvider.views.transition('android');

   $ionicCloudProvider.init({
    "core": {
      "app_id": "bb3aac59"
    },
    "push": {
      "sender_id": "271361939729",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });



  $stateProvider
  .state('slide', {
    url: '/indexSlide',
    templateUrl: 'templates/indexSlide.html',
    controller: 'slideCtrl'
  })
  .state('admin', {
    url: '/admin',
    templateUrl: 'templates/admin.html',
    controller: 'MainCtrl'
  })
  .state('applicant',{
    url: '/applicant',
    cache: false,
    templateUrl: 'templates/applicant.html',
    controller: 'appCtrl'
})
.state('login',{
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    resolve:{
      "check":function($location){  
        if(sessionStorage.getItem('loggedin_no')){ $location.path('/tab');   }
            else{  $location.path('/login');
              }
      }
    }
})
.state('register', {
  url: '/register',
  templateUrl: 'templates/register.html',
  controller: 'regCtrl'
})
.state('profile',{
  url:'/profile',
  templateUrl: 'templates/profile.html',
  controller: 'proCtrl'
})

 .state('tab', {
 url: "/tab",
 abstract: true,
 templateUrl: "templates/tabs.html"
 })

  .state('tab.dash', {
 url: '/dash',
 views: {
 'tab-dash': {
 templateUrl: 'templates/tab-dash.html',
 controller: 'DashCtrl'
 }
 }
 })

   .state('tab.data', {
 url: '/data',
 cache: false,
 views: {
 'tab-data': {
 templateUrl: 'templates/tab-data.html',
 controller: 'dataCtrl'
 }
 }
 })

 .state('tab.data-detail', {
 url: '/detail/:Id/:Nama',
 cache: false,
 views: {
 'tab-data': {
 templateUrl: 'templates/detail.html',
 controller: 'FriendDetailCtrl'
 }
 }
 })

  .state('tab.kursus', {
 url: '/kursus',
 views: {
 'tab-kursus': {
 templateUrl: 'templates/tab-kursus.html',
 controller: 'kursusCtrl'
 }
 }
 })

.state('test',{
  url: '/test',
  templateUrl: 'templates/test.html',
  controller: 'testCtrl'
})
.state('response',{
  url: '/response',
  templateUrl: 'templates/response.html',
  controller: 'resCtrl'
})
;


  $urlRouterProvider.otherwise("/indexSlide");

})


