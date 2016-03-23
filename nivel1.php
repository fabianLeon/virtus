
<?php
include_once 'templates/open_head.php';
session_start();
if (isset($_SESSION['nivel1'])){
    $_SESSION['nivel1'] = $_SESSION['nivel1'] + 1;
    echo "<br>" .$_SESSION['nivel1'];
}else{
  $_SESSION['nivel1'] = 1;
  echo "<br>" .$_SESSION['nivel1'];
}
?>
<script type="text/javascript" src="assets/js/phaser.min.js"></script>
<script type="text/javascript" src="assets/js/php.js"></script>
<script type="text/javascript" src="assets/js/fichas/game_State.js"></script>
<script type="text/javascript" src="assets/js/fichas/game.js"></script>

<style type="text/css">
    body{

    }
    .phaser{
        padding-left: 25%;
    }
</style>
</head>
<body>

    <?php include_once 'templates/header.php'; ?>



    <!-- *****************************************************************************************************************
     FOOTER
     ***************************************************************************************************************** -->
    <?php include_once 'templates/js.php'; ?>
    <div class="phaser">
        <script type="text/javascript">

        <!-- Bootstrap core JavaScript
    === === === === === === === === === === === === === === === === == -- ><!-- Placed at the end of the document so the pages load faster -->
                < /body>
                < /html>
