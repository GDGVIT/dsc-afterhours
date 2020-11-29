from flask import Flask,render_template,redirect,request,url_for
import re
import feedparser
#from parser import *

app=Flask(__name__)

rss_url= 'https://anchor.fm/s/3c55a5f0/podcast/rss'

titles=[]
descs=[]
links=[]
dates=[]

@app.route('/')
def index():

    def cleanhtml(raw_html):
        cleanr = re.compile('<.*?>')
        cleantext = re.sub(cleanr, '', raw_html)
        return cleantext


    parser= feedparser.parse(rss_url)

    for entry in parser.entries:

        title=entry.title
        titles.append(title)
        date=entry.published[5:16]
        dates.append(date)
        #generating iframe src

        src=entry.links[0].href
        indices = [0,25,len(src)]
        parts = [src[i:j] for i,j in zip(indices, indices[1:]+[None])]
        iframe_src=parts[0]+"/embed"+parts[1]
        links.append(iframe_src)
        desc=cleanhtml(entry.content[0].value)
        descs.append(desc)
    print(len(links))
    print(links[0])
    return render_template('index.html',len=len(links),descs=descs,links=links,titles=titles,dates=dates)



if __name__=='__main__':
    app.run(debug=True) 
