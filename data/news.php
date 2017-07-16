<?php
    header('Content-Type:application/json');
    @$start = $_REQUEST['start'];
    @$tid = $_REQUEST['tid'];
    if(empty($start)){
      $start = 0;
    }
    $conn=mysqli_connect('127.0.0.1','root','','nba');
    $sql='SET NAMES UTF8';
    mysqli_query($conn,$sql);
    $sql = "SELECT * FROM news WHERE tid=$tid LIMIT $start,5";
    $result = mysqli_query($conn,$sql);
    $output = [];
    while(true){
    $row=mysqli_fetch_assoc($result);
    if(!$row)
      break;
      $output[] = $row;
    }
    echo json_encode($output);
?>