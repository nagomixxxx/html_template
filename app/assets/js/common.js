var smScreen = window.matchMedia('(max-width: 768px)');
var lgScreen = window.matchMedia('(min-width: 769px)');
var JS = JS || {};
JS.common = {
  // globalHeader
  globalHeader: function () {},
  // contentsAnimation
  contentsAnimation: function () {},
  // contentsFix
  contentsFix: function () {},
  // pageLink
  pageLink: function () {}
};
$(window).on('load', function () {
  JS.common.globalHeader();
  JS.common.contentsAnimation();
  JS.common.pageLink();
  JS.common.contentsFix(); // about

  if ($("#sticky_item").length) {
    JS.common.stickey();
  } // member


  if ($('.js-MainPhoto').length) {
    JS.common.memberGarelly();
  } // gallery


  if (lgScreen.matches && $('.slide').length) {
    JS.common.slick_gallery();
  }

  function matchFunc() {
    if (smScreen.matches) {} else {
      JS.common.slick_gallery();
    }
  }

  ;
  smScreen.addListener(matchFunc);
});