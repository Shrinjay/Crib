from python:latest

RUN apt-get install git
RUN git clone https://github.com/geopandas/geopandas.git
RUN pip3 install ./geopandas

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD [ "python3", "main.py"]