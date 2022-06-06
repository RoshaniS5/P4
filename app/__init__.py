# Sleepy Starfish - Roshani Shrestha (Pete), Yuqing Wu (Zero), Angela Zhang (Inky), Hebe Huang (Umbreon)
# SoftDev Pd2
# P04 -- Project Iris
# 2022-05-27

from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3
from database import *

app = Flask(__name__)

@app.route("/",methods=['GET', 'POST'])
def home():
        '''Displays the home page.'''
        # addSubmission("Roshani", "green", "heyy", "image", "sometime")
        # addSubmission("Someone", "green", "heyy", "image", "sometime")
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

@app.route("/newNote")
def notes():
        '''Displays the notes page, which allows the user to submit a note.'''
        return render_template('canvas.html')

@app.route("/send", methods=['GET', 'POST'])
def send():
        '''Add submission.'''
        color = "pink" # random color for testing purposes
        # img = "image" # random for testing purposes
        try:
                print("sending")
                name = request.form.get('name')
                if len(name) == 0:
                        return render_template('canvas.html', error="You didn't enter a recipient! Please enter a name and try again.")
                msg = request.form.get('message')
                time = request.form.get('when')
                img = request.form.get('imgLink')
                color = request.form.get('bkgd')
                # print(name)
                # print(color)
                # print(msg)
                # print(img)
                # print(time)
                addSubmission(name, color, msg, img, time)
        except:
                return render_template('canvas.html', error="Some unknown error has occurred. Please try again.")
        # print(request.form.get('person'))
        # print(request.form.get('message'))
        return redirect("/")

@app.route("/note")
def note():
        '''Displays the note page, which allows the user to view an individual note.'''
        totalList = getAllSubmissions("time")
        try:
                # which0 = request.args.get('0')
                # which1 = request.args.get('1')
                # which2 = request.args.get('2')
                # which3 = request.args.get('3')
                # which4 = request.args.get('4')
                whichnum = request.args.get('num')
                which = getSubmission(whichnum)
                # print(which[0][5])
                return render_template('note.html', note=which[0])
        except:
                return render_template('index.html', error="Some unknown error has occurred. Please try again.")

if __name__ == "__main__":
        app.debug = True
        app.run()
