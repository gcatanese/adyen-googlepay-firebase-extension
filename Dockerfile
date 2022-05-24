FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

COPY app/api ./api
COPY app/frontend/app/build ./
COPY app/*.py ./

EXPOSE 5000

CMD [ "python", "./app.py" ]



