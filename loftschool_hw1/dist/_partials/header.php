<?php
    $titles = new StdClass();
    $titles->index = 'Обо мне';
    $titles->works = 'Мои работы';
    $titles->feedback = 'Связаться со мной';
?>
<!DOCTYPE html>
<html class="no-js" lang="ru">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?= $titles->$active ?></title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, minimal-ui, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1" />
        <!-- favicons --> 
        <link rel="shortcut icon" href="images/favicons/favicon.ico">
        <link rel="apple-touch-icon" sizes="57x57" href="images/favicons/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="114x114" href="images/favicons/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="72x72" href="images/favicons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="144x144" href="images/favicons/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="60x60" href="images/favicons/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="120x120" href="images/favicons/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="76x76" href="images/favicons/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="152x152" href="images/favicons/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="images/favicons/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" href="images/favicons/favicon-192x192.png" sizes="192x192">
        <link rel="icon" type="image/png" href="images/favicons/favicon-160x160.png" sizes="160x160">
        <link rel="icon" type="image/png" href="images/favicons/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="images/favicons/favicon-16x16.png" sizes="16x16">
        <link rel="icon" type="image/png" href="images/favicons/favicon-32x32.png" sizes="32x32">
        <meta name="msapplication-TileColor" content="#2d89ef">
        <meta name="msapplication-TileImage" content="images/favicons/mstile-144x144.png">
        <meta name="msapplication-config" content="images/favicons/browserconfig.xml">
        <!-- /favicons --> 

        <link rel="stylesheet" href="css/styles.min.css">
        <script src="js/libs/modernizr.min.js"></script>

        <!--[if lt IE 9]>
            <script src="js/libs/html5shiv.min.js"></script>
            <link rel="stylesheet" href="css/styles.ie.min.css">
        <![endif]-->
    </head>
    <body>
        <?php
            if ($active === 'works') {
                include '_partials/popup.php';
            }
        ?>
        <header id="header" class="gradient">
            <div class="header__wrap">
                <div class="header__logo">
                    <h1 class="logo__header1">
                        <a href="/" class="logo__link">Loftschool - комплексное обучение web разработке</a>
                    </h1>
                </div><!--/end .header__logo -->
                <?php include 'socials.php'; ?>
                <button class="header__show-menu-btn">Меню</button>
            </div>
        </header><!--/end #header -->
        <main id="wrap">