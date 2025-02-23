
###################################################################################TODO#########################################################################

#                                                       this is the communicator between the IA api and my python server


# Make all suffixed ".mp3" be dynamic for all audio types

# My s3 credentials are not secure whatsoever. 

# downloader() sometimes cannot choose from an empty sequence. Causes program to crash.

# find a way to store the searcher() return temporarily so it doesn't have to keep re-computing... takes a lot of time.

###################################################################################TODO#########################################################################



from flask import Flask, request, jsonify
from flask_cors import CORS
from internetarchive import download, search_items

from dotenv import load_dotenv, dotenv_values

import random
import contextlib
import io
import os

# # Socket for TCP
import socket

# # audio file processing
import requests

import asyncio

import websockets

import boto3





app = Flask(__name__)
CORS(app)

load_dotenv()

print(os.getenv("AWS_SECRET_KEY"))

results = []
indexer = None
random_number = []
random_song = []
thisisit = None

mylist = []
anotherlist = []
output = None
url = None




# This gets a random song and stores the urls in the output variable
def downloader():
    with io.StringIO() as buffer, contextlib.redirect_stdout(buffer):
        download(identifier=f"{results[random_number[0]]}", glob_pattern="*mp3", dry_run=True)
        output = buffer.getvalue()

# This is useful to display just the song name itself.
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

    # Logic for getting a random single song if multiple are returned
    # need to add availability for other file types, but so far mp3 has been every single one
    splitOutput = output.split(".mp3")
    splitOutput2 = splitOutput[:-1]
    randomSong = random.choice(splitOutput2)
    randomSongUrl = randomSong + ".mp3"
    # The randomly chosen song url
    print(randomSongUrl)
    if randomSongUrl.startswith("\n"):
        global url
        url = randomSongUrl[1:]
        return url
    else:
        url = randomSongUrl
        return url

# This download a random song to your computer... not really necessary
# def mp3Downloader(path, filename):
#     download( f"{results[random_number[0]]}", files=filename, glob_pattern="*mp3", destdir=f"{path}")

# This finds a random number based on the amount of songs in an audio collection on Internet Archive
def searcher():
    searched = search_items(query="collection:(freemusicarchive)")
    if len(results) == 0:
        for result in searched:
            results.append(result['identifier'])
    indexer = len(results) - 1
    random_number.append(random.randint(0, indexer))
    print("done searching")
    return random_number
    
# Creates a random number used for finding a random song
searcher()

# Stores the urls of the random song in "url"
downloader()

# I believe this is how I receive a directory from the front end... I don't think I can download stuff to a users specified directory... so this might be dumb.
@app.route('/api/endpoint', methods=['POST'])
def receive_data():
    data = request.get_json() 
    downloader(data['gDirectory'])
    # mp3Downloader(data['gDirectory'], thisisit)
    return jsonify({'message': 'Data received successfully!'})

print(url)

# AWS credentials
AWS_S3_BUCKET_NAME = "firstdemoby"
AWS_REGION = "us-east-2"
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")

# FETCHED_URL = downloader
FETCHED_DATA = requests.get(url)
NAME_FOR_S3 = "fetch-test.mp3"

def main():
    print('in main method')

    s3_client = boto3.client(
        service_name = 's3',
        region_name = AWS_REGION,
        aws_access_key_id = AWS_ACCESS_KEY,
        aws_secret_access_key = AWS_SECRET_KEY
    )

    response = s3_client.upload_fileobj(io.BytesIO(FETCHED_DATA.content), AWS_S3_BUCKET_NAME, NAME_FOR_S3)

    print(f'upload_log_to_aws response: {response}')

if __name__ == '__main__':
    main()








# This is the socket connected to the C++ server

# def send_audio_file(filename, host='127.0.0.1', port=12345):
#     # Open the audio file in binary mode
#     with open(filename, 'rb') as f:
#         audio_data = f.read()

#     # Create a socket object and connect to the server
#     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
#         client_socket.connect((host, port))
#         # Send the binary data of the audio file
#         client_socket.sendall(audio_data)




#This works kind of
# def read_mp3_from_url(url):
# #     # Fetch the MP3 file from the URL
#     response = requests.get(url)

    
# #     # Ensure the request was successful
#     if response.status_code == 200:
# #         # Use BytesIO to create a file-like object from the response content
#         mp3_data = BytesIO(response.content)
        


# #         # Load the MP3 file into pydub (you can process it further as needed)
#         audio = AudioSegment.from_mp3(mp3_data)
#         print(audio)
#         buffer = io.BytesIO()
#         audio.export(buffer, format="mp3")
#         audio_data = buffer.getvalue()

        
# #         # Example: Print out the length of the MP3 file in seconds
#         print(f"Duration of the audio: {audio.duration_seconds} seconds")


#         return audio_data

#     else:
#         print(f"Failed to fetch MP3 from URL. Status code: {response.status_code}")


#                                                                              CREATE AUDIO FILE FROM FETCH






# lol = downloader()

# This is a chunk version
# def send_audio_in_chunks(filepath, chunk_size = 1024):
#      client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#      client_socket.connect(("127.0.0.1", 12345))
#      with open(filepath, 'rb') as audio_file:
#         while chunk := audio_file.read(chunk_size):
#             # Send each chunk to the server (C++)
#             client_socket.sendall(chunk)
     
#      print("Audio File sent success")
#      client_socket.close()

# send_audio_in_chunks(lol)




# result = read_mp3_from_url(downloader())

# async def send_audio():
#     uri = "ws://127.0.0.1:12345"


#     async with websockets.connect(uri) as websocket:
#         await websocket.send(result)
#         print("MP3 data sent to the server")

# asyncio.run(send_audio())



# if __name__ == '__main__':
#     print ("hi")
#     send_audio_file(read_mp3_from_url(downloader()))  # put audio file in arg




