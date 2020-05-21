<?php
    session_start();
    
    $active = "feedback";

    include '_partials/header.php';
    include '_partials/navigation.php';
?>
            <article class="info-block">
                <h2 class="block__header2 header--bg"><span class="header__text">У вас есть интересный проект? Напишите мне.</span></h2>
                <div class="block__wrap">
                    <div class="block__info info--form">
                        <form action="mailer/mailer.php" class="form-block" method="post">
                            <fieldset class="form-block__item item--personal-info">
                                <div class="item__wrap">
                                    <label for="cli-name" class="form-block__label">Имя</label>
                                    <div class="wrap__field">
                                        <input type="text" id="cli-name" name="cli-name" class="form-block__field" placeholder="Как к Вам обращаться" tabindex="1" data-val="Имя" autofocus required />
                                    </div>
                                </div>
                                <div class="item__wrap">
                                    <label for="cli-email" class="form-block__label">Email</label>
                                    <div class="wrap__field">
                                        <input type="email" id="cli-email" name="cli-email" placeholder="Куда мне писать" class="form-block__field" tabindex="2" data-val="Email" required />
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset class="form-block__item item--message">
                                <label class="form-block__label" for="cli-message">Сообщение</label>
                                <div class="wrap__field">
                                    <textarea name="cli-message" id="cli-message" class="form-block__field field--textarea" placeholder="Кратко, в чем суть" data-val="Сообщение" tabindex="3" required></textarea>
                                </div>
                            </fieldset>
                            <fieldset class="form-block__item item--captcha">
                                <label class="form-block__label text--small" for="capt-val">Введите код, указанный на картинке</label>
                                <div class="item__wrap">
                                    <div class="form-block__capt">
                                        <img src="captcha/captcha.php" class="capt__image" alt="Введите цифры указанные на картинке" />
                                    </div>
                                    <div class="wrap__field">
                                        <input type="text" id="capt-val" name="capt-val" placeholder="" class="form-block__field" tabindex="4" data-val="Код" required />
                                    </div>
                                </div> 
                            </fieldset>
                            <div class="form-block__item item--buttons">
                                <button type="submit" class="form-block__btn btn--blue">Отправить</button>
                                <button type="reset" class="form-block__btn btn--gray">Очистить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </article><!--/end .info-block -->
<?php
    include '_partials/contacts.php';
    include '_partials/socials.php';
    include '_partials/footer.php';
?>