######## Image Object Detection Using Tensorflow-trained Classifier #########

# Import packages
import os
import cv2
import numpy as np
import tensorflow as tf
import sys
import json

# This is needed since the notebook is stored in the object_detection folder.
sys.path.append("models/research/object_detection/")

# Import utilites
from utils import label_map_util
from utils import visualization_utils as vis_util

class FlowchartDetection:

	def __init__(self, IMAGE_NAME, MODEL_NAME='inference_graph'):
		self.MODEL_NAME = MODEL_NAME
		self.IMAGE_NAME = 'images/test/' + IMAGE_NAME
		self.CWD_PATH = os.getcwd()
		self.PATH_TO_CKPT = os.path.join(self.CWD_PATH, 'models', 'research', 'object_detection', self.MODEL_NAME,'frozen_inference_graph.pb')
		self.PATH_TO_LABELS = os.path.join(self.CWD_PATH, 'models', 'research', 'object_detection', 'training','flowchart_label_map.pbtxt')
		self.PATH_TO_IMAGE = os.path.join(self.CWD_PATH, 'models', 'research', 'object_detection', self.IMAGE_NAME)
		self.NUM_CLASSES = 7

	def load_graph(self):
		# Load the label map.
		# Label maps map indices to category names
		# Here we use internal utility functions, but anything that returns a
		# dictionary mapping integers to appropriate string labels would be fine
		self.label_map = label_map_util.load_labelmap(self.PATH_TO_LABELS)
		self.categories = label_map_util.convert_label_map_to_categories(self.label_map, max_num_classes=self.NUM_CLASSES, use_display_name=True)
		self.category_index = label_map_util.create_category_index(self.categories)

		# Load the Tensorflow model into memory.
		self.detection_graph = tf.Graph()
		with self.detection_graph.as_default():
			od_graph_def = tf.GraphDef()
			with tf.gfile.GFile(self.PATH_TO_CKPT, 'rb') as fid:
				serialized_graph = fid.read()
				od_graph_def.ParseFromString(serialized_graph)
				tf.import_graph_def(od_graph_def, name='')

	def detect(self):

		self.load_graph()
		sess = tf.Session(graph=self.detection_graph)

		# Define input and output tensors (i.e. data) for the object detection classifier
		# Input tensor is the image
		image_tensor = self.detection_graph.get_tensor_by_name('image_tensor:0')

		# Output tensors are the detection boxes, scores, and classes
		# Each box represents a part of the image where a particular object was detected
		detection_boxes = self.detection_graph.get_tensor_by_name('detection_boxes:0')

		# Each score represents level of confidence for each of the objects.
		# The score is shown on the result image, together with the class label.
		detection_scores = self.detection_graph.get_tensor_by_name('detection_scores:0')
		detection_classes = self.detection_graph.get_tensor_by_name('detection_classes:0')

		# Number of objects detected
		num_detections = self.detection_graph.get_tensor_by_name('num_detections:0')

		# Load image using OpenCV and
		# expand image dimensions to have shape: [1, None, None, 3]
		# i.e. a single-column array, where each item in the column has the pixel RGB value
		image = cv2.imread(self.PATH_TO_IMAGE)
		image_expanded = np.expand_dims(image, axis=0)

		# Perform the actual detection by running the model with the image as input
		(boxes, scores, classes, num) = sess.run(
			[detection_boxes, detection_scores, detection_classes, num_detections],
			feed_dict={image_tensor: image_expanded})

		# Draw the results of the detection

		vis_util.visualize_boxes_and_labels_on_image_array(
			image,
			np.squeeze(boxes),
			np.squeeze(classes).astype(np.int32),
			np.squeeze(scores),
			self.category_index,
			use_normalized_coordinates=True,
			line_thickness=8,
			min_score_thresh=0.80)

		json_coordinates = []

		class_name_list, left_coordinates, right_coordinates, top_coordinates, 	bottom_coordinates, bounding_box_width_list, bounding_box_height_list = vis_util.export_bounding_box_coordinates()
		for i in range(len(class_name_list)):
			coordinate = {
							'class': class_name_list[i],
							'top_left': (left_coordinates[i], top_coordinates[i]),
							'top_right': (right_coordinates[i], top_coordinates[i]),
							'bottom_left': (left_coordinates[i], bottom_coordinates[i]),
							'bottom_right': (right_coordinates[i], bottom_coordinates[i]),
							'bbox_width': bounding_box_width_list[i],
							'bbox_height': bounding_box_height_list[i]
						 }
			json_coordinates.append(coordinate)

		print(json.dumps(json_coordinates, indent=4))
		jsonFile = open("coordinates.json", "w")
		jsonFile.write(json.dumps(json_coordinates, indent=4))
		jsonFile.close()
			
		# All the results have been drawn on image. Now display the image.
		cv2.imshow('Object detector', image)

		# Press any key to close the image
		cv2.waitKey(0)
		cv2.imwrite('flowchart.png', image)
		# Clean up
		cv2.destroyAllWindows()


if __name__ == "__main__":

	flowchart_detector = FlowchartDetection(IMAGE_NAME='writer5_3.jpg')
	flowchart_detector.detect()

