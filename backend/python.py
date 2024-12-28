from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/endpoint', methods=['POST'])
def receive_data():
    data = request.get_json() 
    print(data)  # Print the received data
    return jsonify({'message': 'Data received successfully!'})

if __name__ == '__main__':
    app.run(debug=True)