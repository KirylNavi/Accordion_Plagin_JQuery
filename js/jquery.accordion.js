(function($){

	function Accordion(contain, setting) {
		var itemsAcoordion = $(contain).find('.accordion-item');

		function targetHead(elem) {
			var elemHead = elem.closest(".accordion-head");

			if(elemHead){
				return elemHead;
			} else {
				return false;
			}
		}

		function activElem(wrapElemTarget) {
			$(wrapElemTarget).toggleClass("active-accordion");
			$(wrapElemTarget).find(".accordion-body").stop(true).slideToggle(setting.slideSpeed);
		}

		this.init = function() {

			if(setting.firstChildExpand == true) {
				$(itemsAcoordion).first().addClass('active-accordion');
				$(itemsAcoordion).first().find('.accordion-body').slideToggle(0);
			}

			$(contain).on('click', function(e){
				var elemTarget = targetHead(e.target),
					wrapElemTarget = $(elemTarget).parent();

				if(elemTarget) {
					var activeElemTarget = $(contain).find(".active-accordion");

					if(setting.multiExpand == false) {
						if(activeElemTarget && $(activeElemTarget).get(0) != $(wrapElemTarget).get(0)) {
							$(activeElemTarget).find(".accordion-body").stop(true, true).slideToggle(setting.slideSpeed);
							$(activeElemTarget).removeClass("active-accordion");
							activElem(wrapElemTarget);
						} else if(!activeElemTarget) {
							activElem(wrapElemTarget);
						} 						
					} else {
						activElem(wrapElemTarget);
					}			
				}
			});

		}
	}
	$.fn.jqAccordion = function(options) {
		var settings = $.extend({
			firstChildExpand: true,
			multiExpand: true,
			slideSpeed: 500
		}, options);

		return this.each(function(){
			var acoordion = new Accordion(this, settings);
			acoordion.init();
		})
	}
}(jQuery));