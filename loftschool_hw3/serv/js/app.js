'use strict';
//Select Language
var ruEng = (function () {
	var langs = {
		rus: {
			'js-app-name' 		   : 'Генератор водяных знаков',
			'js-settings-name' 	   : 'Настройки',
			'js-image-upload-name' : 'Исходное изображение',
			'js-wm-upload-name'    : 'Водяной знак',
			'js-position-name'	   : 'Положение',
			'js-opacity-name'	   : 'Прозрачность',
			'js-reset-name' 	   : 'Сброс',
			'js-download-name'	   : 'Скачать'
		},
		eng: {
			'js-app-name'	   : 'Watermarks generator',
			'js-settings-name' : 'Settings',
			'js-image-upload-name'  : 'Original image',
			'js-wm-upload-name'	   : 'Watermark',
			'js-position-name' : 'Place',
			'js-opacity-name'  : 'Opacity',
			'js-reset-name'	   : 'Reset',
			'js-download-name' : 'Download'
		}
	};

	var changeLang = function (e) {
		e.preventDefault();

		var lang = $(e.currentTarget).data('lang'),
			l = langs[lang];

		for (var selector in l) {
			$('.' + selector).html( l[selector] );
		}
	};

	return {
		listener: function ($block) {
			$block.on('click', '.globals__btn', changeLang);
		},
		init: function ($block) {
			this.listener($block);
		}
	};
})();

//Share buttons Module
var showShare = {
	//Close Social Buttons Block
	close: function (close) {
		var gc = showShare.gContainer, //Page COntainer
			btn = showShare.obj.find('.js-show-share'), //Button with Thumb up
			timer; //Timer to close automatically after 1s

		// if ( gc.hasClass('show--share') ) {
		// 	timer = setTimeout(function () {
		// 		btn.trigger('click');
		// 	}, 2500);
		// }
	},
	//Show Buttons Block (now it is show/hide)
	show: function () {
		var gc = showShare.gContainer; //Page Container
		
		gc.toggleClass('show--share');

		return false;
	},
	//Listen to Evenets on Block
	listener: function (obj, container) {
		obj.on('click', '.js-show-share', showShare.show);
		container.on('mouseleave', function () {
			showShare.close(true);
		});
	},
	//Init Function for Socials Block
	init: function ($object) {
		//Cache DOM elements
		this.obj = $object; //Button with thumb up
		this.gContainer = this.obj.closest('.container'); //Page container
		this.container = this.obj.closest('.socials'); //Social buttons container

		//Listen to DOM elements
		this.listener(this.obj, this.container);

		console.info('listen to socials panel');
	}
};

//Select type of watermark fill-in Module
var selectType = {
	//Switch Type
	show: function (e) {
		//Prevents Default Behaviour
		e.preventDefault();

		var $target = $(e.currentTarget),
			cont = selectType.container;

		$target.addClass('btn--active')
			.siblings().removeClass('btn--active');

		//The main idea is to add or remove 'disabled'
		//Attribute to inputs. This lets us to send
		//Only data that we have chosen
		if ($target.data('type') === 'use-four') {
			selectType.type = 'four';

			cont
				.find('.block--borders')
				.removeClass('block--hidden')
					.find('.input--switch')
					.removeAttr( 'disabled' )
				.end()
				.siblings()
				.addClass('block--hidden')
					.find('.input--switch')
					.attr('disabled', 'disabled');

			if ( $('.watermark__image').length > 0 ) {
				mltplWm.init();
				//Stop One Watermark Module
				// oneWm.resetVisual();
				oneWm.resetDrag();
			}
		} else {
			selectType.type = 'one';

			cont
				.find('.block--coordinates')
				.removeClass('block--hidden')
					.find('.input--switch')
					.removeAttr( 'disabled' )
				.end()
				.siblings()
				.addClass('block--hidden')
					.find('.input--switch')
					.attr('disabled', 'disabled');

			if ( $('.watermark__image').length > 0 ) {
				mltplWm.disable();
				oneWm.initDrag();
				oneWm.resetPosition();
			}
		}
	},
	//Listener
	listener: function (obj) {
		obj.on('click', '.js-switch-type', selectType.show);
	},
	//Init Module
	init: function ($object) {
		//Cache DOM objects
		this.obj = $object; //Cache switcher
		this.container = this.obj.closest('.form__block'); //Cache container

		this.listener( this.obj ); //Start Listen to Events on Buttons

		//Selected Type
		this.type = 'one';

		console.info('listen to type selector');
	}
};

