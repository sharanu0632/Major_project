from flask import Flask, request, jsonify
import util

app = Flask(__name__)


@app.route('/predict_emotion', methods=['GET','POST'])
def predict_emotion():

    jsn = request.get_json()
    # print(int(jsn["first"]))
    first = int(jsn["first"])
    second = int(jsn["second"])
    third = int(jsn["third"])
    fourth = int(jsn["fourth"])
    fifth = int(jsn["fifth"])
    sixth = int(jsn["sixth"])
    seventh = int(jsn["seventh"])
    eighth = int(jsn["eighth"])
    ninth = int(jsn["ninth"])
    tenth = int(jsn["tenth"])
    response = jsonify({
        'emotion_score': util.predict_emotion(first,second,third,fourth,fifth,sixth,seventh,eighth,ninth,tenth)
    })
    # response=util.predict_emotion(first,second,third,fourth,fifth,sixth,seventh,eighth,ninth,tenth);
    # print(response)
    # response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For the project...")
    util.load_saved_artifacts()
    app.run()