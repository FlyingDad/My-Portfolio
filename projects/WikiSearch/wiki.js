/* jshint esversion: 6 */

$(document).ready(function () {

	// search on search button click
	$('button').click(function () {
		clearPreviousSearch();
		const textInput = $('input').val();
		if (textInput) {
			wikiSearch(textInput);
		} else {
			alert("Please enter some text to search!");
		}
	});

	// search on enter key pressed
	$('input').on('keypress', function (e) {
		if (e.which == 13) {
			clearPreviousSearch();
			const textInput = $('input').val();
			if (textInput) {
				wikiSearch(textInput);
			} else {
				alert("Please enter some text to search!");
			}
		}
	});

	// clear any previous search resuots from DOM
	function clearPreviousSearch() {
		$('.result-row').remove();
	}

	const url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
	const callback = '&callback=?';
	// const api = "https://en.wikipedia.org//w/api.php?action=query&format=json&list=search&utf8=1&srsearch=";
	//let searchTxt = "Mars";

	const resultsContainer = $('.results');

	function wikiSearch(searchTxt) {
		$.getJSON(url + searchTxt + callback, function (data) {})
			.done(function (data) {
				//console.log(data);
				$.each(data.query.pages, function (i, item) {
					//console.log(i);
					$('#results').append(`<div class="row fader result-row"><div class="col-sm"><h3>${item.title}</h3><span>${i}</span><p>${item.extract}</p></div></div>`);
				});
				// have to add after rows are created
				// addClickEvent to get articl ID and open wiki article;
				// used fader class to get unique classname only on result rows
				$('.fader').on('click', function () {
					let pageId = $(this).find('span')[0];
					pageId = $(pageId).text();
					//console.log(pageId);
					wikiurl = 'http://en.wikipedia.org/?curid=' + pageId;
					window.open(wikiurl, '_blank');
				});
			})
			.fail(function (error) {
				console.warn(error);
				$('#results').append(`<div class="row"><h3>Error processing request. Please try again.</h3></div`);
			});
	}
		

}); // end of doc ready