var chai = require("chai");
var expect = chai.expect;

describe("Announcements", function() {
	describe("When a string contains embed YouTube embed markup", function() {
		var regex = /{{\s*[\w\.\:]+\s*}}/g;
		var src = "Test 1 {{YT:123kjh123}} Test 2 {{YT:0vYb9TcUo0Q}}";
		src.match(regex)
			.map(function(x) {
				var videoId = x.match(/{{YT:(.*?)}}/)[1];
				var embedCode = "<iframe width='640' height='360' src='https://www.youtube.com/embed/" + videoId + "' frameborder='0' allowfullscreen></iframe>";
				src = src.replace(x, embedCode);
			});
			
		it("Returns a string with replaced YouTube embded iframes", function() {
			return expect(src).to.equal(
				"Test 1 <iframe width='640' height='360' src='https://www.youtube.com/embed/123kjh123' frameborder='0' allowfullscreen></iframe> Test 2 <iframe width='640' height='360' src='https://www.youtube.com/embed/0vYb9TcUo0Q' frameborder='0' allowfullscreen></iframe>");
		});
	});
});