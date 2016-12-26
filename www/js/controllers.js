angular.module('controller',['ionic.cloud'])

.controller('loginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory,$ionicLoading,$ionicPush,$location) {
		$scope.user = {};  //declares the object user

		$scope.show = function() {
   		 $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
   		 });
 		 };

     $scope.bmax = function() {
    $state.go('slide');
  };

  $scope.hide = function(){
        $ionicLoading.hide();
 		 };
		
		$scope.login = function() {
			$scope.show($ionicLoading);
			var str="http://bmax.000webhostapp.com/login.php?e="+$scope.user.no+"&p="+$scope.user.password;
			$http.get(str)
			.success(function (response){   // if login request is Accepted
				
				
				// records is the 'server response array' variable name.
				$scope.user_details = response.records;  // copy response values to user-details object.
				
				//stores the data in the session. if the user is logged in, then there is no need to show login again.
				
				sessionStorage.setItem('loggedin_role', $scope.user_details.role);
			
				
				// remove the instance of login page, when user moves to profile page.
				// if you dont use it, you can get to login page, even if you are already logged in .
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				
				//in my FoodKart App, it checks the page from where the user logs in.
				//if it is from the check out, then after login, the check out page will be shown.
				//else normal profile page will be shown

				var myPopup = $ionicPopup.show({
    template: 'You have successfully login',
    buttons: [
      {
        text: '<b>ok</b>',
        type: 'button-positive',
        onTap: function(e) {
         $state.go('tab.dash', {}, {location: "replace", reload: true});
        }
      }
    ]
  });
				
		//		$state.go('profile', {}, {location: "replace", reload: true});
				
				
				
			}).error(function() {   						//if login failed
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
			}).finally(function($ionicLoading) { 
      // On both cases hide the loading
      $scope.hide($ionicLoading);  
    			});
		};
		
})


.controller('slideCtrl', function($scope, $state, $ionicSlideBoxDelegate,$location,$ionicHistory,$window) {
 
  // Called to navigate to the main app
  sessionStorage.clear('loggedin_role');

  console.log(sessionStorage.getItem('loggedin_role'));

  $scope.show = function() {
       $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
       });
     };

  $scope.hide = function(){
        $ionicLoading.hide();
     };

  $scope.keTest = function(){
    $state.go('test');
  }

  $scope.loginAdmin = function(){
  	$state.go('login');
  }

  $scope.mula = function(){
  	$state.go('applicant');
  }

  $scope.startApp = function() {
    $state.go('applicant');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('MainCtrl', function($location,$scope, $state, $ionicSlideBoxDelegate,$location) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $location.path('/applicant')
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('regCtrl', function($location,$scope, $state) {

	})

.controller('appCtrl', function($location,$scope, $state, $http,$ionicHistory, $ionicPopup,$ionicLoading,$ionicSlideBoxDelegate) {

  console.log(sessionStorage.getItem('loggedin_role') == R0leb4U);

$scope.array = []; 

/*var tarikKursus = 'http://localhost/bmax/getKursus.php';

    $http.get(tarikKursus)
    .then(function (res2){

      $scope.response2 = res2.result;
      document.getElementById("haha").innerHTML=$scope.response2;

    })      */

    var xhr = $http({
      method: 'post',
      url: 'http://bmax.000webhostapp.com/getKursus.php'
    });
    xhr.success(function(data){
     $scope.data = data.result;
    });

    $scope.bmax = function() {
    $state.go('slide');
  };


  $scope.appButang2 = function(data){
    $scope.array.unshift(data);
    //clear quote
    this.data = null;
  };

  $scope.show = function() {
       $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
       });
     };

  $scope.hide = function(){
        $ionicLoading.hide();
     };

  $scope.seterusnya = function(){
      $ionicSlideBoxDelegate.next();
  }

  $scope.sebelumnya = function(){
    $ionicSlideBoxDelegate.previous();
  }

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };


  $scope.appButang=function(data){

    $scope.show($ionicLoading);
      
      var link = 'http://bmax.000webhostapp.com/saveForm.php?';
      $http.get(link+"name="+data.name+"&no="+data.no+"&select="+data.select+"&q1="+data.choiceq1+"&q2="+data.choiceq2+"&q3="+data.choiceq3+"&q4="+data.choiceq4+"&q5="+data.choiceq5+"&q6="+data.choiceq6+"&q7="+data.choiceq7+"&q8="+data.choiceq8+"&q9="+data.choiceq9+"&q10="+data.choiceq10+"&q11="+data.choiceq11+"&q12="+data.choiceq12+"&qc="+data.qcadangan)
      .success(function (res){

        $scope.response = res.result;
            
            //no back option
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
            // the user is redirected to login page after sign up


            


     }).finally(function($ionicLoading) { 
      // On both cases hide the loading
      var myPopup = $ionicPopup.show({
    title: 'Penilaian berjaya',
    cssClass: 'hey',
    template: '<center><img src="img/ani.gif"/></center><center>Penilaian anda telah berjaya dihantar</center>',
    buttons: [
      {
        text: '<b>Menilai lagi</b>',
        type: 'button-positive',
        onTap: function(e) {
         $state.go('applicant', {}, {location: "replace", reload: true});
        }
      },
      {
        text:'<b>Keluar Aplikasi</b>',
        type: 'button-positive',
        onTap: function(e) {
         ionic.Platform.exitApp();
        }
      }
    ]
  });
      $scope.hide($ionicLoading);  
          });
      

    }
  
	})

