
###################################################################################TODO#########################################################################

# this is the communicator between the IAA api and my python server


# https://archive.org/download/The_Dread_-_FMA_Sampler-18671/The_Dread_-_05_-_Thrashin.mp3


from flask import Flask, request, jsonify
from flask_cors import CORS
from internetarchive import download, search_items

import random
import contextlib
import io



#  C:\\Users\\zacha\\Desktop\\empty


app = Flask(__name__)
CORS(app)



results = []
indexer = None
random_number = []
random_song = []
thisisit = None

mylist = []
anotherlist = []
output = None

def downloader(path):
    with io.StringIO() as buffer, contextlib.redirect_stdout(buffer):
        download(identifier=f"{results[random_number[0]]}", destdir=f"{path}", glob_pattern="*mp3", dry_run=True)
        output = buffer.getvalue()

# make sure to split the full urls. We need the full url because we learned how to play audio using just the url.

    # newerstuff = output.replace("\nhttps:", "")
    # abc = newerstuff.replace("archive.org/download", "")
    # cba = abc.replace("https:///", "")
    # cada = cba.split("///")
    # for val in cada:
    #     indexing = val.index("/")
    #     newstring = val[indexing + 1:]
    #     anotherlist.append(newstring)
    # thiswork = len(anotherlist) - 1
    # random_song.append(random.randint(0, thiswork))
    # thisisit = anotherlist[random_song[0]]
    # print(thisisit)
    print(output)
    return output


def mp3Downloader(path, filename):
    download( f"{results[random_number[0]]}", files=filename, glob_pattern="*mp3", destdir=f"{path}")

def searcher():
    searched = search_items(query="collection:(freemusicarchive)")
    if len(results) == 0:
        for result in searched:
            results.append(result['identifier'])
    indexer = len(results) - 1
    random_number.append(random.randint(0, indexer))
    print("done searching")
    return random_number
    

searcher()


@app.route('/api/endpoint', methods=['POST'])
def receive_data():
    data = request.get_json() 
    downloader(data['gDirectory'])
    # mp3Downloader(data['gDirectory'], thisisit)
    return jsonify({'message': 'Data received successfully!'})




if __name__ == '__main__':
    app.run(debug=True)