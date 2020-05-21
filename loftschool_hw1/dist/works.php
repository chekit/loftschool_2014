<?php
	$active = "works";

    include '_partials/header.php';
    include '_partials/navigation.php';
?>
            <article class="info-block">
                <h2 class="block__header2">Мои работы</h2>
                <div class="block__wrap">
                    <div class="block__info info--portfolio">
                        <div class="portfolio__preview">
                            <h3 class="portfolio__item-name"><a href="#" class="item-name__text">Родовое дерево</a></h3>
                            <img src="images/portfolio/rodovoe-derevo.jpg" alt="Родовое Дерево" class="preview__img">
                        </div>
                        <p class="block__text text--small">
                            <a href="#" class="text__link text--italic" target="_blank">www.rodovoederevo.ru</a>
                        </p>
                        <p class="block__text">Социальная сеть...</p>
                    </div>
                    <div class="block__info info--portfolio">
                        <div class="portfolio__preview">
                            <h3 class="portfolio__item-name"><a href="#" class="item-name__text">Mainbox</a></h3>
                            <img src="images/portfolio/mainbox.jpg" alt="Mainbox" class="preview__img">
                        </div>
                        <p class="block__text text--small">
                            <a href="http://mainbox.com" class="text__link text--italic" target="_blank">www.mainbox.com</a>
                        </p>
                        <p class="block__text">Сервис доставки товаров</p>
                    </div>
                    <div class="block__info info--portfolio">
                        <div class="portfolio__preview">
                            <h3 class="portfolio__item-name"><a href="#" class="item-name__text">Allareas</a></h3>
                            <img src="images/portfolio/allareas.jpg" alt="Сайт 1" class="preview__img">
                        </div>
                        <p class="block__text text--small">
                            <a href="http://artwonder.ru/projects/allareas/" class="text__link text--italic" target="_blank">www.allareas.ru</a>
                        </p>
                        <p class="block__text">Сервис покупки билетов (не взлетел)</p>
                    </div>
                    <div class="block__info info--portfolio">
                        <div class="portfolio__preview">
                            <h3 class="portfolio__item-name"><a href="#" class="item-name__text">CastingMedia</a></h3>
                            <img src="images/portfolio/castingmedia.jpg" alt="Сайт 1" class="preview__img">
                        </div>
                        <p class="block__text text--small">
                            <a href="http://castingmedia.ru/" class="text__link text--italic" target="_blank">www.castingmedia.ru</a>
                        </p>
                        <p class="block__text">Агентство Casting Media</p>
                    </div>
                    <div class="block__info info--portfolio info--add">
                        <button class="add-proj-btn js-add-proj"><span class="add-proj-btn__text">Добавить проект</span></button>
                    </div>
                </div>
            </article><!--/end .info-block -->
<?php
    include '_partials/contacts.php';
    include '_partials/socials.php';
    include '_partials/footer.php';
?>
