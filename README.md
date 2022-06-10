# Project Iris by Sleepy Starfish  
Project Iris is a collection of anonymous drawings with notes like that of The Unsent Project (https://theunsentproject.com/). The Unsent Project is made up of texts that were not sent towards their loved ones, in it you can choose color and a name to send it to. On Project Iris, you can see notes in order of time submission and are also able to search for notes directed towards a certain name. In addition to text, users will be able to attach drawings to their notes.  

[Here](https://www.youtube.com/watch?v=SOPrf7jQW-E) is the link to our demo video.  
[Here](http://67.205.148.205/P4/) is the link to our site.

## Devos:  
Roshani Shrestha (PM)  
Yuqing Wu  
Angela Zhang  
Hebe Huang  


### Task Division:
Roshani:
- Python/Flask (rendering pages, searching for notes, using the PurgoMalum API) 
- JS (initial work involving drawing on canvas) 
- Database (storing and searching for notes)
- Deploying app onto droplet

Yuqing:
- Python/Flask (sorting notes, using the GIPHY API)
- JS (dragging stickers onto the canvas, saving notes when searching up stickers)
- Database (sorting notes)

Angela:
- HTML files (templates, overall organization of pages)
- CSS (making the site prettier, designing the navbar, Bootstrap)

Hebe:
- CSS (making the site prettier, organizing the elements on the new note page, Bootstrap)
- HTML files (organizing elements on the new note page)
- JS (saving canvas as an image, adding text on canvas, adjusting pen sizes/colors)     
   
## API Cards:
PurgoMalum (https://github.com/stuy-softdev/notes-and-code/blob/main/api_kb/411_on_PurgoMalum.md)  
PurgoMalum checks if there is profanity in text. It also replaces profanity in text with asterisks.  
We are using this API to remove profanity from notes that people submit. They will appear in the form of asterisks.  
  
GIPHY (https://github.com/stuy-softdev/notes-and-code/blob/main/api_kb/411_on_GIPHY.md)  
GIPHY provides stickers and GIFs from their library.  
We are using this API to allow users to add stickers to their notes. 

## Launch Codes
- Install and activate virtual environment <br>
$ ```python3 -m venv ~/drachma``` <br>
Linux: $ ```source ~/drachma/bin/activate``` <br>
Windows: $ ```source ~/drachma/Scripts/activate``` <br><br>
- Clone the Repository <br>
(drachma)$ ```git clone https://github.com/RoshaniS5/P4.git ``` <br><br>
- Install Dependencies <br>
(drachma)$ ```cd P4 ``` <br>
(drachma)$ ```pip install -r requirements.txt``` <br><br> 
- Upload API keys into the `keys` directory (found inside `app` directory) <br><br> 
- Run the app <br>
(drachma)$ ```cd app``` <br>
(drachma)$ ```python3 __init__.py``` <br><br>
- Open the website at http://127.0.0.1:5000/
