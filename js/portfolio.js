var PORTFOLIO = {
  init: function () {
    PORTFOLIO.nav = $("#nav");
    PORTFOLIO.menuToggle = $("#menu-toggle");
    PORTFOLIO.sections = $("section");
    PORTFOLIO.intro = $("#intro");
    PORTFOLIO.isNotCV = $("body").hasClass("cv") ? false : true;
    PORTFOLIO.introRGB = PORTFOLIO.isNotCV ? [16, 16, 16, 0] : [16, 16, 16, 1];
    PORTFOLIO.setEvents();
    PORTFOLIO.setWaypoints();
    PORTFOLIO.setIntroHeight();
    if (PORTFOLIO.isNotCV) MAPS.init();
    if (PORTFOLIO.menuToggle.is(":visible")) {
      PORTFOLIO.closeMenu();
    } else {
      ANIMATIONS.nav();
    }
    ANIMATIONS.intro();
  },
  setEvents: function () {
    var e = PORTFOLIO.nav.height();
    $(window).resizeEnd(function () {
      if (PORTFOLIO.menuToggle.is(":visible")) {
        PORTFOLIO.closeMenu();
      } else {
        PORTFOLIO.openMenu();
      }
    });
    if (PORTFOLIO.isNotCV) {
      $(window).on("scroll", function () {
        var e = $(window).scrollTop();
        var t = $(document).height();
        var n = $(window).height();
        var r = e / (t - n);
        PORTFOLIO.introRGB[3] = r * 10 > 1 ? 1 : r * 10;
        PORTFOLIO.nav.css(
          "background",
          "rgba(" + PORTFOLIO.introRGB.join(",") + ")"
        );
      });
    }
    $("#nav").on("click", 'a[href*="#"]', function (e) {
      e.preventDefault();
      PORTFOLIO.scrollTo($(this).attr("href"));
    });
    $("#menu-toggle").on("click", function (e) {
      e.preventDefault();
      PORTFOLIO.menuToggle.hasClass("active")
        ? PORTFOLIO.closeMenu()
        : PORTFOLIO.openMenu();
    });
    $("#submit").on("click", function (e) {
      e.preventDefault();
      if (PORTFOLIO.beforeMsgSend()) ANIMATIONS.msgSent();
    });
    $("#print").on("click", function (e) {
      e.preventDefault();
      window.print();
    });
  },
  setWaypoints: function () {
    var e = PORTFOLIO.nav.height();
    PORTFOLIO.sections
      .waypoint({
        handler: function (e) {
          if (e == "down") PORTFOLIO.highlightSection($(this).attr("id"));
        },
        offset: e,
      })
      .waypoint({
        handler: function (e) {
          if (e == "up") PORTFOLIO.highlightSection($(this).attr("id"));
        },
        offset:
          e - parseInt($(".wrapper-content").find("section").css("margin-top")),
      });
    PORTFOLIO.intro.find("h1").waypoint({
      handler: function (e) {
        var t = $("#my-name");
        var n = 500;
        var r = { options: { duration: n, delay: n } };
        if (e == "down") {
          r.transition = "transition.slideRightIn";
        } else if (e == "up") {
          r.transition = "transition.slideRightOut";
        }
        t.velocity(r.transition, r.options);
      },
      offset: e + e / 2,
    });
    $("#about").waypoint({
      handler: function (e) {
        if (e == "down") {
          ANIMATIONS.about();
        }
      },
      triggerOnce: true,
      offset: e + "%",
    });
    $("#experience figure").each(function (t) {
      $(this).waypoint({
        handler: function (e) {
          if (e == "down") {
            ANIMATIONS.experience(t);
          }
        },
        triggerOnce: true,
        offset: e + "%",
      });
    });
    $("#what-i-can-do")
      .find(".icon-circled")
      .each(function (t) {
        $(this).waypoint({
          handler: function (e) {
            if (e == "down") {
              ANIMATIONS.whatICanDo(t);
            }
          },
          triggerOnce: true,
          offset: e + "%",
        });
      });
    $("#contacts")
      .find(".icon-circled")
      .each(function (t) {
        $(this).waypoint({
          handler: function (e) {
            if (e == "down") {
              ANIMATIONS.contacts(t);
            }
          },
          triggerOnce: true,
          offset: e + "%",
        });
      });
  },
  setIntroHeight: function () {
    var e = $(window).height();
    PORTFOLIO.intro.css("min-height", e);
  },
  highlightSection: function (e) {
    PORTFOLIO.nav
      .find("a")
      .removeClass("active")
      .filter("[href='#" + e + "']")
      .addClass("active");
  },
  scrollTo: function (e) {
    var t = PORTFOLIO.nav.height() - 10;
    $(e).velocity("scroll", { duration: 300, offset: -t });
  },
  openMenu: function () {
    var e = $("#nav").find("ul");
    var t = 400;
    var n = [
      { element: e, transition: "transition.fadeIn", options: { duration: t } },
    ];
    PORTFOLIO.menuToggle.addClass("active");
    ANIMATIONS.animate(n);
  },
  closeMenu: function () {
    var e = $("#nav").find("ul");
    var t = 400;
    var n = [
      {
        element: e,
        transition: "transition.fadeOut",
        options: { duration: t },
      },
    ];
    PORTFOLIO.menuToggle.removeClass("active");
    ANIMATIONS.animate(n);
  },
  beforeMsgSend: function () {
    var e = false;
    e = PORTFOLIO.passRequired($("#name"));
    e = PORTFOLIO.passRequired($("#email"));
    e = PORTFOLIO.passRequired($("#text"));
    return e;
  },
  passRequired: function (e) {
    var t = e.prev("label").find("span");
    if (e.val() && $.trim(e.val()) != "") {
      ANIMATIONS.errorMsgHide(t);
      return true;
    } else {
      ANIMATIONS.errorMsgShow(t);
      return false;
    }
  },
};
$.fn.scrollStopped = function (e) {
  $(this).scroll(function () {
    var t = this,
      n = $(t);
    if (n.data("scrollTimeout")) {
      clearTimeout(n.data("scrollTimeout"));
    }
    n.data("scrollTimeout", setTimeout(e, 250, t));
  });
};
$(document).ready(function () {
  $("#intro").velocity("scroll", { duration: 0, delay: 0, offset: -10 });
  PORTFOLIO.init();
});
