FROM python:3.12-slim-bookworm

LABEL maintainer="Amogh Madan <amoghmadaan@gmail.com>"

WORKDIR /tracker

RUN python3 -m pip install poetry gunicorn

COPY ./pyproject.toml ./poetry.lock /tracker/

RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-interaction --no-ansi
