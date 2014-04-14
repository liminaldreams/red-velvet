import os

import webapp2 as web
import oauth2client.appengine as oauth

decorator = oauth.OAuth2DecoratorFromClientSecrets(
    os.path.join(os.path.dirname(__file__), 'client_secrets.json'),
    scope='https://www.googleapis.com/auth/drive')

class MainPage(web.RequestHandler):

    @decorator.oauth_required
    def get(self):
      http = decorator.http()
      # http is authorized with the user's Credentials and can be used
      # in API calls

    # def get(self):
        # self.response.headers['Content-Type'] = "text/plain"
        # self.response.write("Hello World!\n")
        # if (decorator):
            # self.response.write("Decorator instantiated")
        # else:
            # self.response.write("Decorator empty")

class OAuthCallBack(web.RequestHandler):

    # @decorator.oauth_required
    def get(self):
        self.response.write("OAuth sucessful!")

app = web.WSGIApplication([
    ('/', MainPage),
    ('/oauth2callback', OAuthCallBack),
], debug=True)