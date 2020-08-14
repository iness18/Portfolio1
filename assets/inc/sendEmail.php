<?php

// Replace this with your own email address
$siteOwnersEmail = 'iness.brake@gmail.com';


if($_POST) {

   $contactName = trim(stripslashes($_POST['name']));
   $contactEmail = trim(stripslashes($_POST['email']));
   $contact_message = trim(stripslashes($_POST['message']));

   // Check Name
	if (strlen($contactName) < 2) {
		$error['name'] = "Please enter your name.";
	}
	// Check Email
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $contactEmail)) {
		$error['email'] = "Please enter a valid email address.";
	}
	// Check Message
	if (strlen($contact_message) < 15) {
		$error['message'] = "Please enter your message. It should have at least 15 characters.";
	}


   // Set Message
   $message .= "Email from: " . $contactName . "<br />";
	 $message .= "Email address: " . $contactEmail . "<br />";
   $message .= "Message: <br />";
   $message .= $contact_message;
   $message .= "<br /> ----- <br /> This email was sent from your site's contact form. <br />";

   // Set From: header
   $from =  $contactName . " <" . $contactEmail . ">";

   // Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $contactEmail . "\r\n";
 	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


   if (!$error) {

      ini_set("sendmail_from", $siteOwnersEmail); // for windows server
      $contactEmail = mail($siteOwnersEmail, $message, $headers);

		if ($contactEmail) { echo "OK"; }
      else { echo "Une erreur c'est produite, veuillez réessayer."; }

	} # end if - no validation error

	else {

		$response = (isset($error['contactName'])) ? $error['contactName'] . "<br /> \n" : null;
		$response .= (isset($error['contactEmail'])) ? $error['contactEmail'] . "<br /> \n" : null;
		$response .= (isset($error['contact_message'])) ? $error['contact_message'] . "<br />" : null;

		echo $response;

	} # end if - there was a validation error

}

?>
