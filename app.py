import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from src.lemma_prover import generate_proof
from dotenv import load_dotenv
import os
import openai
from src.config import OPENAI_API_KEY


load_dotenv()  # Load environment variables from .env
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Welcome to the Logic Lemma Prover!"


@app.route("/lemma")
def lemma():
    return "Lemma endpoint is working!"


@app.route("/prove", methods=["GET", "POST"])
def prove():
    if not request.is_json:
        print("Content-Type:", request.content_type)
        print("Data:", request.data)
        print("Is JSON:", request.is_json)
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    logging.debug(f"Received request data: {data}")

    lemma = data.get("lemma", "")
    model = data.get("model", "gpt-4o")
    preamble = data.get("preamble", None)
    logging.debug(f"Lemma: {lemma}, Model: {model}")

    if not lemma:
        return jsonify({"error": "Lemma cannot be empty"}), 400

    try:
        proof = generate_proof(lemma, model, api_key=OPENAI_API_KEY)
        return jsonify({"proof": proof}), 200
    except Exception as e:
        logging.exception("Error generating proof")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)


@app.route("/submit", methods=["POST"])
def submit():
    return "Data submitted!"


def handler(event, context):
    from mangum import Mangum

    asgi_handler = Mangum(app)
    return asgi_handler(event, context)
