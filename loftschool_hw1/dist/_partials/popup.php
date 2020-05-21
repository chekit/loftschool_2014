        <div class="popup-container container--none">
            <div class="popup">
                <div class="info-block">
                    <div class="block__header2 header--bg">
                        <span class="header__text">Добавление проекта</span>
                        <button class="popup__close-btn">Закрыть окно</button>
                    </div>
                        <div class="block__wrap">
                            <div class="block__info add--form">
                                <form action="#" class="form-block" method="post">
                                    <fieldset class="form-block__item">
                                        <div class="item__wrap">
                                            <label for="proj-name" class="form-block__label">Название проекта</label>
                                            <div class="wrap__field">
                                                <input type="text" id="proj-name" name="proj-name" class="form-block__field" placeholder="Введите название" tabindex="1" data-val="Название проекта" autofocus required />
                                            </div>
                                        </div>
                                        <div class="item__wrap">
                                            <label for="proj-img" class="form-block__label">Картинка проекта</label>
                                            <div class="wrap__field field--upload">
                                                <div class="field__style-upload">
                                                    <div class="form-block__field style-upload__input" data-val="Картинка проекта">Загрузить файл...</div>
                                                    <div class="style-upload__btn">Загрузить картинку</div>
                                                </div>
                                                <input type="file" id="proj-img" name="proj-img" placeholder="Загрузите изображение" class="form-block__field field--upload js-upload-file" tabindex="2" data-val="Картинка проекта" required />
                                            </div>
                                        </div>
                                        <div class="item__wrap">
                                            <label for="proj-url" class="form-block__label">URL проекта</label>
                                            <div class="wrap__field">
                                                <input type="email" id="proj-url" name="proj-url" placeholder="Добавьте ссылку" class="form-block__field" tabindex="2" data-val="URL проекта" required />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset class="form-block__item">
                                        <label class="form-block__label" for="proj-description">Описание</label>
                                        <div class="wrap__field">
                                            <textarea name="proj-description" id="proj-description" class="form-block__field field--textarea" placeholder="Пара слов о Вашем проекте" data-val="Описание" tabindex="3" required></textarea>
                                        </div>
                                    </fieldset>
                                    <div class="form-block__item item--buttons item--center">
                                        <button type="submit" class="form-block__btn btn--blue">Добавить</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
            <div class="popup-container__bg"></div>
        </div>