//Loader
var showLoader = {
	show: function () {
		var cont = $('<div />', {
				class: 'loading'
			}),
			img = $('<div>', {
				class: 'loading__image'
			});

		$('body').prepend( $(cont).append(img) );
	},
	delete: function () {
		$('body').find('.loading').remove();
	}
};

//Check if we Load all necessary Images
var ifImages = (function () {
	var noImg = function (create) {
		var $orig = $('#file-original'),
			$styled = $orig.siblings('.upload-block__style');

		if (create) {
			var errorBlock = $('<span />', {
					class: "style__error",
					text: 'Загрузите изображение'
				});

			$styled.prepend(errorBlock);
		} else {
			if ($styled.find('.style__error').length > 0) {
				$styled.find('.style__error').remove();
			} else {
				return false;
			}
		}
	};

	var noWm = function (create) {
		var $wm = $('#file-watermark'),
			$styled = $wm.siblings('.upload-block__style');

		if (create) {
			var errorBlock = $('<span />', {
					class: "style__error",
					text: 'Загрузите изображение'
				});

			$styled.prepend(errorBlock);
		} else {
			if ($styled.find('.style__error').length > 0) {
				$styled.find('.style__error').remove();
			} else {
				return false;
			}
		}
	};

	return {
		check: function(img, wm) {
			if (img.length === 0 && wm.length === 0) {
				noImg(true);
				noWm(true);
			} else if (img.length === 0) {
				noImg(true);
			} else if (wm.length === 0) {
				noWm(true);
			} else {
				return true;
			};
		},
		resetImg: function () {
			noImg(false);
		},
		resetWm: function () {
			noWm(false);
		}
	}
})();

