#!/usr/bin/env python

import cgi
import os
import random
import simplejson

from google.appengine.api import users
from google.appengine.ext import webapp, db
from google.appengine.ext.webapp import util, template

DEBUG = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')

ADMINS = ['emiraga@gmail.com', 'kalajdzic@gmail.com']

'''RECIT_LIST = [
    'Abdul_Basit_Murattal_192kbps',
    'Abdullah_Basfar_192kbps',
    'Abdurrahmaan_As-Sudais_192kbps',
    'Hani_Rifai_192kbps',
    'Minshawy_Mujawwad_192kbps',
]'''

SURAH_NAME = [
    "",#0-th index
    "Al-Fatihah",
    "Al-Baqara",
    "Al-i'Imran",
    "An-Nisaa",
    "Al-Maidah",
    "Al-An'am",
    "Al-A'raf",
    "Al-Anfal",
    "At-Tauba",
    "Yunus",
    "Hud",
    "Yusuf",
    "Ar-Ra'd",
    "Ibrahim",
    "Al-Hijr",
    "An-Nahl",
    "Al-Israa",
    "Al-Kahf",
    "Maryam",
    "Ta-ha",
    "Al-Anbiyaa",
    "Al-Hajj",
    "Al-Muminun",
    "An-Nur",
    "Al-Furqan",
    "Ash-Shu'araa",
    "An-Naml",
    "Al-Qasas",
    "Al-Ankabut",
    "Ar-Rum",
    "Luqman",
    "As-Sajda",
    "Al-Ahzab",
    "Saba",
    "Fatir",
    "Ya-Sin",
    "As-Saffat",
    "Sad",
    "Az-Zumar",
    "Al-Mu'min",
    "Ha-Mim",
    "Ash-Shura",
    "Az-Zukhruf",
    "Ad-Dukhan",
    "Al-Jathiya",
    "Al-Ahqaf",
    "Muhammad",
    "Al-Fat-h",
    "Al-Hujurat",
    "Qaf",
    "Az-Zariyat",
    "At-Tur",
    "An-Najm",
    "Al-Qamar",
    "Ar-Rahman",
    "Al-Waqi'a",
    "Al-Hadid",
    "Al-Mujadila",
    "Al-Hashr",
    "Al-Mumtahana",
    "As-Saff",
    "Al-Jumu'a",
    "Al-Munafiqun",
    "At-Tagabun",
    "At-Talaq",
    "At-Tahrim",
    "Al-Mulk",
    "Al-Qalam",
    "Al-Haqqa",
    "Al-Ma'arij",
    "Nuh",
    "Al-Jinn",
    "Al-Muzzammil",
    "Al-Muddathth",
    "Al-Qiyamat",
    "Ad-Dahr",
    "Al-Mursalat",
    "An-Nabaa",
    "An-Nazi'at",
    "Abasa",
    "At-Takwir",
    "Al-Infitar",
    "Al-Mutaffife",
    "Al-Inshiqaq",
    "Al-Buruj",
    "At-Tariq",
    "Al-A'la",
    "Al-Gashiya",
    "Al-Fajr",
    "Al-Balad",
    "Ash-Shams",
    "Al-Lail",
    "Adh-Dhuha",
    "Al-Sharh",
    "At-Tin",
    "Al-Alaq",
    "Al-Qadr",
    "Al-Baiyina",
    "Al-Zalzalah",
    "Al-Adiyat",
    "Al-Qari'a",
    "At-Takathur",
    "Al-Asr",
    "Al-Humaza",
    "Al-Fil",
    "Quraish",
    "Al-Ma'un",
    "Al-Kauthar",
    "Al-Kafirun",
    "An-Nasr",
    "Al-Lahab",
    "Al-Ikhlas",
    "Al-Falaq",
    "Al-Nas"
]

RECIT_LIST = [
    'Abdul Basit Murattal',
    'Abdullah Basfar',
    'Abdurrahmaan As-Sudais',
    'Hani Rifai',
    'Minshawy Mujawwad',
]

# 1, 101...114
WHICH_SURAH = [1] + [i for i in range(101,115)]

AYAH_PER_SURAH = [
    0, #0-th index
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99,
    128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34,
    30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29,
    18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12,
    30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29,
    19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8,
    11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
]
assert len(AYAH_PER_SURAH) == 115

