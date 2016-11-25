app.controller('selfindexController', ['$scope','$http', '$timeout',function($scope,$http,$timeout){
	$http({
		url:'json/selfindex.json'
	}).success(function(res){
        $scope.smallPicture = res[0].list1;
        $scope.bigPicture = res[0].list2;
        $scope.dataAttr = res[0].list3;
        $scope.filterBy = $scope.dataAttr.status;

	})

	$scope.curindex = 0;
	$scope.checkOn = function(index){
       $scope.curindex = index;
	}


   //点击复选框出现样式
	$scope.sortwordsAttr = ["微电影","电影","电视剧","戏曲","相声","书画","话剧","戏剧","音乐剧","歌剧"];
	$scope.blankAttr=[];
	for(var i = 0 ; i < $scope.sortwordsAttr.length ; i ++){
		$scope.blankAttr[i]=false;
		$scope.blankAttr[1] = true;
		$scope.blankAttr[9] = true;
	}
	$scope.clickFn = function(index){
		$scope.blankAttr[index]=!$scope.blankAttr[index];
	}



	//点击性别单选框
	$scope.sexState = true;
	$scope.sexsortIndex = 0;
	$scope.clickSex = function(index){
		if( $scope.sexsortIndex != index){
			$scope.sexsortIndex = index;
			$scope.sexState = !$scope.sexState;
		}
	}
   
   /*选项卡*/

   $scope.choseAttr = [
		{name:"修改密码"},
        {name:"实名认证"},
        {name:"邮箱认证"}
   ]
   $scope.showIndex = 0;
   $scope.choice = function(index){
         $scope.showIndex = index;
    }
    
/*购买记录*/
	$scope.myfliterModel = {status:''};
	$scope.showIndex = 0;
	$scope.dataAttr = [];
	$scope.filterStatus = 0;
	
	$scope.checkContent = function(i){//0 1 2
       //['',0,1][i]
        /*status: ''意思是全部   i:0
                 0     已支付  i:1
                 1     未支付  i:2*/

       /* if( i== 0){
            $scope.myfliterModel = {status:''};
        }else if( i == 1){
            $scope.myfliterModel = {status:1};
        }else if( i == 2){
            $scope.myfliterModel = {status:2};
        }*/
        $scope.myfliterModel = {status:['',0,1][i]}
        //和上面的if else 雷同

        $scope.showIndex = i;
        $scope.filterStatus = i;
      }
}])



