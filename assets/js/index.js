$(document).ready(nav)
$(window).resize(nav)


$('.mobile-bars').click(navClick)
function nav(){
    if($(window).width()<=768){
        $('.nav-list').addClass('hide')
    }
    else{
        $('.nav-list').removeClass('hide')
    }
}

function navClick(){
    if( $('.nav-list').hasClass('hide'))
    {
        $('.nav-list').removeClass('hide')
    }
    else{
        $('.nav-list').addClass('hide') 
    }

}