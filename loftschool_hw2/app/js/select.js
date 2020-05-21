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