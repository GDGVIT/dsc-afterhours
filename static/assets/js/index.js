
function nav() {


    if ($(window).width() <= 768) {
        $('.nav-list').addClass('hide')
    } else {
        $('.nav-list').removeClass('hide')
    }
}

function navClick() {
    if ($('.nav-list').hasClass('hide')) {
        $('.nav-list').removeClass('hide')
    } else {
        $('.nav-list').addClass('hide')
    }

}


function cutText() {
    $.each($('.extend-text'), function(){
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

$(document).ready(function(){
    nav()
    cutText()
})
$(window).resize(nav)
$('.mobile-bars').click(navClick)

$(".nav-super").css({"position":"fixed","top":"0"}); 
/*Change nav class */
$('.click').click(function (e) {
   
    $.each($('.click'), function(key, value){
        $(value).removeClass('active')
       
    })

    $(e.target).addClass('active')
    if ($(window).width() <= 768) {
        $('.mobile-bars').click()
    }
})
/*Collapse click*/

$('.chevron').click(function(e){
    if($(this).hasClass('fa-chevron-down')){
        let target=$(e.target).parent().siblings('.extend-text');
        target.children('.line').removeClass('hide')
        target.children('.dots').addClass('hide')
        $(e.target).removeClass('fa-chevron-down');
        $(e.target).addClass('fa-chevron-up')
    }
    else{
        let target=$(e.target).parent().siblings('.extend-text');
        target.children('.line').addClass('hide')
        target.children('.dots').removeClass('hide')
        $(e.target).removeClass('fa-chevron-up');
        $(e.target).addClass('fa-chevron-down')
    }
})

/*Scroll spy*/
let sections=$('.section');

$(window).scroll(function(){
    $.each($('.section'),function(key, val){
        if($(window).scrollTop() >  $(val).offset().top - 150){
           
            $.each($('.click'), function(keys, value){
                $(value).removeClass('active')
            })

            let currentid=$(val).attr('id');
            $(`.${currentid}`).addClass('active')

            
        }

    })
})


