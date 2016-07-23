angular
    .module('index')
    .factory('BL', function($http){
    var BL = function(url,params){
        this.list = [];
        this.busy = false;
        this.url = url;
        this.params = params;
        this.continue = true;      // 是否继续
    };
    BL.prototype.nextPage = function(){
        if(!this.continue){
            this.busy = false;
            return;
        }
        if(this.busy) {
            return;
        }
        this.busy = true;
        $http({
            method: 'GET',
            url: this.url,
            params: this.params
        }).success(function(response){
            var list = response;
            if(list.length < 5 ) {
                this.continue = false;
            }
            for (var i = 0 ;i < list.length; i++){
                list[i].star = Math.ceil(list[i].rate/2);
                this.list.push(list[i]);
            }
            this.busy = false;
            this.params.page += 1;
        }.bind(this));
    };
    return BL;
});
angular
    .module('index')
    .factory('TEMP', function(){
    var _list = [];
    var _dict = {};
    return {
        pushList: function(list){
            _list.push(list);
        },
        setList: function(list){
            _list = list;
        },
        getList: function(){
            return _list;
        },
        setDict: function(dict){
            _dict = dict;
        },
        getDict: function(){
            return _dict;
        }
    };
});
angular
    .module('index')
    .factory('User', function () {

    var _signature = '';
    var _temp = {};

    return {
        getSignature: function() {
            return _signature;
        },
        getTemp: function() {
            return _temp;
        },
        setSignature: function(signature) {
            _signature = signature;
        },
        setTemp: function(temp) {
            _temp = temp;
        }
    };
});
angular
    .module('index')
    .factory('timestampMarker', [function() {
    var timestampMarker = {
        request: function(config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);
angular
    .module('index')
    .factory('tokenInjector', ['$injector','$q', '$location', function($injector,$q){
    var tokenInjector = {
        request: function(config){

            var url = host + '/auth_verify';
            var deferred = $q.defer();
            var http = $injector.get('$http');
            if(config.url === url)
                return config;

            if(sessionStorage.verify === "true") {
                var timestamp = new Date().getTime() / 1000;
                // 时间超过7100s，需要重新验证
                if (timestamp - localStorage.getItem("createdtime") >= 7100){
                    sessionStorage.verify = false;
                }
                config.headers['token'] = localStorage.getItem("token");
                config.headers['userid'] = localStorage.getItem("user_id");
                deferred.resolve(config);
            }
            else {
                // 验证token
                http({
                    method: 'GET',
                    url: url,
                    params: {
                        token: localStorage.getItem("token"),
                        user_id: localStorage.getItem("user_id")
                    }
                }).success(function(response){
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("createdtime", response.time);
                    sessionStorage.verify = "true";
                    config.headers['token'] = localStorage.getItem("token");
                    config.headers['userid'] = localStorage.getItem("user_id");
                    console.log("verify OK");
                    deferred.resolve(config);
                }).error(function(){
                    // 跳转微信登陆
                    console.log("verify FAIL");
                    // window.location.replace(host);
                    deferred.resolve(config);
                });
            }
            return deferred.promise;
        }
    };
    return tokenInjector;
}]);
angular
    .module('index')
    .filter('nl2br', ['$sanitize', function($sanitize) {
    var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
    return function(msg) {
        // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
        msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
        return $sanitize(msg);
    };
}]);