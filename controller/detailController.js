app.controller('detailController', ['$scope','$http','$stateParams', function($scope,$http,$stateParams){
   $http({
     url:"json/projectList.json"
   }).success(function(res){
  /* 	$scope.currentIndex = $stateParams.index;
   	$scope.message = res;
   	$scope.currentMessage = $scope.message[$scope.currentIndex];*/
     $scope.item = res[$stateParams.index];
     /*console.log($scope.item);*/
/*     console.log($scope.currentMessage);*/
      $scope.showActive = 0;
      $scope.showIndex = 0;
      $scope.chose = function(index){
	      $scope.showActive = index;
	      $scope.showIndex = index;
      }
   })	
}])