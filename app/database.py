import sqlite3
from flask import session

DB_FILE = "discobandit.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor()

def createTable():
    '''Creates the table for submissions.'''
    c.execute("CREATE TABLE IF NOT EXISTS submissions (number INTEGER, recipient TEXT, lowercase_recipient TEXT, colorbg TEXT, message TEXT, picture TEXT, time TEXT);")

def addSubmission(name, color, msg, img, timeSent):
    '''Adds a submission to the database.'''
    all = getAllSubmissions()
    # print("adding submission")
    # print(str(len(all) + 1))
    c.execute("INSERT INTO submissions VALUES (?, ?, ?, ?, ?, ?, ?);", (str(len(all) + 1), name, name.lower(), color, msg, img, timeSent))
    # print("added submission")
    db.commit()
    # print("added submission pt 2")


def getAllSubmissions():
    '''Returns a list of submissions.'''
    c.execute("SELECT * FROM submissions;")
    return c.fetchall()

def getNamedSubmissions(name):
    '''Returns a list of submissions that match a given name.'''
    c.execute("SELECT * FROM submissions WHERE lowercase_recipient = (?);", (name.lower(),))
    return c.fetchall()

def getSubmission(submissionnumber):
    '''Returns the submission that matches the given criteria.'''
    c.execute("SELECT * FROM submissions WHERE number = (?);", (submissionnumber,))
    return c.fetchall()

createTable()