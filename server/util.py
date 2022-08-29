import pickle
import json
import numpy as np

__model = None

def predict_emotion(first,second,third,fourth,fifth,sixth,seventh,eighth,ninth,tenth):

    x = np.zeros(10)
    x[0] = first
    x[1] = second
    x[2] = third
    x[3]= fourth
    x[4]=fifth
    x[5]=sixth
    x[6]=seventh
    x[7]=eighth
    x[8]=ninth
    x[9]=tenth

    

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    

    global __model
    if __model is None:
        with open('./Emotion_test', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")



if __name__ == '__main__':
    load_saved_artifacts()
    print(predict_emotion(3,3,3,3,3,4,4,4,4,4))
    print(predict_emotion(3,1,1,1,1,4,4,4,4,4))