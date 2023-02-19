FROM python:3.10-buster

# ENV POETRY_VERSION=1.0.8

# TODO: add poetry or install dependencies
# RUN pip install "poetry==$POETRY_VERSION"
RUN pip install libgomp1
RUN pip install scikit-learn
RUN pip install pandas
RUN pip install uvicorn
RUN pip install fastapi

RUN pip install nltk
RUN sudo python -m nltk.downloader -d /usr/local/share/nltk_data all

RUN pip install openai

WORKDIR /app/

# COPY pyproject.toml /app/
# COPY poetry.lock /app/

# RUN poetry install --no-dev

COPY . /app/

# CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]