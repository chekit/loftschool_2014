var formCall = {
	//Submit Form
	formSubmit: function (e) {
		e.preventDefault();

		var evTarg = $(e.currentTarget),
			name = evTarg.find('#user-name').val() || 'none',
			phone = evTarg.find('#user-phone').val() || 'none',
			dataDay = evTarg.find('.call-day').find('.custom-select__selected').html(),
			dataMonth = evTarg.find('.call-month').find('.custom-select__selected').html(),
			//For Additional Validation we can check if comment was filled in
			comment = evTarg.find('#user-comment').val() || 'none',
			//Validate Phone Number +X(XXX)XXXXXXX or +X XXX XXXXXXX
			phoneno = /^\+?([0-9]{1})\)?[( ]?([0-9]{3})[) ]?([0-9]{7})$/,
			send = true,
			jqxhr = null,
			val = $(this).serialize();

		if (name === '' || name === 'none') {
			send = false;

			evTarg.find('#user-name').parent()
				.addClass('fieldset--error')
				.prepend($('<div />', {
					'class': 'fieldset__tooltip',
					'html': 'Заполните <strong>' + evTarg.find('#user-name').siblings('.form__label').html() + '</strong>'
				}))			
				.end()
				.on('keydown', formCall.resetField);
		}

		if (phone === '' || phone === 'none') {
			send = false;

			evTarg.find('#user-phone').parent()
				.addClass('fieldset--error')
				.prepend($('<div />', {
					'class': 'fieldset__tooltip',
					'html': 'Заполните <strong>' + evTarg.find('#user-phone').siblings('.form__label').html() + '</strong>'
				}))
				.end()
				.on('keydown', formCall.resetField);			
		} else if (!phone.match(phoneno)) {
			send = false;

			evTarg.find('#user-phone').parent()
				.addClass('fieldset--error')
				.prepend($('<div />', {
					'class': 'fieldset__tooltip',
					'html': 'Неверно указан формат номера +X(XXX)XXXXXXX'
				}))
				.end()
				.on('keydown', formCall.resetField);
		}


		if (send) {
			jqxhr = $.ajax({
				url: 'mailer/mailer.php',
				method: 'POST',
				dataType: 'json',
				data: val
			});
	
			jqxhr.done(function (data) {
				if (data.result) {
					evTarg
						.find('fieldset').fadeOut()
						.end()
						.append($('<p />', {
							'class': 'text text--positive',
							'text': 'Скоро мы с вами свяжемся'
						}));
				} else {
					evTarg.prepend($('<p />', {
						'class': 'text text--error',
						'text': 'Невозможно отправить письмо, проверьте данные'
					}))	
				}
			});
			jqxhr.fail(function (data) {
				evTarg.prepend($('<p />', {
					'class': 'text text--error',
					'text': 'Невозможно отправить письмо'
				}))
			});
		}
	},
	//Reset Form Fields
	resetForm: function (e) {
		$(e.delegateTarget).find('.form__fieldset').each(function () {
			var item = $(this);

			if (item.hasClass('fieldset--error')) {
				item.removeClass('fieldset--error')
					.find('.fieldset__tooltip').remove();
			}
		});
	},
	//Reset Error If we start type in input that was wrong
	resetField: function (e) {
		$(e.currentTarget).parent()
			.removeClass('fieldset--error')
			.find('.fieldset__tooltip').remove();
	},
	//Prevent user to type-in characters into phone field, except digits and '+','(',')'
	preventCharacter: function (e) {
		if (e.charCode !== 43 && e.charCode !== 41 && e.charCode !== 40 && e.charCode !== 32 && (e.charCode < 48 || e.charCode > 57)) {
			return false;
		}
	},
	//Form Events
	eventsListener: function ($form) {
		$form.on('submit', this.formSubmit);
		$form.on('click', '.js-reset-form', this.resetForm);
		$form.on('keypress', '#user-phone', this.preventCharacter)
	},
	//Initalize Form control
	init: function ($form) {
		this.eventsListener( $form );
	}
}

$('.form__select').styleSelects();
formCall.init( $('.aside__form') );
