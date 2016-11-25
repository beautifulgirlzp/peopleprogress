app.controller('passwordController', ['$scope','$interval', function($scope,$interval){
     $scope.description = "发送验证码";
     var second = 59;
     var timeHidler;
     $scope.sendCode = function(){
     	if(timeHidler){
     		return;
     	}
     	timeHidler = $interval(function(){
     		if( second <= 0){
     			$interval.cancel(timerHidler);
     			$scope.description = '发送验证码';
     			second = 59;
     			timeHidler = 0;
     		}else{
     			$scope.description = second + '秒后重发';
     			second--;
     		}
     	},1000)

     }	
}])