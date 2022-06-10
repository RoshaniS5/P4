# Sleepy Starfish - Roshani Shrestha (Pete), Yuqing Wu (Zero), Angela Zhang (Inky), Hebe Huang (Umbreon)
# SoftDev Pd2
# P04 -- Project Iris
# 2022-05-27

from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3
import json
import ssl
import urllib.request
from database import *
import json
from urllib import parse
from urllib import request as url_req

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def home():
        '''Displays the home page.'''
        totalList = getAllSubmissions("time")
        if (request.method == "POST"):
            if (request.form.get('name')=="sort by name"):
                totalList=getAllSubmissions("name")
        return render_template('index.html', notes = totalList)

@app.route("/time")
def sortByTime():
        '''Sorts notes by time, from most recent to least recent.'''
        return render_template('index.html')

@app.route("/name")
def sortByName():
        '''Sorts notes in alphabetical order by name.'''
        return render_template('index.html')

@app.route("/search", methods=['GET', 'POST'])
def search():
        '''Displays all notes with the specified name as the recipient'''
        try:
                name = request.form['query']
                matches = getNamedSubmissions(name)
                return render_template('index.html', notes = matches)
        except:
                return render_template('index.html', error="Some unknown error has occurred. Please try again.")


@app.route("/about")
def about():
        '''Displays the about page.'''
        return render_template('about.html')

@app.route("/newNote", methods=['GET', 'POST'])
def notes():
    '''Displays the notes page, which allows the user to submit a note.'''
    imgs=[]
    key = True
    try:
        if(request.method=="POST"):
                sticker_name = request.form.get('sticker_name')
                url = "http://api.giphy.com/v1/stickers/search"

                f = open("keys/key_giphy.txt", "r")
                api_key = f.read().strip()

                params = parse.urlencode({
                "q": sticker_name,
                "api_key": api_key,
                "limit": "16"
                })

                with url_req.urlopen("".join((url, "?", params))) as response:
                        data = json.loads(response.read())
                        try:
                                for i in data['data']:
                                        imgs.append(i['images']['original']['url'])
                        except:
                                pass
    except:
        key = False
    return render_template('canvas.html', imgs=imgs, isThereKey=key, message=request.form.get("savedmsg"))

def makeClean(input):
        '''Purifies text for younger audiences'''
        input = input.replace(" ", "%20")
        url = "https://www.purgomalum.com/service/json?text=" + input
        data = urllib.request.urlopen(url)
        read_data = data.read()
        d_data = read_data.decode('utf-8')
        p_data = json.loads(d_data)
        return p_data['result']

@app.route("/send", methods=['GET', 'POST'])
def send():
        '''Add submission.'''
        # color = "pink" # random color for testing purposes
        # img = "image" # random for testing purposes
        try:
                print("sending")
                name = request.form.get('name')
                if len(name) == 0:
                        return render_template('canvas.html', error="You didn't enter a recipient! Please enter a name and try again.")
                name = makeClean(name)
                msg = makeClean(request.form.get('message'))
                print(msg)
                time = request.form.get('when')
                img = request.form.get('imgLink')
                color = request.form.get('bkgd')
                txtColor = request.form.get('textcolor')
                # print(p_data)
                # print(name)
                # print(color)
                # print(msg)
                # print(img)
                # print(time)
        except:
                name = request.form.get('name')
                if len(name) == 0:
                        return render_template('canvas.html', error="You didn't enter a recipient! Please enter a name and try again.")
                msg = request.form.get('message')
                time = request.form.get('when')
                img = request.form.get('imgLink')
                color = request.form.get('bkgd')
                txtColor = request.form.get('textcolor')
        # print(request.form.get('name'))
        # print(request.form.get('message'))
        addSubmission(name, color, msg, img, time, txtColor)
        return redirect("/")

@app.route("/note")
def note():
        '''Displays the note page, which allows the user to view an individual note.'''
        totalList = getAllSubmissions("time")
        try:
                whichnum = request.args.get('num')
                which = getSubmission(whichnum)
                # print(which[0][5])
                return render_template('note.html', note=which[0])
        except:
                return render_template('index.html', error="Some unknown error has occurred. Please try again.")

if __name__ == "__main__":
        app.debug = True
        app.run()
