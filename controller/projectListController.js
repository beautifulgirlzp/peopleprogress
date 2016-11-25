app.controller('projectListController',['$scope','$http',function($scope,$http){
	$http({
       url:"json/projectList.json"
	}).success(function(res){
        $scope.detailAttr = res;
        $scope.curIndex = -1;

        $scope.myfliterModel = '';
        $scope.showImg = function(index,item){
        	$scope.curIndex = index;
        	$scope.myfliterModel = item;

        }
        $scope.filterFn = function(item){
        	if( $scope.myfliterModel == ''){
        	   return true;
        	}
	        return item.sort == $scope.myfliterModel;
        }
	});
	$http({
		url:'json/sort.json'
	}).success(function(res){
		$scope.sorts = res;
	})
}]);