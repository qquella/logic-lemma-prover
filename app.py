from flask import Flask, request, jsonify
from src.lemma_prover import generate_proof

app = Flask(__name__)


@app.route("/prove", methods=["POST"])
def prove():
    """
    API endpoint to prove lemmas.
    Supports preamble customization and model selection.
    """
    data = request.json
    lemma = data.get("lemma", "")
    model = data.get("model", "gpt-4")
    preamble = data.get("preamble", None)  # Optional custom preamble

    try:
        proof = generate_proof(lemma, model)
        return jsonify({"proof": proof})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
