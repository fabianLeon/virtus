
<?php include_once 'templates/head.php'; ?>
<body>

    <?php 
        include_once 'templates/header.php'; 
        include_once './controller/medalleria_controller.php';
    ?>
    <!-- Fixed navbar -->


    <!-- *****************************************************************************************************************
     HEADERWRAP
     ***************************************************************************************************************** -->
    <div id="headerwrap">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <h1>Oro</h1>
                    <h3>
                </div>
                <div class="col-lg-4">
                    <h1>Plata</h1>
                    <h3>
                </div>
                <div class="col-lg-4">
                    <h1>Bronce</h1>
                    <h3>
                </div>
            </div><!-- /row -->
            
            <div class="row"><!-- /eficacia -->
                <div class="col-lg-4">
                    <img src="assets/img/medallas/0.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,0));?></h1>
                </div>
                <div class="col-lg-4">
                    <img src="assets/img/medallas/1.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,1));?></h1>
                </div>
                <div class="col-lg-4">
                    <img src="assets/img/medallas/2.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,2));?></h1>
                </div>
            </div><!-- /row -->
            
            <div class="row"><!-- /eficacia -->
                <div class="col-lg-4">
                    <img src="assets/img/medallas/3.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,3));?></h1>
                </div>
                <div class="col-lg-4">
                    <img src="assets/img/medallas/4.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,4));?></h1>
                </div>
                <div class="col-lg-4">
                    <img src="assets/img/medallas/5.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,5));?></h1>
                </div>
            </div><!-- /row -->
            
            <div class="row"><!-- /estrategia -->
                <div class="col-lg-4">
                    <img src="assets/img/medallas/6.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,6));?></h1>
                </div>
                <div class="col-lg-4">
                    <img src="assets/img/medallas/7.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,7));?></h1>
                </div>
                <div class="col-lg-4">
                    <img src="assets/img/medallas/8.png" class="img-responsive" alt="" width="150" height="150">
                    <h1><?php echo (contarMedallas($medallas,8));?></h1>
                </div>
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
