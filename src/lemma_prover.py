import openai
from openai import OpenAIError, AuthenticationError
from src.config import OPENAI_API_KEY
from src.constants import PRETRAIN_MESSAGE, MODEL_MAP


def generate_proof(lemma, model="gpt-4o", api_key=None):
    if not api_key:
        raise ValueError("OpenAI API key is required.")

    client = openai.OpenAI(api_key=api_key)

    try:
        model_name = select_model(model)
        messages = [
            # {"role": "assistant", "content": PRETRAIN_MESSAGE},
            # {"role": "user", "content": lemma},
            {
                "role": "user",
                "content": f"{PRETRAIN_MESSAGE}\n\nuse the example above to prove the following: {lemma}",
            }
        ]

        response = client.chat.completions.create(
            model=model_name,
            messages=messages,
            max_tokens=4096,
        )

        return response.choices[0].message.content.strip()

    except AuthenticationError as e:
        return f"Error: Invalid API Key. {str(e)}"
    except OpenAIError as e:
        return f"Error connecting to OpenAI API: {str(e)}"
    except Exception as e:
        return f"Error generating proof: {str(e)}"


def select_model(model):
    return MODEL_MAP.get(model, "gpt-4o")
