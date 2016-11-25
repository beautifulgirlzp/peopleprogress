app.controller('homeController',['$scope','$interval','$http','$stateParams',function($scope,$interval,$http,$stateParams){
	$scope.dataAttr = ['image/banner3.png','image/banner2.png'];
	$scope.name=['《晚秋》再现舞台','《犹太人在上海》音乐剧'];
    $scope.introduce=["汤唯、玄彬继电影后，首次在话剧舞台合作，重现美国西雅图两名男女身在异国他乡的爱情故事。","中国、以色列联合创作的大型音乐剧《犹太人在上海》以音乐剧这一公认最具挑战性的艺术形式..."]
    $scope.showIndex = 0;
	var timer = function(){
        if( $scope.showIndex >= $scope.dataAttr.length-1){
        	$scope.showIndex = 0;
        	return;
        }
        $scope.showIndex++;
    };
    var inter = $interval(timer,2000);  
     $scope.end = function(index){
     	$interval.cancel(inter);
     	$scope.showIndex = index;
     }
     $scope.start = function(){
     	 inter = $interval(timer,2000);
     }
     $scope.prev = function(){
        $interval.cancel(inter);
        if( $scope.showIndex <= 0){
            $scope.showIndex = $scope.dataAttr.length-1;
            return;
        }
        $scope.showIndex--;
        $scope.start();
     }

    $scope.next = function(){
        $interval.cancel(inter);
        if( $scope.showIndex >= $scope.dataAttr.length-1){
            $scope.showIndex = 0;
            return;
        }
        $scope.showIndex++;
        $scope.start();
     }


    //用json来写home页面的内容视图
     $http({
        url:'json/projectList.json'
     }).success(function(res){
        $scope.movieAttr = res;
        
        $scope.currentIndex = 2;
        $scope.currentMessage = res[$scope.currentIndex];
        $scope.showFn = function(index,s){
            $scope.currentIndex = index;
            for(var i = 0 ; i < res.length ; i ++){
                if(res[i].sort === s){
                    return $scope.currentMessage = res[i];
                }
            }
    }
     });
     $http({
        url:'json/sort.json'
     }).success(function(res){
        $scope.sort = res;
     })
}]);