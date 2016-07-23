angular
    .module('index')
    .controller('BookListCtrl',function($scope, $http, $stateParams) {
    $scope.busy = true;
    $scope.wait = false;
    $scope.wait2 = false;

    // 获取书单信息
    $http({
        method: 'GET',
        url: host + '/booklist',
        params: {
            id: $stateParams.id
        }
    }).success(function(response){
        $scope.booklist = response;
        for(var i in $scope.booklist.books){
            if($scope.booklist.books.hasOwnProperty(i)){
                $scope.booklist.books[i].star = Math.ceil($scope.booklist.books[i].rate/2);
            }
        }
        $scope.busy = false;
    });

    // 收藏书单函数
    $scope.collect = function(){
        $scope.wait = true;
        $http({
            method: 'POST',
            url: host + '/collect',
            data: {
                type: "booklist",
                id: $stateParams.id
            }
        }).success(function(){
            $scope.booklist.collect_already = !$scope.booklist.collect_already;
            if($scope.booklist.collect_already)  {
                $scope.booklist.collect++;
            }
            else  {
                $scope.booklist.collect--;
            }
            $scope.wait = false;
        });
    };

});