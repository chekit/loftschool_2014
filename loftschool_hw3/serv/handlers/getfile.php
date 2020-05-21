<?php
	include_once '../config.php';

	$flpath = $path.$_GET['link'];

	if (file_exists($flpath)) {
		header('Content-type: image/jpeg');
	    header('Content-Description: File Transfer');
	    header('Content-Type: application/octet-stream');
	    header('Content-Disposition: attachment; filename='.basename($flpath));
	    header('Content-Transfer-Encoding: binary');
	    header('Expires: 0');
	    header('Cache-Control: must-revalidate');
	    header('Pragma: public');
	    header('Content-Length: '.filesize($flpath));
	    ob_clean();
	    flush();
	    readfile($flpath);
	    exit;
	}

?>