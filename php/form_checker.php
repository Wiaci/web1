<?php 
	
	session_start();

	date_default_timezone_set('Europe/Moscow');
	$date = date("h:i:s");

	$start = microtime(true);

	$x = $_POST['x'];
	$y = trim(str_replace(',', '.', $_POST['y']));
	$r = $_POST['r'];

    if (preg_match("/\d+/", $x) && preg_match("/-?\d+(\.\d+)?/", $y) && preg_match("/\d+/", $r)) {

    	if ($x >= 0 && $y >= 0 && $x*$x + $y*$y <= $r*$r/4 || $x >= 0 && $x <= $r/2 && $y >= -$r && $y <= 0 ||
            $x <= 0 && $y >= -$x - $r/2 && $y <= 0) {
            $answer = " Да ";
        } else {
            $answer = " Нет ";
        }

        $time = microtime(true) - $start;

        $server_answer = $x . " " . $y . " " . $r . $answer . $date . " " . $time;

        if (!isset($_SESSION['all_history'])) {
        	$_SESSION['all_history'] = [];
        }

        array_push($_SESSION['all_history'], $server_answer);

        echo $server_answer;

    } else {
        echo "wrong_data";
    }
