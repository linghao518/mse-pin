$(document).ready(function() {
    var $popupImageWrap = $(".popup-image-wrap");

    var init = function() {
        //getMedia();
        bindEvent();
        masonry();
    };

    var getMedia = function() {
        $.get('/api/media', function(data) {
            console.log(data);
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
            var src = $(this).data('image');
            $popupImageWrap.find('img').attr('src', src).css({
                height: winHeight
            });

            $popupImageWrap.fadeIn();
        });

        $popupImageWrap.find('.btn-close').bind('click', function() {
            $popupImageWrap.fadeOut();
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