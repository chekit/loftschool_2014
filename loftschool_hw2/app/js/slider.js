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