.controller('proCtrl', function($location,$scope,$state){


})

.controller('DashCtrl', function($location,$scope,$state,$ionicPush,$http,$cordovaToast,$ionicPopup){

  if(sessionStorage.getItem('loggedin_role') == R0leb4U){

  var xhr = $http({
      method: 'post',
      url: 'http://bmax.000webhostapp.com/getUsers.php'
    });
    xhr.success(function(data){
     $scope.data = data.result.length;


    });


    var xhr2 = $http({
      method: 'post',
      url: 'http://bmax.000webhostapp.com/getForm.php'
    });
    xhr2.success(function(data){
     $scope.data2 = data.result.length;


    });

    var xhr3 = $http({
      method: 'post',
      url: 'http://bmax.000webhostapp.com/getKursus.php'
    });
    xhr3.success(function(data){
     $scope.data3 = data.result.length;


    });



  $scope.$on('cloud:push:notification', function(event, data) {
  var msg = data.message;
  alert(msg.title + ': ' + msg.text);
});




  $scope.patahBalik = function(){
    $state.go('slide');

    $ionicPush.register().then(function(t) {
  return $ionicPush.saveToken(t);
}).then(function(t) {
  console.log('Token saved:', t.token);
});


  };

}

else {
      $state.go('login');
      var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized Access',
            template: '<center>Please Login first</center>',
            buttons: [
      {
        text: '<b>ok</b>',
        type: 'button-positive',
        onTap: function(e) {
         
        }
      }
    ]
          });
}

})

.controller('dataCtrl', function($location,$scope,$state,$http,$ionicHistory,$ionicPopup){

if(sessionStorage.getItem('loggedin_role') == R0leb4U){
  var xhr = $http({
      method: 'post',
      url: 'http://bmax.000webhostapp.com/getList.php'
    });
    xhr.success(function(data){

      
     $scope.data = data.result;

     if(data.result.length == 0){
        $ionicHistory.nextViewOptions({
        disableAnimate: true
        });

        $state.go('tab.data-background');
      }
    });


 //    $scope.$apply();
  //   Object.values(data.result).length;
      

  /*  var xhr2 = $http({
      method: 'post',
      url: 'http://192.168.0.105/bmax/getPeserta.php'
    });
    xhr2.success(function(data){
          $scope.data2 = data.result.length;
      });
                                            */

    $scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.data.splice($scope.data.indexOf(item), 1);

    var link = 'http://bmax.000webhostapp.com/delete.php?';
    $http.get(link+'id='+item.id)
      .then(function (res){

      });

  };

  $scope.patahBalik = function(){
    $state.go('slide');
  };
}

else{
    $state.go('login');
      var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized Access',
            template: '<center>Please Login first</center>',
            buttons: [
      {
        text: '<b>ok</b>',
        type: 'button-positive',
        onTap: function(e) {
         
        }
      }
    ]
          });
}

})

