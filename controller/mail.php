<?php

//include 'Mail.php';

require("PHPMailer_5.2.4/class.phpmailer.php");

$mail = new PHPMailer(true);

$mail->IsSMTP(); // set mailer to use SMTP
$mail->SMTPAuth = true;
$mail->SMTPSecure = "ssl"; // Used instead of TLS when only POP mail is selected
$mail->Port = 465; // Used instead of 587 when only POP mail is selected
$mail->Host = "smtp.gmail.com"; // specif smtp server
$mail->Username = "apoyoalimentarioUD@gmail.com"; // SMTP username
$mail->Password = "apoyo20152"; // SMTP password

$mail->From = "apoyoalimentarioUD@gmail.com";
$mail->FromName = "Apoyo Alimentario UD";
$mail->AddAddress("andresvelandiar93@gmail.com", "Raul"); //replace myname and mypassword to yours
$mail->Subject = 'asunto';
$mail->Body = 'mensaje';
$mail->CharSet = 'UTF-8';




//$mail->AddReplyTo("andresvelandiar93@gmail.com", "Apoyo Alimentario UD");
//$mail->WordWrap = 50; // set word wrap
//$mail->AddAttachment($archivo,$archivo); // add attachments
//$mail->AddAttachment("c:/temp/11-10-00.zip");
//$mail->IsHTML(true); // set email format to HTML


if ($mail->Send()) {
    echo "Send mail successfully";
} else {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    echo "Send mail fail";
}
//---------------------------------------------------------------------------

//Nombre
//$name = $_POST['inputName'];
//De
//$from = $_POST['inputFrom'];
//Para
//$to= '<andresvelandia93@hotmail.com>';
    // título
    //$titulo= $_POST['inputSubject'];
    //Mensaje
    //$message = $_POST['inputMessage'];




    //$from = '<fadarsaleeing@gmail.com>';
        //$to = '<andresvelandia93@hotmail.com>';
            //$subject = 'prueba';

            //$headers = array(
            //    'From' => $from,
            //    'To' => $to,
            //    'Subject' => $subject
            //);

            //$smtp = Mail::factory('smtp', array(
            //'host' => 'ssl://smtp.gmail.com',
            //'port' => '465',
            //'auth' => true,
            //'username' => 'sistemas@viajesaveturs.com',
            //'password' => 'sis*97531#'
            //));

            //$mail = $smtp->send($to, $headers, "saludo");

            //if (PEAR::isError($mail)) {
            //echo('<p>' . $mail->getMessage() . '</p>');
            //} else {
            //echo('<p>Message successfully sent!</p>');
            //}




//$para      = 'andresvelandiar93@gmail.com';
//$titulo    = 'El título';
//$mensaje   = 'Hola';
//$cabeceras = 'From: andresvelandia93@hotmail.com'."\r\n".
//    'Reply-To: andresvelandiar93@gmail.com'."\r\n".
//    'X-Mailer: PHP/'.phpversion();
//
//mail($para, $titulo, $mensaje, $cabeceras);



//$mail->AddAddress($bene->getCorreo_persona(), "" . $bene->getNombre_persona() . "," . $bene->getApellido_persona() . "");


//$mail->Subject = $_POST['asunto'];
//$mail->Body = $_POST['mensaje'];