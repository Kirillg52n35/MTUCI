$(document).ready(function () {

    $(window).on("scroll", function () {

        let scroll = $(window).scrollTop();

        $(".icon-first").css(
            "transform",
            "translateY(" + scroll * 0.2 + "px)"
        );

        $(".icon-second").css(
            "transform",
            "translateY(" + scroll * 0.4 + "px)"
        );

        $(".icon-third").css(
            "transform",
            "translateY(" + scroll * 0.6 + "px)"
        );

    });

});