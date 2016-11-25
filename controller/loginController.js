app.controller('loginController',['$scope',function($scope){
	$scope.state = false;
	$scope.checkOn =function(){
       $scope.state = !$scope.state;
	}
}]);
