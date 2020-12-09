/*Function to hide navbar contents on window resize */
function nav() {
    if ($(window).width() <= 768) {
        $('.nav-list').addClass('hide')
    } else {
        $('.nav-list').removeClass('hide')
    }
}

/*Function to activate navlink style changes */
function navClick() {
    if ($('.nav-list').hasClass('hide')) {
        $('.nav-list').removeClass('hide')
    } else {
        $('.nav-list').addClass('hide')
    }

}

/*Function to hide extra text in cards*/
function cutText() {
    $.each($('.extend-text'), function () {
        $(this).html(`${$(this).html()}`)

        let maxLength = 375;
        let str = $(this).html().trim();
        let length = $(this).html().length;
        let newStr;
        let extraStr;
        if (length > maxLength) {
            /*Storing the first 120 characters and teh excessive string*/
            newStr = str.substring(0, maxLength);
            extraStr = str.substring(maxLength, $.trim(str).length);

            /*Replacing current content with the first 120 characters*/
            $(this).empty().html(`${newStr}`);
            /*Adding read more button*/
            /*Hiding the extra string*/
            $(this).append(`<span class="dots">...</span><span class="hide line">${extraStr}</span>`);
        }
    })
}
/*Function to  remove iframe loaders*/
function cardLoader() {

    /*Anchor iframe loaded*/

    $.each($('iframe'), function (key, val) {
        $(val).on('load', function () {
            $(val).parent().children('.block').addClass('hide')

        })
    })
}

/*API get request*/

$.get('https://afterhours-api.herokuapp.com/', function (data, status) {
    for (let i = data.length - 1; i >= 0; i--) {
        let current = data[i]
        console.log(current)
        let card = `<div class="card">
                    <p>${current.date_of_publishing}</p>
                    <div class="extend">
                        <h2>
                            ${current.title}
                        </h2>
                        <i class="fas fa-chevron-down fa-2x chevron"></i>
                    </div>
                    <p class="extend-text">
                        ${current.description}

                    </p>
                    <div class="block">
                        <div class="album">
                            <div class="artwork">
                                <ul class="bars">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <iframe src="${current.iframelink}" height="100%" width="100%" frameborder="0" scrolling="no"></iframe>
                    </div>`
        $('.episodes').append(card)
    }
    cutText()
    cardLoader()

    $('.chevron').click(function (e) {
        if ($(this).hasClass('fa-chevron-down')) {
            let target = $(e.target).parent().siblings('.extend-text');
            target.children('.line').removeClass('hide')
            target.children('.dots').addClass('hide')
            $(e.target).removeClass('fa-chevron-down');
            $(e.target).addClass('fa-chevron-up')
        } else {
            let target = $(e.target).parent().siblings('.extend-text');
            target.children('.line').addClass('hide')
            target.children('.dots').removeClass('hide')
            $(e.target).removeClass('fa-chevron-up');
            $(e.target).addClass('fa-chevron-down')
        }
    })
})


$(document).ready(function () {
    /*Toggle nav based on screen size*/
    nav()
    /*Hide page loader */
    $('#loader').addClass('hide')
    /*Nav CSS*/
    $(".nav-super").css({
        "position": "fixed",
        "top": "0"
    });
    /*Scroll spy */
    let sections = $('.section');
    $(window).scroll(function () {
        $.each($('.section'), function (key, val) {
            if ($(window).scrollTop() > $(val).offset().top - 150) {

                $.each($('.click'), function (keys, value) {
                    $(value).removeClass('active')
                })

                let currentid = $(val).attr('id');
                $(`.${currentid}`).addClass('active')


            }

        })
    })
    /*Toggle mobile nav on click*/
    $('.mobile-bars').click(navClick)

    /*Activate nav click*/
    $('.click').click(function (e) {

        $.each($('.click'), function (key, value) {
            $(value).removeClass('active')

        })

        $(e.target).addClass('active')
        if ($(window).width() <= 768) {
            $('.mobile-bars').click()
        }
    })

})

/* Toggle nav on resize*/

$(window).resize(nav)

