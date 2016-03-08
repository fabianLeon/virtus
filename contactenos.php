<!DOCTYPE html>
<html lang="en">
    <?php include_once 'templates/head.php'; ?>
    <body>

        <?php include_once 'templates/header.php'; ?>


        <!-- *****************************************************************************************************************
         BLUE WRAP
         ***************************************************************************************************************** -->
        <div id="blue">
            <div class="container">
                <div class="row">
                    <h3>Contactenos.</h3>
                </div><!-- /row -->

            </div> <!-- /container -->

        </div><!-- /blue -->



        <!-- *****************************************************************************************************************
         CONTACT FORMS
         ***************************************************************************************************************** -->

        <div class="container mtb">
            <div class="row">
                <div class="col-lg-5 col-lg-offset-4">
                    <h4>Bienvenido!</h4>
                    <div class="hline"></div>
                    <p>Cuéntenos sobre tu experiencia con este juego </p>
                    <form role="form" method="POST" action="controller/mail.php">

                        <div class="form-group">
                            <label for="InputName1">Nombre</label>
                            <?php if ($_SESSION) { ?>
                                <input type="text" class="form-control" name="inputName" id="inputName" autocomplete="off" readonly="readonly"  value="<?php echo($_SESSION['user']); ?>">
                            <?php } else { ?>
                                <input type="text" class="form-control" name="inputName" id="inputName" autocomplete="off">         
                            <?php } ?>
                        </div>
                        <div class="form-group">
                            <label for="InputEmail1">Correo Electrónico</label>
                            <?php if ($_SESSION) { ?>
                                <input type="email" class="form-control" name="inputFrom" id="inputFrom" autocomplete="off" readonly="readonly"  value="<?php echo($_SESSION['correo']); ?>">
                            <?php } else { ?>
                                <input type="email" class="form-control" name="inputFrom" id="inputFrom" autocomplete="off">
                            <?php } ?>
                        </div>
                        <div class="form-group">
                            <label for="InputSubject1">Tema - Asunto</label>
                            <input type="text" class="form-control" name="inputSubject" id="inputSubject" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label for="message1">Mensaje</label>
                            <textarea class="form-control" name="inputMessage" id="inputMessage" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-theme">Enviar</button>
                    </form>
                </div><! --/col-lg-4 -->
            </div><! --/row -->
        </div><! --/container -->


        <!-- *****************************************************************************************************************
         FOOTER
         ***************************************************************************************************************** -->
        <?php include_once 'templates/footer.php'; ?>
        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <?php include_once 'templates/js.php'; ?>


    </body>
</html>
