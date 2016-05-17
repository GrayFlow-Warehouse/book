routeApp.controller('OrderDetailCtrl',function($scope, $http, $stateParams){

    $scope.price = 0;
    $scope.busy = true;
    $scope.status_list = [];
    $scope.wait = false;            // 取消订单提示
    $scope.wait2 = false;           // 操作时延

    // 获取订单详细信息
    $http({
        method: 'GET',
        url: host + '/billing',
        params: {
            id: $stateParams.id
        }
    }).success(function(response){
        $scope.order = response;
        $scope.order.status = statusDict[$scope.order.status];
        for(var i=0; i<$scope.order.carts.length; i++) {
            $scope.price += $scope.order.carts[i].number * $scope.order.carts[i].price;
        }
        for(var j=0; j<$scope.order.status_list.length; j++) {
            var temp = $scope.order.status_list[j].split('|');
            $scope.status_list.push({
                "status": statusDict[temp[0]],
                "time": temp[1]
            });
        }
        $scope.busy = false;
    });

    // todo 取消订单
    $scope.cancel = function(order){
        $scope.wait = true;
        $scope.wait2 = true;
        $http({
            method: 'DELETE',
            url: host + '/billing',
            data: {
                "id": order.id,
                "status": "pending"
            }
        }).error(function(){
            $scope.wait2 = false;
            $scope.order.status = "已取消";
            $scope.status_list.push({'status':'已取消','time': Date.parse(new Date())/1000});
            window.setTimeout(function() {
                $scope.$apply(function() {
                    $scope.wait = false;
                    // history.back();
                });
            }, delay);
        });
    };

    // todo 确认收货
    $scope.receipt = function(order){
        $http({
            method: 'POST',
            url: host + '/order',
            data: {
                "id": order.id
            }
        }).success(function(){
            $scope.order.process.push({'status':'已收货','time': '2015-04-03 12:12:00'});
            $scope.order.status = "待评价";
            $scope.turn = 3;
        }).error(function(){
            $scope.order.process.push({'status':'已收货','time': '2015-04-03 12:12:00'});
            $scope.order.status = "待评价";
            $scope.turn = 3;
        });
    };
});
