# Flowchart-Detection

Detecting hand drawn flowcharts using Tensorflow Object Detection API

This repository uses Tensorflow Object Detection API for detecting hand drawn flowcharts.
The dataset images are located in the folder `models/research/object_detection/images/test`

I have used the Faster-RCNN Inceptionv2 model for detecting the flowcharts.

### Output

![Output](flowchart.png?raw=true)

![Screenshot_20190416_085315](https://user-images.githubusercontent.com/25198226/56179977-345bd200-6025-11e9-8c0f-de8d034388ac.png)

![Screenshot_20190416_085356](https://user-images.githubusercontent.com/25198226/56179978-345bd200-6025-11e9-86e5-1261cd8e16d3.png)

### Running Locally

- Download the models directory and put the models dir in this dir: https://ngte.cowtransfer.com/s/b75ca7f51ebb4a

- Install the [Tensorflow Object Detection API](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/installation.md)

- ```bash
  #From Flowchart-Detection/models
  export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/research:`pwd`/research/slim:`pwd`/research/object_detection
  ```

- ```bash
  #From Flowchart-Detection/
  python Object_detection_image.py        (#You can set any input image of your choice located in models/research/object_detection/images/test inside this script)
  ```
- Coordinates of the bounding boxes will be stored in coordinates.json

**NOTE:** OpenCV is needed for displaying the image. It can be installed using `pip install opencv-python`
