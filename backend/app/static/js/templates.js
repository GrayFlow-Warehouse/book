;(function(){

'use strict';

angular.module('index').run(['$templateCache', function($templateCache) {

  $templateCache.put('booklist/booklist_tpl.html', '<loading ng-if="busy"></loading><div class="booklist" ng-if="!busy"><div class="booklist-header"><img class="booklist-image-cover" ng-src="{{booklist.image}}"><h3>{{booklist.title}}</h3><p>{{booklist.description}}</p><img class="avatar" ng-src="{{booklist.author.avatar}}"> <small>{{booklist.author.name}} / {{booklist.collect}}人收藏</small> <button class="btn btn-info" ng-click="collect()" ng-show="!booklist.collect_already"><i class="fa fa-bookmark-o"></i> 收藏书单</button> <button class="btn btn-info" ng-click="collect()" ng-show="booklist.collect_already"><i class="fa fa-bookmark"></i> 已收藏</button></div><div class="booklist-tags"><div class="booklist-tags-outer"><div class="booklist-tags-inner"><span class="tag">标签</span> <a class="tag" ng-repeat="tag in booklist.tags" ui-sref="booklists({tag: tag})">{{tag}}</a></div></div></div><div class="booklist-books slides-box-content"><a ng-repeat="book in booklist.books" ui-sref="book({isbn: book.isbn})"><div class="book-img"><img class="cover cover-sm" ng-src="{{book.image}}"> <img class="cover-bg" ng-src="{{book.image}}"></div><div class="book-message"><div class="book-message-top"><span class="book-message-top-title">{{book.title}}</span><div class="book-message-top-rate"><span>&nbsp;{{book.rate}}</span><uib-rating class="red-star" ng-model="book.star" max="5" read-only="true" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></div></div><span class="book-message-author" ng-if=\'book.author!=""\'><span ng-repeat="x in book.author">{{x}}</span></span></div><div class="book-reason"><p name="reason">{{book.reason}}</p></div></a></div></div>');

  $templateCache.put('book/book_tpl.html', '<loading ng-if="busy"></loading><div class="book-detail" ng-if="!busy"><div class="book-img"><img class="cover" ng-src="{{book.image}}"> <img class="cover-bg" ng-src="{{book.image}}"></div><div class="book"><div class="book-info"><h3>{{book.title}}</h3><div class="book-info-rate"><uib-rating class="star wechat-fix" ng-model="book.star" max="5" read-only="true" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating><span class="rate">{{book.rate}}</span> <span class="collect">({{book.comments.length}}人评价)</span> <a class="book-info-more-option" ui-sref="bookDetail({isbn: book.isbn})" ng-click="busy=true"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></div><div class="book-info-basic"><span class="author" ng-if=\'book.author!=""\'><span ng-repeat="x in book.author">{{x}}</span>/</span> <span class="publisher" ng-if=\'book.publisher!=""\'>{{book.publisher}} /</span> <span class="publish_time" ng-if=\'book.publish_time!=""\'>{{book.publish_time}}</span></div></div><div class="book-section"><span name="price">¥ {{book.price | number:2 }}</span> <button class="btn btn-success" ng-click="collect()" ng-if="!book.collect_already"><i class="fa fa-bookmark-o"></i> 收藏</button> <button class="btn btn-success" ng-click="collect()" ng-if="book.collect_already"><i class="fa fa-bookmark"></i> 已收藏</button> <button class="btn btn-danger" ng-click="book.cart = true"><i class="fa" ng-class="{\'fa-cart-plus\':book.cart,\'fa-shopping-cart\':!book.cart}"></i> 加入购物车</button></div><div class="clearfix"></div><div class="book-intro"><span>简介</span><p ng-class="{\'book-intro-less\':!more,\'book-intro-more\':more}">{{book.description}}</p><button class="btn btn-block btn-default" ng-show="!more" ng-click="more=!more">更多</button> <button class="btn btn-block btn-default" ng-show="more" ng-click="more=!more">收起</button></div><div class="book-comments"><span>评论</span><div class="book-comment" ng-repeat="comment in book.comments"><div class="book-comment-origin"><img ng-src="{{comment.user.avatar}}"> <span>{{comment.user.username}}</span><uib-rating class="star red-star" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" ng-model="comment.star" max="5" read-only="true"></uib-rating></div><p>{{comment.content}}</p><div class="comment-meta"><p>{{comment.create_time | date:\'yyyy-MM-dd HH:mm:ss\'}}</p><i class="fa" ng-class="{false:\'fa-thumbs-o-down\',true:\'fa-thumbs-down\'}[comment.down_already]" ng-click="down(comment)">{{comment.down}}</i> <i class="fa" ng-class="{false:\'fa-thumbs-o-up\',true:\'fa-thumbs-up\'}[comment.up_already]" ng-click="up(comment)">{{comment.up}}</i></div><div class="clearfix"></div></div><div class="book-comments-more"><a class="btn btn-default" ui-sref="commentsBook({isbn: book.isbn})">全部评论</a> <button class="btn btn-default" ng-click="commentBox=!comment;">我要评论</button></div><div class="book-comment-box" ng-show="commentBox"><div class="book-comment-origin"><img ng-src="{{user.avatar}}"> <span class="book-comment-origin">{{user.username}}</span><uib-rating class="star red-star" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" ng-model="star" max="5" read-only="false" on-hover="hoveringOver(value)"></uib-rating></div><textarea ng-model="content" class="form-control" rows="3"></textarea><div class="book-comment-post"><p>评价 "{{book.title}}"</p><button class="btn btn-success" ng-click="postComment()">发表</button></div></div></div><div class="books-similarity"><span>购买此书的人最近也购买</span><div class="slides-book-content"><a ng-repeat="book in booksBought" ui-sref="book({isbn: book.isbn})"><img ng-src="{{book.image}}"><p>{{book.title}}</p><uib-rating ng-model="book.star" class="red-star wechat-fix" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" max="5" read-only="true"></uib-rating><span>{{book.rate}}</span></a></div></div><div class="booklists-box"><span>被以下书单收集</span><div class="booklists-box-content"><a ng-repeat="booklist in booklists" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a></div></div></div></div>');

  $templateCache.put('booklists/booklists_tpl.html', '<div class="tags-hot" ng-if="!busy"><div class="tags-hot-header"><p>选书单</p><a ui-sref="tags">查看全部标签 ></a></div><div class="tags-hot-list"><a class="btn btn-default" ng-repeat="tag in tags" ui-sref="tagBooklists({tag: tag})">{{tag}}</a></div></div><div class="booklists-box"><div class="btn-group booklists-order"><button class="btn btn-default" ng-click="timeOrder()">时间优先</button> <button class="btn btn-default" ng-click="collectOrder()">收藏优先</button></div><div class="booklists-box-content" infinite-scroll="booklists.nextPage()" infinite-scroll-disabled="booklists.busy" infinite-scroll-distance="1"><a ng-repeat="booklist in booklists.list" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a><div class="loading-more" ng-show="booklists.busy"><i class="fa fa-spinner fa-pulse fa-2x"></i></div></div></div>');

  $templateCache.put('book_info/book_info_tpl.html', '<loading ng-if="busy"></loading><div class="book-box-outer" ng-if="!busy"><div class="book-box"><header class="book-box-head">出版信息</header><article class="book-box-article"><section><span class="info" ng-if=\'book.title!=""\'>标题: {{book.title}}</span> <span class="info" ng-if=\'book.subtitle!=""\'>副标题: {{book.subtitle}}</span> <span class="info" ng-if=\'book.origin_title!=""\'>原标题: {{book.origin_title}}</span> <span class="info" ng-if=\'book.author!=""\'>作者：<span ng-repeat="x in book.author">{{x}}</span></span> <span class="info" ng-if="book.translator" !>译者: <span ng-repeat="x in book.translator">{{x}}</span></span> <span class="info" ng-if=\'book.publisher!=""\'>出版社: {{book.publisher}}</span> <span class="info" ng-if=\'book.publish_time!=""\'>出版年: {{book.publish_time}}</span> <span class="info" ng-if="!book.page">页数: {{book.page}}</span> <span class="info" ng-if=\'book.price!=""\'>定价: {{book.price}}</span> <span class="info" ng-if=\'book.binding!=""\'>装帧: {{book.binding}}</span> <span class="info" ng-if=\'book.isbn!=""\'>ISBN: {{book.isbn}}</span></section></article></div><div class="book-box" ng-if=\'book.description!=""\'><header>书籍内容介绍</header><article><section><p class="info">{{book.description}}</p></section></article></div><div class="book-box" ng-if=\'book.author_intro!=""\'><header>作者介绍</header><article><section><p class="info">{{book.author_description}}</p></section></article></div><div class="book-box" ng-if=\'book.catelog!=""\'><header>目录</header><article><section><p class="info">{{book.catelog}}</p></section></article></div></div>');

  $templateCache.put('cart/cart_tpl.html', '<loading ng-if="busy"></loading><div class="shop-group" ng-if="!busy"><div class="shop-cart-count"><div class="shop-cart-count-core"><h3>小计(4本书): ¥ {{price | number:2 }}</h3><i class="fa fa-info"></i> <span>享受免邮和送书上门</span></div><a class="btn btn-danger">结算</a></div><ul class="shop-cart-list"><div class="empty-alert" ng-if="items.length==0"><p>购物车为空，快去逛逛吧</p></div><li ng-repeat="item in items" ng-if="!item.removed"><div class="shop-cart-item"><a class="cart-book-image" ui-sref="book({isbn: item.isbn})"><img ng-src="{{item.image}}"></a><div class="cart-book-name"><a ui-sref="book({isbn: item.isbn})">{{item.title}}</a><div class="clearfix"></div><span ng-repeat="x in item.author"><span>{{x}}</span></span></div><p class="cart-book-price">¥ {{item.price | number:2 }}</p><div class="cart-book-edit"><input type="number" ng-model="item.count" value="{{item.count}}" ng-blur="editBook(item)"> <button class="btn btn-default" ng-click="removeBook(item, $index)">删除</button> <button class="btn btn-default" ng-click="mark(item, $index)">移入收藏夹</button></div></div></li></ul></div>');

  $templateCache.put('collect_booklists/collect_booklists_tpl.html', '<loading ng-if="busy"></loading><div class="booklists-box collect-box" ng-if="!busy"><div class="booklists-box-top btn-group"><a class="btn btn-default" ui-sref="booklistsCollect">书单收藏夹</a> <a class="btn btn-default" ui-sref="booksCollect">书籍收藏夹</a></div><div class="booklists-box-content"><a ng-repeat="booklist in booklists" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a></div></div>');

  $templateCache.put('collect_books/collect_books_tpl.html', '<loading ng-if="busy"></loading><div class="booklists-box collect-box" ng-if="!busy"><div class="booklists-box-top btn-group"><a class="btn btn-default" ui-sref="booklistsCollect">书单收藏夹</a> <a class="btn btn-default" ui-sref="booksCollect">书籍收藏夹</a></div><div class="books"><div class="books-content"><div class="books-content-list" ng-repeat="book in books"><a ui-sref="book({isbn: book.isbn})"><img ng-src="{{book.image}}"></a> <span class="title">&nbsp;{{book.title}}<i class="mark-book-remove fa fa-trash-o" ng-click="remove(book, $index)"></i></span><uib-rating class="star red-star wechat-fix" ng-model="book.star" max="5" read-only="true" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating><span class="rate">&nbsp;{{book.rate}}</span><blockquote class="reason">{{book.reason}}</blockquote></div></div></div></div>');

  $templateCache.put('comments/comments_tpl.html', '<loading ng-if="busy"></loading><div class="book-comments-all"><div class="navbar navbar-default navbar-fixed-top"><a class="navbar-brand">全部评论</a></div><div class="book-comments-list" ng-if="!busy"><div class="book-comments"><div class="book-comment" ng-repeat="comment in comments"><div class="book-comment-origin"><img ng-src="{{comment.book.image}}"> <span class="book-comment-origin">{{comment.user.username}}</span><uib-rating class="star red-star" ng-model="comment.star" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" max="5" read-only="true"></uib-rating></div><p>{{comment.content}}</p><div class="comment-meta"><p>{{comment.create_time | date:\'yyyy-MM-dd HH:mm:ss\'}}</p><i class="fa" ng-class="{false:\'fa-thumbs-o-down\',true:\'fa-thumbs-down\'}[comment.down_already]" ng-click="down(comment)">{{comment.down}}</i> <i class="fa" ng-class="{false:\'fa-thumbs-o-up\',true:\'fa-thumbs-up\'}[comment.up_already]" ng-click="up(comment)">{{comment.up}}</i></div><div class="clearfix"></div></div></div></div></div>');

  $templateCache.put('me/me_tpl.html', '<div class="me"><div class="user"><img ui-sref="settings" ng-src="{{user.gravatar}}"><div ui-sref="settings" class="user-name"><p>{{user.name}}</p></div><a ui-sref="settings"><i class="fa fa-cog fa-lg"></i></a> <a ui-sref="notices"><i class="fa fa-envelope-o fa-lg"></i></a></div><div class="order-panel"><a ui-sref="cart" class="order-bar-split"><span>{{user.cart}}</span> <span>待付款</span></a> <a ui-sref="ordersWait" class="order-bar-split"><span>{{user.order.wait}}</span> <span>待收货</span></a> <a ui-sref="ordersReceived" class="order-bar-split"><span>{{user.order.received}}</span> <span>待评价</span></a></div><div class="user-items"><a ui-sref="point" class="user-item"><i class="fa fa-ticket"></i>积分</a> <a ui-sref="orders" class="user-item"><i class="fa fa-ticket"></i>全部订单</a></div><div class="user-items"><a ui-sref="booklistsCollect" class="user-item"><i class="fa fa-folder"></i>收藏</a> <a ui-sref="comments" class="user-item"><i class="fa fa-comments"></i>评论</a></div><div class="user-items"><a href class="user-item"><i class="fa fa-cloud"></i>关于</a> <a href class="user-item"><i class="fa fa-commenting"></i>帮助与反馈</a></div></div>');

  $templateCache.put('index/index_tpl.html', '<div class="slides"><uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides"><uib-slide ng-repeat="slide in slides track by slide.id" index="slide.id"><img ng-src="{{slide.image}}" style="margin:auto;"></uib-slide></uib-carousel></div><div class="slides-book"><div class="slides-book-header"><i class="fa fa-book"></i> <span>书籍推荐</span> <a ui-sref="recommend">更多 ></a></div><div class="slides-book-content"><a ng-repeat="book in books" ui-sref="book({isbn:book.isbn})"><img ng-src="{{book.image}}"><p>{{book.title}}</p><uib-rating ng-model="book.star" class="red-star wechat-fix" max="5" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'" read-only="true"></uib-rating><span>{{book.rate}}</span></a></div></div><div class="booklists-box"><div class="booklists-box-header"><i class="fa fa-list"></i> <span>热门书单</span> <a ui-sref="popular">更多 ></a></div><div class="booklists-box-content"><a ng-repeat="booklist in booklists" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a></div></div>');

  $templateCache.put('navbar/navbar_tpl.html', '<nav class="bookist-nav navbar navbar-default" role="navigation"><ul class="nav navbar-nav"><li><a ui-sref="index"><i class="fa fa-home fa-lg"></i><p>首页</p></a></li><li><a ui-sref="booklists"><i class="fa fa-th-large fa-lg"></i><p>书单</p></a></li><li><a ui-sref="me"><i class="fa fa-user fa-lg"></i><p>我的</p></a></li></ul></nav>');

  $templateCache.put('notices/notices_tpl.html', '<loading ng-if="busy"></loading><ul class="notices" ng-if="!busy"><div class="empty-alert" ng-if="notices.length==0"><p>暂无消息</p></div><li class="notice" ng-repeat="notice in notices"><div class="notice-title"><p>{{notice.title}}</p><span>{{notice.create_time}}</span></div><p class="notice-content">{{notice.content}}</p><a class="notice-read" ng-href="#/notice/{{notice.id}}"><span>查看</span> <i class="fa fa-chevron-right" aria-hidden="true"></i></a></li></ul>');

  $templateCache.put('orders/orders_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><div class="empty-alert" ng-if="orders.length==0"><p>您还没有订单，快去逛逛吧</p></div><li class="order-list-one" ng-repeat="order in orders"><div class="order-title"><span class="order-head">Bookist</span> <span class="order-status">{{order.status}}</span></div><a ui-sref="orderDetail({id:order.id})"><ul class="order-books"><li class="order-book" ng-repeat="book in order.books"><img ng-src="{{book.image}}"><p>{{book.title}}</p><small ng-repeat="x in book.author"><small>{{x}}</small></small> <span class="count">{{book.count}}本 / 共{{book.price*book.count | number:2}}元</span></li></ul></a><div class="order-meta"><div class="order-meta-price"><span class="order-method">{{order.method}}</span> <span class="order-price">实付款 {{order.price}} 元</span></div><a class="btn btn-default" ng-if="order.status==\'待评价\'" ui-sref="orderComments({id:order.id})">评价</a> <button class="btn btn-default" ng-if="order.status!=\'待评价\'" ng-click="receipt(order)">确认收货</button></div></li></ul></div>');

  $templateCache.put('orders_received/orders_received_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><div class="empty-alert" ng-if="items.length==0"><p>没有待评价订单，快去逛逛吧</p></div><li class="order-list-one" ng-repeat="order in orders"><div class="order-title"><span class="order-head">Bookist</span> <span class="order-status">{{order.status}}</span></div><a ui-sref="orderDetail({id: order.id})"><ul class="order-books"><li class="order-book" ng-repeat="book in order.books"><img ng-src="{{book.image}}"><p>{{book.title}}</p><small ng-repeat="x in book.author"><small>{{x}}</small></small> <span class="count">{{book.count}}本 / 共{{book.price*book.count | number:2}}元</span></li></ul></a><div class="order-meta"><div class="order-meta-price"><span class="order-method">{{order.method}}</span> <span class="order-price">实付款 {{order.price}} 元</span></div><a class="btn btn-default" ng-if="order.status==\'待评价\'" ui-sref="orderComments({id: order.id})">评价</a></div></li></ul></div>');

  $templateCache.put('orders_wait/orders_wait_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><div class="empty-alert" ng-if="orders.length==0"><p>暂无待收货订单，快去逛逛吧</p></div><li class="order-list-one" ng-repeat="order in orders"><div class="order-title"><span class="order-head">Bookist</span> <span class="order-status">{{order.status}}</span></div><a ui-sref="orderDetail({id: order.id})"><ul class="order-books"><li class="order-book" ng-repeat="book in order.books"><img ng-src="{{book.image}}"><p>{{book.title}}</p><small ng-repeat="x in book.author"><small>{{x}}</small></small> <span class="count">{{book.count}}本 / 共{{book.price*book.count | number:2}}元</span></li></ul></a><div class="order-meta"><div class="order-meta-price"><span class="order-method">{{order.method}}</span> <span class="order-price">实付款 {{order.price}} 元</span></div><button class="btn btn-default" ng-if="order.status!=\'待评价\'" ng-click="receipt(order, $index)">确认收货</button></div></li></ul></div>');

  $templateCache.put('order_detail/order_detail_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><ul class="order-list"><li class="order-list-one"><div class="order-title"><span class="order-head">订单详细信息</span> <span class="order-status">共{{order.price}}元</span></div><ul class="order-books"><a class="order-book" ui-sref="book({isbn: book.isbn})" ng-repeat="book in order.books"><img ng-src="{{book.image}}"><p>{{book.title}}</p><small ng-repeat="x in book.author"><small>{{x}}</small></small> <span class="count">{{book.count}}本 / 共{{book.price*book.count | number:2}}元</span></a></ul><div class="order-detail"><div class="order-title"><span class="order-head">订单状态</span> <span class="order-status">{{order.status}}</span></div><ul class="order-process"><li ng-repeat="x in order.process"><span>{{x.status}}</span> <span>{{x.time}}</span></li></ul></div><div class="order-receipt"><div class="order-title"><span class="order-head">订单收货信息</span></div><div class="order-receipt-meta"><p>收货人: {{order.receipt.name}}</p><p>联系电话: {{order.receipt.phone}}</p><p>收货地址: {{order.receipt.dorm}}</p></div></div><div class="order-detail-clear"></div><div class="order-meta order-meta-fix-bottom"><div class="order-meta-price"><span class="order-method">{{order.method}}</span> <span class="order-price">实付款 {{order.price}} 元</span></div><a class="btn btn-default" ng-if="order.status==\'待评价\'" ui-sref="orderComments({id: order.id})">评价</a> <button class="btn btn-default" ng-if="order.status!=\'待评价\'" ng-click="receipt(order)">确认收货</button></div></li></ul></div>');

  $templateCache.put('order_comments/order_comments_tpl.html', '<loading ng-if="busy"></loading><div class="order-group" ng-if="!busy"><div class="order-list-one"><div class="order-title"><span class="order-head">订单详细信息</span> <span class="order-status">建议您把书看完再来评价书籍哦~</span></div><ul class="order-books order-comments"><li class="order-book" ng-repeat="book in order.books"><a ui-sref="book({isbn: book.isbn})" class="order-img"><img ng-src="{{book.image}}"></a><div class="order-comment"><textarea class="form-control" rows="3" placeholder="认真评价可以获得积分哦~"></textarea></div><div class="order-star"><span>书籍评分</span><uib-rating ng-model="book.stars" max="5" read-only="false" class="star red-star" on-leave="overStar = null" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></div></li></ul><div class="platform-comment"><div class="platform-comment-title"><span class="order-head">平台评分</span></div><ul class="platform-comment-items"><li><span>购书体验</span><uib-rating ng-model="stars1" max="5" read-only="false" class="red-star star" on-leave="overStar = null" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></li><li><span>物流服务</span><uib-rating ng-model="stars2" max="5" read-only="false" class="red-star star" on-leave="overStar = null" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></li><li><span>服务态度</span><uib-rating ng-model="stars3" max="5" read-only="false" class="red-star star" on-leave="overStar = null" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></li></ul></div><div class="order-comment-fix-bottom"><button class="btn btn-danger" ng-click="comment()">发表评价</button></div></div></div>');

  $templateCache.put('point/point_tpl.html', '<loading ng-if="busy"></loading><div class="points" ng-if="!busy"><div class="point-history"><div class="point-header"><span>当前积分: {{user.point}}</span></div><ul class="point-list"><li ng-repeat="x in points"><span class="point-title">{{x.title}}</span> <span class="point-result" ng-if="x.point>0">+ {{x.point}}</span> <span class="point-result" ng-if="x.point<0">- {{x.point}}</span></li></ul></div></div>');

  $templateCache.put('popular_more/popular_more_tpl.html', '<div class="booklists-box"><div class="booklists-box-content" infinite-scroll="booklists.nextPage()" infinite-scroll-disabled="booklists.busy" infinite-scroll-distance="1"><a ng-repeat="booklist in booklists.list" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a><div class="loading-more" ng-show="booklists.busy"><i class="fa fa-spinner fa-pulse fa-2x"></i></div></div></div>');

  $templateCache.put('recommend_more/recommend_more_tpl.html', '<div class="books"><div class="books-content" infinite-scroll="books.nextPage()" infinite-scroll-disabled="books.busy" infinite-scroll-distance="1"><a class="books-content-list" ng-repeat="book in books.list" ui-sref="book({isbn: book.isbn})"><img ng-src="{{book.image}}"> <span class="title">{{book.title}}</span><uib-rating class="star red-star wechat-fix" ng-model="book.star" max="5" read-only="true" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating><span class="rate">&nbsp;{{book.rate}}</span><blockquote class="reason">{{book.reason}}</blockquote></a><div class="loading-more" ng-show="books.busy"><i class="fa fa-spinner fa-pulse fa-2x"></i></div></div></div>');

  $templateCache.put('settings/settings_tpl.html', '<div class="user-items"><a class="user-item"><i class="fa fa-folder user-item-gravatar"><span>头像</span></i><img ng-src="{{user.image}}"></a> <a class="user-item"><i class="fa fa-comments"><span>昵称</span></i><input type="text" ng-blur="edit()" ng-model="user.name" class="form-control edit-name"></a></div><div class="user-items"><a class="user-item" ng-click="change()"><i class="fa fa-cloud"><span>性别</span></i><span>{{user.sex}}</span></a> <a ui-sref="signature({signature: user.signature})" class="user-item"><i class="fa fa-cloud"><span>个性签名</span></i><p ng-if="user.signature!=\'\'">{{user.signature}}</p></a> <a ui-sref="address" class="user-item"><i class="fa fa-commenting"><span>我的地址</span></i></a></div>');

  $templateCache.put('setting_address/setting_address_tpl.html', '<div class="setting"><div class="address-list" ng-repeat="x in address" ng-click="edit($index)"><p>{{x.name}}, {{x.phone}}</p><small>{{x.dorm}}</small></div><div class="btn-group"><button class="btn btn-success" ui-sref="AddressAdd">添加</button> <button class="btn btn-default" ng-click="return()">返回</button></div></div>');

  $templateCache.put('setting_address_add/setting_address_add_tpl.html', '<div class="setting"><form><div class="form-group"><label>收货人</label> <input type="text" focus-me="true" ng-model="name" class="form-control" placeholder="姓名"></div><div class="form-group"><label>手机号码</label> <input type="number" ng-model="phone" class="form-control" placeholder="11位手机号"></div><div class="form-group"><label>宿舍地址</label> <input type="text" ng-model="dorm" class="form-control" placeholder="宿舍位置"></div><div class="btn-group"><button class="btn btn-success" type="submit" ui-sref="AddressAdd" ng-click="add()">添加</button> <button class="btn btn-danger" type="button" ng-if="deleteBox" ng-click="delete(id)">删除</button> <button class="btn btn-default" ng-click="return()">返回</button></div></form></div>');

  $templateCache.put('setting_signature/setting_signature_tpl.html', '<div class="setting"><textarea focus-me="true" class="form-control" ng-model="signature" row="2" my-maxlength="35"></textarea> <span class="number">{{35 - signature.length}}</span><div class="btn-group"><button class="btn btn-success" ng-click="post()">提交</button> <button class="btn btn-default" ng-click="return()">返回</button></div></div>');

  $templateCache.put('tag-booklists/tag-booklists_tpl.html', '<div class="collect-box booklists-box"><div class="btn-group booklists-box-top"><button class="btn btn-default" ng-click="timeOrder()">时间优先</button> <button class="btn btn-default" ng-click="collectOrder()">收藏优先</button></div><div class="booklists-box-content" infinite-scroll="booklists.nextPage()" infinite-scroll-disabled="booklists.busy" infinite-scroll-distance="1"><a ng-repeat="booklist in booklists.list" ui-sref="booklist({id: booklist.id})"><img ng-src="{{booklist.image}}"> <span class="title">{{booklist.title}}</span> <span class="collect">{{booklist.collect}}人收藏</span><div class="booklist-tag"><button class="btn btn-default" ng-repeat="tag in booklist.tags">{{tag}}</button></div></a><div class="loading-more" ng-show="booklists.busy"><i class="fa fa-spinner fa-pulse fa-2x"></i></div></div></div>');

  $templateCache.put('tags/tags_tpl.html', '<loading ng-show="busy"></loading><div class="tags" ng-show="!busy"><span>全部标签</span><div class="tags-group" ng-repeat="oneTags in allTags"><div class="tags-group-one"><p>{{oneTags.title}}</p><a class="btn btn-default" ng-repeat="tag in oneTags.tags" ui-sref="tagBooklists({tag: tag})">{{tag}}</a></div></div></div>');

  $templateCache.put('user_comments/user_comments_tpl.html', '<loading ng-if="busy"></loading><ul class="comments" ng-if="!busy"><div class="empty-alert" ng-if="comments.length==0"><p>您还没有评论，快去评论书籍吧</p></div><li ng-repeat="comment in comments"><div class="comment-title"><span>{{comment.book.title}}</span> <i class="fa fa-trash-o" ng-click="deleteBox=true"></i> <i class="fa fa-pencil-square-o" ng-click="focus(this)"></i></div><div class="comment-book"><a ui-sref="book({isbn:comment.book.isbn})"><img ng-src="{{comment.book.image}}"></a><div class="comment-content"><textarea class="form-control" rows="3" ng-model="comment.content" ng-readonly="readonly" focus-me="{{edit}}"></textarea></div></div><div class="comment-star"><i class="fa fa-thumbs-o-up comment-up">{{comment.up}}</i> <i class="fa fa-thumbs-o-down comment-down">{{comment.down}}</i> <button ng-show="edit" class="btn btn-success" ng-click="submit(this)">确认修改</button><uib-rating ng-model="comment.star" max="5" read-only="!edit" class="red-star star" ng-class="{true: \'comment-star-left\'}[edit]" state-on="\'fa fa-star\'" state-off="\'fa fa-star-o\'"></uib-rating></div><div ng-show="deleteBox" class="modal-dialog"><div class="modal-header"><h4 class="modal-title">你确认要删除评论吗?</h4></div><div class="modal-body"><p>巴拉拉巴拉拉把啦啦啦啦啦啦把啦啦啦啦啦啦吧啦啦啦啦啦巴拉巴拉巴拉吧啦啦啦啦啦。</p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-show="!clickBuy" ng-click="delete(comment.id, $index)">确认</button> <button class="btn btn-warning" type="button" ng-click="deleteBox=false">取消</button></div></div><div ng-show="deleteBox" class="modal-backdrop fade in" style="z-index: 1040;"></div></li></ul>');

}]);

})();