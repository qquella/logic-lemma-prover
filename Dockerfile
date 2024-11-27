# # Start with a lightweight Python image
# FROM python:3.9-slim

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the project files into the container
# COPY .env /app/.env

# COPY requirements.txt /app/requirements.txt


# # Install dependencies from requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# # Expose the port the application will run on
# EXPOSE 5001

# # Define the command to run the application
# CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:app"]

# Start with a lightweight Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Upgrade pip
RUN pip install --upgrade pip

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Verify installed packages (for debugging)
# RUN pip show openai

# Expose the port the application will run on
EXPOSE 5001

# Define the command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:app"]