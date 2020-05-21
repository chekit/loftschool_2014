<?php
	header('Content-Type: application/json');
	session_start();

	$name = $_POST['cli-name'];
	$email = $_POST['cli-email'];
	$message = $_POST['cli-message'];
	$captcha = $_POST['capt-val'];
	$code = $_SESSION['rand_code'];

	require_once '../config.php';
	require_once '../plugins/autoload.php';

	$nameRes = ($name === '') ? false : true;
	$emailRes = (!filter_var($email, FILTER_VALIDATE_EMAIL)) ? false : true;
	$messageRes = ($message === '') ? false : true;
	$codeRes = ($code !== $captcha) ? false : true;

	if ($nameRes && $emailRes && $messageRes && $codeRes) {
		$mail = new PHPMailer;
		
		$mail->CharSet = 'UTF-8';
		$mail->isSendmail();
		$mail->setFrom($__smtp['sender'], $__smtp['senderName']);
		
		$mail->addAddress($__smtp['address']);

		$mail->Subject = 'Письмо от '.$email.'('.$name.')';
		$mail->AltBody = $name.'('.$email.')<br />'.$message;
		$mail->Body = $name.'('.$email.')<br />'.$message;

		if (!$mail->send()) {
			$result = array(
				'result' => false,
				'name' => $nameRes,
				'email' => $emailRes,
				'message' => $messageRes,
				'code' => $codeRes
			);
		} else {
			$result = array(
				'result' => true
			);
		}
	} else {
		$result = array(
			'result' => false,
			'name' => $nameRes,
			'email' => $emailRes,
			'message' => $messageRes,
			'code' => $codeRes
		);
	}

	echo json_encode($result);
?>