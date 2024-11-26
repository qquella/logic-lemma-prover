from src.constants import MODEL_MAP


def select_model(model):
    """
    Returns the model engine name for OpenAI API.
    """
    return MODEL_MAP.get(model, "text-davinci-003")
