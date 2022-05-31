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
        name = request.form.get('query')
        matches = getNamedSubmissions(name)
        return render_template('index.html', notes = matches)

@app.route("/about")
def about():
        '''Displays the about page.'''
        return render_template('about.html')

@app.route("/notes")
def notes():
        '''Displays the notes page, which allows the user to submit a note.'''
        return render_template('canvas.html')

@app.route("/send", methods=['GET', 'POST'])
def send():
        '''Add submission.'''
        try:
                name = request.form.get('person')
                msg = request.form.get('message')
        except:
                name = "person"
                msg = "hello there"
        color = "blue" # random color for testing purposes
        img = "image" # random for testing purposes
        time = "sometime" # random time for testing purposes
        addSubmission(name, color, msg, img, time)
        return redirect("/") 

@app.route("/note")
def note():
        '''Displays the note page, which allows the user to view an individual note.'''
        return render_template('note.html')

if __name__ == "__main__":
        app.debug = True
        app.run()
