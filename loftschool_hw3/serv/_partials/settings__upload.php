          <form class="form--upload" action="handlers/upload.php" method="post" enctype="multipart/form-data">
            <fieldset class="form__block block--noborder">
              <div class="form__upload-block">
                <label class="p js-image-upload-name">Исходное изображение</label>
                <div class="upload-block__wrap">
                  <!--Стилизуем загрузку-->
                  <div class="upload-block__style">
                    <div class="form__input style__input">Image.png</div>
                    <div class="btn--upload">Загрузить</div>
                  </div>
                  <!--Само поле загрузки, opacity: 0-->
                  <input class="form__input input--upload" type="file" name="original" id="file-original" data-type="original">
                  <input id="send-image" type="submit" value="" hidden />
                </div>
              </div>
            </fieldset>
          </form>
          <form class="form--upload" action="handlers/upload.php" method="post" enctype="multipart/form-data">
            <fieldset class="form__block">		
              <div class="form__upload-block">
                <label class="p js-wm-upload-name">Водяной знак </label>
                <div class="upload-block__wrap">
                  <!--Стилизуем загрузку-->
                  <div class="upload-block__style">
                    <div class="form__input style__input">Image.png</div>
                    <div class="btn--upload">Загрузить</div>
                  </div>
                  <!--Само поле загрузки, opacity: 0-->
                  <input class="form__input input--upload" type="file" name="watermark" id="file-watermark" data-type="watermark">
                  <input id="send-wm" type="submit" value="" hidden />
                </div>
              </div>
            </fieldset>
          </form>