<?php

include 'Mail.php';
//$subject = $_POST['inputSubject'];
//$name = $_POST['inputName'];
//$from = $_POST['inputFrom'];
//$message = $_POST['inputMessage'];
// título

$from = '<fadarsaleeing@gmail.com>';
$to = '<fabi_leon@outlook.com>';
$subject = 'prueba';

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
'host' => 'ssl://smtp.gmail.com',
 'port' => '465',
 'auth' => true,
 'username' => 'sistemas@viajesaveturs.com',
 'password' => 'sis*97531#'
));

$mail = $smtp->send($to, $headers, "saludo");

if (PEAR::isError($mail)) {
echo('<p>' . $mail->getMessage() . '</p>');
} else {
echo('<p>Message successfully sent!</p>');
}

