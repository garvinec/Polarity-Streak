from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/alph-a-row', methods=['POST'])
def alph_a_row():
	data = request.get_json()

	return jsonify({})