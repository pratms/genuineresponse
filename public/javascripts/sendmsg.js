		   var myApp = angular.module("myApp" , [])
				   .controller("myController" , function($scope, $http)
				   	
				   {
				   
						$scope.SendData = function() {
						$http.post('/sendmsg',$scope.formData).
						success(function(data) {
						$scope.success = "Message Sent";
						}).error(function(data) {
						console.error("error in posting");
						})
						}

						$scope.ReceiveData = function(){

						$http.get("/results").success(function (response)
						{
							
							
							$scope.data = response;
							$scope.show = true;
							$scope.form = true;
							$scope.editform=false;
							$scope.demo=false;



						});
						}
					

						$http.get("/").success(function (response)
						{


						$scope.data = response;



						});
						$scope.open = function(){
                         $scope.demo = true;
                         $scope.buttons=true;

						}

						$scope.close = function(){
							$scope.show = false;
							$scope.form = false;
							$scope.demo = true;

						}
							$scope.openeditform = function(){
							$scope.editform = true;
							$scope.demo = false;

						}

		   
				   });