import requests
from flask import Flask, render_template, request, jsonify
from bs4 import BeautifulSoup
from pymongo import MongoClient
import certifi
from dotenv import load_dotenv
import os
from datetime import datetime
load_dotenv()
app = Flask(__name__)

load_dotenv()
MONGODB_URL = os.getenv('MONGODB_URL')

ca = certifi.where()
client = MongoClient(MONGODB_URL, tlsCAFile=ca)

db = client.toyprojectdb

@app.route('/')
def home():
  return render_template('index.html')

# BACKGROUND ----------------------------------------------------------------- #


# WEATHER -------------------------------------------------------------------- #


# TODOLIST ------------------------------------------------------------------- #

#=============================================================================== todo-list 글 작성(엔터 눌렸을 때)
@app.route("/todoWriteAction", methods=["POST"])
def todoWriteAction():
    todo_receive = request.form['togoVal']
    name_receive = request.form['nameVal']
    total = len(list(db.todo.find({})))+1

    now = datetime.now()
    doc = {
        'todo': todo_receive,
        'name': name_receive,
        'done':0,
        'num':total,
        'dateTime':now
    }
    db.todo.insert_one(doc)
    return jsonify({'msg': '완료!'})

#========================================================================================== todo-list 글 가져옴
@app.route("/getTodoList", methods=["GET"])
def getTodoList():
    nameVal = request.args.get('nameVal')
    print('nameVal->',nameVal)
    test_info = list(db.todo.find({'name':nameVal}))
    i=0
    for info in test_info:
        i=i+1
        db.todo.update_one({'_id':info['_id'],'name':nameVal},{'$set':{'num':i}})

    all_todo = list(db.todo.find({'name':nameVal},{'_id':False}))
    print(all_todo)
    return jsonify({'msg': all_todo})

#========================================================================================== todo-list 글 수정
@app.route("/todoModify", methods=["POST"])
def todoModify():
    data_receive = request.form['modiData']
    num_receive = int(request.form['modiNum'])
    doc = {
        'todo':data_receive,
        'num':num_receive
    }
    print(data_receive, num_receive)
    db.todo.update_one({'num':num_receive},{'$set':{'todo':data_receive}})
    return jsonify({'msg': '완료!'})

#=========================================================================================== todo-list 글 지움
@app.route("/deleteAction", methods=["POST"])
def deleteAction():
    num_receive = int(request.form['todoNum'])
    name_receive = request.form['nameVal']
    doc = {
        'num':num_receive,
        'name':name_receive
    }
    print(doc)
    db.todo.delete_one(doc)
    return jsonify({'msg': '완료!'})

# QUOTE ---------------------------------------------------------------------- #


# DB TEST -------------------------------------------------------------------- #
@app.route('/dbtest', methods=['POST'])
def dbtest_post():
  text_receive = request.form['text_give']

  doc = {
    'text': text_receive,
  }
  db.testdb.insert_one(doc)
  return jsonify({'msg': 'MONGODB TEST SUCCESS'})


if __name__ == '__main__':
  app.run('0.0.0.0', port=5000, debug=True)