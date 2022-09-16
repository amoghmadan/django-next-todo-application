FROM python:3.9-bullseye

LABEL maintainer="Amogh Madan <amoghmadaan@gmail.com>"

WORKDIR /django-todo-rest-application

RUN python3 -m pip install poetry
RUN apt-get install -y libssl-dev libmariadb-dev

COPY ./pyproject.toml /django-todo-rest-application/
COPY ./poetry.lock /django-todo-rest-application/

RUN poetry install
