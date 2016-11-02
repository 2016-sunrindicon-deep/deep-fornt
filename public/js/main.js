var open;
var bodyChecked;
var language_code = 1;
$(window).load(function(){
  setLanguage();
  open = true;
  bodyChecked = false;
  reset();
  $('#home').click(function(){
    location.href = "/home"
  });
  $('#profile').click(function(){
    location.href = "/profile"
  });
  $('#message').click(function(){
    location.href = "/message"
  });
  $('#setting').click(function(){
    location.href = "/settings"
  });
  // $(document).click('.nav_app a', function(event){
  //
  //     console.log(event.target.id);
  //
  //     if(event.target.id == "home")
  //     {
  //       var className =  $('body').attr('class')
  //       $('body').removeClass(className)
  //       $('body').toggleClass('homePage')
  //     }
  //     else if (event.target.id == "profile")
  //     {
  //       var className =  $('body').attr('class')
  //       $('body').removeClass(className)
  //       $('body').toggleClass('profilePage')
  //     }
  //     else if (event.target.id == "message")
  //     {
  //       var className =  $('body').attr('class')
  //       $('body').removeClass(className)
  //       $('body').toggleClass('messagesPage')
  //     }
  //     else if (event.target.id == "setting")
  //     {
  //       var className =  $('body').attr('class')
  //       $('body').removeClass(className)
  //       $('body').toggleClass('settingsPage')
  //     }
  //     history.pushState(null, null, event.target.href);
  //     $('article').load(event.target.href+' article>.main', function(){
  //       setLanguage();
  //     });
  //     event.preventDefault();
  // });

  // $(window).on('popstate', function(event){
  //   console.log(location);
  //   var className =  $('body').attr('class')
  //   var addClass = location.pathname;
  //   addClass = addClass.replace('/', '');
  //   $('body').removeClass(className);
  //   $('body').toggleClass(addClass + 'Page');
  //   $('article').load(location.href+' article>.main');
  //
  // });
  $(document).on('click', '.setBtn', function(){
    $('.setBtn').css('background-color', 'white');
    $('.setBtn').css('color', 'black')
    $(this).css('background-color', '#66A8CF');
    $(this).css('color', 'white');
    if($(this).attr('name') == "korean")
    {
      language_code = 0;
      setLanguage();
    }
    if($(this).attr('name') == "English")
    {
      language_code = 1;
      setLanguage();
    }
    if($(this).attr('name') == "Japanese")
    {
      language_code = 2;
      setLanguage();
    }
  });
  $(document).on('click','.box',function(){
    if($(this).children('img').css('display') == 'none'){
      $(this).children('img').show();
    }
    else{
      $(this).children('img').hide();
    }
  });
  $('.openSideBar_img').click(function(){
    if($('.header').css('display') == 'none')
    {
      $(this).attr('src', '/img/icon/menu_M.png');
    }
    else{
      $(this).attr('src', '/img/icon/menu2.png');
    }
    console.log(open);
    if(open == true)
    {
      $('.content').removeClass('open');
      $('.content').toggleClass('close');
      open = false;
    }
    else if(open == false){
      $('.content').toggleClass('open');
      $('.content').removeClass('close');
      open = true;
      bodyChecked = false;
    }
  });
  $('body').click(function(e){
    var tmp = $('.sideBar').css('position')
    if(open && bodyChecked &&  tmp =='absolute'){
      if(!$('.sideBar').has(e.target).length){
        $('.content').removeClass('open');
        $('.content').toggleClass('close');
        open = false;
      }
    }
    bodyChecked = true;
  });
});



$(window).resize(function() {
   reset();
});

function reset(){
  $('.sideBar').css('height',window.innerHeight - 70);
  $('.sidebar_cover').css('height', window.innerHeight)
  $('.container').css('height', window.innerHeight);
  $('.friendList').css('height', window.innerHeight - 140)
  $('.setBox_1').css('height', window.innerHeight - 75);
  $('.setBox_2').css('height', window.innerHeight - 75);
  if($('.header').css('display') == 'none'){
    $('.article').css('height', window.innerHeight);
  }
  else{
    $('.article').css('height', window.innerHeight - 70);
    // $('.main')css('height', window.innerHeight - 70;)
  }
}
function setLanguage(){
  console.log("test")
  if(language_code == 0)
  {
    $('.mailView').text('메일')
    $('.nameView').text('이름')
    $('.languageView').text('언어')
    $('.basic').text('기본설정')
    $('.secessionBtn button').html("계정 삭제")
    $('.helpText').text('도움')
    $('.aboutText').text('설명')
    $('.devText').text('개발자')
  }
  else if (language_code == 1)
  {
    console.log("set 영어");
    $('.mailView').text('Mail')
    $('.nameView').text('Name')
    $('.languageView').text('Language')
    $('.basic').text('Basic Setting')
    $('.secessionBtn button').html("Delete account")
    $('.helpText').text('Help')
    $('.aboutText').text('About')
    $('.devText').text('Developer')
  }
  else if (language_code == 2)
  {
    $('.mailView').text('郵便物')
    $('.nameView').text('名前')
    $('.languageView').text('言語')
    $('.basic').text('デフォルトの設定')
    $('.secessionBtn button').html("脱退")
    $('.helpText').text('ヘルプ')
    $('.aboutText').text('について')
    $('.devText').text('開発者')
  }
}
