# This is a potassium-standard dockerfile, compatible with Banana

# Don't change this. Currently we only support this specific base image.
FROM pytorch/pytorch:1.11.0-cuda11.3-cudnn8-runtime

WORKDIR /

# Install git
RUN apt-get update && apt-get install -y git

# Install python packages
RUN pip3 install --upgrade pip
ADD model-api/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt --no-cache-dir

ADD . .

EXPOSE 8000

CMD python3 -u model-api/app.py