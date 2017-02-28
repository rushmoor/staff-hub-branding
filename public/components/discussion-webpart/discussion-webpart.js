var RBC = RBC || {};

RBC.InitDiscussionWebPart = (function() {
	var BASE_URL = "http://sharepoint/staffhub",
		CSS_LINK = "/staffhub/SiteAssets/Branding/discussion-webpart.min.css",
		NUMBER_OF_ITEMS = 5;

	var discussionListIds = [
		"C8BBCD04-8765-474E-B1FB-04BAAB6CA1EC", // Council Conversations
		"A8836A3C-B55F-4FCA-B29B-3773E749BE57", // Classifieds
		"CDA274A9-F9CA-4D8F-B433-32948888E130"  // Social
	];

	var loadCss = function() {
		var $cssLink = $("<link rel='stylesheet' type='text/css' />").attr("href", CSS_LINK);
		$("head").append($cssLink);
	};

	var sortByDateDescending = function(a, b) {
		var c = new Date(a.pubDate);
		var d = new Date(b.pubDate);
		return d - c;
	};

	var getRss = function() {
		var discussionItems = [];

		var deffereds = $.map(discussionListIds, function(current) {
			var listRssUrl = BASE_URL + "/_layouts/listfeed.aspx?List=" + current;
			return $.get(listRssUrl, function(data) {
				var $xml = $(data);

				$xml.find("item").slice(0, NUMBER_OF_ITEMS).each(function() {
					var $this = $(this),
						item = {
							title: $this.find("title").text(),
							link: $this.find("link").text(),
							description: $this.find("description").text(),
							pubDate: $this.find("pubDate").text(),
							author: $this.find("author").text()
					};
					discussionItems.push(item);
				});
			});
		});

		$.when.apply($, deffereds).then(function() {
			if (discussionItems.length > 0) {
				discussionItems.sort(sortByDateDescending);

				var items = discussionItems.slice(0, NUMBER_OF_ITEMS);
				var html = [];
				
				html.push("<ul>");
				$.each(items, function(index, value) {
					html.push(
						"<li>", 
							"<a href='", value.link, "'>", value.title, "</a><br/>",
							"<div class='author'>", value.author, "</div>",
							"<div>", value.pubDate, "</div>",
						"</li>"
					);
				});
				html.push("</ul>");

				$("#discussion-webpart").append(html.join(""));
			}
		});
	};

	/*var getRss = function() {
		$.get(RSS_URL, function(data) {
			var $xml = $(data),
				html = [];

			html.push("<ul>");
			$xml.find("item").slice(0, NUMBER_OF_ITEMS).each(function() {
				var $this = $(this),
					item = {
						title: $this.find("title").text(),
						link: $this.find("link").text(),
						description: $this.find("description").text(),
						pubDate: $this.find("pubDate").text(),
						author: $this.find("author").text()
				};

				html.push(
					"<li>", 
						"<a href='", item.link, "'>", item.title, "</a><br/>",
						"<div class='author'>", item.author, "</div>",
						"<div>", item.pubDate, "</div>",
					"</li>"
				);
			});
			html.push("</ul>");

			$("#discussion-webpart").append(html.join(""));
		});
	};*/

	return {
		init: function() {
			loadCss();
			getRss();
		}
	}
} ());

$(function() {
	RBC.InitDiscussionWebPart.init(); 
});