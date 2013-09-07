import os
import urllib
import cgi

from google.appengine.api import users

import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
	extensions=['jinja2.ext.autoescape'])

class MainHandler(webapp2.RequestHandler):
   
    def get(self):

	user = users.get_current_user()

	if user:
		url = users.create_logout_url(self.request.uri)
		url_linktext = 'Logout'
		guestbook_name = user.nickname()
	else:
		url = users.create_login_url(self.request.uri)
		url_linktext = 'Login'
		guestbook_name = ""
	template_values = {
		'guestbook_name': guestbook_name, 
		'url': url,
		'url_linktext': url_linktext,
	}

	template = JINJA_ENVIRONMENT.get_template('index.html')
	self.response.write(template.render(template_values))
	

class Guestbook(webapp2.RequestHandler):
    def post(self):
	user = users.get_current_user()

	if user:
		self.response.write('<html><body>You are:<pre>')
		self.response.write(user.nickname())
		self.response.write('</pre></body></html>')
	else:
		self.redirect(users.create_login_url(self.request.uri))

app = webapp2.WSGIApplication([('/', MainHandler),
	('/sign', Guestbook),],
                              debug=True)