AYAH_LIST = [{'ayah':ayah, 'surah':surah}
                for surah in WHICH_SURAH
                for ayah in range(1,AYAH_PER_SURAH[surah]+1)
            ]

def gcd(a, b):
    """
    Greatest common divisor
    """
    return a if not b else gcd(b, a % b)

# Database schema for a schema-less database
# Store Samples for phonetic
class Sample(db.Model):
    """
    Models an individual Sample entry with an content, and date.
    """
    date = db.DateTimeProperty(auto_now_add=True)
    surah_ayah = db.StringProperty(required=True)
    content = db.StringProperty(required=True)
    # user identifier, just because we can
    ip = db.StringProperty()
    browser = db.StringProperty()

# Store emails for notification
class EmailNotify(db.Model):
    email = db.StringProperty(required=True)
    # user identifier, just because we can
    ip = db.StringProperty()
    browser = db.StringProperty()

class MainHandler(webapp.RequestHandler):
    def get(self):
        """
        Main handler for root "/" of the project
        """

        # We use random permutation generator using multiplicative group
        seed = int(self.request.get('seed', random.randint(2, 1000)))
        index = int(self.request.get('index', 1))
        while gcd(seed, len(AYAH_LIST)) > 1:
            seed += 1

        el = AYAH_LIST[ (seed * index)%len(AYAH_LIST) ]

        template_values = {
            'reciters' : RECIT_LIST,
            'seed' : seed,
            'index' : index,
            'ayah_list' : simplejson.dumps(AYAH_LIST),
            'surah_name' : simplejson.dumps(SURAH_NAME),
            'debug' : DEBUG,
            'mp3url' : "/mp3/0_%d_%d.mp3" % (el['surah'], el['ayah']),
            'surah' : el['surah'],
            'ayah' : el['ayah'],
            'ayah_title' : "Qur'an: "+ SURAH_NAME[el['surah']] +", " + str(el['ayah'])
        }

        # Render the template "index.html"
        path = os.path.join(os.path.dirname(__file__), 'templates/index.html')
        self.response.out.write(template.render(path, template_values))

class AddNewSample(webapp.RequestHandler):
    def post(self):
        """
        When user presses the add new sample
        """
        seed = int(self.request.get('seed'))
        index = int(self.request.get('index'))
        surah = int(self.request.get('surah'))
        ayah = int(self.request.get('ayah'))
        content = self.request.get('content')

        el = AYAH_LIST[ (seed * index)%len(AYAH_LIST) ]

        if el['ayah'] == ayah and surah == el['surah'] and gcd(seed, len(AYAH_LIST)) == 1:
            if content:
                s = Sample(
                    content=content,
                    surah_ayah=str(surah)+':'+str(ayah),
                    ip = self.request.remote_addr,
                    browser = self.request.user_agent,
                )
                s.save()
            success = True
        else:
            success = False

        if self.request.is_xhr:
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(simplejson.dumps({
                'success' : success
            }))
        else:
            # not from ajax
            self.redirect("/?seed=%d&index=%d"%(seed,index+1))

class AddEmailNotify(webapp.RequestHandler):
    def post(self):
        email = self.request.get('email')
        if email:
            s = EmailNotify(
                email = email,
                ip = self.request.remote_addr,
                browser = self.request.user_agent,
            )
            s.save()
        if self.request.is_xhr:
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(simplejson.dumps({
                'success' : True
            }))
        else:
            # not from ajax
            self.response.out.write('Your email is added to notification list. '+
                                    '<a href="/">Back to front page.</a>')
            #self.redirect("/")

class AdminPage(webapp.RequestHandler):
    def get(self):
        """
        Use google API to authenticate admin users
        """
        user = users.get_current_user()

        # This is actually a double-check, it is also
        # checked in "app.yaml", look for "login: admin"
        if not user or user.email() not in ADMINS:
            self.redirect(users.create_login_url(self.request.uri))
            return

        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write("Hello, %s" % (user.nickname()))
        self.response.out.write("Hello, %s" % (user.email()))

def main():
    """
    App entry point
    """
    application = webapp.WSGIApplication(
        [
            ('/', MainHandler),
            ('/addsample', AddNewSample),
            ('/addemail', AddEmailNotify),
            ('/admin', AdminPage),
        ],
        debug=DEBUG)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main()
