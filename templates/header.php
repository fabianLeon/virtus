<?php session_start(); ?>
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php">
                Juegos T T I
            </a>
        </div>
        <div class="navbar-collapse collapse navbar-right">
            <ul class="nav navbar-nav">
                <li><a href="index.php">HOME</a></li>
                <li><a href="quienes_somos.php">QUIENES SOMOS</a></li>
                <li><a href="contactenos.php">CONTACTENOS</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">JUGAR !! </a>
                    <ul class="dropdown-menu">
                        <li><a href="logica_matematica.php">Logica Matemática</a></li>
                        <li><a href="abstracto.php">Abstracto</a></li>
                    </ul>
                </li>
                <?php if ($_SESSION) { ?>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class='glyphicon glyphicon-user' aria-hidden='true'>
                            </span><?php echo("    " . $_SESSION['user']); ?> <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="controller/session_destroy.php">CERRAR SESIÓN</a></li>
                        </ul>
                    </li>
                <?php } else { ?>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  USUARIO <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="login.php">INICIAR SESION</a></li>
                            <li><a href="registro.php">REGISTRARSE</a></li>
                        </ul>
                    </li>
                <?php } ?>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