//Upload Module
var uploadImages = {
	//Add Uploaded Images to DOM
	createElems: function (data) {
		var img = null, //Holder for generated image
			target = null, //Holder for element where we'll append img
			timer;

		//Classes for elements
		this.classes = {
			img: 'root__image',
			wm: 'watermark__image'
		};

		//Check if we have already created images
		//If we have - so we just update src value
		//Else we genereate image and append to target holder
		if ( data.type === 'original' && $('.' + this.classes.img).length > 0 ) {
			return false;
			// $('.' + this.classes.img).attr('src', data.path);
		} else if (data.type === 'watermark' && $('.' + this.classes.wm).length > 0) {
			return false;
			// $('.' + this.classes.wm).attr('src', data.path);
		} else {
			img = $('<img />', {
				src: data.path,
				class: (data.type === 'original') ? this.classes.img : this.classes.wm,
				alt: (data.type === 'original') ? 'Основная картинка' : 'Вотермарк'
			});
			target = (data.type === 'original') ? '.block__root' : '.block__watermark';

			$(target).append(img);
		}

		//Cache uploaded images
		uploadImages.image = (data.type === 'original') ? data.path : uploadImages.image;
		uploadImages.wm = (data.type === 'watermark') ? data.path : uploadImages.wm;

		//If we upload watermark image we need to give it
		//Appropriate opacity level, that we have set with
		//Opacity slider range
		if (data.type === 'watermark') {
			setOpacity.changeOpacity();

			timer = (function () {
				setTimeout(function () {
					if ( $('.watermark__image').length > 0 ) {
						if ( selectType.type === 'one' ) {
							oneWm.init( $('.visual__box') );
						} else {
							$.when( oneWm.init($('.visual__box')) )
								.then(mltplWm.init);
						}
	
						clearTimeout(timer);
					} else {
						timer();
					}
				}, 100);
			})();
		}
	},
	//Generate AJAX response to upload file
	loadFile: function (e) {
		e.preventDefault();

		var jqxhr = $.ajax({
		    url: 'handlers/upload.php',
		    type: "POST",
		    dataType: "json",
		    cache: false,
		    data: new FormData(this),
		    processData:false,
		    contentType: false
		}),
		success = function (data) {
			uploadImages.createElems(data);
			showLoader.delete()
		},
		failure = function (data) {
			console.warn('Server returns error!');
			console.log(data.responseText);
		};

		jqxhr.always(showLoader.show());
		jqxhr.done(success);
		jqxhr.fail(failure);
	},
	//Add filename to styled inputs
	showFileName: function (e) {
		var $input = $(e.currentTarget),
			fileName = $input.val().replace(/\\/g, '/').replace(/.*\//, ''),
			abstract = $input.siblings('.upload-block__style');

		if ( !abstract.hasClass('loaded') ) {
			if ( $input.data('type') === 'original' ) {
				$('#send-image').trigger('click');
				//Hide Error Message If Was 
				ifImages.resetImg();
			} else if ( $input.data('type') === 'watermark' ) {
				$('#send-wm').trigger('click');
				//Hide Error Message If Was 
				ifImages.resetWm();
			}

			abstract
				.addClass('loaded')
				.find('.style__input')
					.html(fileName);

			$input.attr('disabled', 'disabled');
		} else {
			return false;
		}
	},
	//Listen for uploading
	listener: function (obj, form) {
		obj.on('change', this.showFileName);
		form.on('submit', this.loadFile);
	},
	//Init MOdule
	init: function ($input) {
		this.obj = $input; //Cache inputs
		this.form = $input.closest('.form--upload'); //Cache forms

		this.listener( this.obj, this.form ); //Init listener for Events

		console.info('listen for uploading');
	}
};

/* Module for Moving and Positioning of ONE Watermark */
var oneWm = {
	// property module
	$switch_controls: $('.controls--cords'),
	$inputX: $('#x-cord'),
	$inputY: $('#y-cord'),
	btnUpX: $(this.switchInputX)
				.closest('.switch__block')
				.find('.btn--up'),
	btnUpY: $(this.switchInputY)
				.closest('.switch__block')
				.find('.btn--up'),
	step: 10,
	maxCoordX: 434,
	minCoordX: 0,
	maxChoiceX: 434,
	maxCoordY: 356,
	minCoordY: 0,
	maxChoiceY: 356,
	residueY: 5,
	moveSpeed: 100,

	// init module, set $('.visual__box')
	init: function (visual__box) {
		console.info('start oneWm');

		var dfd = $.Deferred();

		this.vBox = visual__box;
		this.$watermark = $('.watermark__image');
		this.listener(this.vBox),

		oneWm.watermarkDrag();

		dfd.resolve();

		return dfd.promise();
	}, 

	// associate events to move the grid and 
	// connect events for selection buttons
	listener: function (obj) {
		var $obj = obj.find('.js-set-cord'),
			switch_buttons = this.$switch_controls;

		$obj.on('click', oneWm.moveOnGridWatermark);
		switch_buttons.on('click', 'button', oneWm.identifyAxis);
	},

	// movement watermark grid
	moveOnGridWatermark: function (e) {
		e.preventDefault();

		var $target = $(e.currentTarget),
			posX = $target.data().cordX,
			posY = $target.data().cordY,
			watermark = oneWm.$watermark;

		watermark
			.animate({
				'left': posX + "px",
				'top': posY + "px"
			}, oneWm.moveSpeed, 'linear');

		oneWm.resetVisual();

		$target
			.closest('.box__cell')
			.addClass('cell--active');

		oneWm.$inputX.val(posX);
		oneWm.$inputY.val(posY);
	},

	// returns the current position watermark
	getCoordWatermark: function () {
		var position = {
			x: parseInt( this.$watermark.css('left'), 10),
			y: parseInt( this.$watermark.css('top'), 10)
		};

		return position;
	},

	// definition of the current selector switch for
	// axis adjustment facility to switch the selector watermark
	// motion along the axis
	identifyAxis: function (e) {
		e.preventDefault();

		var $target = $(e.currentTarget),
			axis = $target.data().direction,
			optionX = {
				input: oneWm.$inputX,
				maxX: oneWm.maxCoordX,
				minX: oneWm.minCoordX,
				currentPosition: oneWm.getCoordWatermark().x
			},
			optionY = {
				input: oneWm.$inputY,
				maxY: oneWm.maxCoordY,
				minY: oneWm.minCoordY,
				currentPosition: oneWm.getCoordWatermark().y
			};

		switch (axis !== '') {
			case axis === 'x-up':
				oneWm.plusCoordXSwitch(optionX);
				break;
			case axis === 'x-down':
				oneWm.minusCoordXSwitch(optionX);
				break;
			case axis === 'y-up':
				oneWm.plusCoordYSwitch(optionY);
				break;
			case axis === 'y-down':
				oneWm.minusCoordYSwitch(optionY);
				break;	
			default: 
			 	return false;
		}
	},

	// increase the value of axis motion
	// currentPosition + step
	plusCoordXSwitch: function (obj) {
		var currentX = oneWm.getCoordSwitch(obj.input);
		
		if ( currentX < obj.maxX) {
			oneWm.$inputX.val(currentX + oneWm.step);
			oneWm.moveOnXWatermark(obj.currentPosition + oneWm.step);
		}
	},

	// decrease the value of axis motion
	// currentPosition - step
	minusCoordXSwitch: function (obj) {
		var currentX = oneWm.getCoordSwitch(obj.input);

		if (currentX === oneWm.maxCoordX) {
			oneWm.btnUpX.removeAttr('disabled');
		}
		
		if ( currentX > obj.minX) {
			oneWm.$inputX.val(currentX - oneWm.step);
			oneWm.moveOnXWatermark(obj.currentPosition - oneWm.step);
		}
	},

	// increase the value of axis motion
	// currentPosition + step
	plusCoordYSwitch: function (obj) {
		var currentY = oneWm.getCoordSwitch(obj.input);

		if ( (obj.maxY - currentY ) === oneWm.residueY) {
			oneWm.moveOnYWatermark(oneWm.maxChoiceY);
			oneWm.$inputY.val(oneWm.maxChoiceY);
			return;
		}
		
		if ( currentY < obj.maxY) {
			oneWm.$inputY.val(currentY + 10);
			oneWm.moveOnYWatermark(obj.currentPosition + oneWm.step);
		}
	},

	// increase the value of axis motion
	// currentPosition - step
	minusCoordYSwitch: function (obj) {
		var currentY = oneWm.getCoordSwitch(obj.input);

		if (currentY === oneWm.residueY) {
			oneWm.moveOnYWatermark(oneWm.minCoordY);
			oneWm.$inputY.val(oneWm.minCoordY);
			return;
		}

		if (currentY === oneWm.maxCoordY) {
			oneWm.btnUpY.removeAttr('disabled');
		}
		
		if ( currentY > obj.minY ) {
			oneWm.$inputY.val(currentY - 10);
			oneWm.moveOnYWatermark(obj.currentPosition - oneWm.step);
		}
	},

	// return the value of the input input - switch
	// and transform into a number
	getCoordSwitch: function ($obj) {		 
		return parseInt( $obj.val(), 10);
	},

	// watermark movement along the x axis
	moveOnXWatermark: function (xCord) {

		if (xCord === oneWm.maxChoiceX) {
			
			oneWm.$watermark
				.stop(true,true)
				.animate({
					'left': xCord +'px'
				}, oneWm.moveSpeed);

			oneWm.btnUpX.attr({'disabled': 'disabled'});

			return;
		}
		
		oneWm.$watermark
			.animate({
				'left': xCord  +'px'
			}, oneWm.moveSpeed);
		
	},

	// watermark movement along the y axis
	moveOnYWatermark: function (yCord) {

		if (yCord === oneWm.maxChoiceY) {
			
			oneWm.$watermark
				.stop(true,true)
				.animate({
					'top': yCord +'px'
				}, oneWm.moveSpeed);

			oneWm.btnUpY
				.attr({'disabled': 'disabled'});

			return;
		}
		
		oneWm.$watermark
			.animate({
				'top': yCord  +'px'
			}, oneWm.moveSpeed);
	},

	// watermark drag grid
	watermarkDrag: function () {
		oneWm.$watermark.attr({
			'id': 'draggable'
		});

		oneWm.$watermark.draggable({
			containment: ".result__block",
			grid: [10,10],
			create: setOpacity.changeOpacity(), //Set Ddefault Opacity
			drag: function () {
				oneWm.$inputX.val(oneWm.getCoordWatermark().x);
				oneWm.$inputY.val(oneWm.getCoordWatermark().y);
			}
		});
	},

	resetPosition: function () {
		var $frstCell = $( this.vBox.find('.btn--cell').get(0) );
		
		$frstCell.trigger('click');
	},

	resetVisual: function () {
		this.cacheVisual = $('.box__cell').find('.cell--active');

		$('.box__cell').removeClass('cell--active');
	},

	resetDrag: function () {
		oneWm.$watermark.draggable('disable');
	},
	initDrag: function () {
		oneWm.$watermark.draggable('enable');
	}	
};

//Deal with Multiple Watermarks and Margins
var mltplWm = (function () {
	var $original = null, //Original Watermark Image
		$wm = null, //Watermark copy
		$block = null, //Watermark Container
		sizes = {}, //Watermark Sizes
		amountHorizontal = null, //How many watermarks horizontally
		amountVertical = null, //How many watermarks vertically
		amount = null, //How many watermarks at all
		//Controls
		$controls = $('.controls--borders'),
		$visualBox = $('.visual__borders'),
		maxWidth = $visualBox.width(), //Max margin value
		maxHeight = $visualBox.height(), //Max margin value
		//Inputs
		$borderX = $('#x-border'),
		$borderY = $('#y-border');

	var setDefaults = function () {
		$original =  $('.watermark__image');
		$wm = $('.watermark__image').clone();
		$block = $('.block__watermark');
		sizes = {
			w: $('.watermark__image').width(),
			h: $('.watermark__image').height()
		};
		amountHorizontal = Math.round( $block.width() / sizes.w );
		amountVertical = Math.round( $block.height() / sizes.h );
		amount = amountHorizontal * amountVertical;

		multiplyWm();
		listener();
	};

	var multiplyWm = function () {
		var html = [],
			cell, row;

		$original.hide();

		if ($block.find('.image--copy').length > 0) {
			$block.find('.image--copy').show();
		} else {
			for (row = 0; row < amountVertical; row++) {
				for (cell = 0; cell < amountHorizontal; cell++) {
					var $wmCopy = $wm.clone();

					$wmCopy
						.addClass('image--copy')
						.css({
							top: row * sizes.h,
							left: cell * sizes.w
						});

					html.push($wmCopy);
				}
			}

			$block.append(html);
		}

		setOpacity.changeOpacity();
	};

	var inputs = function (axis, value) {
		if (axis === 'y') {
			$borderY.val(value);
		} else {
			$borderX.val(value);
		}
	};

	var scheme = function (dir, axis, reset) {
		var border = null,
			height = null,
			width = null;

		if (axis === 'y') {
			border = $visualBox.find('.line--x');
			height = (!reset) ? parseInt( border.css('height'), 10 ) + dir : 1;

			if (height >= maxHeight) {
				height = maxHeight;
			} else if (height === 0) {
				height = 1;
			}

			border.css({
				height: height
			});

			inputs(axis, height);
		} else {
			border = $visualBox.find('.line--y');
			width = (!reset) ? parseInt( border.css('width'), 10 ) + dir : 1;

			if (width >= maxWidth) {
				width = maxWidth;
			} else if (width === 0) {
				width = 1;
			}


			border.css({
				width: width
			});

			inputs(axis, width);
		}

		return {
			h: height,
			w: width
		};
	};

	var switchBorder = function ($objs, dir, axis, reset) {
		var elems = [],
			k =  (dir === 'up') ? 1 : -1,
			val = null,
			row,
			cell,
			startY = startY || 0,
			startX = startX || 0,
			borders = scheme(k, axis, reset),
			stop;

		if (axis === 'y' && borders.h < maxHeight && !stop) {
			stop = false;

			$objs.each(function (i, elem) {
				if ($(elem).css('top') !== '0px') {
					elems.push(elem);
				}
			});

			switchBorder.elems = elems; //Cache elems

			for (row = 1; row < amountVertical; row++) {
				for (cell = 0; cell < amountHorizontal; cell++) {
					var $item = $(switchBorder.elems[startY + cell]),
						topVal = (!reset) ? parseInt( $item.css('top'), 10 ) : sizes.h;
						
					$item.css({
						top: (topVal < row * sizes.h) ? sizes.h * row : topVal + row * k
					});
				}
				//From wich alement in a row I need to start (How many elements I have already sort)
				startY = switchBorder.elems.length - (switchBorder.elems.length - amountHorizontal * row);
			}
		} else if (axis === 'x' && borders.w < maxWidth && !stop) {
			stop = false;

			$objs.each(function (i, elem) {
				if ($(elem).css('left') !== '0px') {
					elems.push(elem);
				}
			});

			switchBorder.elems = elems; //Cache elems

			for (row = 0; row < amountVertical; row++) {
				for (cell = 0; cell < amountHorizontal - 1; cell++) {
					var $item = $(switchBorder.elems[startX + cell]),
						leftVal = (!reset) ? parseInt( $item.css('left'), 10 ) : sizes.w;

					$item.css({
						left: (leftVal < (cell + 1) * sizes.w ) ? sizes.w * (cell + 1) : leftVal + (cell + 1) * k
					});
				}
				//From wich alement in a row I need to start (How many elements I have already sort)
				startX = switchBorder.elems.length - (switchBorder.elems.length - (amountHorizontal - 1) * (row + 1));
			}
		} else {
			stop = true;
			return false;
		}
	};

	var setBorder = function (e) {
		e.preventDefault();

		var $btn = $(e.currentTarget),
			dir = $btn.data('border');

		switch (dir !== '') {
			case dir === 'y-b-up':
				switchBorder($('.image--copy'), 'up', 'y');
				break;
			case dir === 'y-b-down':
				switchBorder($('.image--copy'), 'down', 'y');
				break;
			case dir === 'x-b-up':
				switchBorder($('.image--copy'), 'up', 'x');
				break;
			case dir === 'x-b-down':
				switchBorder($('.image--copy'), 'down', 'x');
				break;
			default:
				return false;
		}
	};

	var listener = function () {
		$controls.on('click', 'button', setBorder);
	};

	return {
		init: function () {
			console.info('Start Multiple Watermarks');

			setDefaults();
		},

		disable: function () {
			$original.show();
			$block.find('.image--copy').hide();
		},

		reset: function () {
			switchBorder($('.image--copy'), 'up', 'y', true);
			switchBorder($('.image--copy'), 'up', 'x', true);
		},

		getAmounts: function () {
			return {
				amntH: amountHorizontal,
				amntV: amountHorizontal
			}
		}
	};
})();


//Opacity slider
var setOpacity = {
	op: 52, //Default opacity value
	//Cache classes for images
	elems: {
		watermark: '.watermark__image',
		image: '.root__image'
	},
	//Reset Opacity Value to Default
	resetOpacity: function () {
		//Change Opacity Value to Default one
		this.op = 52;
		//Change Opacity Value on Watermark
		this.changeOpacity(this.op);
		//Return handle to default position
		$('.slider-range').slider('value', this.op);
		//Return lower to default position
		$('.slider--lower').css({
			width: this.op + '%'
		});
		//Set hidden input value to defauklt
		$('#opacity-value').attr('value', this.op);
	},
	//Function that changes Image opacity Level
	changeOpacity: function (val) {
		var wm = this.elems.watermark;

		val = val || this.op;

		$(wm).css({
			opacity: val/100
		});
	},
	//Style Slider Range with jQuery UI
	styleRange: function () {
		this.slider.slider({
			min: 0,
			max: 100,
			step: 1,
			value: setOpacity.op,
			orientation: 'horizontal',
			//Add darken element after styling main element
			create: function (e, ui) {
				$(this)
					.append(setOpacity.lower)
					.find('.slider--lower')
						.css({
							width: setOpacity.op + '%'
						});

				$('#opacity-value').attr('value', setOpacity.op);
			},
			//Executes on slide event
			slide: function(e, ui) {
				setOpacity.op = ui.value;

				$('.slider--lower').css({
					width: setOpacity.op + '%'
				});

				$('#opacity-value').attr('value', setOpacity.op);

				setOpacity.changeOpacity(setOpacity.op);
			} 
		});

		console.info('style opacity');
	},
	//Init Module
	init: function ($slider) {
		this.slider = $slider; //Slide element
		this.lower = $('<span />', {'class': 'slider--lower'}); //Create darken element

		this.styleRange(); //Style our this.slider element
	}
};

var resetFiles = (function () {
	var removeImages = function () {
		$('.watermark__image').remove();
		$('.image--copy').remove();
		$('.root__image').remove();
		//Clear Uploaded Images Cache
      	uploadImages.image = '';
		uploadImages.wm = '';
	};

	var enableUploads = function () {
		var $orig = $('#file-original'),
            $wm = $('#file-watermark');
      	
		$orig
			.removeAttr('disabled')
				.siblings('.upload-block__style')
				.removeClass('loaded')
					.find('.style__input')
					.html('Image.jpg')
					.end()
				.end()
			.replaceWith($orig.val('').clone(true)); //Clear Input (like on CSS-Tricks)

		$wm
			.removeAttr('disabled')
				.siblings('.upload-block__style')
				.removeClass('loaded')
					.find('.style__input')
					.html('Image.png')
        			.end()
				.end()
			.replaceWith($wm.val('').clone(true)); //Clear Input (like on CSS-Tricks)
	};

	return {
		init: function () {
			removeImages();
			enableUploads();
		}
	};
})();

//Reset form or Download (Made it with private variables to keep pathes in secret)
var doneForm = (function() {
	//Paths
	var paths = {
		download: 'handlers/download.php',
		getfile: 'handlers/getfile.php'
	};


	//Download generated Image with Watermark
	//It gets Event object from click on submit button
	var downloadImg = function (e) {
		e.preventDefault();
	
		//If we have uploaded Images cache can't be empty
		var img = uploadImages.image || '',
			wm = uploadImages.wm || '';

		//If we uploaded Images we can send query to generate one image
		if ( img.length > 0 && wm.length > 0 ) {
			var val = null, //POST params
				jqxhr = null, //Ajax Request
				success = null, //hold function when we get positive response
				failure = null, //holds function if we get error
				imgObj = $('.' + uploadImages.classes.img), //Uploaded Image
				wmObj = $('.' + uploadImages.classes.wm); // Uploaded Watermark
			
			//Generate POST query
			val = [ 
					$(e.target).serialize(),
					'&image=' + img.replace('/', '^'),
					'&wm=' + wm.replace('/', '^'),
					'&iwidth=' + imgObj.width(),
					'&iheight=' + imgObj.height(),
					'&wwidth=' + wmObj.width(),
					'&wheight=' + wmObj.height(),
					'&amntH=' + mltplWm.getAmounts().amntH,
					'&amntV=' + mltplWm.getAmounts().amntV
				  ].join('');

			jqxhr = $.ajax({
				url: paths.download,
				type: "POST",
				data: val,
				cache: true,
				dataType: 'json'
			});
			success = function (data) {
				console.info('file generated');
				//Delete Loader
				showLoader.delete();
				//Redirect to Image
				window.location = paths.getfile + '?link=' + data.link;
			};
			failure = function (data) {
				console.warn('can\'t generate file', data);
			};

			//Show Loader
			jqxhr.always(showLoader.show());
			jqxhr.done(success);
			jqxhr.fail(failure);
		} else {
			ifImages.check(img, wm);

			console.warn('нет изображений');
			return false;
		}
	};

 	//Reset All values to Default
	var resetForm = function () {
		//If we have uploaded Images cache can't be empty
		var img = uploadImages.image || '',
			wm = uploadImages.wm || '';

		if ( ifImages.check(img, wm) ) {
			setOpacity.resetOpacity();

			if ( $('.btn--four-marks').hasClass('btn--active') ) {
				mltplWm.reset();
			} else {
				oneWm.resetPosition();
			}

			resetFiles.init();
		}
	};

	return {
		//Listen on Button clicks
		listener: function ($form) {
			$form.on('click', '.btn--reset', resetForm);
			$form.on('submit', downloadImg);
		},
		//Init Module
		init: function ($form) {
			// this.form = $form; //Cache form
			this.listener($form); //Start listening
		}
	};
})();

$(function() {
	console.info('start app');
	
	showShare.init( $('.socials') );
	selectType.init( $('.application-types') );
	uploadImages.init( $('.input--upload') );
	setOpacity.init( $('.slider-range') );
	doneForm.init( $('.settings__form') );
	ruEng.init( $('.globals__lang') );
});