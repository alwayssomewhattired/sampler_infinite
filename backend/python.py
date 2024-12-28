from flask import Flask, request, jsonify
from flask_cors import CORS
from internetarchive import download

app = Flask(__name__)
CORS(app)

@app.route('/api/endpoint', methods=['POST'])
def receive_data():
    data = request.get_json() 
    print(data)  # Print the received data
    # return jsonify({'message': 'Data received successfully!'})
    
def downloader():
    return print(download(identifier="Ex_Military-9086", destdir="C:\\Users\\zacha\\Desktop\\empty"))

downloader()


if __name__ == '__main__':
    app.run(debug=True)