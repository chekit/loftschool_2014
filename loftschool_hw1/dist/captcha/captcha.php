<?php
	session_start();	
	
	$string = '';

	for ($i = 0; $i < 5; $i++) {
    	$string .= chr(rand(97, 122));
	}

	$_SESSION['rand_code'] = $string;

	$dir = '../css/fonts/captcha/';
	 
	$image = imagecreatetruecolor(120, 55);
	$black = imagecolorallocate($image, 0, 0, 0);
	$color = imagecolorallocate($image, rand(0, 155), rand(0, 155), rand(0, 155));
	$white = imagecolorallocate($image, 255, 255, 255);

	imagefilledrectangle($image, 0, 0, 200, 100, $white);
	imagettftext($image, 28, 0, 3, 38, $color, $dir."GloriaHallelujah.ttf", $_SESSION['rand_code']);

	header("Content-type: image/png");
	imagepng($image);
?>