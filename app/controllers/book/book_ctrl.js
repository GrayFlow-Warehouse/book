(function(){
    'use strict';

    angular
        .module('index')
        .controller('BookCtrl', BookCtrl);

    BookCtrl.$inject = ['$state', '$stateParams', 'commentservice', 'bookservice', 'cartservice', 'userservice', 'book', '$window'];

    function BookCtrl($state, $stateParams, commentservice, bookservice, cartservice, userservice, book, $window) {

        let vm = this;
        vm.more = false;            // 默认不加载更多书籍信息介绍
        vm.required = true;         // 必填
        vm.star = 5;                // 默认星星数

        vm.addCart = addCart;
        vm.collect = collect;
        vm.postComment = postComment;
        vm.commentbox = commentbox;
        vm.up = up;
        vm.down = down;
        vm.home = home;

        vm.book = book;
        commentservice.setTitle(vm.book.title);

        bookservice.getSimilarBook($stateParams.isbn).then(response => {
            vm.similarbooks = response;
        });

        bookservice.getBookBelongs($stateParams.isbn).then(response => {
            vm.booklists = response;
        });

        if($window.sessionStorage.getItem('token') !== void 0 && $window.sessionStorage.getItem('token') !== 'undefined'
            && $window.sessionStorage.getItem('token') !== null && $window.sessionStorage.getItem('token') !== 'null') {
            userservice.getUserInfo().then(response => {
                vm.user = response;
            });
        } else {
            vm.user = undefined;
        }

        function commentbox() {
            if($window.sessionStorage.getItem('token') !== void 0 && $window.sessionStorage.getItem('token') !== 'undefined') {
                vm.commentBox=!vm.commentBox;
            } else {
                userservice.getUserInfo().then(response => {
                    vm.user = response;
                });
            }
        }

        function home() {
            $state.go('cart');
        }

        function addCart() {
            return cartservice.addCart($stateParams.isbn).then(() => {
                notie.alert(1, '已加入购物车', 0.3);
            });
        }

        function collect() {
            if(vm.book.collect_already) {
                return bookservice.discollectBook($stateParams.isbn).then(() => {
                    vm.book.collect_already = !vm.book.collect_already;
                })
            } else {
                return bookservice.collectBook($stateParams.isbn).then(() => {
                    vm.book.collect_already = !vm.book.collect_already;
                });
            }
        }

        function up(comment) {
            commentservice.up(comment.id).then(() => {
                comment.down = comment.down_already ? --comment.down : comment.down;
                comment.up_already = !comment.up_already;
                comment.down_already = false;
                comment.up = comment.up_already ? ++comment.up : --comment.up;
            });
        }

        function down(comment) {
            commentservice.down(comment.id).then(() => {
                comment.up = comment.up_already ? --comment.up : comment.up;
                comment.down_already = !comment.down_already;
                comment.up_already = false;
                comment.down = comment.down_already ? ++comment.down : --comment.down;
            });
        }

        function postComment(){
            if(vm.content === void 0) return;
            return commentservice.postComment($stateParams.isbn, vm.star, vm.content).then(response => {
                vm.commentBox = false;
                response.user = {
                    avatar: vm.user.avatar,
                    username: vm.user.username
                };
                response.star = response.star/2;
                vm.book.commenters ++;
                vm.book.comments.push(response);
                vm.content = '';
            });
        }
    }
})();
