<?php
	header('Content-Type: application/json');

	require_once 'config.php';
	require_once '../vendor/autoload.php';

	$name = $_POST['user-name'];
	$phone = $_POST['user-phone'];
	$comment = $_POST['user-comment'];
	$day = $_POST['call-day'];
	$month = $_POST['call-month'];

	$nameRes = ($name === '') ? false : true;
	$phoneRes = ($phone === '') ? false : true;
	$comment = ($comment === '') ? '-' : $comment;

	if ($nameRes && $phoneRes) {
		$mail = new PHPMailer;
		
		$mail->CharSet = 'UTF-8';
		$mail->isSendmail();
		$mail->setFrom($__smtp['sender'], $__smtp['senderName']);
		
		$mail->addAddress($__smtp['address']);
		
		$mail->Subject = 'Письмо с сайта ЭпплShop';
		$mail->AltBody = $name.' просит позвонить ему '.$day.'.'.$month.' по номеру '.$phone.'<br />'.'Комментарий: '.$comment;
		$mail->Body = $name.' просит позвонить ему '.$day.'.'.$month.' по номеру '.$phone.'<br />'.'Комментарий: '.$comment;

		if (!$mail->send()) {
			$result = array(
				'result' => false,
				'name' => $nameRes,
				'email' => $phoneRes
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
			'email' => $phoneRes
		);
	}

	echo json_encode($result);
?>