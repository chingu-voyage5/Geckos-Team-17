// <iframe width="560" height="315" src="https://www.youtube.com/embed/qxWrnhZEuRU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

// https://i.ytimg.com/vi/qxWrnhZEuRU/mqdefault.jpg

$(document).ready(function () {

    var key = 'AIzaSyDkxYa_J6nm-HJH2pyMhEpMtj1hC2TbjQ8';
    var playlistId = 'PLqs5ohhass_QhOSkrNqPFEAOv5fBzTvWv';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
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

		// CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


	//APOD background request
	var apodApiUrl = 'https://api.nasa.gov/planetary/apod?api_key=RNhAKSYZxOLaXJY8GfbB935sn3XgBWtqa2vPVEuu';

	$.ajax({
		url: apodApiUrl,
		success: function(data){
			//background image change
			const root = document.documentElement;
			const imageBtns = document.querySelectorAll('button');
		
			imageBtns.forEach((btn) => {
				btn.addEventListener('click', handleImgUpdate);
			});
		
			function handleImgUpdate(e){
					switch(e.target.value) {
					case 'default':
					root.style.setProperty('--bg-pic', 'url(PIA17005.jpg)');
					break;
					case 'apod':
					root.style.setProperty('--bg-pic', 'url('+data.url+')');
					break;
				}
			}
	
		}
	});
	
});