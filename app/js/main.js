$(document).ready(function() {
    var $popupImageWrap = $(".popup-image-wrap");
    var $popupVideoWrap = $(".popup-video-wrap");
    var $uploadWrap = $(".upload-wrap");
    var $uploading = $(".upload-wrap .uploading");
    var $uploadSuccess = $(".upload-wrap .upload-success");

    var init = function() {
        getMedia();
        bindEvent();
        //masonry();
    };

    var getMedia = function() {
        $.get('/api/media', function(data) {
            var source = $("#media-template").html();
            var template = Handlebars.compile(source);
            var context = {
                media: data
            };
            var html = template(context);
            $('.grid').html(html);

            masonry();
        });
    };

    var bindEvent = function() {
        $('.grid').delegate('.grid-item', 'click', function() {
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var src = $(this).data('src');
            var type = $(this).data('type');
            if(type === 'image') {
                $popupImageWrap.find('img').attr('src', src).css({
                    height: winHeight
                });

                $popupImageWrap.fadeIn();
            } else {
                $popupVideoWrap.find('video').attr('src', src).css({
                    height: winHeight
                });

                $popupVideoWrap.fadeIn();
            }
            
        });

        $popupImageWrap.find('.btn-close').bind('click', function() {
            $popupImageWrap.fadeOut();
        });

        $popupVideoWrap.find('.btn-close').bind('click', function() {
            $popupVideoWrap.fadeOut();
            $popupVideoWrap.find('video').attr('src', '');
        });

        $('.upload-btns input').bind('change', function() {
            var data = new FormData();
            data.append('file', $(this)[0].files[0]);
            $uploadWrap.fadeIn(200);
            $uploading.fadeIn(200);

            $.ajax({
                url: 'api/upload',
                data: data,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function ( data ) {
                    $uploading.fadeOut(200);
                    $uploadSuccess.delay(200).fadeIn().delay(1000).fadeOut(200);
                    $uploadWrap.delay(1200).fadeOut(200);

                    $('.grid').masonry('destroy');
                    getMedia();
                }
            });
        });
    };

    var masonry = function() {
        $('.grid').masonry({
          // options
          itemSelector: '.grid-item',
          columnWidth: 200,
          gutter: 10
        });
    };

    init();
});