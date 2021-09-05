var smScreen = window.matchMedia('(max-width: 768px)');
var lgScreen = window.matchMedia('(min-width: 769px)');
var JS = JS || {};
JS.common = {
  
  // globalHeader
  globalHeader: function () {
    // 処理を書く
  },

  // stikeyheader
  stikeyHeader: function() {
    var $header = $('.l-header._pc');
    var $cloneHeader = $header.clone();

    $cloneHeader.addClass('_clone');
    $header.after($cloneHeader);

    $(window).on('load scroll', function () {
      var scroll = $(this).scrollTop();

      if( scroll > 300) {
        $cloneHeader.addClass('is-scroll');
      }else{
        $cloneHeader.removeClass('is-scroll');
      }
    });
  },

  // accordion
  accordion: function() {
    var $toggle = $('.js-accordion-toggle');
    var $item = $('.js-accordion-item');
    var openClass = 'is-open';
  
    $toggle.each(function () {
      if ($(this).hasClass(openClass)) {
        $(this).next($item).show();
      }
    });
  
    $toggle.on('click', function() {
      if ($(this).hasClass(openClass)) {
        $(this).removeClass(openClass);
        $(this).next($item).slideUp();
      } else {
        $(this).addClass(openClass);
        $(this).next($item).slideDown();
      }
    });
  },

  // contentsAnimation
  contentsAnimation: function() {
    // アニメーションを遅らせる時間
    var anDelayTime = 0.3;
  
    // .an_delay_itemにdelayを追加
    $('.an_delay').each(function(){
      var $anDelayItem = $(this).find('.an_delay_item');
      for (var i = 0; i < $anDelayItem.length; i++) {
        $anDelayItem.eq(i).css({
          animationDelay: i * anDelayTime + 's',
          transitionDelay: i * anDelayTime + 's'
        });
      }
    });
  
  // スクロール時のパララックス
    $(window).on('load scroll', function(){
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      $('.an_true, .an_delay').each(function(){
        var elemPos = $(this).offset().top;
        // コンテンツをフェード表示
        if (scroll > elemPos - windowHeight + 150){
          var anClass = $(this).attr('class');
          if(anClass == "an_delay"){
            // .an_delayの場合は子要素の.an_delay_itemにクラス追加
            $(this).find('.an_delay_item').addClass('scrollin');
          } else {
            $(this).addClass('scrollin');
          }
        }
      });
    });
  },
  // contentsFix
  contentsFix: function() {
    var $fixBox = $( '.js-fixbox' );
    var $fixItem = $( '.js-fixitem' );
    var timer = false;
  
    function fixed(){
      $fixItem.css( 'height', '' );
      $fixBox.each( function( i, box ) {
        var maxHeight = 0;
        $( box ).find( $fixItem ).each( function() {
          if ( $( this ).height() > maxHeight ) {
            maxHeight = $( this ).height();
            }
        });
        $( box ).find( $fixItem ).height( maxHeight );
      });
    }
  
    fixed();
  
    $(window).resize(function() {
      if (timer !== false) clearTimeout(timer);
      timer = setTimeout(function() {
          fixed();
      }, 200);
    });
  },

  // smoothScroll
  smoothScroll: function() {
    $('a[href^="#"]').click(function(){
      var adjust = -140;
      var speed = 400;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top + adjust;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
    });
  }

};
$(window).on('load', function () {
  // JS.common.globalHeader();
  // JS.common.contentsAnimation();
  // JS.common.smoothScroll();
  // JS.common.contentsFix();
});