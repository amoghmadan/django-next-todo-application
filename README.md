# Django Todo REST Application

**Python 3.{8,9}.X and Django 3.2.X**

It is a very simple Todo Application built using Django and Vue. The root of the project is tracker.

## Setup Guide [Development]

**Begin**
- Install Git and Python 3.{8,9}
- Clone the project: ```git clone https://github.com/amoghmadan/Django-Todo-REST-Application.git```
- Move into the directory: ```cd Django-Todo-REST-Application```
- Create a virtual environment: ```python -m venv venv```

**Activate Virtual Environment**
- *On Linux*: ```. venv/bin/activate```
- *On Windows*: ```venv\Scripts\activate```

**Final Steps**
- Install dependencies: ```pip install -r requirements/generic.txt -r requirements/development.txt```
- Change directory to source: ```cd src```
- Run development server: ```python manage.py runserver```

## Run Tests (How to?)

- Run tests: ```python manage.py test```

## Generate Deployment Files

- Generate service file: ```python manage.py deploy -ev TRACKER_ENV -e production```

*On Windows*: tracker.cmd [Will be generated]

*On Linux*: tracker.service [Will be generated]

## Deploy On Windows (with nssm)

**Get and Setup NSSM**
- Download: https://nssm.cc/download
- Extract nssm and add to path (make sure you do not have multiple versions)

**Get the service set up**
- Go to: 'tracker.cmd' -> Right Click -> Run as Administrator

**Last Steps**
- Search 'Services' in start menu
- Find: 'Tracker' -> Right Click -> Start

***For Reverse Proxy With IIS See Online Articles***

## Deploy On Linux (with systemd)

- Copy Service File to Systemd System Folder
```sudo cp tracker.service /etc/systemd/system/```
- Enable Service
```sudo systemctl enable tracker.service```
- Start Service
```sudo systemctl start tracker.service```

***For Reverse Proxy With nginx or Apache See Online Articles***
