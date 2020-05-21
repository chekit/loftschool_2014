<?php 
	require_once '../config.php';
	require_once '../libs/autoload.php';

	use PHPImageWorkshop\ImageWorkshop;

	//Base Layer
	$basePNG = $path.'images/base.png';
	$baseJPEG = $path.'images/base.jpg';

	//Set Images to work with
	$target_image = $path.str_replace('^', '/', $_POST['image']); //Uploaded image
	$target_wm = $path.str_replace('^', '/', $_POST['wm']); //Uploaded Watermark
	$target_base = ( exif_imagetype($target_image) === 'IMAGETYPE_PNG' ) ? $basePNG : $baseJPEG; //Set base layer

	//Base Paths for Images
	$flpath = $path.'generated/'; //File Path to generated images
	$flname = ( exif_imagetype($target_image) === 'IMAGETYPE_PNG' ) ? 'generated.png' : 'generated.jpg'; //Filename for generated image

	//Settings
	$opacity = $_POST['opacity'];
	// $position = (isset($_POST['pos'])) ? $_POST['pos'] : '';

	//Elements Dimentions
	$sizes = array( 'imgWidth'=>$_POST['iwidth'],
					'imgHeight'=>$_POST['iheight'],
					'wmWidth'=>$_POST['wwidth'],
					'wmHeight'=>$_POST['wheight']);

	$multiple = false;


	//Check if we need just add or multiply and add
	if (isset($_POST['xValue']) && isset($_POST['yValue'])) {
		$x = $_POST['xValue'];
		$y = $_POST['yValue'];
	} else if (isset($_POST['xBorder']) && isset($_POST['yBorder'])) {
		$multiple = true;
		$xBord = $_POST['xBorder'];
		$yBord = $_POST['yBorder'];
		$amntH = $_POST['amntH'];
		$amntV = $_POST['amntV'];
		$x = 0;
		$y = 0;
	}

	//Create Layers
	$baseLayer = ImageWorkshop::InitFromPath($target_base);
	$imageLayer = ImageWorkshop::InitFromPath($target_image);
	$wmLayer = ImageWorkshop::InitFromPath($target_wm);

	//Apply opacity value
	$wmLayer->opacity($opacity);

	//Resize Images (In case they were lager than max-width or max-height)
	$imageLayer->resizeInPixel($sizes['imgWidth'], $sizes['imgHeight'], false);
	$wmLayer->resizeInPixel($sizes['wmWidth'], $sizes['wmHeight'], false);

	//Add Image to Base Layer
	$baseLayer->addLayer(1, $imageLayer, 0, 0, 'MM');

	if (!$multiple) {
		// $imageLayer->addLayer(1, $wmLayer, 12, 12, $position);
		$baseLayer->addLayer(2, $wmLayer, $x, $y);
	} else {
		for ($h = 0; $h < $amntH; $h++) {
			for ($v = 0; $v < $amntV; $v++) {
				$wmClone = clone $wmLayer;

				$baseLayer->addLayer(2, $wmClone, $h * ($sizes['wmWidth'] + $xBord), $v * ($sizes['wmHeight'] + $yBord));
			}
		}
	}

	$group = clone $baseLayer;
	//Crop to Image Dimentions
	$group->cropInPixel($sizes['imgWidth'], $sizes['imgHeight'], 0, 0, 'MM');

	//true - create folders,
	//null - white bg for Jpeg,
	//95 - image quality (for jpeg and png)
	$group->save($flpath, $flname, true, null, 95);

	$result = array(
		'link' => $created
	);

	echo json_encode($result);
?>