<?php

$data = file_get_contents("http://members.iinet.net.au/~perthdps/convicts/stories.html");

//echo $data;

$pattern = '/<a href="javascript:openwindow\(\'(.*)\'\);">(.*)<\/a>/i';

if (preg_match_all($pattern,$data,$matches)) {
$links = $matches[1];
$text = $matches[2];
//print_r($links);
//print_r($text);
}

foreach ($links as $key => $link) {
	$name = $text[$key];
	$story = file_get_contents("http://members.iinet.net.au/~perthdps/convicts/".$link);
	$storystrip = strip_tags($story, '<p><head><title><body><ul><center>');
	//echo($key." ".$name.$story);
	echo($key." ".$name.$storystrip);
}

//echo "done";
?>