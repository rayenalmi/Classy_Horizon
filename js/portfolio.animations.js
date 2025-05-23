var ANIMATIONS = {
  iconCircledParams: {
    width: "110px",
    height: "110px",
    "font-size": "50px",
    "line-height": 110 - 6 + "px",
    "border-width": "3px",
  },
  nav: function () {
    var e = $("#nav").find("ul");
    var t = 800;
    var n = [
      {
        element: e,
        transition: "transition.bounceLeftIn",
        options: { duration: t, delay: t },
      },
    ];
    ANIMATIONS.animate(n);
  },
  intro: function () {
    var e = $("#intro").find("h1");
    var t = $("#intro").find("h2");
    var n = 800;
    var r = [
      {
        element: e,
        transition: "transition.flipBounceXIn",
        options: { duration: n, delay: n * 2 },
      },
      {
        element: t,
        transition: "transition.perspectiveUpIn",
        options: { duration: n, delay: n * 3 },
      },
    ];
    ANIMATIONS.animate(r);
  },
  about: function () {
    var e = $("#about").find("img");
    var t = $("#about").find("p");
    var n = 600;
    var r = [
      {
        element: e.filter(":eq(0)"),
        transition: "transition.slideLeftBigIn",
        options: { duration: n, delay: n },
      },
      {
        element: e.filter(":eq(1)"),
        transition: "transition.slideUpBigIn",
        options: { duration: n, delay: n },
      },
      {
        element: t,
        transition: "transition.slideRightBigIn",
        options: { duration: n, delay: n },
      },
    ];
    ANIMATIONS.animate(r);
  },
  experience: function (e) {
    var t = $("#experience")
      .find("figure")
      .filter(":eq(" + e + ")");
    var n = 600;
    var r = [
      {
        element: t,
        transition: "transition.slideUpBigIn",
        options: { duration: n, delay: n * (e / 2), queue: false },
      },
    ];
    ANIMATIONS.animate(r);
  },
  whatICanDo: function (e) {
    var t = $("#what-i-can-do")
      .find(".icon-circled")
      .filter(":eq(" + e + ")");
    var n = $("#what-i-can-do")
      .find(".row p")
      .filter(":eq(" + e + ")");
    var r = 400;
    var i = [
      {
        element: t,
        properties: ANIMATIONS.iconCircledParams,
        options: { duration: r, delay: r * (e + 1) },
      },
      {
        element: n,
        transition: "transition.slideUpBigIn",
        options: { duration: r, delay: r * (e + 1) * 1.5 },
      },
    ];
    ANIMATIONS.animate(i);
  },
  contacts: function (e) {
    var t = $("#contacts")
      .find(".icon-circled")
      .filter(":eq(" + e + ")");
    var n = $("#contacts")
      .find(".row p")
      .filter(":eq(" + e + ")");
    var r = 400;
    var i = [
      {
        element: t,
        properties: ANIMATIONS.iconCircledParams,
        options: { duration: r, delay: r * (e + 1) },
      },
      {
        element: n,
        transition: "transition.slideUpBigIn",
        options: { duration: r, delay: r * (e + 1) * 1.5 },
      },
    ];
    ANIMATIONS.animate(i);
  },
  msgSent: function () {
    var e =
      "name=" +
      $("#name").val() +
      "&email=" +
      $("#email").val() +
      "&text=" +
      $("#text").val();
    var t = $(".msg-confirm-wrapper");
    var n = 600;
    var r = [
      {
        element: t,
        transition: "transition.slideLeftBigIn",
        options: { duration: n },
      },
      {
        element: t,
        transition: "transition.slideRightBigOut",
        options: { duration: n, delay: n },
      },
    ];
    ANIMATIONS.animate(new Array(r[0]));
    $.ajax("sendMail.php", {
      type: "POST",
      async: true,
      cache: false,
      data: e,
      success: function (e) {
        ANIMATIONS.animate(new Array(r[1]));
      },
    });
  },
  errorMsgShow: function (e) {
    var t = 200;
    var n = [
      {
        element: e,
        transition: "transition.slideUpBigIn",
        options: { duration: t, delay: 0 },
      },
    ];
    ANIMATIONS.animate(n);
  },
  errorMsgHide: function (e) {
    var t = 200;
    var n = [
      {
        element: e,
        transition: "transition.slideDownBigOut",
        options: { duration: t, delay: 0 },
      },
    ];
    ANIMATIONS.animate(n);
  },
  animate: function (e) {
    for (var t = 0; t < e.length; t++) {
      if (e[t].transition) e[t].element.velocity(e[t].transition, e[t].options);
      else e[t].element.velocity(e[t].properties || {}, e[t].options);
    }
  },
};
