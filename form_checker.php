<?php 
	
	date_default_timezone_set('Europe/Moscow');
	$date = date("h:i:s");

	$start = (double) microtime(true);

	$x = $_POST['x'];
	$y = trim(str_replace(',', '.', $_POST['y']));
	$r = $_POST['r'];


	if ($x >= 0 && $y >= 0 && $x*$x + $y*$y <= $r*$r/4 || $x >= 0 && $x <= $r/2 && $y >= -$r && $y <= 0 ||
        $x <= 0 && $y >= -$x - $r/2 && $y <= 0) {
        echo "True ";
    } else {
        echo "False ";
    }

    $time = microtime(true) - $start ;

    echo $date . " " . $time;
?>