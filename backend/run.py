# -*- coding: utf-8 -*-

from app import app

if __name__ == '__main__' and app.config['DEBUG']:
    app.run(host='0.0.0.0', debug=True)