.controller('FriendDetailCtrl', function($location,$scope,$state,$stateParams,$http,$cordovaToast,$ionicPopup){

  if(sessionStorage.getItem('loggedin_role') == R0leb4U){

 $scope.met = $stateParams.Nama;
 $scope.result11 = ' -';
 $scope.result12 = ' -';
 $scope.result13 = ' -';
 $scope.result14 = ' -';
 $scope.result21 = ' -';
 $scope.result22 = ' -';
 $scope.result23 = ' -';
 $scope.result24 = ' -';
 $scope.result31 = ' -';
 $scope.result32 = ' -';
 $scope.result33 = ' -';
 $scope.result34 = ' -';
 $scope.result41 = ' -';
 $scope.result42 = ' -';
 $scope.result43 = ' -';
 $scope.result44 = ' -';
 $scope.result51 = ' -';
 $scope.result52 = ' -';
 $scope.result53 = ' -';
 $scope.result54 = ' -';
 $scope.result61 = ' -';
 $scope.result62 = ' -';
 $scope.result63 = ' -';
 $scope.result64 = ' -';
 $scope.result71 = ' -';
 $scope.result72 = ' -';
 $scope.result73 = ' -';
 $scope.result74 = ' -';
 $scope.result81 = ' -';
 $scope.result82 = ' -';
 $scope.result83 = ' -';
 $scope.result84 = ' -';
 $scope.result91 = ' -';
 $scope.result92 = ' -';
 $scope.result93 = ' -';
 $scope.result94 = ' -';
 $scope.result101 = ' -';
 $scope.result102 = ' -';
 $scope.result103 = ' -';
 $scope.result104 = ' -';
 $scope.result111 = ' -';
 $scope.result112 = ' -';
 $scope.result113 = ' -';
 $scope.result114 = ' -';
 $scope.result121 = ' -';
 $scope.result122 = ' -';
 $scope.result123 = ' -';
 $scope.result124 = ' -';


 var xhr11 = $http({
      method: 'get',
      url: 'http://bmax.000webhostapp.com/getDetails.php?id='+$stateParams.Id
    });
    xhr11.success(function(data){
      $scope.data = data.result12;



  //    $scope.$apply();

   //   console.log(data.result12);



   var sum11 = 0;
   var sum12 = 0;
   var sum13 = 0;
   var sum14 = 0;
   var sum21 = 0;
   var sum22 = 0;
   var sum23 = 0;
   var sum24 = 0;
   var sum31 = 0;
   var sum32 = 0;
   var sum33 = 0;
   var sum34 = 0;
   var sum41 = 0;
   var sum42 = 0;
   var sum43 = 0;
   var sum44 = 0;
   var sum51 = 0;
   var sum52 = 0;
   var sum53 = 0;
   var sum54 = 0;
   var sum61 = 0;
   var sum62 = 0;
   var sum63 = 0;
   var sum64 = 0;
   var sum71 = 0;
   var sum72 = 0;
   var sum73 = 0;
   var sum74 = 0;
   var sum81 = 0;
   var sum82 = 0;
   var sum83 = 0;
   var sum84 = 0;
   var sum91 = 0;
   var sum92 = 0;
   var sum93 = 0;
   var sum94 = 0;
   var sum101 = 0;
   var sum102 = 0;
   var sum103 = 0;
   var sum104 = 0;
   var sum111 = 0;
   var sum112 = 0;
   var sum113 = 0;
   var sum114 = 0;
   var sum121 = 0;
   var sum122 = 0;
   var sum123 = 0;
   var sum124 = 0;


   for(i=0; i<data.result12.length; i++){
   
    if(data.result12[i].q1 == '1'){
       
       sum11 = sum11 + 1;
       $scope.result11 = sum11;

    }

    if(data.result12[i].q1 == '2'){
       
       sum12 = sum12 + 1;
       $scope.result12 = sum12;

    }

    if(data.result12[i].q1 == '3'){
       
       sum13 = sum13 + 1;
       $scope.result13 = sum13;

    }

    if(data.result12[i].q1 == '4'){
       
       sum14 = sum14 + 1;
       $scope.result14 = sum14;

    }

    if(data.result12[i].q2 == '1'){
       
       sum21 = sum21 + 1;
       $scope.result21 = sum21;

    }

    if(data.result12[i].q2 == '2'){
       
       sum22 = sum22 + 1;
       $scope.result22 = sum22;

    }

    if(data.result12[i].q2 == '3'){
       
       sum23 = sum23 + 1;
       $scope.result23 = sum23;

    }

    if(data.result12[i].q2 == '4'){
       
       sum24 = sum24 + 1;
       $scope.result24 = sum24;

    }

    if(data.result12[i].q3 == '1'){
       
       sum31 = sum31 + 1;
       $scope.result31 = sum31;

    }

    if(data.result12[i].q3 == '2'){
       
       sum32 = sum32 + 1;
       $scope.result32 = sum32;

    }

    if(data.result12[i].q3 == '3'){
       
       sum33 = sum33 + 1;
       $scope.result33 = sum33;

    }

    if(data.result12[i].q3 == '4'){
       
       sum34 = sum34 + 1;
       $scope.result34 = sum34;

    }

    if(data.result12[i].q4 == '1'){
       
       sum41 = sum41 + 1;
       $scope.result41 = sum41;

    }

    if(data.result12[i].q4 == '2'){
       
       sum42 = sum42 + 1;
       $scope.result42 = sum42;

    }

    if(data.result12[i].q4 == '3'){
       
       sum43 = sum43 + 1;
       $scope.result43 = sum43;

    }

    if(data.result12[i].q4 == '4'){
       
       sum44 = sum44 + 1;
       $scope.result44 = sum44;

    }

    if(data.result12[i].q5 == '1'){
       
       sum51 = sum51 + 1;
       $scope.result51 = sum51;

    }

    if(data.result12[i].q5 == '2'){
       
       sum52 = sum52 + 1;
       $scope.result52 = sum52;

    }

    if(data.result12[i].q5 == '3'){
       
       sum53 = sum53 + 1;
       $scope.result53 = sum53;

    }

    if(data.result12[i].q5 == '4'){
       
       sum54 = sum54 + 1;
       $scope.result54 = sum54;

    }

    if(data.result12[i].q6 == '1'){
       
       sum61 = sum61 + 1;
       $scope.result61 = sum61;

    }

    if(data.result12[i].q6 == '2'){
       
       sum62 = sum62 + 1;
       $scope.result62 = sum62;

    }

    if(data.result12[i].q6 == '3'){
       
       sum63 = sum63 + 1;
       $scope.result63 = sum63;

    }

    if(data.result12[i].q6 == '4'){
       
       sum64 = sum64 + 1;
       $scope.result64 = sum64;

    }

    if(data.result12[i].q7 == '1'){
       
       sum71 = sum71 + 1;
       $scope.result71 = sum71;

    }


    if(data.result12[i].q7 == '2'){
       
       sum72 = sum72 + 1;
       $scope.result72 = sum72;

    }

    if(data.result12[i].q7 == '3'){
       
       sum73 = sum73 + 1;
       $scope.result73 = sum73;

    }

    if(data.result12[i].q7 == '4'){
       
       sum74 = sum74 + 1;
       $scope.result74 = sum74;

    }

    if(data.result12[i].q8 == '1'){
       
       sum81 = sum81 + 1;
       $scope.result81 = sum81;

    }

    if(data.result12[i].q8 == '2'){
       
       sum82 = sum82 + 1;
       $scope.result82 = sum82;

    }

    if(data.result12[i].q8 == '3'){
       
       sum83 = sum83 + 1;
       $scope.result83 = sum83;

    }


    if(data.result12[i].q8 == '4'){
       
       sum84 = sum84 + 1;
       $scope.result84 = sum84;

    }

    if(data.result12[i].q9 == '1'){
       
       sum91 = sum91 + 1;
       $scope.result91 = sum91;

    }

    if(data.result12[i].q9 == '2'){
       
       sum92 = sum92 + 1;
       $scope.result92 = sum92;

    }

    if(data.result12[i].q9 == '3'){
       
       sum93 = sum93 + 1;
       $scope.result93 = sum93;

    }

    if(data.result12[i].q9 == '4'){
       
       sum94 = sum94 + 1;
       $scope.result94 = sum94;

    }

    if(data.result12[i].q10 == '1'){
       
       sum101 = sum101 + 1;
       $scope.result101 = sum101;

    }

    if(data.result12[i].q10 == '2'){
       
       sum102 = sum102 + 1;
       $scope.result102 = sum102;

    }

    if(data.result12[i].q10 == '3'){
       
       sum103 = sum103 + 1;
       $scope.result103 = sum103;

    }

    if(data.result12[i].q10 == '4'){
       
       sum104 = sum104 + 1;
       $scope.result104 = sum104;

    }

    if(data.result12[i].q11 == '1'){
       
       sum111 = sum111 + 1;
       $scope.result111 = sum111;

    }

    if(data.result12[i].q11 == '2'){
       
       sum112 = sum112 + 1;
       $scope.result112 = sum112;

    }

    if(data.result12[i].q11 == '3'){
       
       sum113 = sum113 + 1;
       $scope.result113 = sum113;

    }

    if(data.result12[i].q11 == '4'){
       
       sum114 = sum114 + 1;
       $scope.result114 = sum114;

    }

    if(data.result12[i].q12 == '1'){
       
       sum121 = sum121 + 1;
       $scope.result121 = sum121;

    }

    if(data.result12[i].q12 == '2'){
       
       sum122 = sum122 + 1;
       $scope.result122 = sum122;

    }

    if(data.result12[i].q12 == '3'){
       
       sum123 = sum123 + 1;
       $scope.result123 = sum123;

    }

    if(data.result12[i].q12 == '4'){
       
       sum124 = sum124 + 1;
       $scope.result124 = sum124;

    }

 //   console.log(Object.values(data.result12[0].q2) == '3');

  }

     //$scope.result11 = Object.keys(data.records11[i]).length;
   
  //   console.log(Object.keys(data.records.id).length);
   
      
    
    });


$scope.doRefresh = function() {
    var xhr11 = $http({
      method: 'get',
      url: 'http://bmax.000webhostapp.com/getDetails.php?id='+$stateParams.Id
    });
    xhr11.success(function(data){
      $scope.data = data.result12;

   //   console.log(data.result12);



   var sum11 = 0;
   var sum12 = 0;
   var sum13 = 0;
   var sum14 = 0;
   var sum21 = 0;
   var sum22 = 0;
   var sum23 = 0;
   var sum24 = 0;
   var sum31 = 0;
   var sum32 = 0;
   var sum33 = 0;
   var sum34 = 0;
   var sum41 = 0;
   var sum42 = 0;
   var sum43 = 0;
   var sum44 = 0;
   var sum51 = 0;
   var sum52 = 0;
   var sum53 = 0;
   var sum54 = 0;
   var sum61 = 0;
   var sum62 = 0;
   var sum63 = 0;
   var sum64 = 0;
   var sum71 = 0;
   var sum72 = 0;
   var sum73 = 0;
   var sum74 = 0;
   var sum81 = 0;
   var sum82 = 0;
   var sum83 = 0;
   var sum84 = 0;
   var sum91 = 0;
   var sum92 = 0;
   var sum93 = 0;
   var sum94 = 0;
   var sum101 = 0;
   var sum102 = 0;
   var sum103 = 0;
   var sum104 = 0;
   var sum111 = 0;
   var sum112 = 0;
   var sum113 = 0;
   var sum114 = 0;
   var sum121 = 0;
   var sum122 = 0;
   var sum123 = 0;
   var sum124 = 0;


   for(i=0; i<data.result12.length; i++){
   
    if(data.result12[i].q1 == '1'){
       
       sum11 = sum11 + 1;
       $scope.result11 = sum11;

    }

    if(data.result12[i].q1 == '2'){
       
       sum12 = sum12 + 1;
       $scope.result12 = sum12;

    }

    if(data.result12[i].q1 == '3'){
       
       sum13 = sum13 + 1;
       $scope.result13 = sum13;

    }

    if(data.result12[i].q1 == '4'){
       
       sum14 = sum14 + 1;
       $scope.result14 = sum14;

    }

    if(data.result12[i].q2 == '1'){
       
       sum21 = sum21 + 1;
       $scope.result21 = sum21;

    }

    if(data.result12[i].q2 == '2'){
       
       sum22 = sum22 + 1;
       $scope.result22 = sum22;

    }

    if(data.result12[i].q2 == '3'){
       
       sum23 = sum23 + 1;
       $scope.result23 = sum23;

    }

    if(data.result12[i].q2 == '4'){
       
       sum24 = sum24 + 1;
       $scope.result24 = sum24;

    }

    if(data.result12[i].q3 == '1'){
       
       sum31 = sum31 + 1;
       $scope.result31 = sum31;

    }

    if(data.result12[i].q3 == '2'){
       
       sum32 = sum32 + 1;
       $scope.result32 = sum32;

    }

    if(data.result12[i].q3 == '3'){
       
       sum33 = sum33 + 1;
       $scope.result33 = sum33;

    }

    if(data.result12[i].q3 == '4'){
       
       sum34 = sum34 + 1;
       $scope.result34 = sum34;

    }

    if(data.result12[i].q4 == '1'){
       
       sum41 = sum41 + 1;
       $scope.result41 = sum41;

    }

    if(data.result12[i].q4 == '2'){
       
       sum42 = sum42 + 1;
       $scope.result42 = sum42;

    }

    if(data.result12[i].q4 == '3'){
       
       sum43 = sum43 + 1;
       $scope.result43 = sum43;

    }

    if(data.result12[i].q4 == '4'){
       
       sum44 = sum44 + 1;
       $scope.result44 = sum44;

    }

    if(data.result12[i].q5 == '1'){
       
       sum51 = sum51 + 1;
       $scope.result51 = sum51;

    }

    if(data.result12[i].q5 == '2'){
       
       sum52 = sum52 + 1;
       $scope.result52 = sum52;

    }

    if(data.result12[i].q5 == '3'){
       
       sum53 = sum53 + 1;
       $scope.result53 = sum53;

    }

    if(data.result12[i].q5 == '4'){
       
       sum54 = sum54 + 1;
       $scope.result54 = sum54;

    }

    if(data.result12[i].q6 == '1'){
       
       sum61 = sum61 + 1;
       $scope.result61 = sum61;

    }

    if(data.result12[i].q6 == '2'){
       
       sum62 = sum62 + 1;
       $scope.result62 = sum62;

    }

    if(data.result12[i].q6 == '3'){
       
       sum63 = sum63 + 1;
       $scope.result63 = sum63;

    }

    if(data.result12[i].q6 == '4'){
       
       sum64 = sum64 + 1;
       $scope.result64 = sum64;

    }

    if(data.result12[i].q7 == '1'){
       
       sum71 = sum71 + 1;
       $scope.result71 = sum71;

    }


    if(data.result12[i].q7 == '2'){
       
       sum72 = sum72 + 1;
       $scope.result72 = sum72;

    }

    if(data.result12[i].q7 == '3'){
       
       sum73 = sum73 + 1;
       $scope.result73 = sum73;

    }

    if(data.result12[i].q7 == '4'){
       
       sum74 = sum74 + 1;
       $scope.result74 = sum74;

    }

    if(data.result12[i].q8 == '1'){
       
       sum81 = sum81 + 1;
       $scope.result81 = sum81;

    }

    if(data.result12[i].q8 == '2'){
       
       sum82 = sum82 + 1;
       $scope.result82 = sum82;

    }

    if(data.result12[i].q8 == '3'){
       
       sum83 = sum83 + 1;
       $scope.result83 = sum83;

    }


    if(data.result12[i].q8 == '4'){
       
       sum84 = sum84 + 1;
       $scope.result84 = sum84;

    }

    if(data.result12[i].q9 == '1'){
       
       sum91 = sum91 + 1;
       $scope.result91 = sum91;

    }

    if(data.result12[i].q9 == '2'){
       
       sum92 = sum92 + 1;
       $scope.result92 = sum92;

    }

    if(data.result12[i].q9 == '3'){
       
       sum93 = sum93 + 1;
       $scope.result93 = sum93;

    }

    if(data.result12[i].q9 == '4'){
       
       sum94 = sum94 + 1;
       $scope.result94 = sum94;

    }

    if(data.result12[i].q10 == '1'){
       
       sum101 = sum101 + 1;
       $scope.result101 = sum101;

    }

    if(data.result12[i].q10 == '2'){
       
       sum102 = sum102 + 1;
       $scope.result102 = sum102;

    }

    if(data.result12[i].q10 == '3'){
       
       sum103 = sum103 + 1;
       $scope.result103 = sum103;

    }

    if(data.result12[i].q10 == '4'){
       
       sum104 = sum104 + 1;
       $scope.result104 = sum104;

    }

    if(data.result12[i].q11 == '1'){
       
       sum111 = sum111 + 1;
       $scope.result111 = sum111;

    }

    if(data.result12[i].q11 == '2'){
       
       sum112 = sum112 + 1;
       $scope.result112 = sum112;

    }

    if(data.result12[i].q11 == '3'){
       
       sum113 = sum113 + 1;
       $scope.result113 = sum113;

    }

    if(data.result12[i].q11 == '4'){
       
       sum114 = sum114 + 1;
       $scope.result114 = sum114;

    }

    if(data.result12[i].q12 == '1'){
       
       sum121 = sum121 + 1;
       $scope.result121 = sum121;

    }

    if(data.result12[i].q12 == '2'){
       
       sum122 = sum122 + 1;
       $scope.result122 = sum122;

    }

    if(data.result12[i].q12 == '3'){
       
       sum123 = sum123 + 1;
       $scope.result123 = sum123;

    }

    if(data.result12[i].q12 == '4'){
       
       sum124 = sum124 + 1;
       $scope.result124 = sum124;

    }

 //   console.log(Object.values(data.result12[0].q2) == '3');

  }

     //$scope.result11 = Object.keys(data.records11[i]).length;
   
  //   console.log(Object.keys(data.records.id).length);
   
      
    
    })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');

       $cordovaToast.showLongBottom('Refresh Complete');
     });
  };


  $scope.kembali = function(){
    $state.go('tab.data');
  };

  $scope.patahBalik = function(){
    $state.go('slide'); }


  }

  else{
        $state.go('login');
      var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized Access',
            template: '<center>Please Login first</center>',
            buttons: [
      {
        text: '<b>ok</b>',
        type: 'button-positive',
        onTap: function(e) {
         
        }
      }
    ]
          });
  }

})

