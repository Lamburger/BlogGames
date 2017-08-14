$(document).ready(function () {
    $('#blogsubmit').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST"
            , url: "/blogs"
            , data: $(this).serialize()
            , success: function () {
                console.log('success');
                location.replace("/blog")
            }
            , error: function (e) {
                console.log('failed' + e);
            }
        });
    });
    $('.updateblog').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: "PUT"
            , url: "/blogs/" + $(this).attr("data-id")
            , data: {
                title: $(this).parent().children(".title").text(),
                review: $(this).parent().children(".review").text(),
                url: $(this).parent().children("img").attr("src")
            }
            , success: function () {
                location.reload();
            }
            , error: function (e) {
                alert('failed' + e);
            }
        });
    });
    $('.deletepost').on('click', function (e) {
        console.log(e);
        e.preventDefault();
        $.ajax({
            type: "DELETE"
            , data: {
                id: $(this).attr("data-id")
            }
            , url: "/blogs/" + $(this).attr("data-id")
            , success: function () {
                location.reload();
            }
            , error: function (e) {
                console.log(e);
                alert('failed: ' + e);
            }
        });
    });
    $('p[contenteditable=true]').on("click", function () {
        $(this).siblings(".hidden").removeClass("hidden");
    });
});