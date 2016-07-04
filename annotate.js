var verses = {};
var current_ref = null;

$(function() {
	$.getJSON('/verses.json', function(data) {
		verses = data;
	});

	$('.ref').on('mouseover', function() {
		$(this).css('background-color', '#dddddd');
		show_refs($(this));
	});

	$('.ref').on('click', function() {
		$('.ref').css('border', '');
		$(this).css('border', '1px solid black');
		current_ref = $(this);
	});

	$('.ref').on('mouseout', function() {
		$(this).css('background-color', '');
		if (current_ref) {
			show_refs($(current_ref));
		} else {
			clear_refs();
		}
	});
});

function show_refs(r) {
	var refs = $(r).data('verses').split(';');
	var content = "";

	refs.forEach(function(ref) {
		ref = ref.trim();

		if (verses[ref]) {
			content += "<h4>" + ref + "</h4>";
			content += "<p>" + verses[ref] + "</p>";
		}
	});

	var section = r.parent().find('.paragraph-number').attr('id');
	var pattern = /chapter-([0-9]+)-paragraph-([0-9]+)/g;
	var section_name = section.replace(pattern, 'Chapter $1, Paragraph $2');
	$('.side .ref-link').html("<a href='#" + section + "'>" + section_name + "</a>");
	$('.side .content').html(content);
}

function clear_refs() {
	$('.side .ref-link').html("");
	$('.side .content').html("");
}
