<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.ptt.cc/bbs/NBA_Fantasy/index.html");
curl_setopt($ch, CURLOPT_HEADER, false);
//將curl_exec()獲取的訊息以文件流的形式返回，而不是直接輸出。
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$data = curl_exec($ch);

echo $data;
//echo 'Curl error: ' . curl_error($ch);
curl_close($ch);
?>