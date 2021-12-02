"use strict";
const JSCCommon = {

	

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад", 
			}, 
		}); 
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() { 
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js"); 
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume() {
		//ultimate tabs
		let cTabs = document.querySelectorAll('.tabs');
		for (let tab of cTabs){
			let Btns = tab.querySelectorAll('.tabs__btn')
			let contentGroups = tab.querySelectorAll('.tabs__wrap');

			for (let btn of Btns){
				btn.addEventListener('click', function (){

					for (let btn of Btns){
						btn.classList.remove('active');
					}
					this.classList.add('active');

					let index = [...Btns].indexOf(this);
					//-console.log(index);

					for (let cGroup of contentGroups){
						let contentItems = cGroup.querySelectorAll('.tabs__content');

						for (let item of contentItems){
							item.classList.remove('active');
						}
						contentItems[index].classList.add('active');
					}
				})
			}
		}
	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	}, 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	//pure js
	animateScroll(topShift=80) {
		document.addEventListener('click', function (){
			if (event.target.closest('.menu li a, .scroll-link')) {
				let self = event.target.closest('.menu li a, .scroll-link');
				event.preventDefault();

				let targetSelector = self.getAttribute('href');
				let target = document.querySelector(targetSelector);

				if (!target) {
					self.setAttribute("href", '/' + targetSelector);
				}
				else{
					event.preventDefault();
					let targetTop = target.offsetTop;
					window.scrollTo({
						top: targetTop - topShift,
						behavior: "smooth",
					});
				}

			}
		});
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume();
	JSCCommon.mobileMenu();
	// JSCCommon.inputMask(); 
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.animateScroll();

	//luckyOne Js
	let headerH;
	let header = document.querySelector(".header--js");
	function calcHeaderHeight() {
		if (!header) return;
		document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
		headerH = header.offsetHeight;

		window.scrollY > 0
			? header.classList.add('fixed')
			: header.classList.remove('fixed');
	}
	window.addEventListener('resize', calcHeaderHeight, { passive: true });
	window.addEventListener('scroll', calcHeaderHeight, { passive: true });

	calcHeaderHeight();
	window.setTimeout(calcHeaderHeight, 10);
	window.setTimeout(calcHeaderHeight, 100);


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	let freeMomentum = {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	};

	let defSlider = new Swiper('selector', {
		...defaultSl,
		...freeMomentum,
	});
	//
	let targetSlider = new Swiper('.target-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
	});

	$('.split-js').each(function (){
		let h1 = this.querySelector('h1');

		let inner = h1.innerHTML.split(' ');
		let resulut = [];
		for (let word of inner){
			word = `<span>${word}</span>`;
			resulut.push(word);
		}

		h1.innerHTML = resulut.join(' ');
	});

	//img svg
	$('img.img-svg-js').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			} // Remove any invalid XML tags as per http://validator.w3.org


			$svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			} // Replace image with new SVG


			$img.replaceWith($svg);
		}, 'xml');
	});
	//
	let sNewsSlider = new Swiper('.sNews-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
	});

	//-
	// let sMediaSlider = new Swiper('.sMedia-slider-js', {
	// 	slidesPerView: 'auto',
	// 	breakpoints: {
	// 		0: {
	// 			spaceBetween: 16,
	// 		},
	// 		1200: {
	// 			spaceBetween: 24,
	// 		},
	// 	},
	//
	// });

	//-
	let breadcrumbSlider = new Swiper('.breadcrumb-slider-js', {
		...freeMomentum,
	});

	//-
	$('.make-yandex-lazy-js').each(function (){
		let self = this;

		window.setTimeout(function (){
			$(self.parentElement).html($(self).data("src"));
			self.remove();
		}, 3500)
	});


	//-
	let sPersonalCabSlider = new Swiper('.sPersonalCab-slider-js', {
		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			768: {
				spaceBetween: 30,
			},
			992: {
				spaceBetween: 40,
			},
			1600: {
				spaceBetween: 80,
			},
		},
		slidesPerView: 'auto',
		...freeMomentum,
	});
	let submenuSlider = new Swiper('.submenu-slider-js', {
		slidesPerView: 'auto',
		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			768: {
				spaceBetween: 30,
			},
			992: {
				spaceBetween: 46,
			},
		},
		...freeMomentum,
	});

	//.adm-filter-items-js
	//.adm-filter-btn-js
	//.adm-filter--js
	let admMissclick = function (btn, items){
		if (!event.target.closest('.adm-filter--js') && !event.target.closest('.adm-filter-btn-js')){
			$(btn).removeClass('active');
			$(items).removeClass('active');
		}
	};

	$('.adm-filter--js').each(function (){
		let btn = this.querySelector('.adm-filter-btn-js');
		let items = this.querySelector('.adm-filter-items-js');

		$(btn).click(function (){
			$(items).toggleClass('active');
		});

		document.body.addEventListener('click', admMissclick.bind(btn, items));
	})


	// modal window

	// var controller = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: "onEnter", duration: "200%" } });
	
	// // build scenes
	// new ScrollMagic.Scene({ triggerElement: ".animate-wrap" })
	// 	.setTween(".sMembers", { y: "-100%", ease: Linear.easeNone })
	// .addIndicators()
	// .addTo(controller);


	var controller = new ScrollMagic.Controller();

	// define movement of panels
	var wipeAnimation = new TimelineMax()
		.to(".animate-wrap .sMembers", 1, { y: "-100%", ease: Linear.easeNone }) // in from top
		.from(".animate-wrap .sMembers picture", 1,{ y: "-50%", ease: Linear.easeNone, delay: -1 }) // in from top
		.to(".animate-wrap .sMembers .container", 1, { x: "-100vw", ease: Linear.easeNone }) // in from top
		.to(".animate-wrap .sMembers picture", 1, { x: "100%", ease: Linear.easeNone,  delay: -1 }) // in from top
		// .from(".sOrganisations ", 1, {y: '-100%',ease: Linear.easeNone,  delay: -1}) // in from top
		.from(".animate-wrap .sOrganisations ", 1, {rotationX: 90, ease: Linear.easeNone}) // in from top
		.from(".animate-wrap .sOrganisations .container ", 1, { x: "100vw",ease: Linear.easeNone}); // in from top

	// create scene to pin and link animation
	 new ScrollMagic.Scene({
		triggerElement: ".animate-wrap",
		triggerHook: "onLeave",
		duration: "400%"
	})
		.setPin(".animate-wrap")
		.setTween(wipeAnimation)
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller); 

 
	let newAnimation = new TimelineMax()
		.from(".animate-wrap .sNews .container ", 1, { y: "50%", ease: Linear.easeNone}); // in from top

	// create scene to pin and link animation
 new ScrollMagic.Scene({
		triggerElement: ".sNews",
		triggerHook: "onLeave",
		duration: "50%"
	})
		.setPin(".sNews")
		.setTween(newAnimation)
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller); 

		
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}


function setActiveBody() {
	setTimeout(() => {
		document.querySelector('.main-page').classList.add("start-animation");
	}, 500);
}
document.addEventListener("DOMContentLoaded", () => {
	// alert("DOM готов!");
	setActiveBody()
});