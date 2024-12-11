import re


def transform_logic(code):
    # Define a mapping of logical operations to their substitutions
    logical_ops = {"implies": "=>", "and": "^", "or": "v", "equal": "=="}

    def substitute_logic(match):
        word = match.group(0)
        return logical_ops.get(word.lower(), word.lower())

    # Process the code
    transformed_code = re.sub(
        r"\b(implies|and|or|equal)\b", substitute_logic, code, flags=re.IGNORECASE
    )
    return transformed_code.lower()


# Input code
input_code = """((IMPLIES (NOT (AND (RATIONALP X) (NATP N)))
          (IMPLIES (AND (RATIONALP X) (NATP N))
                   (EQUAL (NPOW/SLOW X N) (EXPT X N))))
 (IMPLIES
  (AND (AND (RATIONALP X) (NATP N)) (NOT (= N 0))
       (IMPLIES (AND (RATIONALP X) (NATP (+ -1 N)))
                (EQUAL (NPOW/SLOW X (+ -1 N)) (EXPT X (+ -1 N)))))
  (IMPLIES (AND (RATIONALP X) (NATP N)) (EQUAL (NPOW/SLOW X N) (EXPT X N))))
 (IMPLIES (AND (AND (RATIONALP X) (NATP N)) (= N 0))
          (IMPLIES (AND (RATIONALP X) (NATP N))
                   (EQUAL (NPOW/SLOW X N) (EXPT X N)))))
                   """

# Transform the input code
output_code = transform_logic(input_code)

# Print the transformed code
print(output_code)
