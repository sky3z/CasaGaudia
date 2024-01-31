<?php
session_start();
if($_POST)
{
    // Retrieve the email template required
    $admin_message = file_get_contents('admin-template.html');
    $customer_message = file_get_contents('customer1-template.html');

    #####################################################################################################

    // Site Settings
    $site_title          = "Casteltesino Camping";
    $site_url            = "https://www.casteltesinocamping.it";
    $facebook_link       = "https://www.facebook.com/casteltesinocamping/";
    $twitter_link        = "https://twitter.com/casteltesino?s=20";
    $instagram_link      = "https://www.instagram.com/casteltesino_camping/";
    $admin_phone         = "+39 338 4490234";

    // Email Settings
    $admin_email         = "info@casteltesinocamping.it";
    $admin_subject       = "Casteltesino Camping - New Reservation";
    $customer_subject    = "Casteltesino Camping - Booking Details";

    // Output Messages
    $success_mssg        = "La sua prenotazione ci è stata sottoposta e le abbiamo appena inviato un'e-mail di conferma. La contatteremo il più presto possibile";
    $error_mssg          = "Si è verificato un errore. Per favore controlla la tua configurazione email in PHP.";
    $email_mssg          = "Inserisci un'email valida!";
    $booking_date        = "Non si può partire prima di essere arrivati";
    $empty_email         = "L'e-mail è vuota! Inserisci la tua email (ad esempio miaemail@email.com)";
    $empty_roomtype      = "Il tipo di camera è vuoto! Per favore, inserisci qualcosa.";
    $empty_checkin       = "La data di arrivo è vuota! Per favore, inserisci qualcosa.";
    $empty_checkout      = "La data di partenza è vuota! Per favore, inserisci qualcosa.";
    $empty_adults        = "Adulti è vuoto! Per favore, inserisci qualcosa.";
    $empty_name          = "Il nome è vuoto! Per favore, inserisci qualcosa.";
    $empty_surname       = "Il cognome è vuoto! Per favore, inserisci qualcosa.";
    $empty_phone         = "Il numero di telefono è vuoto! Per favore, inserisci qualcosa.";
    $empty_comments      = "La sezione commento è vuota! Per favore, inserisci qualcosa.";
    $empty_privacy       = "Per favore, Accetta il trattamento della privacy!";

    #####################################################################################################

    //Check if its an ajax request, exit if not
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

        //Exit script outputting json data
        $output = json_encode(
        array(
            'type'=>'error',
            'text' => 'Request must come from Ajax'
));

        die($output);
 }

    $customer_email     = $_POST["booking_email"];
    $roomtype           = $_POST["booking_roomtype"];
    $checkin            = $_POST["booking_startdate"];
    $checkout           = $_POST["booking_enddate"];
    $adults             = $_POST["booking_adults"];
    $children           = $_POST["booking_children"];
    $babies             = $_POST["booking_babies"];
    $customer_name      = $_POST["booking_name"];
    $customer_surname   = $_POST["booking_surname"];
    $customer_phone     = $_POST["booking_phone"];
    $comments           = $_POST["booking_comments"];
    $privacy            = $_POST["booking_privacy"];

    if (empty($customer_name)){$output = array('type'=>'error', 'text' => $empty_name); die($output['text']);}
    if (empty($customer_surname)){$output = array('type'=>'error', 'text' => $empty_surname); die($output['text']);}
    if (empty($customer_email)){$output = array('type'=>'error', 'text' => $empty_email); die($output['text']);}
    if (empty($customer_phone)){$output = array('type'=>'error', 'text' => $empty_phone); die($output['text']);}
    if (empty($roomtype)){$output = array('type'=>'error', 'text' => $empty_roomtype); die($output['text']);}
    if (empty($checkin)){$output = array('type'=>'error', 'text' => $empty_checkin); die($output['text']);}
    if (empty($checkout)){$output = array('type'=>'error', 'text' => $empty_checkout); die($output['text']);}
    if (empty($comments)){$output = array('type'=>'error', 'text' => $empty_comments); die($output['text']);}
    if (empty($privacy)){$output = array('type'=>'error', 'text' => $empty_privacy); die($output['text']);}




    // To make a field required please remove "//"

    //if (empty($customer_name)){$output = json_encode(array('type'=>'error', 'text' => $empty_name));die($output);}
    //if (empty($customer_phone)){$output = json_encode(array('type'=>'error', 'text' => $empty_phone));die($output);}
    //if (empty($comments)){$output = json_encode(array('type'=>'error', 'text' => $empty_comments));die($output);}
    //if (empty($country)){$output = json_encode(array('type'=>'error', 'text' => $empty_country));die($output);}

    //Email Validation
    if (!filter_var($customer_email, FILTER_VALIDATE_EMAIL)) {
        $output = json_encode(array('type'=>'error', 'text' => $email_mssg));
        die($output);
    }
    //Format Date
    $clear_checkin = str_replace('/', '-', $checkin);
    $format_checkin = date('Y-m-d', strtotime($clear_checkin));
    $clear_checkout = str_replace('/', '-', $checkout);
    $format_checkout = date('Y-m-d', strtotime($clear_checkout));

    if ($format_checkin > $format_checkout) {
        $output = json_encode(array('type'=>'error', 'text' => $booking_date));
        die($output);
    }
    // Unique Booking iD
    $bookingId = time().''.mt_rand();

    //Admin Message
    $admin_message = str_replace('%booking_id%', $bookingId, $admin_message);
    $admin_message = str_replace('%customer_name%', $customer_name, $admin_message);
    $admin_message = str_replace('%customer_surname%', $customer_surname, $admin_message);
    $admin_message = str_replace('%customer_email%', $customer_email, $admin_message);
    $admin_message = str_replace('%customer_phone%', $customer_phone, $admin_message);
    $admin_message = str_replace('%roomtype%', $roomtype, $admin_message);
    $admin_message = str_replace('%adults%', $adults, $admin_message);
    $admin_message = str_replace('%children%', $children, $admin_message);
    $admin_message = str_replace('%babies%', $babies, $admin_message);
    $admin_message = str_replace('%checkin%', $checkin, $admin_message);
    $admin_message = str_replace('%checkout%', $checkout, $admin_message);
    $admin_message = str_replace('%comments%', $comments, $admin_message);
    $admin_message = str_replace('%site_title%', $site_title, $admin_message);
    $admin_message = str_replace('%site_url%', $site_url, $admin_message);
    $admin_message = str_replace('%facebook_link%', $facebook_link, $admin_message);
    $admin_message = str_replace('%twitter_link%', $twitter_link, $admin_message);

    //Customer Message
    $customer_message = str_replace('%booking_id%', $bookingId, $customer_message);
    $customer_message = str_replace('%customer_name%', $customer_name, $customer_message);
    $customer_message = str_replace('%customer_surname%', $customer_surname, $customer_message);
    $customer_message = str_replace('%customer_email%', $customer_email, $customer_message);
    $customer_message = str_replace('%customer_phone%', $customer_phone, $customer_message);
    $customer_message = str_replace('%roomtype%', $roomtype, $customer_message);
    $customer_message = str_replace('%adults%', $adults, $customer_message);
    $customer_message = str_replace('%children%', $children, $customer_message);
    $customer_message = str_replace('%babies%', $babies, $customer_message);
    $customer_message = str_replace('%checkin%', $checkin, $customer_message);
    $customer_message = str_replace('%checkout%', $checkout, $customer_message);
    $customer_message = str_replace('%comments%', $comments, $customer_message);
    $customer_message = str_replace('%admin_email%', $admin_email, $customer_message);
    $customer_message = str_replace('%admin_phone%', $admin_phone, $customer_message);
    $customer_message = str_replace('%site_title%', $site_title, $customer_message);
    $customer_message = str_replace('%site_url%', $site_url, $customer_message);
    $customer_message = str_replace('%facebook_link%', $facebook_link, $customer_message);
    $customer_message = str_replace('%twitter_link%', $twitter_link, $customer_message);

    //Headers for admin email.
    $admin_headers = 'From: '.$site_title.' <'.$customer_email.'>' . PHP_EOL .
    'Reply-To: '.$customer_name.' <'.$customer_email.'>' . PHP_EOL .
    'MIME-Version: 1.0' . PHP_EOL .
    'Content-type:text/html;charset=iso-8859-1' . PHP_EOL .
    'X-Mailer: PHP/' . phpversion();

    //Headers for customer email.
    $customer_headers = 'From: '.$site_title.' <'.$admin_email.'>' . PHP_EOL .
    'Reply-To: '.$site_title.' <'.$admin_email.'>' . PHP_EOL .
    'MIME-Version: 1.0' . PHP_EOL .
    'Content-type:text/html;charset=utf-8' . PHP_EOL .
    'X-Mailer: PHP/' . phpversion();

    //Send booking details to admin
    $sendemail_to_admin = @mail($admin_email, $admin_subject,  $admin_message, $admin_headers);

    //Send booking details to customer
    $sendemail_to_customer = @mail($customer_email, $customer_subject,  $customer_message, $customer_headers);

    if (!$sendemail_to_admin && $sendemail_to_customer) {
      $output = array('type'=>'error', 'text' => $error_mss);
      print "<p class='error'>". $output['text'] . "</p>";
    } else {
      $output = array('type'=>'message', 'text' =>  $success_mssg);
      print "<p class='success'>". $output['text'] . " </p>";
    }

} else {

   header('Location: ../404.html');
}
?>
