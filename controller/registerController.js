app.controller('registerController', ['$scope','$interval', function($scope,$interval){
	$scope.sta = false;
	$scope.checkOn=function(){
		$scope.sta = !$scope.sta;
	}
	/*$scope.times = 60;
	$scope.timer = null;
	$scope.cutTime = function(){
		var that = this;
	    $scope.timer = function(){
		    $scope.times--;
		    that.innerHTML = '已发送,'+ $scope.times +"秒后重试";
		    if($scope.times <= 0){
		    	that.innerHTML = "发送验证码";
		    	$interval.cancel($scope.timer);
		    	$scope.times = 60;
		    }
	    }
	}
	var inter = $interval($scope.timer,1000);*/
    
    //验证码间隔时间
	$scope.description="获取验证码";
	var second = 59;
	//发送验证码
	var timeHandler;
	$scope.sendCode = function(){
		if(timeHandler){
			return;
		}
		timeHandler = $interval(function(){
           if(second <= 0){
              $interval.cancel(timeHandler);
              second = 59;
              $scope.description="获取验证码";
              timeHandler = 0;
           }else{
           	  $scope.description="已发送,"+ second +"秒后重发";
           	  second --;
           }
		},1000)
	}
}])