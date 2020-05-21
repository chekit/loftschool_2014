jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	}
});
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

/**
 * Module: rem - v1.3.2
 * Description: A polyfill to parse CSS links and rewrite pixel equivalents into head for non supporting browsers
 * Date Built: 2014-07-02
 * Copyright (c) 2014  | Chuck Carpenter <chuck.carpenter@me.com>,Lucas Serven <lserven@gmail.com>;
**/
!function(a){"use strict";var b=function(){var a=document.createElement("div");return a.style.cssText="font-size: 1rem;",/rem/.test(a.style.fontSize)},c=function(){for(var a=document.getElementsByTagName("link"),b=[],c=0;c<a.length;c++)"stylesheet"===a[c].rel.toLowerCase()&&null===a[c].getAttribute("data-norem")&&b.push(a[c].href);return b},d=function(){for(var a=0;a<m.length;a++)j(m[a],e)},e=function(a,b){if(q.push(a.responseText),r.push(b),r.length===m.length){for(var c=0;c<r.length;c++)f(q[c],r[c]);(m=n.slice(0)).length>0?(r=[],q=[],n=[],d()):g()}},f=function(a,b){for(var c,d=k(a).replace(/\/\*[\s\S]*?\*\//g,""),e=/[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g,f=d.match(e),g=/\d*\.?\d+rem/g,h=d.match(g),i=/(.*\/)/,j=i.exec(b)[0],l=/@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm;null!==(c=l.exec(a));)n.push(j+c[1]);null!==f&&0!==f.length&&(o=o.concat(f),p=p.concat(h))},g=function(){for(var a=/[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g,b=0;b<o.length;b++){l+=o[b].substr(0,o[b].indexOf("{")+1);for(var c=o[b].match(a),d=0;d<c.length;d++)l+=c[d],d===c.length-1&&"}"!==l[l.length-1]&&(l+="\n}")}h()},h=function(){for(var a=0;a<p.length;a++)s[a]=Math.round(parseFloat(p[a].substr(0,p[a].length-3)*t))+"px";i()},i=function(){for(var a=0;a<s.length;a++)s[a]&&(l=l.replace(p[a],s[a]));var b=document.createElement("style");b.setAttribute("type","text/css"),b.id="remReplace",document.getElementsByTagName("head")[0].appendChild(b),b.styleSheet?b.styleSheet.cssText=l:b.appendChild(document.createTextNode(l))},j=function(b,c){try{var d=a.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP")||new ActiveXObject("Msxml2.XMLHTTP"):new XMLHttpRequest;d.open("GET",b,!0),d.onreadystatechange=function(){4===d.readyState&&c(d,b)},d.send(null)}catch(e){if(a.XDomainRequest){var f=new XDomainRequest;f.open("get",b),f.onload=function(){c(f,b)},f.onerror=function(){return!1},f.send()}}},k=function(b){return a.matchMedia||a.msMatchMedia||(b=b.replace(/@media[\s\S]*?\}\s*\}/g,"")),b};if(!b()){var l="",m=c(),n=[],o=[],p=[],q=[],r=[],s=[],t="";t=function(){var a,b=document,c=b.documentElement,d=b.body||b.createElement("body"),e=!b.body,f=b.createElement("div"),g=d.style.fontSize;return e&&c.appendChild(d),f.style.cssText="width:1em; position:absolute; visibility:hidden; padding: 0;",d.style.fontSize="1em",d.appendChild(f),a=f.offsetWidth,e?c.removeChild(d):(d.removeChild(f),d.style.fontSize=g),a}(),d()}}(window);
/**
 *  === TEMPLATE ===
 *  <div class="custom-select" data-name="call-month">
 *  	<span class="custom-select__selected">{Current Value}</span>
 *   	<span class="custom-select__arrow">&#8964;</span>
 *      <span class="custom-select__options">
 *	        <span class="options__scroll"></span>
 *	        <span class="options__wrap">
 *          	<span class="options__item" data-val="{Option VALUE attribute Value}">{Option HTML Value}</span>
 *          </span>
 *      </span>
 *  </div>
 */
(function ($) {
	$.fn.styleSelects = function () {
		return this.each(function (i, item) {
			var $item = $(item),
				//Select Item Attributs
				settings = {
					name: $item.attr('name'),
					options: $item.find('option')
				},
				//Custom Select Container
				container = $('<div />', {
					'class': 'custom-select ' + settings.name,
					'data-name': settings.name
				}),
				//Selected value container
				selected = $('<span />', {
					'class': 'custom-select__selected',
					'html': $(settings.options.get(0)).html(),
					'data-val': $(settings.options.get(0)).attr('value')
				}),
				//Arrow
				btn = $('<span />', {
					html: '&#8964;'
				}).attr('class', 'custom-select__arrow'),
				//Custom options container
				itemsContainer = $('<span />').attr('class', 'custom-select__options'),
				scroll = $('<span />', {'class': 'options__scroll'}),
				scrollContainer = $('<span/>', {'class': 'options__wrap'}), 
				//Customed options array
				items = [],
				opt = null,
				optElem = null, //Stores real option to set selected 
				$dragging = null;

			settings.options.each(function (i, item) {
				var $item = $(item),
					model = $('<span />', {
						'class': 'options__item',
						'data-val': $item.attr('value'),
						'html': $item.html()
					});

				items.push(model);
			});

			if (items.length * 26 > 206) {
				opt = $(itemsContainer).append( scroll ).append( scrollContainer.append(items) );
			} else {
				opt = $(itemsContainer).append(items);
			}

			container
				.append(selected)
				.append(btn)
				.append(opt)
			.insertBefore( $item.addClass('select--hide') );

			//Elements Events
			btn.on('click', function () {
				itemsContainer
					.stop()
					.slideToggle({
						duration: 250,
						easing: 'linear'
					})
					.parent()
					.siblings('.custom-select')
						.find('.custom-select__options')
						.slideUp();

				return false;
			});
			selected.on('click', function () {
				itemsContainer
					.stop()
					.slideToggle({
						duration: 250,
						easing: 'linear'
					})
					.parent()
					.siblings('.custom-select')
						.find('.custom-select__options')
						.slideUp();

				return false;
			});

			itemsContainer.on('click', '.options__item', function () {
				optElem = $item.children().get( $(this).index() );

				selected
					.html( $(this).html() )
					.attr('data-val', $(this).attr('data-val'));

				$(optElem).attr('selected', true);

				btn.trigger('click');
			});

//TODO: начал скрол, но пока не очень получается
			/*
			scroll
				.on('mousemove', function (e) {
					if ($dragging) {
						console.log(e.offsetY);
						$dragging
							.css({
								top: $dragging.position().top + 1
							})
					} else {
						return false;
					}
				})
				.on('mousedown', function (e) {
					$dragging = $(e.target);
				})
				.on('mouseup', function () {
					$dragging = null;
				});
			*/	
		});
	};
})(jQuery);
var slideShow = {
	//Set slider width
	setWidth: function ($slidesList) {

		$slidesList.css({
			width: this.container.outerWidth() * $slidesList.find('.slides-list__item').length
		});

		this.slidesList = $slidesList;

		this.eventListeners($slidesList);
	},
	//All events
	eventListeners: function () {

		this.container.on('click', '.slider__btn', this.moveSlides);
	},
	//Function that moves slides
	moveSlides: function (e) {

		e.preventDefault();

		slideShow.counter += ($(this).data('dir') === 'next') ? 1 : -1;

		slideShow.buttonVisibility(slideShow.counter);

		slideShow.slidesList
			.stop()
			.animate({
				marginLeft: -slideShow.counter * slideShow.container.outerWidth()
			}, 515, 'easeInOutQuad');
	},
	//Show/Hide Buttons
	buttonVisibility: function (counter) {
		var cont = slideShow.container; 

		if (counter > 0 && counter < slideShow.slidesList.children().length - 1) {
			cont.find('.slider__btn').show().removeClass('btn--hide');
		} else if (counter <= 0) {
			slideShow.counter = 0;

			cont.find('.btn--left').fadeOut(function () {
				$(this).addClass('btn--hide');
			});
			cont.find('.btn--right').fadeIn(function () {
				$(this).removeClass('btn--hide');
			});
		} else if (counter >= slideShow.slidesList.children().length - 1) {
			slideShow.counter = slideShow.slidesList.children().length - 1;

			cont.find('.btn--right').fadeOut(function () {
				$(this).addClass('btn--hide');
			});
			cont.find('.btn--left').fadeIn(function () {
				$(this).removeClass('btn--hide');
			});
		}
	},
	//Init Slider Function
	init: function ($sliderBlock) {

		this.container = $sliderBlock;
		this.counter = 0;

		this.setWidth(this.container.find('.slider__slides-list'));
	}
};

slideShow.init( $('.content__slider') );