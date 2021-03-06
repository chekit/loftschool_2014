$(function () {
	var	$formBlock = $('.form-block'), //Form block
		$popup = $('.popup-container'); //Popup Container
		//Open/Close Menu Module
		mainMenu = {
			objects: {
				$btn: $('.header__show-menu-btn'),
				$menu: $('.main-nav')
			},
			events: function (obj) {
				obj.objects.$btn.on('click', function (e) {
					e.preventDefault();


					obj.objects.$menu.toggleClass('main-nav--visible');
				});

				obj.objects.$menu.on('click', '.nav-list__link', function () {
					if ($(this).hasClass('link--active')) {
						return false;
					}
				});
			},
			init: function() {
				var _this = this;
				
				this.events(_this);
			}
		},
		//Form Validation Module
		formValidation = {
			submitForm: function (e) {
				e.preventDefault();

				var $this = $(this),
					val = $this.serialize(),
					jqxhr = null;

				if ( !formValidation.validate($this) ) {
					return false;
				}

				jqxhr = $.ajax({
				    url: 'mailer/mailer.php',
				    type: "POST",
				    dataType: "json",
				    data: val
				});

				jqxhr.done(function (data) {
					if (data.result) {
						$('.form-block')
							.animate({
								opacity: 0,
								visibility: 'hidden'
							})
							.before('<p class="text text--send_success">Ваше сообщение отправлено.</p>'); // Because of IE
					} else {
						var error = '';

						if (!data.name) {
							error += 'Имя ';
						}

						if(!data.email) {
							error += 'Email ';
						}

						if (!data.message) {
							error += 'Сообщение ';
						}
		
						if(!data.code) {
							error += 'Каптча ';
						}

						$('.form-block').find('.text--send_error').remove();

						$('.form-block').prepend('<p сlass="text text--send_error">Не удалось отправить письмо! Ошибка: ' + error + '</p>'); // Because of IE

					}
				});
				jqxhr.fail(function (data) {
					var error = '';

					if (!data.name) {
						error += 'Имя ';
					}

					if(!data.email) {
						error += 'Email ';
					}

					if (!data.message) {
						error += 'Сообщение ';
					}
	
					if(!data.code) {
						error += 'Каптча ';
					}

					console.log(data);

					$('.form-block').find('.text--send_error').remove();

					$('.form-block').prepend('<p сlass="text text--send_error">Не удалось отправить письмо! Ошибка: ' + error + '</p>'); // Because of IE
				});
			},
			resetError: function () {
				var $this = $(this);

				if ($this.closest('.wrap__field').hasClass('field--error')) {
					$this.closest('.wrap__field').removeClass('field--error').find('.field__tooltip').remove();
				}
			},
			resetAll: function($form) {
				var $inputs = $form.find('input, textarea');

				$inputs.each(function(i, item) {
					$(item).parent().removeClass('field--error').find('.field__tooltip').remove();
				});
			},
			events: function ($form, context) {
				$form.on('submit', context.submitForm);

				$form.on('keydown', 'input, textarea', context.resetError);

				$form.on('click', 'button[type=reset]', function () {
					context.resetAll($form);
				});
			},
			validate: function ($thisForm) {
				var $inputs = $thisForm.find('input, textarea'),
					submit = true;

				$inputs.each(function(i, item) {
					var $item = $(item),
						val = $item.val(),
						itemType = $item.data('val').toLowerCase(),
						errorText = 'Введите ' + itemType;

					if (val.length === 0) {
						$item.parent().addClass('field--error').prepend( formValidation.tooltip(errorText) );
						sunmit = false;
					}
				});

				return submit;
			},
			tooltip: function (text) {
				var tmpl = [
							'<div class="field__tooltip tooltip--top">',
			                    '<p class="tooltip__text">' + text + '</p>',
				            '</div>'
				            ].join('\n');
				            
				return tmpl;
			},
			init: function ($form) {
				this.events($form, this);
			}
		},
		addProject = {
			init: function ($block) {
				$block.fadeIn(function () {
					$(this).removeClass('container--none');
				});

				this.eventListeners($block);
			},
			eventListeners: function ($block) {
				$block.on('click', '.popup__close-btn', this.closeBlock);
				$block.on('click', '.popup-container__bg', this.closeBlock);
				$block.on('change', '.js-upload-file', this.uploadFile);
			},
			closeBlock: function (e) {
				e.preventDefault();

				$(e.delegateTarget).fadeOut(function () {
					$(this).addClass('container--none')
						.find('.style-upload__input')
						.removeClass('input--file')
						.html('Загрузите файл');
				});
			},
			uploadFile: function () {
				var fileName = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');

				$(this).parent().find('.style-upload__input')
					.addClass('input--file')
					.html(fileName);
			}
		};

	mainMenu.init();

	if ($formBlock.length > 0) {
		formValidation.init($formBlock);
	}

	if ($popup.length > 0) {
		$('.js-add-proj').on('click', function (e) {
			addProject.init($popup);
			return false;
		});
	}
});