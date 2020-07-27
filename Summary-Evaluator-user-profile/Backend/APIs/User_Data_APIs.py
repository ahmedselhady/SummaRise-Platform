import pyrebase
from flask import *
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from flask_cors import CORS

# Firebase configuration
config = {
    "apiKey": "AIzaSyBAyMozO60XLN-H2qskdHlEYkIJ9iN2WM0",
    "authDomain": "aisummarizationevaluatio-cb4a1.firebaseapp.com",
    "databaseURL": "https://aisummarizationevaluatio-cb4a1.firebaseio.com",
    "projectId": "aisummarizationevaluatio-cb4a1",
    "storageBucket": "aisummarizationevaluatio-cb4a1.appspot.com",
    "messagingSenderId": "476970175375",
    "appId": "1:476970175375:web:c0e6e86f413324390a99fa",
    "measurementId": "G-RWRNEB2P2X"
}

firebase = pyrebase.initialize_app(config)

auth = firebase.auth()
db = firebase.database()


# flask apis
app = Flask(__name__)
app.config['SECRET_KEY'] = '$8zmEqZcUsq?L=?URTz43NzQgq!y&2CQq$zdaKA=hm*gwHTE9ZC$p+*?T=HafLaPsrgfvcL&=BP!haUwZkyM'
CORS(app)
# Token to access user througout the web app


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # X-access token is used to be passed in request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # If token is valid reurn user name of user to be passed to functions that require token
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user_id = data['local_id']

        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        # returns the user name before the arguments
        return f(current_user_id, *args, **kwargs)

    return decorated

# sign up function that need email,password,user name, first name,
# last name affiliation and intitute to be sent in json
@app.route('/register', methods=['POST'])
def sign_up():
    data = request.get_json()
    print(db.child("user_names"))
    if db.child("user_names").child(data['user_name']).get().val() == None:
        try:
            # sign in by email and password in firbase
            user = auth.create_user_with_email_and_password(
                data['email'], data['password'])
            del data['email']
            del data['password']
        except:
            return jsonify({'message': 'Email is already existed !!'}) ,200

        # send a verificatio email to user
        auth.send_email_verification(user['idToken'])
        # Get account information
        accountInfo = auth.get_account_info(user['idToken'])
        local_id = accountInfo['users'][0]['localId']

        db.child("user_names").child(data['user_name']).set("")
        db.child("users").child(local_id).set(data)
        db.child("users").child(local_id).child("projects_exist").set(0)
        return jsonify({'message': 'Email is added successfully! Please verify your email!'}) , 200
    else:
        return jsonify({'message': 'Username is already existed !!'}) ,200

# This functio take email and password from app and returns the token that lasts for 1 day if true and return the error message
@app.route('/sign_in', methods=['POST'])
def sign_in():
    web_auth = request.authorization
    try:
        # Sign in with email and password
        user = auth.sign_in_with_email_and_password(
            web_auth.username, web_auth.password)
        accountInfo = auth.get_account_info(user['idToken'])
        local_id = accountInfo['users'][0]['localId']
        email_verified = accountInfo['users'][0]['emailVerified']
        # Check if email is verified
        if email_verified == True:
            # Make a token for 1 day with local id
            token = jwt.encode({'local_id': local_id, 'exp': datetime.datetime.utcnow(
            ) + datetime.timedelta(days=1)}, app.config['SECRET_KEY'])
            return jsonify({'token': token.decode('UTF-8')}),200
        else:
            return jsonify({'message': 'Email is not verified'}),200
    except Exception as e:
        # return a message of type of exception
        if e.args[1][48] == 'I':
            return jsonify({'message': 'Invaid password'}),200
        elif e.args[1][48] == 'E':
            return jsonify({'message': 'Email not found'}),200
        elif e.args[1][48] == 'T':
            return jsonify({'message': 'Too many attempts please try again latter'}),200
        else:
            return jsonify({'message': 'Login failed'}),200

# This function represent the current user with list of projects
@app.route('/user', methods=['GET'])
@token_required
def get_current_user(current_user_id):
    return jsonify(db.child("users").child(current_user_id).get().val()),200

# This function updates the current user information
@app.route('/user', methods=['PUT'])
@token_required
def update_current_user(current_user_id):
    data = request.get_json()
    db.child("users").child(current_user_id).update(data)
    return jsonify({'message': 'Your info has beed updated!'}),200

# This function creates a new project for current user
@app.route('/project/<project_name>', methods=['POST'])
@token_required
def create_project(current_user_id, project_name):
    data = request.get_json()
    # Checks if the name is unique
    if db.child("users").child(current_user_id).child("projects").child(project_name).get().val() == None:
        db.child("users").child(current_user_id).child(
            "projects").child(project_name).set(data)
        db.child("users").child(current_user_id).child("projects_exist").set(1)
        print(data)
        return jsonify({'message': "Project is created"}),200
    else:
        return jsonify({'message': "Project with the same name already existed"}),200

# This function modify existing project
@app.route('/project/<project_name>', methods=['PUT'])
@token_required
def update_project(current_user_id, project_name):
    # Checks if the project existed
    if db.child("users").child(current_user_id).child("projects").child(project_name).get().val() == None:
        return jsonify({'message': 'Project not found!'}),200
    else:
        data = request.get_json()
        db.child("users").child(current_user_id).child(
            "projects").child(project_name).update(data)
        return jsonify({'message': 'project has beed updated!'}),200

# This function delete existing project
@app.route('/project/<project_name>', methods=['DELETE'])
@token_required
def delete_project(current_user_id, project_name):
    # Checks if the project existed
    if db.child("users").child(current_user_id).child("projects").child(project_name).get().val() == None:
        return jsonify({'message': 'Project not found!'}),200
    else:
        db.child("users").child(current_user_id).child(
            "projects").child(project_name).remove()
        if db.child("users").child(current_user_id).child("projects").get().val() == None:
            db.child("users").child(current_user_id).child(
                "projects_exist").set(0)
        return jsonify({'message': 'Project is deleted!'}),200

# This function view existing project
@app.route('/project/<project_name>', methods=['GET'])
@token_required
def view_project(current_user_id, project_name):
    # Checks if the project existed
    if db.child("users").child(current_user_id).child("projects").child(project_name).get().val() == None:
        return jsonify({'message': 'Project not found!'}),200
    else:
        return jsonify(db.child("users").child(current_user_id).child("projects").child(project_name).get().val()),200


# run the app in debug mode
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)
