$(document).ready(function() {
	// margin left = - ([width of element] + [total vertical padding of element])

	$("#topper").css("top", "-300px");
	$("#subtopper").css("top", "-300px");
	$("header").css("opacity", "0");

	$("#topper").animate({
		top : "0"
	}, 1300);

	$("#subtopper").animate({
		top : "0"
	}, 1300);

	$("header").animate({
		opacity : "1"
	}, 1300);

	slide("#controls", 1200, .8);
});

function slide(navigation_id, time, multiplier) {
	// creates the target paths
	var list_elements = navigation_id + " span.button-wrap";
	var link_elements = list_elements + " a";

	// initiates the timer used for the sliding animation
	var timer = 0;

	// creates the slide animation for all list elements
	$(list_elements).each(function(i) {
		$(this).css("margin-top", "500px");
		$(this).css("opacity", "0");
		// updates timer
		timer = (timer * multiplier + time);
		$(this).animate({
			marginTop : "0",
			opacity : ".5"
		}, timer);
		$(this).animate({
			opacity : "1"
		}, 350);
	});
}