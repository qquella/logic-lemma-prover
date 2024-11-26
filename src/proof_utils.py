def validate_lemma_format(lemma):
    """Validates if the lemma follows the expected format."""
    if not lemma.strip():
        raise ValueError("Lemma cannot be empty.")
    # Add more validation logic if needed
    return True
