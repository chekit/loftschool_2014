<?php
	$active = "index";

    include '_partials/header.php';
    include '_partials/navigation.php';
?>
             <article class="info-block">
                <h2 class="block__header2">Основная информация</h2>
                <div class="block__wrap">
                    <div class="block__avatar">
                        <div class="avatar__mask"></div>
                        <img src="images/avatar/avatar.jpg" alt="Мой аватар" class="avatar__image" />
                    </div>
                    <ul class="block__info">
                        <li class="info__item">
                            <strong class="block__text text--strong">Меня зовут:</strong> 
                            <span class="block__text">Черепов Антон Андреевич</span>
                        </li>
                        <li class="info__item">
                            <strong class="block__text text--strong">Мой возраст:</strong> 
                            <span class="block__text">28 лет</span>
                        </li>
                        <li class="info__item">
                            <strong class="block__text text--strong">Мой город:</strong> 
                            <span class="block__text">Королёв</span>
                        </li>
                        <li class="info__item">
                            <strong class="block__text text--strong">Моя специализация:</strong> 
                            <span class="block__text">HTML-верстальщик</span>
                        </li>
                        <li class="info__item">
                            <strong class="block__text text--strong">Ключевые навыки:</strong> 
                            <ul class="info__exp-list">
                                <li class="exp-list__item">html</li>
                                <li class="exp-list__item">CSS</li>
                                <li class="exp-list__item">Sass</li>
                                <li class="exp-list__item">gulp</li>
                                <li class="exp-list__item">javascript</li>
                                <li class="exp-list__item">jquery</li>
                                <li class="exp-list__item">git</li>
                                <li class="exp-list__item">Emmet</li>
                                <li class="exp-list__item">Photoshop</li>
                            </ul><!--/end .block__exp-list -->
                        </li>
                    </ul>
                </div>
            </article><!--/end .info-block -->
            <article class="info-block">
                <h2 class="block__header2">Опыт работы</h2>
                <div class="block__wrap">
                    <div class="block__info info--ico info--expirience">
                        <p class="block__text"><strong>Информ-мобил, ООО&nbsp;&mdash; HTML-верстальщик</strong></p>
                        <p class="block__text text--small">Апрель 2012&nbsp;&mdash; настоящее время</p>
                    </div>
                    <div class="block__info info--ico info--expirience">
                        <p class="block__text"><strong>NBZ IT&nbsp;&mdash; контент-менеджер</strong></p>
                        <p class="block__text text--small">Март 2008&nbsp;&mdash; Апрель 2012</p>
                    </div>
                    <div class="block__info info--ico info--expirience">
                        <p class="block__text"><strong>ООО &laquo;СтарМедиа Рашиа&raquo;&nbsp;&mdash; Системный администратор</strong></p>
                        <p class="block__text text--small">Март 2007&nbsp;&mdash; Март 2008</p>
                    </div>
                    <div class="block__info info--ico info--expirience">
                        <p class="block__text"><strong>Россельхозбанк, ОАО&nbsp;&mdash; Инженер-практикант</strong></p>
                        <p class="block__text text--small">Июль 2006&nbsp;&mdash; Август 2006</p>
                    </div>
                    <div class="block__info info--ico info--expirience">
                        <p class="block__text"><strong>Региональный Мультимедиа Центр&nbsp;&mdash; По совместительству (работа с контентом)</strong></p>
                        <p class="block__text text--small">Ноябрь 2004&nbsp;&mdash; Февраль 2005</p>
                    </div>
                </div>
            </article><!--/end .info-block -->
            <article class="info-block">
                <h2 class="block__header2">Образование</h2>
                <div class="block__wrap">
                    <div class="block__info info--ico info--edu">
                        <p class="block__text"><strong>Высшее. Московский Государственный Институт Электроники и Математики</strong></p>
                        <p class="block__text text--small">Сентябрь 2003&nbsp;&mdash; Июль 2008</p>                    
                    </div>
                    <div class="block__info info--ico info--courses">
                        <p class="block__text"><strong>Курсы Loftschool.ru</strong></p>
                        <p class="block__text text--small">Ноябрь 2014 - по настоящее время</p>                    
                    </div>
                    <div class="block__info info--ico info--courses">
                        <p class="block__text"><strong>JavaScript. Уровень 1. Основы веб-программирования</strong></p>
                        <p class="block__text text--small">Центр компьютерного обучения "Специалист" при МГТУ им. Н. Э. Баумана, 2012</p>                    
                    </div>
                    <div class="block__info info--ico info--courses">
                        <p class="block__text"><strong>Мастер-класс по Google Analytics</strong></p>
                        <p class="block__text text--small">iConText, 2012</p>                    
                    </div>
                    <div class="block__info info--ico info--courses">
                        <p class="block__text"><strong>Основы дизайна</strong></p>
                        <p class="block__text text--small">Центр компьютерного обучения "Специалист" при МГТУ им. Н. Э. Баумана, 2010</p>                    
                    </div>
                </div>
            </article><!--/end .info-block -->
<?php
    include '_partials/contacts.php';
    include '_partials/socials.php';
    include '_partials/footer.php';
?>