<html lang="en">
    <?php include_once 'templates/head.php'; ?>
    <body>

        <?php include_once 'templates/header.php';

        include_once './controller/niveles_controller.php';
        ?>

        <!-- Fixed navbar -->

        <!-- *****************************************************************************************************************
         BLUE WRAP
         ***************************************************************************************************************** -->
        <div id="blue">
            <div class="container">
                <div class="row" style="text-align: center">
                    <h3>Aplicacion</h3>
                </div><!-- /row -->
            </div> <!-- /container -->
        </div><!-- /blue -->

        <!-- *****************************************************************************************************************
         TITLE & CONTENT
         ***************************************************************************************************************** -->

        <div class="container">
            <div id="portfoliowrap">
                <div class="portfolio-centered">

                    <div class="recentitems portfolio" style="text-align: center">


                        <div class="portfolio-item graphic-design">
                            <div class="he-wrap tpl6">
                                <img src= "assets/img/niveles/hunter1.png" alt="">
                                <div class="he-view">
                                    <div class="bg a0" data-animate="fadeIn">
                                        <h3 class="a1" data-animate="fadeInDown">Nivel 1. Aplicación</h3>
                                        <a data-rel="prettyPhoto" href="assets/img/niveles/hunter1.png" class="dmbutton a2" data-animate="fadeInUp"><i class="fa fa-search"></i></a>
                                        <?php
                                        if (!in_array('7', $niveles)) {
                                            ?>
                                            <a href="nivel7.php" class="dmbutton a2" data-animate="fadeInUp">Jugar</a>
                                            <?php } else { ?>
                                            <h3 class="a1" data-animate="fadeInDown">SUPERADO !!!</h3>
                                            <?php } ?>
                                    </div><!-- he bg -->
                                </div><!-- he view -->		
                            </div><!-- he wrap -->
                        </div><!-- end col-12 --> 

                        <div class="portfolio-item graphic-design">
                            <div class="he-wrap tpl6">
                                <img src= "assets/img/niveles/hunter2.png" alt="">
                                <div class="he-view">
                                    <div class="bg a0" data-animate="fadeIn">
                                        <h3 class="a1" data-animate="fadeInDown">Nivel 2. Aplicación</h3>
                                        <a data-rel="prettyPhoto" href="assets/img/niveles/hunter2.png" class="dmbutton a2" data-animate="fadeInUp"><i class="fa fa-search"></i></a>
                                        <?php
                                        if (!in_array('8', $niveles)) {
                                            ?>
                                            <a href="nivel8.php" class="dmbutton a2" data-animate="fadeInUp">Jugar</a>
                                            <?php } else { ?>
                                            <h3 class="a1" data-animate="fadeInDown">SUPERADO !!!</h3>
                                            <?php } ?>
                                    </div><!-- he bg -->
                                </div><!-- he view -->		
                            </div><!-- he wrap -->
                        </div><!-- end col-12 --> 

                        <div class="portfolio-item graphic-design">
                            <div class="he-wrap tpl6">
                                <img src= "assets/img/niveles/hunter3.png" alt="">
                                <div class="he-view">
                                    <div class="bg a0" data-animate="fadeIn">
                                        <h3 class="a1" data-animate="fadeInDown">Nivel 3. Aplicación</h3>
                                        <a data-rel="prettyPhoto" href="assets/img/niveles/hunter3.png" class="dmbutton a2" data-animate="fadeInUp"><i class="fa fa-search"></i></a>
                                        <?php
                                        if (!in_array('9', $niveles)) {
                                            ?>
                                            <a href="nivel9.php" class="dmbutton a2" data-animate="fadeInUp">Jugar</a>
                                            <?php } else { ?>
                                            <h3 class="a1" data-animate="fadeInDown">SUPERADO !!!</h3>
                                            <?php } ?>
                                    </div><!-- he bg -->
                                </div><!-- he view -->		
                            </div><!-- he wrap -->
                        </div><!-- end col-12 --> 

                        <div class="portfolio-item graphic-design">
                            <div class="he-wrap tpl6">
                                <img src= "assets/img/niveles/hunter4.png" alt="">
                                <div class="he-view">
                                    <div class="bg a0" data-animate="fadeIn">
                                        <h3 class="a1" data-animate="fadeInDown">Nivel Final Aplicación</h3>
                                        <a data-rel="prettyPhoto" href="assets/img/niveles/hunter4.png" class="dmbutton a2" data-animate="fadeInUp"><i class="fa fa-search"></i></a>
                                        <?php
                                        if (!in_array('10', $niveles)) {
                                            ?>
                                            <a href="nivel10.php" class="dmbutton a2" data-animate="fadeInUp">Jugar</a>
                                            <?php } else { ?>
                                            <h3 class="a1" data-animate="fadeInDown">SUPERADO !!!</h3>
                                            <?php } ?>
                                    </div><!-- he bg -->
                                </div><!-- he view -->		
                            </div><!-- he wrap -->
                        </div><!-- end col-12 --> 

                    </div><!-- portfolio -->
                </div><!-- portfolio container -->
            </div><!--/Portfoliowrap -->
        </div><! --/container -->

        <!-- *****************************************************************************************************************
         PORTFOLIO SECTION
         ***************************************************************************************************************** -->




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
    </body>
</html>
