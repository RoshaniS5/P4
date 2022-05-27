from flask import Flask, render_template
app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello, welcome to P4!"

@app.route("/canvas")
def canvas():
    return render_template('canvas.html')
if __name__ == "__main__":
    app.run()
