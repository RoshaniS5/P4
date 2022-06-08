#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/P4/")
sys.path.append("/var/www/P4/app/")

from app import app as application
application.secret_key = 'Add your secret key'