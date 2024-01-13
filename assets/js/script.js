const introContainer = document.querySelector(".container");

$(document).ready(() => {
	// lock scroll position, but retain settings for later
	var scrollPosition = [
		self.pageXOffset ||
			document.documentElement.scrollLeft ||
			document.body.scrollLeft,
		self.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop,
	];
	var html = jQuery("html"); // it would make more sense to apply this to body, but IE7 won't have that
	html.data("scroll-position", scrollPosition);
	html.data("previous-overflow", html.css("overflow"));
	html.css("overflow", "hidden");
	window.scrollTo(scrollPosition[0], scrollPosition[1]);

	//Get theme from localstorage
	var theme = localStorage.getItem("theme");
	if (theme != "dark") {
		body.classList.add("dark");
	} else {
		body.classList.remove("dark");
	}
});

function endIntro() {
	setTimeout(function () {
		introContainer.style.opacity = "0";
		setTimeout(() => {
			// un-lock scroll position
			var html = jQuery("html");
			var scrollPosition = html.data("scroll-position");
			html.css("overflow", html.data("previous-overflow"));
			window.scrollTo(scrollPosition[0], scrollPosition[1]);

			$(".header").css("opacity", "1");
			$(".logo").fadeIn();
			$(".home-btn").css("opacity", "1");
			$(".about-btn").css("opacity", "1");
			$(".contact-btn").css("opacity", "1");
			$(".projects-btn").css("opacity", "1");
			$(".home").css("opacity", "1");
			$(".about").css("opacity", "1");
			$(".contact").css("opacity", "1");
			$(".projects").css("opacity", "1");
			if (screen.width <= 700) {
				$(".hamburger").css("display", "flex");
			} else {
				$(".hamburger").css("display", "none");
			}
			setTimeout(() => {
				$(".love-container").removeClass("hide");

				$("FOOTER").css("display", "flex");
				type();
			}, 1000);
			$(".logo-img").css("display", "flex");
			$(".theme-btn").css("display", "flex");
			introContainer.addEventListener(
				"transitionend",
				() => {
					introContainer.style.display = "none";
				},
				1000
			);
		}, 1000);
	}, 8000);
}

jQuery(function ($) {
	// MAD-RIPPLE // (jQ+CSS)
	$(document).on("mousedown", "[data-ripple]", function (e) {
		var $self = $(this);

		if ($self.is(".btn-disabled")) {
			return;
		}
		if ($self.closest("[data-ripple]")) {
		}

		var initPos = $self.css("position"),
			offs = $self.offset(),
			x = e.pageX - offs.left,
			y = e.pageY - offs.top,
			dia = Math.min(this.offsetHeight, this.offsetWidth, 100), // start diameter
			$ripple = $("<div/>", { class: "ripple", appendTo: $self });

		if (!initPos || initPos === "static") {
			$self.css({ position: "relative" });
		}

		$("<div/>", {
			class: "rippleWave",
			css: {
				background: $self.data("ripple"),
				width: dia,
				height: dia,
				left: x - dia / 2,
				top: y - dia / 2,
			},
			appendTo: $ripple,
			one: {
				animationend: function () {
					$ripple.remove();
				},
			},
		});
	});
});

function shift() {
	document.querySelector(".skills-bars").classList.add("animated");
	setTimeout(() => {
		document.querySelector(".skills-head").classList.add("animated");
	}, 1500);
}


//TYPE.JS
function type() {
	let typed = new Typed("#typed", {
		strings: [
			"Currently studying at FPT Polytechnic",
			"BackEnd Programmer-Data Engineer",
		],
		typeSpeed: 70,
		backSpeed: 20,
		backDelay: 500,
		smartBackspace: false,
		loop: false,
		onComplete: function () {
			shift();
			typed.loop = true;
		},
	});
	typed.stop();
	//ANIMATION ON SCROLL
	$(window).scroll(function () {
		var hT = $(".text-body").offset().top,
			hH = $(".text-body").outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop();
		if (wS > hT + hH - wH && hT > wS && wS + wH > hT + hH) {
			typed.start();
		} else {
			typed.stop();
		}
	});
}

$(window).scroll(function () {
	const wH = $(window).height();
	const wS = $(window).scrollTop();
	var hT = $(".text-body").offset().top,
		hH = $(".text-body").outerHeight();

	if (wS > hT + hH - wH && hT > wS && wS + wH > hT + hH) {
		setTimeout(() => {
			$(".about-head").css("opacity", "1");
			$(".text-body").delay(1000).css("opacity", "1");
		}, 500);
	} else {
		// $('.about-head').css("opacity", "0");
		// $('.text-body').css("opacity", "0");
	}
});

function toggleLoop(typed) {
	if (typed.loop) {
		typed.loop = false;
	} else {
		typed.loop = true;
	}
}

function validate() {
	const firstName = document.querySelector(".first-name");
	const lastName = document.querySelector(".last-name");
	const email = document.querySelector(".email-add");
	const message = document.querySelector(".message");
	var emailID = email.value;
	atpos = emailID.indexOf("@");
	dotpos = emailID.lastIndexOf(".");

	if (firstName.value == "") {
		firstName.focus();
		Swal.fire({
			title: "Error!",
			text: "Please provide your first name.",
			icon: "error",
			confirmButtonText: "Ok",
		});
		return false;
	}
	if (lastName.value == "") {
		lastName.focus();
		Swal.fire({
			title: "Error!",
			text: "Please provide your last name.",
			icon: "error",
			confirmButtonText: "Ok",
		});
		return false;
	}
	if (email.value == "" || atpos < 1 || dotpos - atpos < 2) {
		email.focus();
		Swal.fire({
			title: "Error!",
			text: "Please provide valid email.",
			icon: "error",
			confirmButtonText: "Ok",
		});
		return false;
	}
	if (message.value == "") {
		message.focus();
		Swal.fire({
			title: "Error!",
			text: "Please say something.",
			icon: "error",
			confirmButtonText: "Ok",
		});
		return false;
	}
	return true;
}
document.addEventListener("contextmenu", (event) => event.preventDefault());
$(document).keydown(function (event) {
	if (event.keyCode == 123) {
		return false;
	} else if (
		(event.ctrlKey && event.shiftKey && event.keyCode == 73) ||
		(event.ctrlKey && event.shiftKey && event.keyCode == 67) ||
		(event.ctrlKey && event.shiftKey && event.keyCode == 74) ||
		(event.ctrlKey && event.keyCode == 85)
	) {
		return false;
	}
});
