;(function(){

'use strict';

angular.module('index').run(['$templateCache', function($templateCache) {

  $templateCache.put('book/book_tpl.html', '<loading ng-if="busy"></loading><div class="book-detail" ng-if="!busy"><div class="book-img"><img class="cover" ng-src="{{book.image}}"> <img class="cover-bg" ng-src="{{book.image}}"></div><div class="book"><div class="book-info"><h3>{{book.title}}</h3><div class="book-info-rate"><uib-rating class="star wechat-fix" ng-model="book.star" max="5" read-only="true" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating><span class="rate">{{book.rate | number:1 }}</span> <span class="collect">({{book.commenters}}人评价)</span> <a class="book-info-more-option" ui-sref="bookDetail({isbn: book.isbn})" ng-click="busy=true"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></div><div class="book-info-basic"><span class="author" ng-if=\'book.author!=""\'><span ng-repeat="x in book.author">{{x}}</span>/</span> <span class="publisher" ng-if=\'book.publisher!=""\'>{{book.publisher}} /</span> <span class="publish_time" ng-if=\'book.publish_time!=""\'>{{book.publish_time}}</span></div></div><div class="book-section"><span name="price">¥ {{book.price | number:2 }}</span> <button class="btn btn-success" ng-click="collect()" ng-if="!book.collect_already&&!wait2"><i class="fa fa-bookmark-o"></i> 收藏</button> <button class="btn btn-success" ng-class="{true: \'btn-collect\', false: \'btn-collected\'}[book.collect_already]" ng-show="wait2" disabled><wait></wait></button> <button class="btn btn-success active" ng-click="collect()" ng-if="book.collect_already&&!wait2"><i class="fa fa-bookmark"></i> 已收藏</button> <button class="btn btn-danger" ng-show="!wait3" ng-class="{\'active\': book.cart}" ng-click="addCart()"><i class="fa" ng-class="{\'fa-cart-plus\':book.cart,\'fa-shopping-cart\':!book.cart}"></i> 加入购物车</button> <button class="btn btn-danger" style="width: 107px" ng-show="wait3" disabled><wait></wait></button></div><div class="clearfix"></div><div class="book-intro"><span>简介</span><p ng-bind-html="book.description" ng-class="{\'book-intro-less\':!more,\'book-intro-more\':more}"></p><button class="btn btn-block btn-default" ng-show="!more" ng-click="more=!more">更多</button> <button class="btn btn-block btn-default" ng-show="more" ng-click="more=!more">收起</button></div><div class="book-comments"><span>评论</span><div class="book-comment" ng-repeat="comment in book.comments"><div class="book-comment-origin"><img ng-src="{{comment.user.avatar}}"> <span>{{comment.user.username}}</span><uib-rating class="star red-star" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" ng-model="comment.star" max="5" read-only="true"></uib-rating></div><p class="ng-binding" ng-bind-html="comment.content"></p><div class="comment-meta"><p>{{comment.create_time*1000 | date:\'yyyy-MM-dd HH:mm\'}}</p><i class="fa" ng-class="{false:\'fa-thumbs-o-down\',true:\'fa-thumbs-down\'}[comment.down_already]" ng-click="down(comment)">{{comment.down}}</i> <i class="fa" ng-class="{false:\'fa-thumbs-o-up\',true:\'fa-thumbs-up\'}[comment.up_already]" ng-click="up(comment)">{{comment.up}}</i></div><div class="clearfix"></div></div><div class="book-comments-more"><a class="btn btn-default" ui-sref="commentsBook({isbn: book.isbn, title: book.title})">全部评论</a> <button class="btn btn-default" ng-click="$parent.commentBox=!$parent.commentBox;">我要评论</button></div><form name="commentForm" class="book-comment-box" ng-show="$parent.commentBox"><div class="book-comment-origin"><img ng-src="{{user.avatar}}"> <span class="book-comment-origin">{{user.username}}</span><uib-rating class="star red-star" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" ng-model="$parent.star" max="5" read-only="false"></uib-rating></div><textarea ng-model="$parent.content" focus-me="{{$parent.commentBox}}" name="content" class="form-control" rows="3" ng-required="required"></textarea><div class="book-comment-post"><p>评价 "{{book.title}}"</p><button class="btn btn-success" type="submit" ng-click="postComment()" ng-show="!wait">发表</button> <button class="btn btn-success" ng-show="wait" style="width: 54px" disabled><wait></wait></button></div></form></div><div class="books-similarity"><span>购买此书的人最近也购买</span><div class="slides-book-content"><a ng-repeat="book in booksBought" ui-sref="book({isbn: book.isbn})"><img ng-src="{{book.image}}"><p>{{book.title}}</p><uib-rating ng-model="book.star" class="red-star wechat-fix" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" max="5" read-only="true"></uib-rating><span>{{book.rate}}</span></a></div></div><div class="booklists-box"><span>被以下书单收集</span><div class="booklists-box-content"><a ng-repeat="booklist in booklists" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a></div></div></div></div><div ng-if="wait4" class="animate-if"><p>成功加入购物车</p></div><div ng-if="wait5" class="animate-if"><p>收藏成功</p></div><div ng-if="wait6" class="animate-if"><p>取消收藏成功</p></div><div ng-if="wait7" class="animate-if"><p>评论发布成功</p></div>');

  $templateCache.put('booklists/booklists_tpl.html', '<div class="tags-hot" ng-if="!busy"><div class="tags-hot-header"><p>选书单</p><a ui-sref="tags">查看全部标签 ></a></div><div class="tags-hot-list"><a class="btn btn-default" ng-repeat="tag in tags" ui-sref="tagBooklists({tag: tag})">{{tag}}</a></div></div><div class="booklists-box"><div class="btn-group booklists-order"><button class="btn btn-default" ng-click="timeOrder()">时间优先</button> <button class="btn btn-default" ng-click="collectOrder()">收藏优先</button></div><div class="booklists-box-content" infinite-scroll="booklists.nextPage()" infinite-scroll-disabled="booklists.busy" infinite-scroll-distance="1"><a ng-repeat="booklist in booklists.list" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a><div class="loading-more" ng-show="booklists.busy"><i class="fa fa-spinner fa-pulse fa-2x"></i></div></div></div>');

  $templateCache.put('booklist/booklist_tpl.html', '<loading ng-if="busy"></loading><div class="booklist" ng-if="!busy"><div class="booklist-header"><img class="booklist-image-cover" ng-src="{{booklist.image}}"><h3>{{booklist.title}}</h3><p class="booklist-intro">{{booklist.description}}</p><img class="avatar" ng-src="{{booklist.author.avatar}}"> <small>{{booklist.author.name}} / {{booklist.collect}}人收藏</small> <button class="btn btn-info" ng-click="collect()" ng-show="!booklist.collect_already&&!wait"><i class="fa fa-bookmark-o"></i> 收藏书单</button> <button class="btn btn-info" ng-show="wait" disabled><wait></wait></button> <button class="btn btn-info" ng-click="collect()" ng-show="booklist.collect_already&&!wait"><i class="fa fa-bookmark"></i> 已收藏</button></div><div class="booklist-tags"><div class="booklist-tags-outer"><div class="booklist-tags-inner"><span class="tag">标签</span> <a class="tag" ng-repeat="tag in booklist.tags" ui-sref="tagBooklists({tag: tag})">{{tag}}</a></div></div></div><div class="booklist-books slides-box-content"><a ng-repeat="book in booklist.books" ui-sref="book({isbn: book.isbn})"><div class="book-img"><img class="cover cover-sm" ng-src="{{book.image}}"> <img class="cover-bg" ng-src="{{book.image}}"></div><div class="book-message"><div class="book-message-top"><span class="book-message-top-title">{{book.title}}</span><div class="book-message-top-rate"><span>&nbsp;{{book.rate}}</span><uib-rating class="red-star" ng-model="book.star" max="5" read-only="true" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></div></div><span class="book-message-author" ng-if=\'book.author!=""\'><span ng-repeat="x in book.author">{{x}}</span></span></div><div class="book-reason"><p name="reason" ng-bind-html="book.reason"></p></div></a></div></div><div ng-if="wait1" class="animate-if"><p>收藏成功</p></div><div ng-if="wait2" class="animate-if"><p>取消收藏成功</p></div>');

  $templateCache.put('book_info/book_info_tpl.html', '<loading ng-if="busy"></loading><div class="book-box-outer" ng-if="!busy"><div class="book-box"><header class="book-box-head">出版信息</header><article class="book-box-article"><section><span class="info" ng-if=\'book.title!=""\'>标题: {{book.title}}</span> <span class="info" ng-if=\'book.subtitle!=""\'>副标题: {{book.subtitle}}</span> <span class="info" ng-if=\'book.origin_title!=""\'>原标题: {{book.origin_title}}</span> <span class="info" ng-if=\'book.author!=""\'>作者：<span ng-repeat="x in book.author">{{x}}</span></span> <span class="info" ng-if="book.translator" !>译者: <span ng-repeat="x in book.translator">{{x}}</span></span> <span class="info" ng-if=\'book.publisher!=""\'>出版社: {{book.publisher}}</span> <span class="info" ng-if=\'book.publish_time!=""\'>出版年: {{book.publish_time}}</span> <span class="info" ng-if="!book.page">页数: {{book.page}}</span> <span class="info" ng-if=\'book.price!=""\'>定价: {{book.price}}</span> <span class="info" ng-if=\'book.binding!=""\'>装帧: {{book.binding}}</span> <span class="info" ng-if=\'book.isbn!=""\'>ISBN: {{book.isbn}}</span></section></article></div><div class="book-box" ng-if=\'book.description!=""\'><header>书籍内容介绍</header><article><section><p class="info" ng-bind-html="book.description"></p></section></article></div><div class="book-box" ng-if=\'book.author_intro!=""\'><header>作者介绍</header><article><section><p class="info" ng-bind-html="book.author_description"></p></section></article></div><div class="book-box" ng-if=\'book.catelog!=""\'><header>目录</header><article><section><p class="info" ng-bind-html="book.catelog"></p></section></article></div></div>');

  $templateCache.put('cart/cart_tpl.html', '<loading ng-if="busy"></loading><div class="shop-group" ng-if="!busy"><div class="shop-cart-head"><span>购物车</span> <span ng-click="edit()" ng-if="!editStatu">编辑</span> <span ng-click="editOk()" ng-if="editStatu">完成</span></div><ul class="shop-cart-list"><div class="empty-alert" ng-if="items.length==0"><p>购物车为空，快去逛逛吧</p></div><li ng-repeat="item in items"><div class="shop-cart-item"><div class="checkbox"><label><span ng-class="item.status"><input type="checkbox" ng-model="item.checked" ng-click="select(item.status)"></span></label></div><a class="cart-book-image" ui-sref="book({isbn: item.book.isbn})"><img ng-src="{{item.book.image}}"></a><div class="cart-book-name"><a ui-sref="book({isbn: item.book.isbn})">{{item.book.title}}</a></div><p class="cart-book-price">¥ {{item.price | number:2 }}</p><span class="cart-book-count" ng-show="!editStatu">X {{ item.number }}</span><div class="cart-book-edit" ng-if="editStatu"><i class="fa fa-trash-o fa-1x" ng-click="removeBook(item, $index)" aria-hidden="true"></i><div class="cart-book-edit-count"><i class="fa fa-minus" aria-hidden="true" ng-click="minus(item)"></i> <input type="number" ng-model="item.number" ng-change="editBook(item)"> <i class="fa fa-plus" aria-hidden="true" ng-click="plus(item)"></i></div></div></div></li></ul><div class="cart-to-order"><button class="btn btn-danger" ng-if="!editStatu" ng-disabled="count===0 || editStatu" ng-click="cart2order()">结算({{count}})</button> <button class="btn btn-info" ng-if="editStatu" ng-disabled="count===0" ng-click="collect()">移入收藏夹({{number}})</button> <button class="btn btn-success" ng-if="editStatu" ng-disabled="count===0" ng-click="delete()">删除({{number}})</button><div class="checkbox"><label><span ng-class="status"><input type="checkbox" ng-model="checked" ng-click="selectAll()"></span></label> <label>全选</label></div><div class="cart-count" ng-if="!editStatu"><label>¥ {{price | number: 2}}</label></div></div></div><div ng-if="wait1" class="animate-if animate-if-2"><p>删除成功</p></div><div ng-if="wait2" class="animate-if animate-if-2"><p>已移入收藏夹</p></div>');

  $templateCache.put('cart2order/cart2order_tpl.html', '<div class="cart2order order-group"><div class="order-list"><div class="order-list-one"><div class="order-title"><span class="order-head">Bookist</span> <span class="order-status">待支付</span></div><div class="order-cart"><div class="colorBar"></div><div class="order-address rarrow"><p class="name">收货人:{{x.name}}<em>{{x.phone}}</em></p><p class="address">{{x.dormitory}}</p></div><div class="colorBar"></div><div class="order-books"><div class="cart2order-book order-book" ng-repeat="item in books"><img ng-src="{{item.book.image}}"></div><div class="cart2order-sum"><p>共{{order.number}}件</p><p>小计: <span>¥ {{order.price | number:2}}</span></p></div></div><div class="order-tip"><div class="order-tip-1"><span>送货方式</span> <span>送书上门</span></div><div class="order-tip-1"><span>付款方式</span> <span>货到付款</span></div></div></div></div><div class="cart-message"><p>平台承诺书籍为全新正版, 两日内送达。</p><p>自2016年5月到2016年7月，平台提供免费的送书上门服务。</p><p>平台仍然在不断完善，将很快推出微信支付功能，敬请等待，谢谢您的支持。</p></div></div></div><div class="make-order cart-to-order"><button class="btn btn-danger" ng-if="!wait" ng-click="make()">提交订单</button> <button class="btn btn-danger" ng-if="wait" style="width: 98px;"><wait></wait></button><div class="cart-count"><label>总额: ¥ {{order.price | number: 2}}</label></div></div>');

  $templateCache.put('collect_booklists/collect_booklists_tpl.html', '<loading ng-if="busy"></loading><div class="booklists-box collect-box" ng-if="!busy"><div class="booklists-box-top btn-group"><a class="btn btn-default" ui-sref="booklistsCollect">书单收藏夹</a> <a class="btn btn-default" ui-sref="booksCollect">书籍收藏夹</a></div><div class="booklists-box-content"><div class="empty-alert" ng-if="booklists.length==0"><p>您还没有收藏书单</p></div><a ng-repeat="booklist in booklists" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a></div></div>');

  $templateCache.put('collect_books/collect_books_tpl.html', '<loading ng-if="busy"></loading><div class="booklists-box collect-box" ng-if="!busy"><div class="booklists-box-top btn-group"><a class="btn btn-default" ui-sref="booklistsCollect">书单收藏夹</a> <a class="btn btn-default" ui-sref="booksCollect">书籍收藏夹</a></div><div class="books"><div class="empty-alert" ng-if="books.length==0"><p>您还没有收藏书籍</p></div><div class="books-content" ng-if="books.length!=0"><div class="books-content-list" ng-repeat="book in books"><a ui-sref="book({isbn: book.isbn})"><img ng-src="{{book.image}}"></a> <span class="title">&nbsp;{{book.title}}<i class="mark-book-remove fa fa-trash-o" ng-click="remove(book, $index)"></i></span><uib-rating class="star red-star wechat-fix" ng-model="book.star" max="5" read-only="true" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating><span class="rate">&nbsp;{{book.rate | number:1}}</span><blockquote class="reason" ng-bind-html="book.reason"></blockquote></div></div></div></div>');

  $templateCache.put('index/index_tpl.html', '<div class="slides"><uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides"><uib-slide ng-repeat="slide in slides track by slide.id" index="slide.id"><img ng-src="{{slide.image}}" style="margin:auto;"></uib-slide></uib-carousel></div><div class="slides-book"><div class="slides-book-header"><i class="fa fa-book"></i> <span>书籍推荐</span> <a ui-sref="recommend">更多 ></a></div><div class="slides-book-content" style="min-height: 195px;"><a ng-repeat="book in books" ui-sref="book({isbn:book.isbn})"><img ng-src="{{book.image}}"><p>{{book.title}}</p><uib-rating ng-model="book.star" class="red-star wechat-fix" max="5" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" read-only="true"></uib-rating><span>{{book.rate | number:1}}</span></a></div></div><div class="booklists-box" style="min-height: 400px;"><div class="booklists-box-header"><i class="fa fa-list"></i> <span>热门书单</span> <a ui-sref="popular">更多 ></a></div><div class="booklists-box-content"><a ng-repeat="booklist in booklists" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a></div></div><div style="overflow:hidden;margin:10px 0;border-radius: 0;"><button class="btn btn-block btn-info" ng-click="fuck()">刷新微信缓存</button></div>');

  $templateCache.put('comments/comments_tpl.html', '<loading ng-if="busy"></loading><div class="book-comments-all"><div class="navbar navbar-default navbar-fixed-top"><a class="navbar-brand">全部评论 - {{title}}</a></div><div class="book-comments-list" ng-if="!busy"><div class="book-comments"><div class="book-comment" ng-repeat="comment in comments"><div class="book-comment-origin"><img ng-src="{{comment.user.avatar}}"> <span class="book-comment-origin">{{comment.user.username}}</span><uib-rating class="star red-star" ng-model="comment.star" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" max="5" read-only="true"></uib-rating></div><p ng-bind-html="comment.content"></p><div class="comment-meta"><p>{{comment.create_time*1000 | date:\'yyyy-MM-dd HH:mm\'}}</p><i class="fa" ng-class="{false:\'fa-thumbs-o-down\',true:\'fa-thumbs-down\'}[comment.down_already]" ng-click="down(comment)">{{comment.down}}</i> <i class="fa" ng-class="{false:\'fa-thumbs-o-up\',true:\'fa-thumbs-up\'}[comment.up_already]" ng-click="up(comment)">{{comment.up}}</i></div><div class="clearfix"></div></div></div></div></div>');

  $templateCache.put('me/me_tpl.html', '<div class="me"><div class="user"><img ui-sref="settings" ng-src="{{user.avatar}}"><div ui-sref="settings" class="user-name"><p>{{user.username}}</p></div><a ui-sref="settings"><i class="fa fa-cog fa-lg"></i></a> <a ui-sref="notices"><i class="fa fa-envelope-o fa-lg"></i></a></div><div class="order-panel"><div class="order-head" ui-sref="orders"><i class="fa fa-ticket"></i>全部订单</div><a ui-sref="ordersWait" class="order-bar-split"><img src="/static/images/57147baaNf2463e54.png"> <span>待发货</span></a> <a ui-sref="ordersReceived" class="order-bar-split"><img src="/static/images/57147bb0N365a03ef.png"> <span>待收货</span></a> <a ui-sref="ordersCommented" class="order-bar-split"><img src="/static/images/57147bbbN2cf7ffd7.png"> <span>待评价</span></a> <a ui-sref="ordersBack" class="order-bar-split"><img src="/static/images/57147bbbN2cf7ffd7.png"> <span>退款/售后</span></a></div><div class="user-items"><a ui-sref="booklistsCollect" class="user-item"><i class="fa fa-folder"></i>收藏</a> <a ui-sref="comments" class="user-item"><i class="fa fa-comments"></i>评论</a> <a ui-sref="point" class="user-item"><i class="fa fa-ticket"></i>积分</a></div><div class="user-items"><a ui-sref="suggest" class="user-item"><i class="fa fa-commenting"></i>反馈</a></div></div>');

  $templateCache.put('navbar/navbar_tpl.html', '<nav class="bookist-nav navbar navbar-default" role="navigation"><ul class="nav navbar-nav"><li><a ui-sref="index"><i class="fa fa-home fa-lg"></i><p>首页</p></a></li><li><a ui-sref="booklists"><i class="fa fa-th-large fa-lg"></i><p>书单</p></a></li><li><a ui-sref="cart"><i class="fa fa-shopping-cart fa-lg"></i><p>购物车</p></a></li><li><a ui-sref="me"><i class="fa fa-user fa-lg"></i><p>我的</p></a></li></ul></nav>');

  $templateCache.put('notices/notices_tpl.html', '<loading ng-if="busy"></loading><ul class="notices" ng-if="!busy"><div class="empty-alert" ng-if="notices.length==0"><p>暂无消息</p></div><li class="notice" ng-repeat="notice in notices"><div class="notice-title"><p ng-bind-html="notice.content"></p><span>{{notice.time*1000 | date:\'yyyy-MM-dd HH:mm\' }}</span></div><p class="notice-content">{{notice.content}}</p><a class="notice-read" ng-href="url"><span>查看</span> <i class="fa fa-chevron-right" aria-hidden="true"></i></a></li></ul>');

  $templateCache.put('orders/orders_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><div class="empty-alert" ng-if="orders.length==0"><p>您还没有订单，快去逛逛吧</p></div><li class="order-list-one" ng-repeat="order in orders"><div class="order-title"><span class="order-head">Bookist</span> <span class="order-status">{{order.status}}</span></div><a ui-sref="orderDetail({id:order.id})"><ul class="order-books" style="margin-bottom: 0"><li class="order-book" ng-repeat="z in order.carts"><img ng-src="{{z.book.image}}"><p>{{z.book.title}}</p><small ng-repeat="x in z.book.author"><small>{{x}}</small></small> <span class="count">{{z.number}}本 / 共{{z.price*z.number | number:2}}元</span></li></ul></a><div class="order-meta"><div class="order-meta-price"><span class="order-method">货到付款</span> <span class="order-price">实付款 {{order.price}} 元</span></div><a class="btn btn-default" ng-if="order.status==\'待评价\'" ui-sref="orderComments({id:order.id})">评价</a> <button class="btn btn-default" ng-if="order.status==\'待收货\'" ng-click="receipt(order, $index)">确认收货</button> <button class="btn btn-default" ng-if="order.status==\'待发货\'" ng-click="cancel(order, $index)">取消订单</button></div></li></ul></div>');

  $templateCache.put('orders_wait/orders_wait_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><div class="empty-alert" ng-if="orders.length==0"><p>暂无待收货订单，快去逛逛吧</p></div><li class="order-list-one" ng-repeat="order in orders"><div class="order-title"><span class="order-head">Bookist</span> <span class="order-status">{{order.status}}</span></div><a ui-sref="orderDetail({id: order.id})"><ul class="order-books" style="margin-bottom: 0"><li class="order-book" ng-repeat="z in order.carts"><img ng-src="{{z.book.image}}"><p>{{z.book.title}}</p><small ng-repeat="x in book.author"><small>{{x}}</small></small> <span class="count">{{z.number}}本 / 共{{z.price*z.number | number:2}}元</span></li></ul></a><div class="order-meta"><div class="order-meta-price"><span class="order-method">货到付款</span> <span class="order-price">实付款 {{order.price}} 元</span></div><button class="btn btn-default" ng-if="order.status!=\'待评价\'" ng-click="cancel(order, $index)">取消订单</button></div></li></ul></div>');

  $templateCache.put('order_comments/order_comments_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><div class="order-list-one"><div class="order-title"><span class="order-head">订单详细信息</span> <span class="order-status">建议您把书看完再来评价书籍哦~</span></div><ul class="order-books order-comments"><li class="order-book" ng-repeat="book in order.books"><a ui-sref="book({isbn: book.isbn})" class="order-img"><img ng-src="{{book.image}}"></a><div class="order-comment"><textarea class="form-control" rows="3" placeholder="认真评价可以获得积分哦~"></textarea></div><div class="order-star"><span>书籍评分</span><uib-rating ng-model="book.stars" max="5" read-only="false" class="star red-star" on-leave="overStar = null" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></div></li></ul><div class="platform-comment"><div class="platform-comment-title"><span class="order-head">平台评分</span></div><ul class="platform-comment-items"><li><span>购书体验</span><uib-rating ng-model="stars1" max="5" read-only="false" class="red-star star" on-leave="overStar = null" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></li><li><span>物流服务</span><uib-rating ng-model="stars2" max="5" read-only="false" class="red-star star" on-leave="overStar = null" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></li><li><span>服务态度</span><uib-rating ng-model="stars3" max="5" read-only="false" class="red-star star" on-leave="overStar = null" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></li></ul></div><div class="order-comment-fix-bottom"><button class="btn btn-danger" ng-click="comment()">发表评价</button></div></div></div>');

  $templateCache.put('order_detail/order_detail_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><li class="order-list-one"><div class="order-title"><span class="order-head">订单详细信息</span> <span class="order-status">共{{price}}元</span></div><ul class="order-books"><a class="order-book" ui-sref="book({isbn: book.isbn})" ng-repeat="z in order.carts"><img ng-src="{{z.book.image}}"><p>{{z.book.title}}</p><small ng-repeat="x in z.book.author"><small>{{x}}</small></small> <span class="count">{{z.number}}本 / 共{{z.price*z.number | number:2}}元</span></a></ul><div class="order-detail"><div class="order-title"><span class="order-head">订单状态</span> <span class="order-status">{{order.status}}</span></div><ul class="order-process"><li ng-repeat="x in status_list"><span>{{x.status}}</span> <span>{{x.time*1000 | date:\'yyyy-MM-dd HH:mm\'}}</span></li></ul></div><div class="order-receipt"><div class="order-title"><span class="order-head">订单收货信息</span></div><div class="order-receipt-meta"><p>收货人: {{order.address.name}}</p><p>联系电话: {{order.address.phone}}</p><p>收货地址: {{order.address.dormitory}}</p></div></div><div class="order-detail-clear"></div><div class="order-meta order-meta-fix-bottom"><div class="order-meta-price"><span class="order-method">货到付款</span> <span class="order-price">实付款 {{price}} 元</span></div><a class="btn btn-danger" ng-if="order.status==\'待评价\'&&!wait2" ui-sref="orderComments({id: order.id})">评价</a> <button class="btn btn-danger" ng-if="order.status==\'待收货\'&&!wait2" ng-click="receipt(order)">确认收货</button> <button class="btn btn-danger" ng-if="order.status==\'待发货\'&&!wait2" ng-click="cancel(order)">取消订单</button> <button class="btn btn-danger" ng-if="order.status==\'已取消\'" style="width: 95px;" disabled>已取消</button> <button class="btn btn-danger" ng-if="wait2" disabled style="width: 95px;"><wait></wait></button></div></li></ul></div><div ng-if="wait" class="animate-if" style="bottom: 58px;"><p>订单取消成功</p></div>');

  $templateCache.put('point/point_tpl.html', '<loading ng-if="busy"></loading><div class="points" ng-if="!busy"><div class="point-history"><div class="point-header"><span>当前积分: {{points.now_points}}</span></div><ul class="point-list"><li ng-repeat="x in points.logs"><span class="point-title" ng-bind-html="x.content"></span> <span class="point-result" ng-if="x.point>0">+ {{x.point}}</span> <span class="point-result" ng-if="x.point<0">- {{-x.point}}</span></li></ul></div></div>');

  $templateCache.put('popular_more/popular_more_tpl.html', '<div class="booklists-box"><div class="booklists-box-content" infinite-scroll="booklists.nextPage()" infinite-scroll-disabled="booklists.busy" infinite-scroll-distance="1"><a ng-repeat="booklist in booklists.list" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a><div class="loading-more" ng-show="booklists.busy"><i class="fa fa-spinner fa-pulse fa-2x"></i></div></div></div>');

  $templateCache.put('recommend_more/recommend_more_tpl.html', '<div class="books"><div class="books-content" infinite-scroll="books.nextPage()" infinite-scroll-disabled="books.busy" infinite-scroll-distance="1"><a class="books-content-list" ng-repeat="book in books.list" ui-sref="book({isbn: book.isbn})"><img ng-src="{{book.image}}"> <span class="title">{{book.title}}</span><uib-rating class="star red-star wechat-fix" ng-model="book.star" max="5" read-only="true" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating><span class="rate">&nbsp;{{book.rate}}</span><blockquote class="reason" ng-bind-html="book.reason"></blockquote></a><div class="loading-more" ng-show="books.busy"><i class="fa fa-spinner fa-pulse fa-2x"></i></div></div></div>');

  $templateCache.put('settings/settings_tpl.html', '<div class="user-items"><a class="user-item"><i class="fa fa-folder user-item-gravatar"><span>头像</span></i><img ng-src="{{user.avatar}}"></a> <a class="user-item"><i class="fa fa-comments"><span>昵称</span></i><span>{{user.username}}</span></a></div><div class="user-items"><a class="user-item"><i class="fa fa-cloud"><span>性别</span></i> <i class="fa fa-mars" aria-hidden="true" ng-if="user.sex === 1"></i> <i class="fa fa-venus" aria-hidden="true" ng-if="user.sex === 2"></i></a> <a ui-sref="address" class="user-item"><i class="fa fa-commenting"><span>我的地址</span></i></a></div>');

  $templateCache.put('setting_address/setting_address_tpl.html', '<div class="setting"><div class="empty-alert" ng-if="address.length==0"><p>您还没有添加地址</p></div><div class="loading-more" ng-show="wait"><i class="fa fa-spinner fa-pulse fa-2x"></i></div><div class="address-list" ng-repeat="x in address" ng-click="edit()"><p>{{x.name}}, {{x.phone}}</p><small>{{x.dormitory}}</small></div><div class="btn-group"><button class="btn btn-success" ui-sref="AddressAdd">添加</button> <button class="btn btn-default" ng-click="back()">返回</button></div></div>');

  $templateCache.put('setting_address_add/setting_address_add_tpl.html', '<div class="setting"><form name="addressForm"><div class="form-group"><label>收货人</label> <input type="text" name="name" maxlength="10" ng-required="true" ng-model="name" focus-me="{{correct_name}}" class="form-control" placeholder="姓名"></div><div class="form-group"><label>手机号码</label> <input type="text" name="phone" ng-model="phone" class="form-control" placeholder="11位手机号" ng-required="true" ng-minlength="11" ng-maxlength="11" minlength="11" maxlength="11" focus-me="{{correct_phone}}" ng-change="check()"></div><div class="form-group"><label>宿舍地址</label> <input type="text" name="dorm" ng-model="dorm" maxlength="30" class="form-control" ng-required="true" focus-me="{{correct_dorm}}" placeholder="宿舍位置"></div><div class="btn-group"><button class="btn btn-success" type="submit" ng-if="!edit&&!wait1" ui-sref="AddressAdd" ng-click="add()" ng-disabled="ok1">添加</button> <button class="btn btn-success" disabled ng-if="wait1"><wait></wait></button> <button class="btn btn-success" type="submit" ng-if="edit&&!wait2" ui-sref="AddressAdd" ng-click="add()" ng-disabled="ok2">修改</button> <button class="btn btn-success" disabled ng-if="wait2"><wait></wait></button> <button class="btn btn-danger" type="button" ng-if="edit&&!wait3" ng-click="delete(id)" ng-disabled="ok3">删除</button> <button class="btn btn-danger" disabled ng-if="wait3"><wait></wait></button> <button class="btn btn-default" ng-click="back()">返回</button></div></form></div><div ng-if="correct_name" class="animate-if"><p>姓名信息有误</p></div><div ng-if="correct_phone" class="animate-if"><p>手机信息有误</p></div><div ng-if="correct_dorm" class="animate-if"><p>宿舍信息有误</p></div><div ng-if="ok1" class="animate-if"><p>添加成功</p></div><div ng-if="ok2" class="animate-if"><p>修改成功</p></div><div ng-if="ok3" class="animate-if"><p>删除成功</p></div>');

  $templateCache.put('setting_signature/setting_signature_tpl.html', '<div class="setting"><textarea focus-me="true" class="form-control" ng-model="signature" row="2" my-maxlength="35"></textarea> <span class="number">{{35 - signature.length}}</span><div class="btn-group"><button class="btn btn-success" ng-click="post()">提交</button> <button class="btn btn-default" ng-click="return()">返回</button></div></div>');

  $templateCache.put('suggest/suggest_tpl.html', '<div class="suggest"><div class="i-suggest"><div class="suggest-header"><h4>说出你的建议和看法帮助改善平台</h4></div><hr><div class="input-group"><img ng-src="{{user.avatar}}"></div><form class="suggestion" name="suggestBox"><textarea class="form-control" name="suggestion" ng-model="suggestion" ng-required="required"></textarea> <button type="submit" class="btn btn-block btn-info" ng-show="!wait" ng-click="post()" ng-disabled="wait2">提交</button> <button class="btn btn-block btn-info" ng-show="wait" disabled><wait></wait></button></form></div></div><div ng-if="wait2" class="animate-if"><p>提交成功，感谢您的反馈</p></div>');

  $templateCache.put('tag-booklists/tag-booklists_tpl.html', '<div class="collect-box booklists-box"><div class="btn-group booklists-box-top"><button class="btn btn-default" ng-click="timeOrder()">时间优先</button> <button class="btn btn-default" ng-click="collectOrder()">收藏优先</button></div><div class="booklists-box-content" infinite-scroll="booklists.nextPage()" infinite-scroll-disabled="booklists.busy" infinite-scroll-distance="1"><a ng-repeat="booklist in booklists.list" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a><div class="loading-more" ng-show="booklists.busy"><i class="fa fa-spinner fa-pulse fa-2x"></i></div></div></div>');

  $templateCache.put('tags/tags_tpl.html', '<loading ng-show="busy"></loading><div class="tags" ng-show="!busy"><span>全部标签</span><div class="tags-group" ng-repeat="oneTags in allTags"><div class="tags-group-one"><p>{{oneTags.title}}</p><a class="btn btn-default" ng-repeat="tag in oneTags.tags" ui-sref="tagBooklists({tag: tag})">{{tag}}</a></div></div></div>');

  $templateCache.put('user_comments/user_comments_tpl.html', '<loading ng-if="busy"></loading><ul class="comments" ng-if="!busy"><div class="empty-alert" ng-if="comments.length==0"><p>您还没有评论，快去评论书籍吧</p></div><li ng-repeat="comment in comments"><div class="comment-title"><div class="comment-action"><i class="fa fa-trash-o" ng-click="deleteBox=true"></i> <i class="fa fa-pencil-square-o" ng-click="focus(this)"></i></div><p>{{comment.book.title}}</p></div><form name="commentForm" class="comment-book"><a ui-sref="book({isbn:comment.book.isbn})"><img ng-src="{{comment.book.image}}"></a><div class="comment-content"><textarea class="form-control" rows="3" name="content" ng-required="required" ng-model="comment.content" ng-bind-html="comment.content" ng-readonly="readonly" focus-me="{{edit}}"></textarea></div><div class="comment-star"><i class="fa fa-thumbs-o-up comment-up">{{comment.up}}</i> <i class="fa fa-thumbs-o-down comment-down">{{comment.down}}</i> <button ng-show="edit&&!wait" class="btn btn-success" ng-click="submit(this)">确认修改</button> <button class="btn btn-success" ng-show="wait" style="width: 80px" disabled><wait></wait></button><uib-rating ng-model="comment.star" max="5" read-only="!edit" class="red-star star" ng-class="{true: \'comment-star-left\'}[edit]" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></div></form><div ng-show="deleteBox" class="modal-dialog"><div class="modal-header"><h4 class="modal-title">你确认要删除评论吗?</h4></div><div class="modal-body"><p>巴拉拉巴拉拉把啦啦啦啦啦啦把啦啦啦啦啦啦吧啦啦啦啦啦巴拉巴拉巴拉吧啦啦啦啦啦。</p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-show="!clickBuy&&!wait" ng-click="delete(comment.id, $index)">确认</button> <button class="btn btn-primary" type="button" ng-show="wait" style="width: 54px"><wait></wait></button> <button class="btn btn-warning" type="button" ng-click="deleteBox=false">取消</button></div></div><div ng-show="deleteBox" class="modal-backdrop fade in" style="z-index: 1040;"></div></li></ul><div ng-if="wait3" class="animate-if"><p>评论删除成功</p></div>');

  $templateCache.put('orders_commented/orders_commented_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><div class="empty-alert" ng-if="items.length==0"><p>没有待评价订单，快去逛逛吧</p></div><li class="order-list-one" ng-repeat="order in orders"><div class="order-title"><span class="order-head">Bookist</span> <span class="order-status">{{order.status}}</span></div><a ui-sref="orderDetail({id: order.id})"><ul class="order-books"><li class="order-book" ng-repeat="book in order.books"><img ng-src="{{book.image}}"><p>{{book.title}}</p><small ng-repeat="x in book.author"><small>{{x}}</small></small> <span class="count">{{book.count}}本 / 共{{book.price*book.count | number:2}}元</span></li></ul></a><div class="order-meta"><div class="order-meta-price"><span class="order-method">{{order.method}}</span> <span class="order-price">实付款 {{order.price}} 元</span></div><a class="btn btn-default" ng-if="order.status==\'待评价\'" ui-sref="orderComments({id: order.id})">评价</a></div></li></ul></div>');

  $templateCache.put('orders_received/orders_received_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><div class="empty-alert" ng-if="orders.length==0"><p>暂无待收货订单，快去逛逛吧</p></div><li class="order-list-one" ng-repeat="order in orders"><div class="order-title"><span class="order-head">Bookist</span> <span class="order-status">{{order.status}}</span></div><a ui-sref="orderDetail({id: order.id})"><ul class="order-books"><li class="order-book" ng-repeat="book in order.books"><img ng-src="{{book.image}}"><p>{{book.title}}</p><small ng-repeat="x in book.author"><small>{{x}}</small></small> <span class="count">{{book.count}}本 / 共{{book.price*book.count | number:2}}元</span></li></ul></a><div class="order-meta"><div class="order-meta-price"><span class="order-method">{{order.method}}</span> <span class="order-price">实付款 {{order.price}} 元</span></div><button class="btn btn-default" ng-if="order.status!=\'待评价\'" ng-click="receipt(order, $index)">确认收货</button></div></li></ul></div>');

}]);

})();