.controller('kursusCtrl', function($location,$scope, $state, $http,$ionicHistory, $ionicPopup,$ionicLoading,$ionicSlideBoxDelegate,$filter,$ionicActionSheet,$cordovaCamera,$cordovaDevice,$cordovaFile,$cordovaFileTransfer) {

  if(sessionStorage.getItem('loggedin_role') == R0leb4U){

  $scope.array = []; 
  $scope.image = null;

  var hey = "";

  $scope.hantarKursus2 = function(kursus){
    $scope.array.unshift(kursus);
    //clear quote
    this.kursus = null;
  };

  $scope.patahBalik = function(){
    $state.go('slide');
  };


  $scope.show = function() {
       $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
       });
     };

  $scope.hide = function(){
        $ionicLoading.hide();
     };

    
 
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };


  $scope.loadImage = function() {
  var options = {
    titleText: 'Select image source',
     buttons: [
       { text: 'Load from Gallery' },
       { text: 'Upload Image' }
     ],
    cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
    buttonClicked: function(index){
      var type = null;
    if (index === 0) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (index === 1) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPicture(type);
    }
    return true;
    }     
    
  };
  $ionicActionSheet.show(options)
};


$scope.selectPicture = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    allowEdit : true,
    targetWidth: 1000,
    targetHeight: 1000
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) {
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      window.FilePath.resolveNativePath(imagePath, function(entry) {
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;

          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else {
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};


$scope.pathForImage = function(image) {
  if (image === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + image;
  }
};
  

  $scope.hantarKursus=function(kursus){


    $scope.show($ionicLoading);
      
      var mulaDate = $filter('date')(kursus.mula, "yyyy/MM/dd");
      var tamatDate = $filter('date')(kursus.tamat, "yyyy/MM/dd");
      var link = 'http://bmax.000webhostapp.com/saveKursus.php?';
      $http.get(link+"nama="+kursus.nama+"&mula="+mulaDate+"&tamat="+tamatDate+"&tempat="+kursus.tempat)
      .success(function (res){

        $scope.response = res.result;

        hey = res.result.nakid;

       
        


            
            //no back option
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
            // the user is redirected to login page after sign up
            


     }).finally(function($ionicLoading) { 
      // On both cases hide the loading
       var url = "http://bmax.000webhostapp.com/upload.php?hey="+hey;
 
  // File for Upload
  var targetPath = $scope.pathForImage($scope.image);
 
  // File name only
  var filename = $scope.image;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  }
 
  $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
    

  });

      var myPopup = $ionicPopup.show({
    title: 'Data kursus berjaya dihantar',
    cssClass: 'hey',
    template: '<center><img src="img/ani.gif"/></center><center>rangkaian kursus anda telah berjaya dihantar</center>',
    buttons: [
      {
        text: '<b>okey</b>',
        type: 'button-positive',
        onTap: function(e) {
          
        }
      }
    ]
  });

      $scope.hide($ionicLoading);  
          });


      

    }

  }

  else{
        $state.go('login');
      var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized Access',
            template: '<center>Please Login first</center>',
            buttons: [
      {
        text: '<b>ok</b>',
        type: 'button-positive',
        onTap: function(e) {
         
        }
      }
    ]
          });
  }
  
  })


