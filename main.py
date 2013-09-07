import cgi

from google.appengine.api import users
from lib import soundcloud

import webapp2

MAIN_PAGE_HTML = """\
<html>
  <body>
    <form action="/sign" method="post">
      <div><textarea name="content" rows="3" cols="60"></textarea></div>
      <div><input type="submit" value="Sign Guestbook"></div>
    </form>
  </body>
</html>
"""

class MainHandler(webapp2.RequestHandler):
   
    def get(self):
	self.response.write(MAIN_PAGE_HTML)

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
