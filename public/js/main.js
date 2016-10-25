var checked = false;
var bodyChecked = false;

$(window).load(function(){
  reset();
  $('.nav_profile').click(function(){
    window.location.href = '/profile'
  });
  $('.nav_settings').click(function(){
    window.location.href = '/settings'
  });
  $('.nav_messages').click(function(){
    window.location.href = '/messages'
  });
  $('.openSideBar_img').click(function(){
    $(this).attr('src', '/img/icon/menu2.png');
    $('.content').toggleClass('open')
    $('.sideBar').css('left', 0);
    checked = true;
    bodyChecked = false;
  });
  $('body').click(function(e){
    if(checked && bodyChecked){
      if(!$('.sideBar').has(e.target).length){
        $('.sideBar').css('left', -203);
        checked = false;
      }
    }
    bodyChecked = true;
  });
});

$(window).resize(function() {
   reset();
});

function reset(){
  $('.dropDownProfile li').hide();
  $('.sideBar').css('height',window.innerHeight - 80);
  $('.sidebar_cover').css('height', window.innerHeight)
  $('.container').css('height', window.innerHeight);
  $('.friendList').css('height', window.innerHeight - 140)
  $('.setBox_1').css('height', window.innerHeight - 75);
  $('.setBox_2').css('height', window.innerHeight - 75);
}
