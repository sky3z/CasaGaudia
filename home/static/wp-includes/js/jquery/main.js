! function(e) {
  "use strict";
  e(window).on("load", function() {
    e(".loader").fadeOut(500)
  }), e(document).ready(function() {
    function o() {
      var o = e(window).width(),
        i = e("header"),
        t = e("#main-menu"),
        l = e("#mobile-menu"),
        s = e("#toggle-menu-button"),
        n = e("header").data("menutoggle"),
        a = e(".dropdown"),
        r = e(".big-logo"),
        d = e(".mobile-logo");
      if (o <= n) {
        e("#main-menu ul").clone().addClass("mmenu-init").prependTo(l).removeAttr("id").removeClass("navbar-nav mx-auto").find("a").siblings("ul.dropdown-menu").removeAttr("class"), i.addClass("mobile-header"), i.removeClass("vertical-header , open-header"), t.css({
          display: "none"
        }), r.css({
          display: "none"
        }), d.css({
          display: "block"
        }), l.mmenu({
          extensions: ["position-right", "fx-menu-slide"]
        }, {
          offCanvas: {
            pageSelector: ".wrapper"
          },
          classNames: {
            fixedElements: {
              fixed: ["topbar", "header"]
            }
          }
        });
        var u = l.data("mmenu");
        s.on("click", function() {
          u.open(), u.close()
        }), i.on("click", function() {
          u.close()
        }), u.bind("open:finish", function() {
          setTimeout(function() {
            s.addClass("open")
          })
        }), u.bind("close:finish", function() {
          setTimeout(function() {
            s.removeClass("open")
          })
        })
      } else i.removeClass("mobile-header"), t.css({
        display: "block"
      }), r.css({
        display: "block"
      }), d.css({
        display: "none"
      }), i.hasClass("vertical-header") && (e("header").insertBefore(".wrapper"), e("header > div").removeClass("container"), i.hasClass("open-header") ? (e("body").addClass("has-vertical-header-open"), s.css({
        display: "none"
      })) : e("body").addClass("has-vertical-header"), s.on("click", function() {
        i.toggleClass("open-header"), s.toggleClass("open"), e("body").toggleClass("has-vertical-header-open")
      })), a.on({
        mouseenter: function() {
          e(this).addClass("open")
        },
        mouseleave: function() {
          e(this).removeClass("open"), e(".submenu").removeClass("submenu-left")
        }
      });
      i.addClass("loaded-header")
    }
    e(window).on("scroll", function() {
      var o = e("header"),
        i = e(".topbar"),
        t = e(this).scrollTop(),
        l = o.outerHeight(),
        s = e(".first-logo"),
        n = e(".second-logo"),
        a = 0;
      if (i.length) a = i.outerHeight();
      var r = a;
      o.length && (t > r && o.hasClass("sticky-header") ? (o.addClass("header-fixed-top").delay(200), o.hasClass("transparent-header") || o.next("*").css("margin-top", l), o.hasClass("sticky-header") && o.addClass("scroll-header"), s.css("display", "none"), n.css("display", "block")) : (o.removeClass("header-fixed-top"), o.hasClass("transparent-header") || o.next("*").css("margin-top", "0"), o.hasClass("sticky-header") && o.removeClass("scroll-header"), o.hasClass("mobile-header") || (s.css("display", "block"), n.css("display", "none"))))
    }), o(), e(window).resize(function() {
      o()
    }), e(".add-to-cart").on({
      mouseenter: function() {
        e(this).parent().addClass("active")
      },
      mouseleave: function() {
        e(this).parent().removeClass("active")
      }
    }), e(function() {
      var o = e(".spinner"),
        i = e(".spinner .btn:first-of-type"),
        t = e(".spinner .btn:last-of-type");
      e(i).on("click", function() {
        var i = e(this),
          t = i.closest(o).find("input");
        null == t.attr("max") || parseInt(t.val()) < parseInt(t.attr("max")) ? t.val(parseInt(t.val(), 10) + 1, 10) : i.next("disabled", !0)
      }), e(t).on("click", function() {
        var i = e(this),
          t = i.closest(o).find("input");
        null == t.attr("min") || parseInt(t.val()) > parseInt(t.attr("min")) ? t.val(parseInt(t.val(), 10) - 1, 10) : i.prev("disabled", !0)
      })
    }), e(".user-rating input").on("change", function() {
      var o = e(this);
      e(".user-rating .selected").removeClass("selected"), o.closest("label").addClass("selected")
    });
    var i = e(".popup-booking-form");
    e(".booking-form-toggle").on("click", function() {
      i.toggleClass("open"), e(this).toggleClass("open")
    });
    var t;

    function l() {
      for (var o = e(".booking-guests"), i = 0, t = 0; t < o.length; t++) parseInt(o[t].value, 10) && (i += parseInt(o[t].value, 10));
      i > 0 && (document.querySelector(".gueststotal").innerHTML = i)
    }(e("#booking-form").on("submit", function(o) {
      var i, t;
      o.preventDefault(), i = {
        booking_name: e("input[name=booking-name]").val(),
        booking_email: e("input[name=booking-email]").val(),
        booking_phone: e("input[name=booking-phone]").val(),
        booking_roomtype: e("select[name=booking-roomtype]").val(),
        booking_startdate: e("input[name=booking_startdate]").val(),
        booking_enddate: e("input[name=booking_enddate]").val(),
        booking_adults: e("input[name=booking-adults]").val(),
        booking_children: e("input[name=booking-children]").val(),
        booking_babies: e("input[name=booking-babies]").val(),
        booking_country: e("select[name=booking-country]").val(),
        booking_comments: e("textarea[name=booking-comments]").val()
      }, e.post("../email/booking.php", i, function(o) {
        var i = e("#booking-notification"),
          l = e("#booking-form");
        t = '<p class="notification-text">' + o.text + "</div>", "error" === o.type ? (i.addClass("scale-out error"), i.removeClass("success"), l.addClass("booking-notification-open")) : (i.addClass("scale-out success"), i.removeClass("error"), e("input, textarea").val(""), e("select").val(""), e("select").val("").selectpicker("refresh")), i.html(t), i.delay(15e3).queue(function(o) {
          e(this).removeClass("scale-out"), l.removeClass("booking-notification-open"), o()
        }), i.on("click", function() {
          e(this).removeClass("scale-out"), l.removeClass("booking-notification-open")
        }), e("#booking-form .form-control, #booking-form .bootstrap-select button, #booking-form .guestspicker").on("click", function() {
          i.removeClass("scale-out"), l.removeClass("booking-notification-open")
        })
      }, "json")
    }), e("#contact-form").on("submit", function(o) {
      o.preventDefault();
      var i, t, l = e("input[name=name]").val(),
        s = e("input[name=phone]").val(),
        n = e("input[name=email]").val(),
        a = e("input[name=subject]").val();
      i = {
        user_name: l,
        user_email: n,
        user_message: e("textarea[name=message]").val(),
        user_phone: s,
        user_subject: a
      }, e.post("email/email.php", i, function(o) {
        var i = e("#contact-notification");
        t = '<p class="notification-text">' + o.text + "</div>", "error" === o.type ? (i.addClass("scale-out error"), i.removeClass("success")) : (i.addClass("scale-out success"), i.removeClass("error"), e("input, textarea").val(""), e("select").val(""), e("select").val("").selectpicker("refresh")), i.html(t), i.delay(15e3).queue(function(o) {
          e(this).removeClass("scale-out"), o()
        }), i.on("click", function() {
          e(this).removeClass("scale-out")
        }), e("#contact-form .form-control").on("focus", function() {
          i.removeClass("scale-out")
        })
      }, "json")
    }), e("#subscribe-form").on("submit", function(o) {
      var i, t;
      o.preventDefault(), i = {
        subscribe_email: e("input[name=subscribe-email]").val()
      }, e.post("email/subscribe.php", i, function(o) {
        var i = e("#subscribe-notification");
        t = '<p class="notification-text">' + o.text + "</div>", "error" === o.type ? (i.addClass("scale-out error"), i.removeClass("success")) : (i.addClass("scale-out success"), i.removeClass("error"), e("input, textarea").val(""), e("select").val(""), e("select").val("").selectpicker("refresh")), i.html(t), i.delay(15e3).queue(function(o) {
          e(this).removeClass("scale-out"), o()
        }), i.on("click", function() {
          e(this).removeClass("scale-out")
        }), e("#subscribe-form .form-control").on("focus", function() {
          i.removeClass("scale-out")
        })
      }, "json")
    }), e("#rev-slider-1").length) && (t = jQuery)(document).ready(function() {
      null == t("#rev-slider-1").revolution ? revslider_showDoubleJqueryError("#rev-slider-1") : t("#rev-slider-1").show().revolution({
        sliderType: "standard",
        jsFileLocation: "revolution/js/",
        sliderLayout: "auto",
        dottedOverlay: "none",
        delay: 9e3,
        disableProgressBar: "on",
        navigation: {
          keyboardNavigation: "on",
          keyboard_direction: "horizontal",
          mouseScrollNavigation: "off",
          mouseScrollReverse: "default",
          onHoverStop: "on",
          touch: {
            touchenabled: "on",
            swipe_threshold: 75,
            swipe_min_touches: 50,
            swipe_direction: "horizontal",
            drag_block_vertical: !1
          },
          arrows: {
            style: "hermes",
            enable: !0,
            hide_onmobile: !0,
            hide_under: 600,
            hide_onleave: !0,
            tmp: '<div class="tp-arr-allwrapper"><div class="tp-arr-imgholder"></div>',
            left: {
              h_align: "left",
              v_align: "center",
              h_offset: 0,
              v_offset: 0
            },
            right: {
              h_align: "right",
              v_align: "center",
              h_offset: 0,
              v_offset: 0
            }
          }
        },
        responsiveLevels: [1200, 992, 768, 480],
        visibilityLevels: [1200, 992, 768, 480],
        gridwidth: [1200, 992, 768, 480],
        gridheight: [800, 800, 700, 700],
        lazyType: "none",
        parallax: {
          type: "scroll",
          origo: "slidercenter",
          speed: 2e3,
          levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 55]
        },
        shadow: 0,
        spinner: "off",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: !1,
        fallbacks: {
          simplifyAll: "off",
          nextSlideOnWindowFocus: "off",
          disableFocusListener: !1
        }
      })
    });
    })
  }(jQuery);
