var RBC = RBC || {};

RBC.StaffHub = (function() {
	var YOUTUBE_TEMPLATE_REGEX = /{{\s*[\w\.\:]+\s*}}/gm,
		YOUTUBE_VIDEOID_REGEX = /{{YT:(.*?)}}/;

	var initYouTubeVideos = function() {
		try {
			$("#announcements-webpart li .content p").each(function() {
				var $this = $(this);
				var text = $this.text().trim();

				if (text.length > 0) {
					var videoTags = text.match(/{{YT:(.*?)}}/g);
					if (videoTags !== null) {
						for (i = 0; i < videoTags.length; i++) {
							var videoId = videoTags[i].substring(5, 16);
							var embedCode = "<iframe width='440' height='248' src='https://www.youtube.com/embed/" + videoId + "?rel=0' frameborder='0' allowfullscreen></iframe>";
							text = text.replace(videoTags[i], embedCode);
						}
					}
					$this.html(text);
				}
			});
		}
		catch (err) {
			console.log(err);
		}
	};

	return {
		init: function() {
			initYouTubeVideos();
		}	
	};
}());

$(function() {
	RBC.StaffHub.init(); 
});