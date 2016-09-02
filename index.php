
<?php include_once 'templates/head.php'; ?>
<body>

    <?php include_once 'templates/header.php'; ?>
    <!-- Fixed navbar -->


    <!-- *****************************************************************************************************************
     HEADERWRAP
     ***************************************************************************************************************** -->
    <div id="headerwrap">
        <div class="container">
            <div class="row">
                <h1>Proyecto Odin</h1>
                <div class="col-lg-3 col-lg-offset-2" >
                    <p><img src = "assets/img/pag/odin_index.png" width="200px"  alt="Historia"  style="float: left;  padding-right: 10px">
                </div>
                <div class="col-lg-6 ">

                    <h3> El proyecto Odin es un conjunto de juegos de caracter Logico-Matemático, Abstracto y de aplicación
                        que buscan poner a prueba el pensamiento humano. Adicionalmente, pretende asociar a su vez algunas caracteristicas
                        subjetivas del jugador con su perfil de registro. Técnico, Tecnologo e Ingeniero.
                    </h3>
                    <br>
                    <br>
                </div>

                <h3>
                    Registrate y Juega con nosotros.
                </h3>
            </div><!-- /row -->
        </div> <!-- /container -->
    </div><!-- /headerwrap -->


    <!-- *****************************************************************************************************************
     FOOTER
     ***************************************************************************************************************** -->
    <?php include_once 'templates/footer.php'; ?>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <?php include_once 'templates/js.php'; ?>
    <script>
        // Portfolio
        (function ($) {
            "use strict";
            var $container = $('.portfolio'),
                    $items = $container.find('.portfolio-item'),
                    portfolioLayout = 'fitRows';

            if ($container.hasClass('portfolio-centered')) {
                portfolioLayout = 'masonry';
            }

            $container.isotope({
                filter: '*',
                animationEngine: 'best-available',
                layoutMode: portfolioLayout,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                },
                masonry: {
                }
            }, refreshWaypoints());

            function refreshWaypoints() {
                setTimeout(function () {
                }, 1000);
            }

            $('nav.portfolio-filter ul a').on('click', function () {
                var selector = $(this).attr('data-filter');
                $container.isotope({filter: selector}, refreshWaypoints());
                $('nav.portfolio-filter ul a').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            function getColumnNumber() {
                var winWidth = $(window).width(),
                        columnNumber = 1;

                if (winWidth > 1200) {
                    columnNumber = 5;
                } else if (winWidth > 950) {
                    columnNumber = 4;
                } else if (winWidth > 600) {
                    columnNumber = 3;
                } else if (winWidth > 400) {
                    columnNumber = 2;
                } else if (winWidth > 250) {
                    columnNumber = 1;
                }
                return columnNumber;
            }

            function setColumns() {
                var winWidth = $(window).width(),
                        columnNumber = getColumnNumber(),
                        itemWidth = Math.floor(winWidth / columnNumber);

                $container.find('.portfolio-item').each(function () {
                    $(this).css({
                        width: itemWidth + 'px'
                    });
                });
            }

            function setPortfolio() {
                setColumns();
                $container.isotope('reLayout');
            }

            $container.imagesLoaded(function () {
                setPortfolio();
            });

            $(window).on('resize', function () {
                setPortfolio();
            });
        })(jQuery);
    </script>
    <script>
        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').focus()
        })
    </script>
</body>
</html>
