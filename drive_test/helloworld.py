import webapp2 as web

class MainPage(web.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = "text/plain"
        self.response.write("Hello World!")

app = web.WSGIApplication([
    ('/', MainPage),
], debug=True)