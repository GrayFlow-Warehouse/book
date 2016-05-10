routeApp.controller('SuggestCtrl', function($http, $scope){

    $scope.required = true;
    $scope.wait = false;

    $scope.name = sessionStorage.name;
    $scope.avatar = sessionStorage.avatar;

    // 发布建议和看法
    $scope.post = function(){
        if(this.suggestBox.suggestion.$invalid)    return;
        $scope.wait = true;
        $http({
            method: 'POST',
            url: host + '/user_feedback',
            data: {
                content: $scope.suggestion
            }
        }).success(function(){
            $scope.wait = false;
        });
    };

});