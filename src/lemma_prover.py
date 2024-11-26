from src.constants import PRETRAIN_MESSAGE


def generate_proof(lemma, model="gpt-4"):
    """
    Generates a proof for the given lemma using a specified GPT model.
    Includes the pretraining message to ensure consistent context.
    """
    try:
        model_name = select_model(model)
        full_prompt = (
            f"{PRETRAIN_MESSAGE}\n\nUse the examples above to prove the given below: "
        )

        response = openai.Completion.create(
            engine=model_name, prompt=full_prompt, max_tokens=1500
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error generating proof: {str(e)}"
