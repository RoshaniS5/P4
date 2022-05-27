# Sleepy Starfish - Roshani Shrestha (Pete), Yuqing Wu (Zero), Angela Zhang (Inky), Hebe Huang (Umbreon)
# SoftDev Pd2
# P04 -- Project Iris
# 2022-05-27

from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
        '''Displays the home page.'''
        return render_template('index.html')

@app.route("/time")
def sortByTime():
        '''Sorts notes by time, from most recent to least recent.'''
        return render_template('index.html')

@app.route("/name")
def sortByName():
        '''Sorts notes in alphabetical order by name.'''
        return render_template('index.html')

@app.route("/search")
def search():
        '''Displays all notes with the specified name as the recipient'''
        return render_template('index.html')

@app.route("/about")
def about():
        '''Displays the about page.'''
        return render_template('about.html')

@app.route("/notes")
def notes():
        '''Displays the notes page, which allows the user to submit a note.'''
        return render_template('canvas.html')

@app.route("/send")
def send():
        '''Add submission.'''
        return redirect("/")

@app.route("/note")
def note():
        '''Displays the note page, which allows the user to view an individual note.'''
        return render_template('note.html')

if __name__ == "__main__":
        app.debug = True
        app.run()
