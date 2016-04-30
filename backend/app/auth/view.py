# -*- coding: utf-8 -*-
from app import app, wechat
from flask import Blueprint, jsonify, request, render_template, redirect
from app.auth.model import User, WechatOAuth
from app.auth.function import random_str
from time import time


from datetime import datetime, timedelta
from app.lib.api_function import allow_cross_domain
from app.lib.wechat import oauth4link
from app.lib.common_function import return_message


# WECHAT
from wechatpy.utils import check_signature
from wechatpy.exceptions import InvalidSignatureException, WeChatOAuthException


auth_module = Blueprint('auth_module', __name__)


@auth_module.route('/', methods=['GET'])
@oauth4link
def index():
    return render_template('/index.html')


@auth_module.route('/wechat_auth', methods=['GET'])
def wechat_auth():
    """
    微信授权验证
    """

    token = app.config['TOKEN']
    signature = request.args.get('signature', None)
    timestamp = request.args.get('timestamp', None)
    echostr = request.args.get('echostr', None)
    nonce = request.args.get('nonce', None)
    try:
        check_signature(token, signature, timestamp, nonce)
    except InvalidSignatureException:
        return 'failure'

    return str(echostr)


@auth_module.route('/auth_verify', methods=['GET'])
@allow_cross_domain
def auth_verify():
    """
    验证token是否在有效期
    :return:
    """
    user_id = request.args.get('user_id', None)
    token = request.args.get('token', None)
    if user_id and token:
        this_user = User.objects(wechat_openid=user_id)
        this_user = this_user.first() if this_user.count() == 1 else None

        if not this_user:
            return 'failure unknown user', 403

        if not (this_user.wechat.access_token == token and this_user.wechat.token_time + this_user.wechat.expires_in > int(time())):
            try:
                res = wechat.refresh_access_token(this_user.wechat.refresh_token)
            except Exception as e:
                return 'failure refresh', 403
            else:
                this_user.wechat.access_token = res['access_token']
                this_user.wechat.expires_in = res['expires_in']
                this_user.wechat.refresh_token = res['refresh_token']
                this_user.wechat.token_time = int(time())
                this_user.save()

        return return_message('success', {'token': this_user.wechat.access_token, 'time': this_user.wechat.token_time})
    return 'failure data', 403


@auth_module.route('/code2token', methods=['GET'])
def code2token():

    code = request.args.get('code', None)
    if code:
        try:
            token = wechat.fetch_access_token(code)

        except WeChatOAuthException as e:
            # logger
            return 'failure get token'
        else:

            this_user = User.objects(wechat_openid=token['openid'])
            this_user = this_user.first() if this_user.count() == 1 else None
            if not this_user:
                try:
                    print token['openid'], token['access_token']
                    print token
                    user_info = wechat.get_user_info(openid=token['openid'], access_token=token['access_token'])
                except Exception as e:
                    return 'failure get info'
                else:
                    this_user = User(
                        username=user_info['nickname'],
                        country=user_info['country'],
                        city=user_info['city'],
                        province=user_info['province'],
                        wechat_openid=token['openid'],
                        avator=token['headimgurl']
                    )
                    this_user.save()

           # 更新用户信息
            this_user.wechat = WechatOAuth(
                access_token=token['access_token'],
                expires_in=token['expires_in'],
                refresh_token=token['refresh_token'],
                token_time=int(time())
            )
            this_user.wechat.save()
            this_user.save()
            return redirect("http://www.bookist.org/?token={}&user_id={}#/".format(token['access_token'], token['openid'])), 301

    return 'failure get code'


@auth_module.route('/test', methods=['GET'])
def test():

    token = request.headers.get('token', None)
    user_id = request.headers.get('user_id', None)

    return '{}, {}'.format(token, user_id)

