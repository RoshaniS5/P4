# Sleepy Starfish - Roshani Shrestha (Pete), Yuqing Wu (Zero), Angela Zhang (Inky), Hebe Huang (Umbreon)
# SoftDev Pd2
# P04 -- Project Iris
# 2022-05-27

from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3
from database import *

app = Flask(__name__)

@app.route("/")
def home():
        '''Displays the home page.'''
        # addSubmission("Roshani", "green", "heyy", "image", "sometime")
        # addSubmission("Someone", "green", "heyy", "image", "sometime")
        totalList = getAllSubmissions()
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
        color = "blue" # random color for testing purposes
        img = "image" # random for testing purposes
        time = "sometime" # random time for testing purposes
        try:
                name = request.args.get('person')
                if len(name) == 0:
                        return render_template('canvas.html', error="You didn't enter a recipient! Please enter a name and try again.")
                msg = request.args.get('message')
                addSubmission(name, color, msg, img, time)
                print(name + color + msg + img + time)
        except:
                return render_template('canvas.html', error="Some unknown error has occurred. Please try again.")
        # print(request.form.get('person'))
        # print(request.form.get('message'))
        return redirect("/")

@app.route("/note")
def note():
        '''Displays the note page, which allows the user to view an individual note.'''
        totalList = getAllSubmissions()
        try:
                which = request.args.get('whichnote')
                return render_template('note.html', note=totalList[which])
        except:
                return render_template('index.html', error="Some unknown error has occurred. Please try again.")

if __name__ == "__main__":
        app.debug = True
        app.run()
