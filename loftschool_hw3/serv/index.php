<?php
  include '_partials/header.php';
?>
    <!--[if lt IE 8]>
      <p class="browsehappy">
        You are using an <strong>outdated</strong> browser.
        Please <a href="http://browsehappy.com/">upgrade your browser</a>
        to improve your experience.
      </p>
    <![endif]-->
    <!--Global Container-->
    <!--TO show share buttons we need to add .show--share-->
    <div class="container">
      <?php
        include '_partials/language_socials.php';
      ?>
      <!--Generator container-->
      <div class="container__generator">
        <?php
          include '_partials/result.php';
          include '_partials/settings.php';
        ?>
      </div>
    </div>
<?php
  include '_partials/footer.php';
?>