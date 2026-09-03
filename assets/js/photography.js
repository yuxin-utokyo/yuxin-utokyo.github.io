(function () {
	'use strict';

	var cards = Array.prototype.slice.call(document.querySelectorAll('.photo-card'));
	var lightbox = document.querySelector('.lightbox');
	var image = lightbox.querySelector('img');
	var caption = lightbox.querySelector('figcaption');
	var closeButton = lightbox.querySelector('.lightbox-close');
	var previousButton = lightbox.querySelector('.lightbox-prev');
	var nextButton = lightbox.querySelector('.lightbox-next');
	var currentIndex = 0;
	var lastFocus = null;

	function show(index) {
		currentIndex = (index + cards.length) % cards.length;
		var thumbnail = cards[currentIndex].querySelector('img');
		image.src = cards[currentIndex].href;
		image.alt = thumbnail.alt;
		caption.textContent = String(currentIndex + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
	}

	function open(index) {
		lastFocus = document.activeElement;
		show(index);
		lightbox.hidden = false;
		document.body.classList.add('lightbox-open');
		closeButton.focus();
	}

	function close() {
		lightbox.hidden = true;
		document.body.classList.remove('lightbox-open');
		image.src = '';
		if (lastFocus) lastFocus.focus();
	}

	cards.forEach(function (card, index) {
		card.addEventListener('click', function (event) {
			event.preventDefault();
			open(index);
		});
	});

	closeButton.addEventListener('click', close);
	previousButton.addEventListener('click', function () { show(currentIndex - 1); });
	nextButton.addEventListener('click', function () { show(currentIndex + 1); });
	lightbox.addEventListener('click', function (event) {
		if (event.target === lightbox) close();
	});

	document.addEventListener('keydown', function (event) {
		if (lightbox.hidden) return;
		if (event.key === 'Escape') close();
		if (event.key === 'ArrowLeft') show(currentIndex - 1);
		if (event.key === 'ArrowRight') show(currentIndex + 1);
	});
}());