.controller('testCtrl', function($location,$scope, $state, $http,$ionicHistory, $ionicPopup,$ionicLoading,$ionicSlideBoxDelegate,$ionicActionSheet,$cordovaCamera,$cordovaDevice,$cordovaFile,$cordovaFileTransfer) {

  $scope.image = null;

  $scope.show = function() {
       $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
       });
     };

  $scope.hide = function(){
        $ionicLoading.hide();
     };
 
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };


  $scope.loadImage = function() {
  var options = {
    titleText: 'Select image source',
     buttons: [
       { text: 'Load from Gallery' },
       { text: 'Upload Image' }
     ],
    cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
    buttonClicked: function(index){
      var type = null;
    if (index === 0) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (index === 1) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPicture(type);
    }
    }     
    
  };
  $ionicActionSheet.show(options)
};


$scope.selectPicture = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    allowEdit : true,
    targetWidth: 100,
    targetHeight: 100
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) {
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      window.FilePath.resolveNativePath(imagePath, function(entry) {
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else {
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};


$scope.pathForImage = function(image) {
  if (image === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + image;
  }
};


$scope.uploadImage = function() {
  // Destination URL
  $scope.show($ionicLoading);
  var url = "http://bmax.000webhostapp.com/upload.php";
 
  // File for Upload
  var targetPath = $scope.pathForImage($scope.image);
 
  // File name only
  var filename = $scope.image;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
    $scope.showAlert('Success', 'Image upload finished.');
    $scope.hide($ionicLoading);  
  });
}


})

.controller('resCtrl', function($location,$scope, $state, $http,$ionicHistory, $ionicPopup,$ionicLoading,$ionicSlideBoxDelegate,$ionicActionSheet,$cordovaCamera,$cordovaDevice,$cordovaFile,$cordovaFileTransfer,$ionicLoading) {

 
  })


.controller('bgCtrl', function($location,$scope, $state, $http,$ionicHistory, $ionicPopup,$ionicLoading,$ionicSlideBoxDelegate,$ionicActionSheet,$cordovaCamera,$cordovaDevice,$cordovaFile,$cordovaFileTransfer,$ionicLoading) {

  if(sessionStorage.getItem('loggedin_role') == R0leb4U){

    $scope.patahBalik = function(){
    $state.go('slide');
  }
  }

  else{
      $state.go('login');
      var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized Access',
            template: '<center>Please Login first</center>',
            buttons: [
      {
        text: '<b>ok</b>',
        type: 'button-positive',
        onTap: function(e) {
         
        }
      }
    ]
          });
  }

  })