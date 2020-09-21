<?php

	session_start();

	if (isset($_SESSION['all_history'])) {
    	foreach ($_SESSION['all_history'] as $item) {
    		echo $item . "<br>";
    	}
    } else $_SESSION['all_history'] = [];

