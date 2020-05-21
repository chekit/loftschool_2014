<?php
	include_once '../config.php';
	
	$target_dir = $path.$uploads;
	$uploadOk = 1;
	$type = (array_key_exists('original', $_FILES)) ? 'original' : 'watermark';

	//get file name
	$fileName = $_FILES[$type]['name'];

	$target_file = $target_dir.basename($fileName);
	$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

	$check = getimagesize($_FILES[$type]['tmp_name']);

	//If we load Image
	if ($check !== false) {
		$uploadOk = 1;
	} else {
		$uploadOk = 0;
		$result = array(
			'status' => 'error',
			'format' => $check['mime'],
			'msg'   => 'Неверный формат файла'
		);
	}

	//If the file size more than 700kb
	if ($_FILES[$type]['size'] > 700000) {
		$uploadOk = 0;
		$result = array(
			'status' => 'error',
			'msg'   => 'Файл слишком большой (больше 700kb)'
		);
	}

	//If the file extension is .jpg, .png, .jpeg or .gif
	if ($imageFileType !== 'jpg' && $imageFileType !== 'jpeg' && $imageFileType !== 'png' && $imageFileType !== 'gif') {
		$uploadOk = 0;
		$result = array(
			'status' => 'error',
			'msg'   => 'Неверное расширение файла'
		);
	}

	//Upload file
	if ($uploadOk === 1) {
		if (move_uploaded_file($_FILES[$type]['tmp_name'], $target_file)) {
			$result = array(
				'status' => 'ok',
				'type'   => $type,
				'path'   => 'uploads/'.basename($fileName)
			);
		} else {
			$result = array(
				'status' => 'error',
				'msg'   => 'Невозможно сохранить файл'
			);
		}
	}

	echo json_encode($result);
?>