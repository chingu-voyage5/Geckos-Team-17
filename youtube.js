$(document).ready(function () {
	//Youtube playlist
    var key = 'AIzaSyDkxYa_J6nm-HJH2pyMhEpMtj1hC2TbjQ8';
    var playlistId = 'PLsPUh22kYmNDRYfImV3BzNZ6yTwhIpe0k';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 50,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
			<iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
		`);
    }
		
    function resultsLoop(data) {
        $.each(data.items, function (i, item) {
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;
            $('main').append(`
				<article class="item" data-key="${vid}">
					<img src="${thumb}" alt="" class="thumb">
						<div class="details">
							<h4>${title}</h4>
								<p>${desc}</p>
						</div>
				</article>
			`);
        });
    }

    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


	//APOD background request
	var apodApiUrl = 'https://api.nasa.gov/planetary/apod?api_key=RNhAKSYZxOLaXJY8GfbB935sn3XgBWtqa2vPVEuu';

	$.ajax({
		url: apodApiUrl,
		success: function(data0){
			//background image change
			const root = document.documentElement;
			const imageBtns = document.querySelectorAll('button');
		
			imageBtns.forEach((btn) => {
				btn.addEventListener('click', handleImgUpdate);
			});
		
			$(".apodInfo").text(data0.explanation);
			$(".source").append(`<a href = ${data0.url}>${data0.url}`);

			function handleImgUpdate(e){
				var bgImage;			
				if (data0.media_type === "video"){
					bgImage = "watch.jpg";
				} else {
					bgImage = data0.url;
				}
					switch(e.target.value) {
					case 'default':
					root.style.setProperty('--bg-pic', 'url(PIA17005.jpg)');
					$(".jumbotron").css("display", "none");
					break;
					case 'apod':
					root.style.setProperty('--bg-pic', 'url('+bgImage+')');
					$(".jumbotron").css("display", "block");
					break;
				}
			}
		}
	});
	
	//Bad Astronomy blog RSS reader
	var api = "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.syfy.com%2Ftags%2Fbad-astronomy%2Ffeed";

	$.getJSON(api, function(data1){
		var feedName = data1.feed.title,
			feedURL = data1.feed.link;
		$(".title").append(`<h3 class = "title"><a href = ${feedURL}>${feedName}</a></h3>`);
		
		for (var i = 0; i < data1.items.length; i++){
		var artTitle = data1.items[i].title,
			url = data1.items[i].link,
			description = data1.items[i].description.substring(0, 250);
           $('.feed').append(`
				<article class="items">
					<div class="artDetails">
						<h4><a href = ${url}>${artTitle}</a></h4>
						<p>${description}...</p>
						<hr>
					</div>
				</article>
			`);
		}
	});
});