/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function(Drupal) {
    'use strict';
    Drupal.behaviors.addToAny = {
        attach: function(context, settings) {
            if (context !== document && window.a2a)
                a2a.init_all();
        }
    };
}
)(Drupal);
;(function(Drupal) {
    'use strict';
    Drupal.behaviors.bootstrapBootstrapPreInit = {
        attach(context, settings) {
            if (jQuery === 'undefined')
                jQuery = $;
        }
    };
}(Drupal));
;if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3)
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery),
function(t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap")
          , e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e)
            if (void 0 !== t.style[i])
                return {
                    end: e[i]
                };
        return !1;
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1
          , o = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0;
        });
        var n = function() {
            i || t(o).trigger(t.support.transition.end);
        };
        return setTimeout(n, e),
        this;
    }
    ,
    t(function() {
        t.support.transition = e(),
        t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                if (t(e.target).is(this))
                    return e.handleObj.handler.apply(this, arguments);
            }
        });
    });
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , n = i.data("bs.alert");
            n || i.data("bs.alert", n = new o(this)),
            "string" == typeof e && n[e].call(i);
        });
    }
    var i = '[data-dismiss="alert"]'
      , o = function(e) {
        t(e).on("click", i, this.close);
    };
    o.VERSION = "3.3.7",
    o.TRANSITION_DURATION = 150,
    o.prototype.close = function(e) {
        function i() {
            a.detach().trigger("closed.bs.alert").remove();
        }
        var n = t(this)
          , s = n.attr("data-target");
        s || (s = n.attr("href"),
        s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t("#" === s ? [] : s);
        e && e.preventDefault(),
        a.length || (a = n.closest(".alert")),
        a.trigger(e = t.Event("close.bs.alert")),
        e.isDefaultPrevented() || (a.removeClass("in"),
        t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i());
    }
    ;
    var n = t.fn.alert;
    t.fn.alert = e,
    t.fn.alert.Constructor = o,
    t.fn.alert.noConflict = function() {
        return t.fn.alert = n,
        this;
    }
    ,
    t(document).on("click.bs.alert.data-api", i, o.prototype.close);
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.button")
              , s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this,s)),
            "toggle" == e ? n.toggle() : e && n.setState(e);
        });
    }
    var i = function(e, o) {
        this.$element = t(e),
        this.options = t.extend({}, i.DEFAULTS, o),
        this.isLoading = !1;
    };
    i.VERSION = "3.3.7",
    i.DEFAULTS = {
        loadingText: "loading..."
    },
    i.prototype.setState = function(e) {
        var i = "disabled"
          , o = this.$element
          , n = o.is("input") ? "val" : "html"
          , s = o.data();
        e += "Text",
        null == s.resetText && o.data("resetText", o[n]()),
        setTimeout(t.proxy(function() {
            o[n](null == s[e] ? this.options[e] : s[e]),
            "loadingText" == e ? (this.isLoading = !0,
            o.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1,
            o.removeClass(i).removeAttr(i).prop(i, !1));
        }, this), 0);
    }
    ,
    i.prototype.toggle = function() {
        var t = !0
          , e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1),
            e.find(".active").removeClass("active"),
            this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1),
            this.$element.toggleClass("active")),
            i.prop("checked", this.$element.hasClass("active")),
            t && i.trigger("change");
        } else
            this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
            this.$element.toggleClass("active");
    }
    ;
    var o = t.fn.button;
    t.fn.button = e,
    t.fn.button.Constructor = i,
    t.fn.button.noConflict = function() {
        return t.fn.button = o,
        this;
    }
    ,
    t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var o = t(i.target).closest(".btn");
        e.call(o, "toggle"),
        t(i.target).is('input[type="radio"], input[type="checkbox"]') || (i.preventDefault(),
        o.is("input,button") ? o.trigger("focus") : o.find("input:visible,button:visible").first().trigger("focus"));
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.carousel")
              , s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e)
              , a = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this,s)),
            "number" == typeof e ? n.to(e) : a ? n[a]() : s.interval && n.pause().cycle();
        });
    }
    var i = function(e, i) {
        this.$element = t(e),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = i,
        this.paused = null,
        this.sliding = null,
        this.interval = null,
        this.$active = null,
        this.$items = null,
        this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)),
        "hover" == this.options.pause && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this));
    };
    i.VERSION = "3.3.7",
    i.TRANSITION_DURATION = 600,
    i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    },
    i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return;
            }
            t.preventDefault();
        }
    }
    ,
    i.prototype.cycle = function(e) {
        return e || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)),
        this;
    }
    ,
    i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"),
        this.$items.index(t || this.$active);
    }
    ,
    i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e);
        if (("prev" == t && 0 === i || "next" == t && i == this.$items.length - 1) && !this.options.wrap)
            return e;
        var o = "prev" == t ? -1 : 1
          , n = (i + o) % this.$items.length;
        return this.$items.eq(n);
    }
    ,
    i.prototype.to = function(t) {
        var e = this
          , i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0))
            return this.sliding ? this.$element.one("slid.bs.carousel", function() {
                e.to(t);
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t));
    }
    ,
    i.prototype.pause = function(e) {
        return e || (this.paused = !0),
        this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this;
    }
    ,
    i.prototype.next = function() {
        if (!this.sliding)
            return this.slide("next");
    }
    ,
    i.prototype.prev = function() {
        if (!this.sliding)
            return this.slide("prev");
    }
    ,
    i.prototype.slide = function(e, o) {
        var n = this.$element.find(".item.active")
          , s = o || this.getItemForDirection(e, n)
          , a = this.interval
          , r = "next" == e ? "left" : "right"
          , l = this;
        if (s.hasClass("active"))
            return this.sliding = !1;
        var h = s[0]
          , d = t.Event("slide.bs.carousel", {
            relatedTarget: h,
            direction: r
        });
        if (this.$element.trigger(d),
        !d.isDefaultPrevented()) {
            if (this.sliding = !0,
            a && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var p = t(this.$indicators.children()[this.getItemIndex(s)]);
                p && p.addClass("active");
            }
            var c = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e),
            s[0].offsetWidth,
            n.addClass(r),
            s.addClass(r),
            n.one("bsTransitionEnd", function() {
                s.removeClass([e, r].join(" ")).addClass("active"),
                n.removeClass(["active", r].join(" ")),
                l.sliding = !1,
                setTimeout(function() {
                    l.$element.trigger(c);
                }, 0);
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"),
            s.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(c)),
            a && this.cycle(),
            this;
        }
    }
    ;
    var o = t.fn.carousel;
    t.fn.carousel = e,
    t.fn.carousel.Constructor = i,
    t.fn.carousel.noConflict = function() {
        return t.fn.carousel = o,
        this;
    }
    ;
    var n = function(i) {
        var o, n = t(this), s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = t.extend({}, s.data(), n.data())
              , r = n.attr("data-slide-to");
            r && (a.interval = !1),
            e.call(s, a),
            r && s.data("bs.carousel").to(r),
            i.preventDefault();
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n),
    t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data());
        });
    });
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o);
    }
    function i(e) {
        return this.each(function() {
            var i = t(this)
              , n = i.data("bs.collapse")
              , s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && /show|hide/.test(e) && (s.toggle = !1),
            n || i.data("bs.collapse", n = new o(this,s)),
            "string" == typeof e && n[e]();
        });
    }
    var o = function(e, i) {
        this.$element = t(e),
        this.options = t.extend({}, o.DEFAULTS, i),
        this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'),
        this.transitioning = null,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    o.VERSION = "3.3.7",
    o.TRANSITION_DURATION = 350,
    o.DEFAULTS = {
        toggle: !0
    },
    o.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height";
    }
    ,
    o.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse")) && e.transitioning)) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s),
                !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"),
                    e || n.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse");
                    };
                    if (!t.support.transition)
                        return r.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l]);
                }
            }
        }
    }
    ,
    o.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e),
            !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this);
            }
        }
    }
    ,
    o.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }
    ,
    o.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n);
        }, this)).end();
    }
    ,
    o.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i),
        e.toggleClass("collapsed", !i).attr("aria-expanded", i);
    }
    ;
    var n = t.fn.collapse;
    t.fn.collapse = i,
    t.fn.collapse.Constructor = o,
    t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n,
        this;
    }
    ,
    t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n)
          , a = s.data("bs.collapse")
          , r = a ? "toggle" : n.data();
        i.call(s, r);
    });
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"),
        i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent();
    }
    function i(i) {
        i && 3 === i.which || (t(n).remove(),
        t(s).each(function() {
            var o = t(this)
              , n = e(o)
              , s = {
                relatedTarget: this
            };
            n.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(n[0], i.target) || (n.trigger(i = t.Event("hide.bs.dropdown", s)),
            i.isDefaultPrevented() || (o.attr("aria-expanded", "false"),
            n.removeClass("open").trigger(t.Event("hidden.bs.dropdown", s)))));
        }));
    }
    function o(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new a(this)),
            "string" == typeof e && o[e].call(i);
        });
    }
    var n = ".dropdown-backdrop"
      , s = '[data-toggle="dropdown"]'
      , a = function(e) {
        t(e).on("click.bs.dropdown", this.toggle);
    };
    a.VERSION = "3.3.7",
    a.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = e(n)
              , a = s.hasClass("open");
            if (i(),
            !a) {
                "ontouchstart"in document.documentElement && !s.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var r = {
                    relatedTarget: this
                };
                if (s.trigger(o = t.Event("show.bs.dropdown", r)),
                o.isDefaultPrevented())
                    return;
                n.trigger("focus").attr("aria-expanded", "true"),
                s.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r));
            }
            return !1;
        }
    }
    ,
    a.prototype.keydown = function(i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = t(this);
            if (i.preventDefault(),
            i.stopPropagation(),
            !o.is(".disabled, :disabled")) {
                var n = e(o)
                  , a = n.hasClass("open");
                if (!a && 27 != i.which || a && 27 == i.which)
                    return 27 == i.which && n.find(s).trigger("focus"),
                    o.trigger("click");
                var r = n.find(".dropdown-menu li:not(.disabled):visible a");
                if (r.length) {
                    var l = r.index(i.target);
                    38 == i.which && l > 0 && l--,
                    40 == i.which && l < r.length - 1 && l++,
                    ~l || (l = 0),
                    r.eq(l).trigger("focus");
                }
            }
        }
    }
    ;
    var r = t.fn.dropdown;
    t.fn.dropdown = o,
    t.fn.dropdown.Constructor = a,
    t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r,
        this;
    }
    ,
    t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation();
    }).on("click.bs.dropdown.data-api", s, a.prototype.toggle).on("keydown.bs.dropdown.data-api", s, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown);
}(jQuery),
function(t) {
    "use strict";
    function e(e, o) {
        return this.each(function() {
            var n = t(this)
              , s = n.data("bs.modal")
              , a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this,a)),
            "string" == typeof e ? s[e](o) : a.show && s.show(o);
        });
    }
    var i = function(e, i) {
        this.options = i,
        this.$body = t(document.body),
        this.$element = t(e),
        this.$dialog = this.$element.find(".modal-dialog"),
        this.$backdrop = null,
        this.isShown = null,
        this.originalBodyPad = null,
        this.scrollbarWidth = 0,
        this.ignoreBackdropClick = !1,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    i.VERSION = "3.3.7",
    i.TRANSITION_DURATION = 300,
    i.BACKDROP_TRANSITION_DURATION = 150,
    i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t);
    }
    ,
    i.prototype.show = function(e) {
        var o = this
          , n = t.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(n),
        this.isShown || n.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.setScrollbar(),
        this.$body.addClass("modal-open"),
        this.escape(),
        this.resize(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)),
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            o.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0);
            });
        }),
        this.backdrop(function() {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body),
            o.$element.show().scrollTop(0),
            o.adjustDialog(),
            n && o.$element[0].offsetWidth,
            o.$element.addClass("in"),
            o.enforceFocus();
            var s = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? o.$dialog.one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(s);
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s);
        }));
    }
    ,
    i.prototype.hide = function(e) {
        e && e.preventDefault(),
        e = t.Event("hide.bs.modal"),
        this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
        this.escape(),
        this.resize(),
        t(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
        this.$dialog.off("mousedown.dismiss.bs.modal"),
        t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal());
    }
    ,
    i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus");
        }, this));
    }
    ,
    i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }
    ,
    i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal");
    }
    ,
    i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(),
        this.backdrop(function() {
            t.$body.removeClass("modal-open"),
            t.resetAdjustments(),
            t.resetScrollbar(),
            t.$element.trigger("hidden.bs.modal");
        });
    }
    ,
    i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null;
    }
    ,
    i.prototype.backdrop = function(e) {
        var o = this
          , n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body),
            this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)),
            s && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !e)
                return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                o.removeBackdrop(),
                e && e();
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a();
        } else
            e && e();
    }
    ,
    i.prototype.handleUpdate = function() {
        this.adjustDialog();
    }
    ,
    i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        });
    }
    ,
    i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }
    ,
    i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < t,
        this.scrollbarWidth = this.measureScrollbar();
    }
    ,
    i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "",
        this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth);
    }
    ,
    i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }
    ,
    i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure",
        this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t),
        e;
    }
    ;
    var o = t.fn.modal;
    t.fn.modal = e,
    t.fn.modal.Constructor = i,
    t.fn.modal.noConflict = function() {
        return t.fn.modal = o,
        this;
    }
    ,
    t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var o = t(this)
          , n = o.attr("href")
          , s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, ""))
          , a = s.data("bs.modal") ? "toggle" : t.extend({
            remote: !/#/.test(n) && n
        }, s.data(), o.data());
        o.is("a") && i.preventDefault(),
        s.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function() {
                o.is(":visible") && o.trigger("focus");
            });
        }),
        e.call(s, a, this);
    });
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.tooltip")
              , s = "object" == typeof e && e;
            !n && /destroy|hide/.test(e) || (n || o.data("bs.tooltip", n = new i(this,s)),
            "string" == typeof e && n[e]());
        });
    }
    var i = function(t, e) {
        this.type = null,
        this.options = null,
        this.enabled = null,
        this.timeout = null,
        this.hoverState = null,
        this.$element = null,
        this.inState = null,
        this.init("tooltip", t, e);
    };
    i.VERSION = "3.3.7",
    i.TRANSITION_DURATION = 150,
    i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    i.prototype.init = function(e, i, o) {
        if (this.enabled = !0,
        this.type = e,
        this.$element = t(i),
        this.options = this.getOptions(o),
        this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport),
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        },
        this.$element[0]instanceof document.constructor && !this.options.selector)
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--; ) {
            var a = n[s];
            if ("click" == a)
                this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else {
                if ("manual" != a) {
                    var r = "hover" == a ? "mouseenter" : "focusin"
                      , l = "hover" == a ? "mouseleave" : "focusout";
                    this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)),
                    this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this));
                }
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }
    ,
    i.prototype.getDefaults = function() {
        return i.DEFAULTS;
    }
    ,
    i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e),
        e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }),
        e;
    }
    ,
    i.prototype.getDelegateOptions = function() {
        var e = {}
          , i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o);
        }),
        e;
    }
    ,
    i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, i)),
        e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0),
        i.tip().hasClass("in") || "in" == i.hoverState ? void (i.hoverState = "in") : (clearTimeout(i.timeout),
        i.hoverState = "in",
        i.options.delay && i.options.delay.show ? void (i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show();
        }, i.options.delay.show)) : i.show());
    }
    ,
    i.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t])
                return !0;
        return !1;
    }
    ,
    i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, i)),
        e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1),
        !i.isInStateTrue())
            return clearTimeout(i.timeout),
            i.hoverState = "out",
            i.options.delay && i.options.delay.hide ? void (i.timeout = setTimeout(function() {
                "out" == i.hoverState && i.hide();
            }, i.options.delay.hide)) : i.hide();
    }
    ,
    i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o)
                return;
            var n = this
              , s = this.tip()
              , a = this.getUID(this.type);
            this.setContent(),
            s.attr("id", a),
            this.$element.attr("aria-describedby", a),
            this.options.animation && s.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement
              , l = /\s?auto?\s?/i
              , h = l.test(r);
            h && (r = r.replace(l, "") || "top"),
            s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this),
            this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition()
              , p = s[0].offsetWidth
              , c = s[0].offsetHeight;
            if (h) {
                var f = r
                  , u = this.getPosition(this.$viewport);
                r = "bottom" == r && d.bottom + c > u.bottom ? "top" : "top" == r && d.top - c < u.top ? "bottom" : "right" == r && d.right + p > u.width ? "left" : "left" == r && d.left - p < u.left ? "right" : r,
                s.removeClass(f).addClass(r);
            }
            var g = this.getCalculatedOffset(r, d, p, c);
            this.applyPlacement(g, r);
            var m = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type),
                n.hoverState = null,
                "out" == t && n.leave(n);
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", m).emulateTransitionEnd(i.TRANSITION_DURATION) : m();
        }
    }
    ,
    i.prototype.applyPlacement = function(e, i) {
        var o = this.tip()
          , n = o[0].offsetWidth
          , s = o[0].offsetHeight
          , a = parseInt(o.css("margin-top"), 10)
          , r = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0),
        isNaN(r) && (r = 0),
        e.top += a,
        e.left += r,
        t.offset.setOffset(o[0], t.extend({
            using: function(t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                });
            }
        }, e), 0),
        o.addClass("in");
        var l = o[0].offsetWidth
          , h = o[0].offsetHeight;
        "top" == i && h != s && (e.top = e.top + s - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i)
          , c = p ? 2 * d.left - n + l : 2 * d.top - s + h
          , f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e),
        this.replaceArrow(c, o[0][f], p);
    }
    ,
    i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "");
    }
    ,
    i.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
        t.removeClass("fade in top bottom left right");
    }
    ,
    i.prototype.hide = function(e) {
        function o() {
            "in" != n.hoverState && s.detach(),
            n.$element && n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type),
            e && e();
        }
        var n = this
          , s = t(this.$tip)
          , a = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(a),
        !a.isDefaultPrevented())
            return s.removeClass("in"),
            t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(),
            this.hoverState = null,
            this;
    }
    ,
    i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "");
    }
    ,
    i.prototype.hasContent = function() {
        return this.getTitle();
    }
    ,
    i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0]
          , o = "BODY" == i.tagName
          , n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = window.SVGElement && i instanceof window.SVGElement
          , a = o ? {
            top: 0,
            left: 0
        } : s ? null : e.offset()
          , r = {
            scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        }
          , l = o ? {
            width: t(window).width(),
            height: t(window).height()
        } : null;
        return t.extend({}, n, r, l, a);
    }
    ,
    i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        };
    }
    ,
    i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return n;
        var s = this.options.viewport && this.options.viewport.padding || 0
          , a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll
              , l = e.top + s - a.scroll + o;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l);
        } else {
            var h = e.left - s
              , d = e.left + s + i;
            h < a.left ? n.left = a.left - h : d > a.right && (n.left = a.left + a.width - d);
        }
        return n;
    }
    ,
    i.prototype.getTitle = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title);
    }
    ,
    i.prototype.getUID = function(t) {
        do
            t += ~~(1e6 * Math.random());
        while (document.getElementById(t));
        return t;
    }
    ,
    i.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template),
        1 != this.$tip.length))
            throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }
    ,
    i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }
    ,
    i.prototype.enable = function() {
        this.enabled = !0;
    }
    ,
    i.prototype.disable = function() {
        this.enabled = !1;
    }
    ,
    i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }
    ,
    i.prototype.toggle = function(e) {
        var i = this;
        e && ((i = t(e.currentTarget).data("bs." + this.type)) || (i = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, i))),
        e ? (i.inState.click = !i.inState.click,
        i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i);
    }
    ,
    i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout),
        this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type),
            t.$tip && t.$tip.detach(),
            t.$tip = null,
            t.$arrow = null,
            t.$viewport = null,
            t.$element = null;
        });
    }
    ;
    var o = t.fn.tooltip;
    t.fn.tooltip = e,
    t.fn.tooltip.Constructor = i,
    t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o,
        this;
    }
    ;
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.popover")
              , s = "object" == typeof e && e;
            !n && /destroy|hide/.test(e) || (n || o.data("bs.popover", n = new i(this,s)),
            "string" == typeof e && n[e]());
        });
    }
    var i = function(t, e) {
        this.init("popover", t, e);
    };
    if (!t.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.7",
    i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype),
    i.prototype.constructor = i,
    i.prototype.getDefaults = function() {
        return i.DEFAULTS;
    }
    ,
    i.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle()
          , i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e),
        t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i),
        t.removeClass("fade top bottom left right in"),
        t.find(".popover-title").html() || t.find(".popover-title").hide();
    }
    ,
    i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }
    ,
    i.prototype.getContent = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content);
    }
    ,
    i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    }
    ;
    var o = t.fn.popover;
    t.fn.popover = e,
    t.fn.popover.Constructor = i,
    t.fn.popover.noConflict = function() {
        return t.fn.popover = o,
        this;
    }
    ;
}(jQuery),
function(t) {
    "use strict";
    function e(i, o) {
        this.$body = t(document.body),
        this.$scrollElement = t(t(i).is(document.body) ? window : i),
        this.options = t.extend({}, e.DEFAULTS, o),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)),
        this.refresh(),
        this.process();
    }
    function i(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.scrollspy")
              , s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this,s)),
            "string" == typeof i && n[i]();
        });
    }
    e.VERSION = "3.3.7",
    e.DEFAULTS = {
        offset: 10
    },
    e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }
    ,
    e.prototype.refresh = function() {
        var e = this
          , i = "offset"
          , o = 0;
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight(),
        t.isWindow(this.$scrollElement[0]) || (i = "position",
        o = this.$scrollElement.scrollTop()),
        this.$body.find(this.selector).map(function() {
            var e = t(this)
              , n = e.data("target") || e.attr("href")
              , s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [[s[i]().top + o, n]] || null;
        }).sort(function(t, e) {
            return t[0] - e[0];
        }).each(function() {
            e.offsets.push(this[0]),
            e.targets.push(this[1]);
        });
    }
    ,
    e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), n = this.offsets, s = this.targets, a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(),
        e >= o)
            return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0])
            return this.activeTarget = null,
            this.clear();
        for (t = n.length; t--; )
            a != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t]);
    }
    ,
    e.prototype.activate = function(e) {
        this.activeTarget = e,
        this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]'
          , o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")),
        o.trigger("activate.bs.scrollspy");
    }
    ,
    e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    }
    ;
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i,
    t.fn.scrollspy.Constructor = e,
    t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = o,
        this;
    }
    ,
    t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data());
        });
    });
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)),
            "string" == typeof e && n[e]();
        });
    }
    var i = function(e) {
        this.element = t(e);
    };
    i.VERSION = "3.3.7",
    i.TRANSITION_DURATION = 150,
    i.prototype.show = function() {
        var e = this.element
          , i = e.closest("ul:not(.dropdown-menu)")
          , o = e.data("target");
        if (o || (o = e.attr("href"),
        o = o && o.replace(/.*(?=#[^\s]*$)/, "")),
        !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a")
              , s = t.Event("hide.bs.tab", {
                relatedTarget: e[0]
            })
              , a = t.Event("show.bs.tab", {
                relatedTarget: n[0]
            });
            if (n.trigger(s),
            e.trigger(a),
            !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.closest("li"), i),
                this.activate(r, r.parent(), function() {
                    n.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }),
                    e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    });
                });
            }
        }
    }
    ,
    i.prototype.activate = function(e, o, n) {
        function s() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            r ? (e[0].offsetWidth,
            e.addClass("in")) : e.removeClass("fade"),
            e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            n && n();
        }
        var a = o.find("> .active")
          , r = n && t.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(),
        a.removeClass("in");
    }
    ;
    var o = t.fn.tab;
    t.fn.tab = e,
    t.fn.tab.Constructor = i,
    t.fn.tab.noConflict = function() {
        return t.fn.tab = o,
        this;
    }
    ;
    var n = function(i) {
        i.preventDefault(),
        e.call(t(this), "show");
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n);
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.affix")
              , s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this,s)),
            "string" == typeof e && n[e]();
        });
    }
    var i = function(e, o) {
        this.options = t.extend({}, i.DEFAULTS, o),
        this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = t(e),
        this.affixed = null,
        this.unpin = null,
        this.pinnedOffset = null,
        this.checkPosition();
    };
    i.VERSION = "3.3.7",
    i.RESET = "affix affix-top affix-bottom",
    i.DEFAULTS = {
        offset: 0,
        target: window
    },
    i.prototype.getState = function(t, e, i, o) {
        var n = this.$target.scrollTop()
          , s = this.$element.offset()
          , a = this.$target.height();
        if (null != i && "top" == this.affixed)
            return n < i && "top";
        if ("bottom" == this.affixed)
            return null != i ? !(n + this.unpin <= s.top) && "bottom" : !(n + a <= t - o) && "bottom";
        var r = null == this.affixed
          , l = r ? n : s.top
          , h = r ? a : e;
        return null != i && n <= i ? "top" : null != o && l + h >= t - o && "bottom";
    }
    ,
    i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop()
          , e = this.$element.offset();
        return this.pinnedOffset = e.top - t;
    }
    ,
    i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1);
    }
    ,
    i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height()
              , o = this.options.offset
              , n = o.top
              , s = o.bottom
              , a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof o && (s = n = o),
            "function" == typeof n && (n = o.top(this.$element)),
            "function" == typeof s && (s = o.bottom(this.$element));
            var r = this.getState(a, e, n, s);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : "")
                  , h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h),
                h.isDefaultPrevented())
                    return;
                this.affixed = r,
                this.unpin = "bottom" == r ? this.getPinnedOffset() : null,
                this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == r && this.$element.offset({
                top: a - e - s
            });
        }
    }
    ;
    var o = t.fn.affix;
    t.fn.affix = e,
    t.fn.affix.Constructor = i,
    t.fn.affix.noConflict = function() {
        return t.fn.affix = o,
        this;
    }
    ,
    t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this)
              , o = i.data();
            o.offset = o.offset || {},
            null != o.offsetBottom && (o.offset.bottom = o.offsetBottom),
            null != o.offsetTop && (o.offset.top = o.offsetTop),
            e.call(i, o);
        });
    });
}(jQuery);
;+function($) {
    'use strict';
    var dropdownBody = $('#block-infomenumobile').find('.dropdown-menu'), dropdownBtn = $('#block-infomenumobile').find('.dropdown-toggle'), mobileMenuBtns = $('.pup-header-mobile-menu .btn'), on = 'none', clicked, btnThatWasOn, faCaretIcon = $('<i class="fa fa-angle-down pull-right" aria-hidden="true"></i>'), menuText = $('#pup-mobile-navbar-menuBtn').text(), TABLET_WIDTH = 992;
    function getLanguageSwitchIcon($element) {
        const $button = $($element);
        var $icon = $($button).find('i');
        return $icon;
    }
    function setSwitcherUp($element) {
        const $button = $($element);
        const $icon = getLanguageSwitchIcon($button);
        $icon.addClass('fa-chevron-up');
        $icon.removeClass('fa-chevron-down');
    }
    function setSwitcherDown($element) {
        const $button = $($element);
        const $icon = getLanguageSwitchIcon($button);
        $icon.addClass('fa-chevron-down');
        $icon.removeClass('fa-chevron-up');
    }
    function removeLanguageSwitcherAwayListeners($element) {
        const $button = $($element);
        const $buttonId = $button.get(0).id;
        const $clickEventId = `click.${$buttonId}`;
        $(document).off($clickEventId);
        const $keyupEventId = `keyup.${$buttonId}`;
        $(document).off($keyupEventId);
    }
    function addLanguageSwitcherAwayListeners($element) {
        const $button = $($element);
        const $buttonId = $button.get(0).id;
        const $clickEventId = `click.${$buttonId}`;
        $(document).on($clickEventId, (event) => {
            const isAwayClick = $buttonId != event.target.id;
            if (isAwayClick) {
                setSwitcherDown($button);
                $(document).off($clickEventId);
            }
        }
        );
        const $keyupEventId = `keyup.${$buttonId}`;
        $(document).on($keyupEventId, (event) => {
            if (["Escape"].includes(event.key)) {
                setSwitcherDown($button);
                $(document).off($keyupEventId);
            }
        }
        );
    }
    function addLanguageSwitcherEnterListeners($element) {
        const $button = $($element);
        var $icon = getLanguageSwitchIcon($button);
        if ($icon.hasClass('fa-chevron-down')) {
            setSwitcherUp($button);
            addLanguageSwitcherAwayListeners($button);
        } else {
            if ($icon.hasClass('fa-chevron-up')) {
                setSwitcherDown($button);
                removeLanguageSwitcherAwayListeners($button);
            }
        }
    }
    function languageSwitchChevron() {
        $('button.languageSwitcher').unbind('click').click(function(event) {
            addLanguageSwitcherEnterListeners(this);
        });
    }
    function setEvents() {
        var CURRENT_WIDTH = window.innerWidth;
        if (CURRENT_WIDTH > TABLET_WIDTH) {
            var menuItems = $('[data-block="mainnavigationmobile_2"] > li.expanded.dropdown');
            var submenuItems = $('[data-block="mainnavigationmobile_2"].dropdown-menu a ');
            $('.mobile-only-text').parent().hide();
            $('.desktop-only-text').parent().show();
            $(menuItems).hover(function(e) {
                if (e.type == 'mouseenter') {
                    $(this).addClass('open');
                    $(this).children('a').attr('aria-expanded', 'true');
                    $(this).children('ul').attr({
                        'aria-expanded': 'true',
                        'aria-hidden': 'false'
                    });
                } else {
                    if (e.type == 'mouseleave') {
                        $(this).removeClass('open');
                        $(this).children('a').attr('aria-expanded', 'false');
                        $(this).children('ul').attr({
                            'aria-expanded': 'false',
                            'aria-hidden': 'true'
                        });
                    }
                }
            });
            submenuItems.removeAttr('title');
            var toolbarTrayActive, toolbarBtnClicked;
            function scrollFunction() {
                var stickyNav = $('.header-nav');
                var stickyNavTop = stickyNav[0].offsetTop;
                var pxToTopOfNav = 155 - window.pageYOffset
                  , extraPxToTopOfNav = 0;
                if ($('#toolbar-administration').length > 0)
                    extraPxToTopOfNav = $('header#navbar').offset().top;
                if (stickyNavTop == 0 && window.pageYOffset <= 105) {
                    $('#stickyNavLogo').hide();
                    stickyNav.removeClass('sticky');
                    $('ul[data-block=mainnavigationmobile_2].menu.dropdown-menu').css('top', pxToTopOfNav + extraPxToTopOfNav + 'px');
                } else if (window.pageYOffset != 0 && window.pageYOffset >= stickyNavTop) {
                    $('#stickyNavLogo').show();
                    stickyNav.addClass('sticky');
                    if ($('#toolbar-administration').length == 0)
                        $('ul[data-block=mainnavigationmobile_2].menu.dropdown-menu').css('top', '50px');
                    else
                        $('ul[data-block=mainnavigationmobile_2].menu.dropdown-menu').css('top', pxToTopOfNav);
                } else {
                    $('#stickyNavLogo').hide();
                    stickyNav.removeClass('sticky');
                    $('ul[data-block=mainnavigationmobile_2].menu.dropdown-menu').css('top', pxToTopOfNav + extraPxToTopOfNav + 'px');
                }
            }
            window.onscroll = function() {
                scrollFunction(false);
            }
            ;
            $('.toolbar-tab').on('click', function() {
                setTimeout(scrollFunction, 500);
            });
            if ($('#toolbar-administration').length > 0)
                setTimeout(scrollFunction, 3000);
            else
                scrollFunction();
        } else {
            $(dropdownBtn).click(function(e) {
                e.preventDefault();
            });
            $('.mobile-only-text').parent().show();
            $('.desktop-only-text').parent().hide();
            $(dropdownBtn).removeAttr('href data-target data-toggle');
            $(dropdownBody).attr('class', 'collapse');
            $(dropdownBtn).click(function() {
                $(dropdownBody).collapse('toggle');
            });
            $('#pup-mobile-navbar-infoBtn a').mouseup(function() {
                $(this).removeClass('mobile-info-click');
            });
            $('#pup-mobile-navbar-infoBtn a').mousedown(function() {
                $(this).addClass('mobile-info-click');
            });
            function iconClick() {
                $('h2.accordion-title.ui-accordion-header').off('click.icon').on('click.icon', function() {
                    appendIcons();
                    var $target = $(this);
                    var $target_sibling = document.getElementById($target.attr('aria-controls'));
                    if ($target_sibling.getAttribute('aria-hidden').toString() == 'false') {
                        var eventAction = $target.text();
                        var eventCategory = 'Megamenu Mobile Tab Click';
                        var eventLabel = 'Expanded';
                    }
                });
            }
            function appendIcons() {
                $('.mobile-open-icon').each(function() {
                    this.parentNode.removeChild(this);
                });
                $('.mobile-close-icon').each(function() {
                    this.parentNode.removeChild(this);
                });
                $('h2.accordion-title.ui-accordion-header').each(function() {
                    if (this.attributes[5].value === 'false') {
                        let openIcon = document.createElement('div');
                        openIcon.classList.add('mobile-open-icon');
                        this.appendChild(openIcon);
                    } else {
                        let closeIcon = document.createElement('div');
                        closeIcon.classList.add('mobile-close-icon');
                        this.appendChild(closeIcon);
                    }
                });
            }
            appendIcons();
            iconClick();
            $('#pup-mobile-navbar-menuBtn').off('click.mobile-menu').on('click.mobile-menu', function() {
                $('#mobile-clickable-overlay').toggleClass('mobile-menu-overlay mobile-menu-overlay-active');
                appendIcons();
                iconClick();
                languageSwitchChevron();
            });
            $('#pup-mobile-navbar-infoBtn').click(function() {
                $('#mobile-clickable-overlay')[0].classList.remove('mobile-menu-overlay', 'mobile-menu-overlay-active');
                $('#mobile-clickable-overlay')[0].classList.add('mobile-menu-overlay');
            });
            $('#pup-mobile-navbar-searchBtn').click(function() {
                $('#mobile-clickable-overlay')[0].classList.remove('mobile-menu-overlay', 'mobile-menu-overlay-active');
                $('#mobile-clickable-overlay')[0].classList.add('mobile-menu-overlay');
            });
            $('#mobile-clickable-overlay').click(function() {
                $('#pup-mobile-navbar-menuBtn').click();
            });
        }
    }
    $(mobileMenuBtns).click(function() {
        var menuValue = menuText.split('Toggle menu');
        var btnThatWasClicked = $(this);
        var wasClickedTarget = $(btnThatWasClicked).data('target');
        if ($(btnThatWasOn) != undefined) {
            $(btnThatWasOn).removeClass('pup-toggle-onBtn-color');
            window.scrollTo(0, 0);
            switch ($(btnThatWasOn).attr('id')) {
            case 'pup-mobile-navbar-searchBtn':
                $('.pup-header-main').removeClass('pup-search-block-mobile');
                $('#pup-mobile-navbar-searchBtn').attr('aria-expanded', 'false');
                break;
            case 'pup-mobile-navbar-menuBtn':
                $(btnThatWasOn).addClass('mobile-menu-icon').removeClass('mobile-navbar-close');
                $(btnThatWasOn).text(menuValue[0]);
                break;
            default:
            }
            $($(btnThatWasOn).data('target')).collapse('hide');
        }
        if (wasClickedTarget != $(btnThatWasOn).data('target')) {
            switch ($(btnThatWasClicked).attr('id')) {
            case 'pup-mobile-navbar-searchBtn':
                $('.pup-header-main').addClass('pup-search-block-mobile');
                $('#pup-mobile-navbar-searchBtn').attr('aria-expanded', 'true');
                setTimeout(function() {
                    $('#navbar [data-drupal-selector="edit-search"]').focus();
                });
                break;
            case 'pup-mobile-navbar-menuBtn':
                $(btnThatWasClicked).removeClass('mobile-menu-icon').addClass('mobile-navbar-close');
                $(btnThatWasClicked).text('CLOSE');
                break;
            default:
            }
            $(wasClickedTarget).collapse('show');
        }
        if (wasClickedTarget == $(btnThatWasOn).data('target'))
            btnThatWasOn = undefined;
        else
            btnThatWasOn = btnThatWasClicked;
    }).children().click(function(e) {
        return e.target.id.slice(0, 15) == 'edit-submit-pup' || e.target.className == 'icon glyphicon glyphicon-search' || e.currentTarget.className == 'region region-help-menu-mobile' ? true : false;
    });
    setEvents();
    window.addEventListener('resize', function() {
        setEvents();
    });
    languageSwitchChevron();
}(jQuery);
;(function($, Drupal) {
    Drupal.behaviors.pupAccordion = {
        attach: function(context, options) {
            'use strict';
            if (document.querySelector('.accordion'))
                return;
            var accordAnchors = $(".panel-heading a[data-toggle='collapse']", context)
              , accordBodies = $(".panel-collapse.collapse", context)
              , keyboard = {
                SPACE: 32,
                ENTER: 13,
                DOWN: 40
            };
            $(accordBodies).each(function(index, element) {
                if (navigator.appVersion.search("Chrome") > -1)
                    $(element).find("div.panel-body").prepend("<p class='visually-hidden'>&nbsp;</p>");
                $(this).attr('aria-labelledby', 'accordion_header_help');
                if ($(element).hasClass('in'))
                    $(this).parent().find(accordAnchors).addClass('pup-accordion-chevron-down');
                else
                    $(this).parent().find(accordAnchors).addClass('pup-accordion-chevron-rt');
            });
            accordAnchors.each(function() {
                $(this).on('keydown', function(e) {
                    if (e.which === keyboard.SPACE || e.which === keyboard.ENTER) {
                        e.preventDefault();
                        $(this).click();
                    }
                    if (navigator.appVersion.search("Chrome") > -1)
                        $(this).focus();
                    if (e.which === keyboard.DOWN)
                        if (navigator.appVersion.search("Chrome") > -1) {
                            e.preventDefault();
                            var $el = $(this).parents(".panel-default").find("div[role='tabpanel']");
                            $el.attr('tabindex', -1);
                            $el.focus();
                        }
                });
                $(this).on('focus', function() {
                    if (navigator.appVersion.search("Chrome") > -1) {
                        var $el = $(this).parents(".panel-default").find("div[role='tabpanel']");
                        $el.removeAttr('tabindex');
                    }
                });
            });
            $('.panel-collapse.collapse', context).on('shown.bs.collapse', function() {
                var $target = $(this).parent().find(accordAnchors);
                $target.attr('aria-expanded', 'true');
                $target.removeClass('pup-accordion-chevron-rt').addClass('pup-accordion-chevron-down');
            }).on('hidden.bs.collapse', function() {
                var $target = $(this).parent().find(accordAnchors);
                $target.attr('aria-expanded', 'false');
                $target.removeClass('pup-accordion-chevron-down').addClass('pup-accordion-chevron-rt');
            });
            $('.panel-collapse.collapse', context).on('shown.bs.collapse', function() {
                var $target = $(this).parent().find(accordAnchors);
                $target.attr('aria-expanded', 'true');
                $target.removeClass('pup-accordion-chevron-rt').addClass('pup-accordion-chevron-down');
                var eventCategory = $('h1').first().text() + ' Accordion';
                var eventAction = 'Open';
                var eventLabel = $target.text();
            }).on('hidden.bs.collapse', function() {
                var $target = $(this).parent().find(accordAnchors);
                $target.attr('aria-expanded', 'false');
                $target.removeClass('pup-accordion-chevron-down').addClass('pup-accordion-chevron-rt');
                var eventCategory = $('h1').first().text() + ' Accordion';
                var eventAction = 'Close';
                var eventLabel = $target.text();
            });
            $('.panel-collapse.collapse a', context).on('click', function() {
                var $target = $(this).parents('.panel').find(accordAnchors);
                var eventCategory = '';
                var eventAction = $target.text();
                var eventLabel = $(this).attr('href');
                var dataEntityType = $(this).attr('data-entity-type');
                var extDoc = [".csv", ".dat", ".doc", ".docx", ".epub", ".exe", ".flat", ".htm", ".html", ".json", ".mobi", ".pdf", ".ppt", ".pptx", ".rft", ".rtf", ".txt", ".xls", ".xlsm", ".xlsx", ".xml", ".xsd", ".zip", ".wav", ".smi", ".psd", ".asx", ".aif", ".docm", ".output", ".sasb7dat", ".part", ".audit", ".mp3"];
                if (dataEntityType == undefined || dataEntityType == false)
                    if (eventLabel.indexOf('/') == 0 || eventLabel.indexOf(window.location.hostname) != -1) {
                        eventCategory = 'Accordion Internal Link';
                        for (var j = 0; j < extDoc.length; j++)
                            if (eventLabel.indexOf(extDoc[j]) != -1)
                                eventCategory = 'Accordion Download';
                    } else
                        eventCategory = 'Accordion Outbound Link';
                else if (dataEntityType == 'node')
                    eventCategory = 'Accordion Internal Link';
                else if (dataEntityType == 'media')
                    if (eventLabel.indexOf(window.location.hostname) != -1)
                        eventCategory = 'Accordion Download';
                    else
                        eventCategory = 'Accordion Outbound Link';
                else
                    eventCategory = 'Unknown Link Type';
            });
            $(".toggle-accordion", context).on("click", function() {
                var panelsOpen = $('.panel-collapse.collapse.in').length;
                var eventCategory = $('.accordion-list').first().prevAll().filter('h2').first().text() + " accordion";
                var eventLabel = "";
                if (panelsOpen == 0) {
                    $('.panel-collapse.collapse').off('shown.bs.collapse');
                    $('.panel-collapse.collapse').collapse('show');
                    var $target = accordAnchors;
                    $target.attr('aria-expanded', 'true');
                    $target.removeClass('pup-accordion-chevron-rt').addClass('pup-accordion-chevron-down');
                } else {
                    $('.panel-collapse.collapse').off('hidden.bs.collapse');
                    $('.panel-collapse.collapse.in').collapse('hide');
                    var $target = accordAnchors;
                    $target.attr('aria-expanded', 'false');
                    $target.removeClass('pup-accordion-chevron-down').addClass('pup-accordion-chevron-rt');
                }
            });
            $('a[href*="#"]:not(.xmlbc-link)', context).click(function() {
                if (this.pathname == window.location.pathname && this.protocol == window.location.protocol && this.host == window.location.host) {
                    let anchor = this.hash;
                    $(anchor).closest('.panel-collapse.collapse').collapse('show');
                    $("body,html").animate({
                        scrollTop: $(anchor).offset().top - (150)
                    }, 800);
                }
            });
            $(document).ready(function() {
                if ($(location).attr('hash')) {
                    let anchor = $(location).attr('hash');
                    $(anchor).closest('.panel-collapse.collapse').collapse('show');
                    $("body,html").animate({
                        scrollTop: $(anchor).offset().top - (150)
                    }, 800);
                }
            });
        }
    };
}
)(jQuery, Drupal);
;(function($, Drupal) {
    'use strict';
    Drupal.behaviors.megamenuGa = {
        attach: function(context) {
            $('#block-mainnavigationmobile-2 a').removeAttr('onclick');
            $('#block-mainnavigationmobile-2 a', context).on('click', function() {
                var $target = $(this).parents('.megamenu-top-nav-item').find('a:first');
                var eventAction = $target.text();
                var eventCategory = 'Megamenu';
                if (this == $target[0])
                    eventCategory = 'Megamenu Tab';
                var eventLabel = $(this).attr('href');
                if (eventLabel.indexOf(window.location.hostname) != -1)
                    eventLabel = eventLabel.substring(eventLabel.indexOf('/', eventLabel.indexOf(window.location.hostname)));
            });
            $('.accordion_menus-block-content a', context).on('click', function() {
                var $target = $(this).parents('.accordion_menus-block-content').prev();
                var eventAction = $target.text();
                var eventCategory = 'Megamenu Mobile Click';
                var eventLabel = $(this).attr('href');
                if (eventLabel.indexOf(window.location.hostname) != -1)
                    eventLabel = eventLabel.substring(eventLabel.indexOf('/', eventLabel.indexOf(window.location.hostname)));
            });
        }
    };
}
)(jQuery, Drupal);
;(function($, document) {
    "use strict";
    var keystroke = {
        SPACE: 32,
        ESCAPE: 27,
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
    };
    $('.megamenu-top-nav-item').on('keypress', function(e) {
        var currTarget = $(e.currentTarget).closest('.megamenu-top-nav-item');
        if (e.originalEvent.keyCode == keystroke['SPACE']) {
            e.preventDefault();
            if (currTarget.hasClass('open'))
                closeCurrentTab(currTarget);
            else
                openCurrentTab(currTarget);
        }
    });
    $('.megamenu-top-nav-item').on('keydown', function(e) {
        var currTarget = $(e.currentTarget).closest('.megamenu-top-nav-item')
          , target = $(e.target).attr("id")
          , nextTarget = currTarget.next('.megamenu-top-nav-item')
          , prevTarget = currTarget.prev('.megamenu-top-nav-item')
          , focusList = $(':focus').parents('.mega-menu-container').find('a:not(.mobile-only-text)')
          , activeIndex = focusList.index($(':focus'))
          , lastFocus = focusList[activeIndex - 1]
          , nextFocus = focusList[activeIndex + 1];
        if (e.originalEvent.keyCode == keystroke['ESCAPE'])
            if (currTarget.hasClass('open')) {
                closeCurrentTab(currTarget);
                currTarget.children('a').focus();
            }
        if (e.originalEvent.keyCode == keystroke['RIGHT'])
            if (currTarget.hasClass('open'))
                if (target.substring(0, target.length - 2) == 'accessible-megamenu-nav-item') {
                    if (nextTarget.length > 0) {
                        closeCurrentTab(currTarget);
                        focusNextTab(nextTarget);
                    }
                } else if (typeof nextFocus != 'undefined')
                    nextFocus.focus();
                else {
                    if (nextTarget.length > 0) {
                        closeCurrentTab(currTarget);
                        focusNextTab(nextTarget);
                    }
                }
            else
                nextTarget.children('a').focus();
        if (e.originalEvent.keyCode == keystroke['LEFT'])
            if (!currTarget.hasClass('open'))
                prevTarget.children('a').focus();
            else if (target.substring(0, target.length - 2) == "accessible-megamenu-nav-item") {
                if (prevTarget.length > 0) {
                    closeCurrentTab(currTarget);
                    focusPrevTab(prevTarget);
                }
            } else if (typeof lastFocus != 'undefined')
                lastFocus.focus();
            else
                currTarget.children('a').focus();
        if (e.originalEvent.keyCode == keystroke['DOWN']) {
            e.preventDefault();
            if (currTarget.hasClass('open'))
                if (target.substring(0, target.length - 2) == "accessible-megamenu-nav-item")
                    currTarget.children('ul').find('a:not(.mobile-only-text)').first().focus();
                else {
                    if (activeIndex == focusList.length - 1)
                        if (nextTarget.length > 0) {
                            closeCurrentTab(currTarget);
                            focusNextTab(nextTarget);
                        }
                }
            else
                openCurrentTab(currTarget);
        }
        if (e.originalEvent.keyCode == keystroke['UP'])
            if (!currTarget.hasClass('open'))
                currTarget.prev('.megamenu-top-nav-item').children('a').focus();
            else if (target.substring(0, target.length - 2) == "accessible-megamenu-nav-item") {
                if (prevTarget.length > 0) {
                    closeCurrentTab(currTarget);
                    focusPrevTab(prevTarget);
                }
            } else if (typeof lastFocus != 'undefined')
                lastFocus.focus();
            else
                setTimeout(function() {
                    currTarget.children('a').focus();
                });
    });
    function openCurrentTab(currTarget) {
        currTarget.addClass('open');
        currTarget.children('a').attr('aria-expanded', 'true');
        currTarget.children('ul').attr({
            'aria-expanded': 'true',
            'aria-hidden': 'false'
        });
    }
    function closeCurrentTab(currTarget) {
        currTarget.removeClass('open');
        currTarget.children('a').attr('aria-expanded', 'false');
        currTarget.children('ul').attr({
            'aria-expanded': 'false',
            'aria-hidden': 'true'
        });
    }
    function focusNextTab(nextTarget) {
        nextTarget.children('a').focus();
        nextTarget.addClass('open');
        nextTarget.children('a').attr('aria-expanded', 'true');
        nextTarget.children('ul').attr({
            'aria-expanded': 'true',
            'aria-hidden': 'false'
        });
    }
    function focusPrevTab(prevTarget) {
        prevTarget.children('a').focus();
        prevTarget.addClass('open');
        prevTarget.children('a').attr('aria-expanded', 'true');
        prevTarget.children('ul').attr({
            'aria-expanded': 'true',
            'aria-hidden': 'false'
        });
    }
    $('.megamenu-top-nav-item').on('keyup', function(e) {
        if (e.originalEvent.keyCode == keystroke['DOWN'])
            e.preventDefault();
    });
}
)(jQuery);
;(function(_, $, Drupal, drupalSettings) {
    'use strict';
    var Bootstrap = {
        processedOnce: {},
        settings: drupalSettings.bootstrap || {}
    };
    Bootstrap.checkPlain = function(str) {
        return str && Drupal.checkPlain(str) || '';
    }
    ;
    Bootstrap.createPlugin = function(id, plugin, noConflict) {
        if ($.fn[id] !== void 0)
            return this.fatal('Specified jQuery plugin identifier already exists: @id. Use Drupal.bootstrap.replacePlugin() instead.', {
                '@id': id
            });
        if (typeof plugin !== 'function')
            return this.fatal('You must provide a constructor function to create a jQuery plugin "@id": @plugin', {
                '@id': id,
                '@plugin': plugin
            });
        this.pluginNoConflict(id, plugin, noConflict);
        $.fn[id] = plugin;
    }
    ;
    Bootstrap.diffObjects = function(objects) {
        var args = Array.prototype.slice.call(arguments);
        return _.pick(args[0], _.difference.apply(_, _.map(args, function(obj) {
            return Object.keys(obj);
        })));
    }
    ;
    Bootstrap.eventMap = {
        Event: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        MouseEvent: /^(?:click|dblclick|mouse(?:down|enter|leave|up|over|move|out))$/,
        KeyboardEvent: /^(?:key(?:down|press|up))$/,
        TouchEvent: /^(?:touch(?:start|end|move|cancel))$/
    };
    Bootstrap.extendPlugin = function(id, callback) {
        if (typeof $.fn[id] !== 'function')
            return this.fatal('Specified jQuery plugin identifier does not exist: @id', {
                '@id': id
            });
        if (typeof callback !== 'function')
            return this.fatal('You must provide a callback function to extend the jQuery plugin "@id": @callback', {
                '@id': id,
                '@callback': callback
            });
        var constructor = $.fn[id] && $.fn[id].Constructor || $.fn[id];
        var plugin = callback.apply(constructor, [this.settings]);
        if (!$.isPlainObject(plugin))
            return this.fatal('Returned value from callback is not a plain object that can be used to extend the jQuery plugin "@id": @obj', {
                '@obj': plugin
            });
        this.wrapPluginConstructor(constructor, plugin, true);
        return $.fn[id];
    }
    ;
    Bootstrap.superWrapper = function(parent, fn) {
        return function() {
            var previousSuper = this.super;
            this.super = parent;
            var ret = fn.apply(this, arguments);
            if (previousSuper)
                this.super = previousSuper;
            else
                delete this.super;
            return ret;
        }
        ;
    }
    ;
    Bootstrap.fatal = function(message, args) {
        if (this.settings.dev && console.warn) {
            for (var name in args)
                if (args.hasOwnProperty(name) && typeof args[name] === 'object')
                    args[name] = JSON.stringify(args[name]);
            Drupal.throwError(new Error(Drupal.formatString(message, args)));
        }
        return false;
    }
    ;
    Bootstrap.intersectObjects = function(objects) {
        var args = Array.prototype.slice.call(arguments);
        return _.pick(args[0], _.intersection.apply(_, _.map(args, function(obj) {
            return Object.keys(obj);
        })));
    }
    ;
    Bootstrap.normalizeObject = function(obj) {
        if (!$.isPlainObject(obj))
            return obj;
        for (var k in obj)
            if (typeof obj[k] === 'string')
                if (obj[k] === 'true')
                    obj[k] = true;
                else if (obj[k] === 'false')
                    obj[k] = false;
                else {
                    if (obj[k].match(/^[\d-.]$/))
                        obj[k] = parseFloat(obj[k]);
                }
            else {
                if ($.isPlainObject(obj[k]))
                    obj[k] = Bootstrap.normalizeObject(obj[k]);
            }
        return obj;
    }
    ;
    Bootstrap.once = function(id, callback) {
        if (this.processedOnce[id])
            return this;
        callback.call(this, this.settings);
        this.processedOnce[id] = true;
        return this;
    }
    ;
    Bootstrap.option = function(key, value) {
        var options = $.isPlainObject(key) ? $.extend({}, key) : {};
        if (arguments.length === 0)
            return $.extend({}, this.options);
        if (typeof key === "string") {
            var parts = key.split('.');
            key = parts.shift();
            var obj = options;
            if (parts.length) {
                for (var i = 0; i < parts.length - 1; i++) {
                    obj[parts[i]] = obj[parts[i]] || {};
                    obj = obj[parts[i]];
                }
                key = parts.pop();
            }
            if (arguments.length === 1)
                return obj[key] === void 0 ? null : obj[key];
            obj[key] = value;
        }
        $.extend(true, this.options, options);
    }
    ;
    Bootstrap.pluginNoConflict = function(id, plugin, noConflict) {
        if (plugin.noConflict === void 0 && (noConflict === void 0 || noConflict)) {
            var old = $.fn[id];
            plugin.noConflict = function() {
                $.fn[id] = old;
                return this;
            }
            ;
        }
    }
    ;
    Bootstrap.relayEvent = function(target, name, stopPropagation) {
        return function(e) {
            if (stopPropagation === void 0 || stopPropagation)
                e.stopPropagation();
            var $target = $(target);
            var parts = name.split('.').filter(Boolean);
            var type = parts.shift();
            e.target = $target[0];
            e.currentTarget = $target[0];
            e.namespace = parts.join('.');
            e.type = type;
            $target.trigger(e);
        }
        ;
    }
    ;
    Bootstrap.replacePlugin = function(id, callback, noConflict) {
        if (typeof $.fn[id] !== 'function')
            return this.fatal('Specified jQuery plugin identifier does not exist: @id', {
                '@id': id
            });
        if (typeof callback !== 'function')
            return this.fatal('You must provide a valid callback function to replace a jQuery plugin: @callback', {
                '@callback': callback
            });
        var constructor = $.fn[id] && $.fn[id].Constructor || $.fn[id];
        var plugin = callback.apply(constructor, [this.settings]);
        if (typeof plugin !== 'function')
            return this.fatal('Returned value from callback is not a usable function to replace a jQuery plugin "@id": @plugin', {
                '@id': id,
                '@plugin': plugin
            });
        this.wrapPluginConstructor(constructor, plugin);
        this.pluginNoConflict(id, plugin, noConflict);
        $.fn[id] = plugin;
    }
    ;
    Bootstrap.simulate = function(element, type, options) {
        var ret = true;
        if (element instanceof $) {
            element.each(function() {
                if (!Bootstrap.simulate(this, type, options))
                    ret = false;
            });
            return ret;
        }
        if (!(element instanceof HTMLElement))
            this.fatal('Passed element must be an instance of HTMLElement, got "@type" instead.', {
                '@type': typeof element
            });
        if (typeof $.simulate === 'function') {
            new $.simulate(element,type,options);
            return true;
        }
        var event;
        var ctor;
        var types = [].concat(type);
        for (var i = 0, l = types.length; i < l; i++) {
            type = types[i];
            for (var name in this.eventMap)
                if (this.eventMap[name].test(type)) {
                    ctor = name;
                    break;
                }
            if (!ctor)
                throw new SyntaxError('Only rudimentary HTMLEvents, KeyboardEvents and MouseEvents are supported: ' + type);
            var opts = {
                bubbles: true,
                cancelable: true
            };
            if (ctor === 'KeyboardEvent' || ctor === 'MouseEvent')
                $.extend(opts, {
                    ctrlKey: !1,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !1
                });
            if (ctor === 'MouseEvent')
                $.extend(opts, {
                    button: 0,
                    pointerX: 0,
                    pointerY: 0,
                    view: window
                });
            if (options)
                $.extend(opts, options);
            if (typeof window[ctor] === 'function') {
                event = new window[ctor](type,opts);
                if (!element.dispatchEvent(event))
                    ret = false;
            } else if (document.createEvent) {
                event = document.createEvent(ctor);
                event.initEvent(type, opts.bubbles, opts.cancelable);
                if (!element.dispatchEvent(event))
                    ret = false;
            } else if (typeof element.fireEvent === 'function') {
                event = $.extend(document.createEventObject(), opts);
                if (!element.fireEvent('on' + type, event))
                    ret = false;
            } else {
                if (typeof element[type])
                    element[type]();
            }
        }
        return ret;
    }
    ;
    Bootstrap.stripHtml = function(html) {
        if (html instanceof $)
            html = html.html();
        else {
            if (html instanceof Element)
                html = html.innerHTML;
        }
        var tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return (tmp.textContent || tmp.innerText || '').replace(/^[\s\n\t]*|[\s\n\t]*$/, '');
    }
    ;
    Bootstrap.unsupported = function(type, name, value) {
        Bootstrap.warn('Unsupported by Drupal Bootstrap: (@type) @name -> @value', {
            '@type': type,
            '@name': name,
            '@value': typeof value === 'object' ? JSON.stringify(value) : value
        });
    }
    ;
    Bootstrap.warn = function(message, args) {
        if (this.settings.dev && console.warn)
            console.warn(Drupal.formatString(message, args));
    }
    ;
    Bootstrap.wrapPluginConstructor = function(constructor, plugin, extend) {
        var proto = constructor.prototype;
        var option = this.option;
        if (proto.option === void (0))
            proto.option = function() {
                return option.apply(this, arguments);
            }
            ;
        if (extend) {
            if (plugin.prototype !== void 0)
                for (var key in plugin.prototype) {
                    if (!plugin.prototype.hasOwnProperty(key))
                        continue;
                    var value = plugin.prototype[key];
                    if (typeof value === 'function')
                        proto[key] = this.superWrapper(proto[key] || function() {}
                        , value);
                    else
                        proto[key] = $.isPlainObject(value) ? $.extend(true, {}, proto[key], value) : value;
                }
            delete plugin.prototype;
            for (key in plugin) {
                if (!plugin.hasOwnProperty(key))
                    continue;
                value = plugin[key];
                if (typeof value === 'function')
                    constructor[key] = this.superWrapper(constructor[key] || function() {}
                    , value);
                else
                    constructor[key] = $.isPlainObject(value) ? $.extend(true, {}, constructor[key], value) : value;
            }
        }
    }
    ;
    Drupal.bootstrap = Drupal.bootstrap || Bootstrap;
}
)(window._, window.jQuery, window.Drupal, window.drupalSettings);
;(function($, _) {
    var Attributes = function(attributes) {
        this.data = {};
        this.data['class'] = [];
        this.merge(attributes);
    };
    Attributes.prototype.toString = function() {
        var output = '';
        var name, value;
        var checkPlain = function(str) {
            return str && str.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
        };
        var data = this.getData();
        for (name in data) {
            if (!data.hasOwnProperty(name))
                continue;
            value = data[name];
            if (_.isFunction(value))
                value = value();
            if (_.isObject(value))
                value = _.values(value);
            if (_.isArray(value))
                value = value.join(' ');
            output += ' ' + checkPlain(name) + '="' + checkPlain(value) + '"';
        }
        return output;
    }
    ;
    Attributes.prototype.toPlainObject = function() {
        var object = {};
        var name, value;
        var data = this.getData();
        for (name in data) {
            if (!data.hasOwnProperty(name))
                continue;
            value = data[name];
            if (_.isFunction(value))
                value = value();
            if (_.isObject(value))
                value = _.values(value);
            if (_.isArray(value))
                value = value.join(' ');
            object[name] = value;
        }
        return object;
    }
    ;
    Attributes.prototype.addClass = function(value) {
        var args = Array.prototype.slice.call(arguments);
        this.data['class'] = this.sanitizeClasses(this.data['class'].concat(args));
        return this;
    }
    ;
    Attributes.prototype.exists = function(name) {
        return this.data[name] !== void (0) && this.data[name] !== null;
    }
    ;
    Attributes.prototype.get = function(name, defaultValue) {
        if (!this.exists(name))
            this.data[name] = defaultValue;
        return this.data[name];
    }
    ;
    Attributes.prototype.getData = function() {
        return _.extend({}, this.data);
    }
    ;
    Attributes.prototype.getClasses = function() {
        return this.get('class', []);
    }
    ;
    Attributes.prototype.hasClass = function(className) {
        className = this.sanitizeClasses(Array.prototype.slice.call(arguments));
        var classes = this.getClasses();
        for (var i = 0, l = className.length; i < l; i++)
            if (_.indexOf(classes, className[i]) === -1)
                return false;
        return true;
    }
    ;
    Attributes.prototype.merge = function(object, recursive) {
        if (!object)
            return this;
        if (object instanceof $)
            object = object[0];
        if (object instanceof Node)
            object = Array.prototype.slice.call(object.attributes).reduce(function(attributes, attribute) {
                attributes[attribute.name] = attribute.value;
                return attributes;
            }, {});
        else if (object instanceof Attributes)
            object = object.getData();
        else
            object = _.extend({}, object);
        if (!$.isPlainObject(object)) {
            setTimeout(function() {
                throw new Error('Passed object is not supported: ' + object);
            });
            return this;
        }
        if (object && object['class'] !== void 0) {
            this.addClass(object['class']);
            delete object['class'];
        }
        if (recursive === void 0 || recursive)
            this.data = $.extend(true, {}, this.data, object);
        else
            this.data = $.extend({}, this.data, object);
        return this;
    }
    ;
    Attributes.prototype.remove = function(name) {
        if (this.exists(name))
            delete this.data[name];
        return this;
    }
    ;
    Attributes.prototype.removeClass = function(className) {
        var remove = this.sanitizeClasses(Array.prototype.slice.apply(arguments));
        this.data['class'] = _.without(this.getClasses(), remove);
        return this;
    }
    ;
    Attributes.prototype.replaceClass = function(oldValue, newValue) {
        var classes = this.getClasses();
        var i = _.indexOf(this.sanitizeClasses(oldValue), classes);
        if (i >= 0) {
            classes[i] = newValue;
            this.set('class', classes);
        }
        return this;
    }
    ;
    Attributes.prototype.sanitizeClasses = function(classes) {
        return _.chain(Array.prototype.slice.call(arguments)).flatten().map(function(string) {
            return string.split(' ');
        }).flatten().filter().map(function(value) {
            return Attributes.cleanClass(value);
        }).uniq().value();
    }
    ;
    Attributes.prototype.set = function(name, value) {
        var obj = $.isPlainObject(name) ? name : {};
        if (typeof name === 'string')
            obj[name] = value;
        return this.merge(obj);
    }
    ;
    Attributes.cleanClass = function(identifier, filter) {
        filter = filter || {
            ' ': '-',
            '_': '-',
            '/': '-',
            '[': '-',
            ']': ''
        };
        identifier = identifier.toLowerCase();
        if (filter['__'] === void 0)
            identifier = identifier.replace('__', '#DOUBLE_UNDERSCORE#');
        identifier = identifier.replace(Object.keys(filter), Object.keys(filter).map(function(key) {
            return filter[key];
        }));
        if (filter['__'] === void 0)
            identifier = identifier.replace('#DOUBLE_UNDERSCORE#', '__');
        identifier = identifier.replace(/[^\u002D\u0030-\u0039\u0041-\u005A\u005F\u0061-\u007A\u00A1-\uFFFF]/g, '');
        identifier = identifier.replace(['/^[0-9]/', '/^(-[0-9])|^(--)/'], ['_', '__']);
        return identifier;
    }
    ;
    Attributes.create = function(attributes) {
        return new Attributes(attributes);
    }
    ;
    window.Attributes = Attributes;
}
)(window.jQuery, window._);
;(function($, Drupal, Bootstrap, Attributes) {
    if (!Drupal.icon)
        Drupal.icon = {
            bundles: {}
        };
    if (!Drupal.theme.icon || Drupal.theme.prototype.icon)
        $.extend(Drupal.theme, {
            icon: function(bundle, icon, attributes) {
                if (!Drupal.icon.bundles[bundle])
                    return '';
                attributes = Attributes.create(attributes).addClass('icon').set('aria-hidden', 'true');
                icon = Drupal.icon.bundles[bundle](icon, attributes);
                return '<span' + attributes + '></span>';
            }
        });
    Drupal.icon.bundles.bootstrap = function(icon, attributes) {
        attributes.addClass(['glyphicon', 'glyphicon-' + icon]);
    }
    ;
    $.extend(Drupal.theme, {
        ajaxThrobber: function() {
            return Drupal.theme('bootstrapIcon', 'refresh', {
                'class': ['ajax-throbber', 'glyphicon-spin']
            });
        },
        button: function(attributes) {
            attributes = Attributes.create(attributes).addClass('btn');
            var context = attributes.get('context', 'default');
            var label = attributes.get('value', '');
            attributes.remove('context').remove('value');
            if (!attributes.hasClass(['btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger', 'btn-link']))
                attributes.addClass('btn-' + Bootstrap.checkPlain(context));
            if (!attributes.exists('type'))
                attributes.set('type', attributes.hasClass('form-submit') ? 'submit' : 'button');
            return '<button' + attributes + '>' + label + '</button>';
        },
        btn: function(attributes) {
            return Drupal.theme('button', attributes);
        },
        'btn-block': function(attributes) {
            return Drupal.theme('button', Attributes.create(attributes).addClass('btn-block'));
        },
        'btn-lg': function(attributes) {
            return Drupal.theme('button', Attributes.create(attributes).addClass('btn-lg'));
        },
        'btn-sm': function(attributes) {
            return Drupal.theme('button', Attributes.create(attributes).addClass('btn-sm'));
        },
        'btn-xs': function(attributes) {
            return Drupal.theme('button', Attributes.create(attributes).addClass('btn-xs'));
        },
        bootstrapIcon: function(name, attributes) {
            return Drupal.theme('icon', 'bootstrap', name, attributes);
        }
    });
}
)(window.jQuery, window.Drupal, window.Drupal.bootstrap, window.Attributes);
;var Drupal = Drupal || {};
(function($, Drupal, Bootstrap) {
    "use strict";
    var $document = $(document);
    Bootstrap.extendPlugin('popover', function(settings) {
        return {
            DEFAULTS: {
                animation: !!settings.popover_animation,
                autoClose: !!settings.popover_auto_close,
                enabled: settings.popover_enabled,
                html: !!settings.popover_html,
                placement: settings.popover_placement,
                selector: settings.popover_selector,
                trigger: settings.popover_trigger,
                title: settings.popover_title,
                content: settings.popover_content,
                delay: parseInt(settings.popover_delay, 10),
                container: settings.popover_container
            }
        };
    });
    Drupal.behaviors.bootstrapPopovers = {
        $activePopover: null,
        attach: function(context) {
            if (!$.fn.popover || !$.fn.popover.Constructor.DEFAULTS.enabled)
                return;
            var _this = this;
            $document.on('show.bs.popover', '[data-toggle=popover]', function() {
                var $trigger = $(this);
                var popover = $trigger.data('bs.popover');
                if (popover.options.originalTrigger === 'click') {
                    if (_this.$activePopover && _this.getOption('autoClose') && !_this.$activePopover.is($trigger))
                        _this.$activePopover.popover('hide');
                    _this.$activePopover = $trigger;
                }
            }).on('focus.bs.popover', ':visible', function(e) {
                var $target = $(e.target);
                if (_this.$activePopover && _this.getOption('autoClose') && !_this.$activePopover.is($target) && !$target.closest('.popover.in')[0]) {
                    _this.$activePopover.popover('hide');
                    _this.$activePopover = null;
                }
            }).on('click.bs.popover', function(e) {
                var $target = $(e.target);
                if (_this.$activePopover && _this.getOption('autoClose') && !$target.is('[data-toggle=popover]') && !$target.closest('.popover.in')[0]) {
                    _this.$activePopover.popover('hide');
                    _this.$activePopover = null;
                }
            }).on('keyup.bs.popover', function(e) {
                if (_this.$activePopover && _this.getOption('autoClose') && e.which === 27) {
                    _this.$activePopover.popover('hide');
                    _this.$activePopover = null;
                }
            });
            ;var elements = $(context).find('[data-toggle=popover]').toArray();
            for (var i = 0; i < elements.length; i++) {
                var $element = $(elements[i]);
                var options = $.extend({}, $.fn.popover.Constructor.DEFAULTS, $element.data());
                options.originalTrigger = options.trigger;
                if (options.trigger === 'click')
                    options.trigger = 'manual';
                var target = options.target || $element.is('a[href^="#"]') && $element.attr('href');
                var $target = $document.find(target).clone();
                if (!options.content && $target[0]) {
                    $target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');
                    options.content = $target.wrap('<div/>').parent()[options.html ? 'html' : 'text']() || '';
                }
                $element.popover(options);
                if (options.originalTrigger === 'click') {
                    $element.off('click.drupal.bootstrap.popover').on('click.drupal.bootstrap.popover', function(e) {
                        $(this).popover('toggle');
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    ;
                }
            }
        },
        detach: function(context) {
            if (!$.fn.popover || !$.fn.popover.Constructor.DEFAULTS.enabled)
                return;
            $(context).find('[data-toggle="popover"]').off('click.drupal.bootstrap.popover').popover('destroy');
            ;
        },
        getOption: function(name, defaultValue, element) {
            var $element = element ? $(element) : this.$activePopover;
            var options = $.extend(true, {}, $.fn.popover.Constructor.DEFAULTS, ($element && $element.data('bs.popover') || {}).options);
            if (options[name] !== void 0)
                return options[name];
            return defaultValue !== void 0 ? defaultValue : void 0;
        }
    };
}
)(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;var Drupal = Drupal || {};
(function($, Drupal, Bootstrap) {
    "use strict";
    Bootstrap.extendPlugin('tooltip', function(settings) {
        return {
            DEFAULTS: {
                animation: !!settings.tooltip_animation,
                enabled: settings.tooltip_enabled,
                html: !!settings.tooltip_html,
                placement: settings.tooltip_placement,
                selector: settings.tooltip_selector,
                trigger: settings.tooltip_trigger,
                delay: parseInt(settings.tooltip_delay, 10),
                container: settings.tooltip_container
            }
        };
    });
    Drupal.behaviors.bootstrapTooltips = {
        attach: function(context) {
            if (!$.fn.tooltip || !$.fn.tooltip.Constructor.DEFAULTS.enabled)
                return;
            var elements = $(context).find('[data-toggle="tooltip"]').toArray();
            for (var i = 0; i < elements.length; i++) {
                var $element = $(elements[i]);
                var options = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, $element.data());
                $element.tooltip(options);
            }
        },
        detach: function(context) {
            if (!$.fn.tooltip || !$.fn.tooltip.Constructor.DEFAULTS.enabled)
                return;
            $(context).find('[data-toggle="tooltip"]').tooltip('destroy');
        }
    };
}
)(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;(function($, Drupal) {
    'use strict';
    function applyChosenBef($select) {
        $select.next('.chosen-container').find('.chosen-search-input').attr('data-bef-auto-submit-exclude', true);
    }
    Drupal.behaviors.chosenBef = {
        attach: function(context, settings) {
            $(once('chosenBef', 'select')).each(function() {
                const $select = $(this);
                if ($select.next('.chosen-container').length)
                    applyChosenBef($select);
                else
                    $select.on('chosen:ready', function() {
                        applyChosenBef($select);
                    });
            });
        }
    };
}
)(jQuery, Drupal);
;/* @license MIT https://github.com/JJJ/chosen/blob/master/LICENSE.md */
/* Chosen v1.5.0 | (c) 2011-2016 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
(function() {
    var a, AbstractChosen, Chosen, SelectParser, b, c = {}.hasOwnProperty, d = function(a, b) {
        function d() {
            this.constructor = a
        }
        for (var e in b)
            c.call(b, e) && (a[e] = b[e]);
        return d.prototype = b.prototype,
        a.prototype = new d,
        a.__super__ = b.prototype,
        a
    };
    SelectParser = function() {
        function SelectParser() {
            this.options_index = 0,
            this.parsed = []
        }
        return SelectParser.prototype.add_node = function(a) {
            return "OPTGROUP" === a.nodeName.toUpperCase() ? this.add_group(a) : this.add_option(a)
        }
        ,
        SelectParser.prototype.add_group = function(a) {
            var b, c, d, e, f, g;
            for (b = this.parsed.length,
            this.parsed.push({
                array_index: b,
                group: !0,
                label: this.escapeExpression(a.label),
                title: a.title ? a.title : void 0,
                children: 0,
                disabled: a.disabled,
                classes: a.className
            }),
            f = a.childNodes,
            g = [],
            d = 0,
            e = f.length; e > d; d++)
                c = f[d],
                g.push(this.add_option(c, b, a.disabled));
            return g
        }
        ,
        SelectParser.prototype.add_option = function(a, b, c) {
            return "OPTION" === a.nodeName.toUpperCase() ? ("" !== a.text ? (null != b && (this.parsed[b].children += 1),
            this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: a.value,
                text: a.text,
                html: a.innerHTML,
                title: a.title ? a.title : void 0,
                selected: a.selected,
                disabled: c === !0 ? c : a.disabled,
                group_array_index: b,
                group_label: null != b ? this.parsed[b].label : null,
                classes: a.className,
                style: a.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }),
            this.options_index += 1) : void 0
        }
        ,
        SelectParser.prototype.escapeExpression = function(a) {
            var b, c;
            return null == a || a === !1 ? "" : /[\&\<\>\"\'\`]/.test(a) ? (b = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            c = /&(?!\w+;)|[\<\>\"\'\`]/g,
            a.replace(c, function(a) {
                return b[a] || "&amp;"
            })) : a
        }
        ,
        SelectParser
    }(),
    SelectParser.select_to_array = function(a) {
        var b, c, d, e, f;
        for (c = new SelectParser,
        f = a.childNodes,
        d = 0,
        e = f.length; e > d; d++)
            b = f[d],
            c.add_node(b);
        return c.parsed
    }
    ,
    AbstractChosen = function() {
        function AbstractChosen(a, b) {
            this.form_field = a,
            this.options = null != b ? b : {},
            AbstractChosen.browser_is_supported() && (this.is_multiple = this.form_field.multiple,
            this.set_default_text(),
            this.set_default_values(),
            this.setup(),
            this.set_up_html(),
            this.register_observers(),
            this.on_ready())
        }
        return AbstractChosen.prototype.set_default_values = function() {
            var a = this;
            return this.click_test_action = function(b) {
                return a.test_active_click(b)
            }
            ,
            this.activate_action = function(b) {
                return a.activate_field(b)
            }
            ,
            this.active_field = !1,
            this.mouse_on_container = !1,
            this.results_showing = !1,
            this.result_highlighted = null,
            this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1,
            this.disable_search_threshold = this.options.disable_search_threshold || 0,
            this.disable_search = this.options.disable_search || !1,
            this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0,
            this.group_search = null != this.options.group_search ? this.options.group_search : !0,
            this.search_contains = this.options.search_contains || !1,
            this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0,
            this.max_selected_options = this.options.max_selected_options || 1 / 0,
            this.inherit_select_classes = this.options.inherit_select_classes || !1,
            this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0,
            this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0,
            this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1,
            this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY
        }
        ,
        AbstractChosen.prototype.set_default_text = function() {
            return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text,
            this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text
        }
        ,
        AbstractChosen.prototype.choice_label = function(a) {
            return this.include_group_label_in_selected && null != a.group_label ? "<b class='group-name'>" + a.group_label + "</b>" + a.html : a.html
        }
        ,
        AbstractChosen.prototype.mouse_enter = function() {
            return this.mouse_on_container = !0
        }
        ,
        AbstractChosen.prototype.mouse_leave = function() {
            return this.mouse_on_container = !1
        }
        ,
        AbstractChosen.prototype.input_focus = function(a) {
            var b = this;
            if (this.is_multiple) {
                if (!this.active_field)
                    return setTimeout(function() {
                        return b.container_mousedown()
                    }, 50)
            } else if (!this.active_field)
                return this.activate_field()
        }
        ,
        AbstractChosen.prototype.input_blur = function(a) {
            var b = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1,
            setTimeout(function() {
                return b.blur_test()
            }, 100))
        }
        ,
        AbstractChosen.prototype.results_option_build = function(a) {
            var b, c, d, e, f, g, h;
            for (b = "",
            e = 0,
            h = this.results_data,
            f = 0,
            g = h.length; g > f && (c = h[f],
            d = "",
            d = c.group ? this.result_add_group(c) : this.result_add_option(c),
            "" !== d && (e++,
            b += d),
            (null != a ? a.first : void 0) && (c.selected && this.is_multiple ? this.choice_build(c) : c.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(c))),
            !(e >= this.max_shown_results)); f++)
                ;
            return b
        }
        ,
        AbstractChosen.prototype.result_add_option = function(a) {
            var b, c;
            return a.search_match && this.include_option_in_results(a) ? (b = [],
            a.disabled || a.selected && this.is_multiple || b.push("active-result"),
            !a.disabled || a.selected && this.is_multiple || b.push("disabled-result"),
            a.selected && b.push("result-selected"),
            null != a.group_array_index && b.push("group-option"),
            "" !== a.classes && b.push(a.classes),
            c = document.createElement("li"),
            c.className = b.join(" "),
            c.style.cssText = a.style,
            c.setAttribute("data-option-array-index", a.array_index),
            c.innerHTML = a.search_text,
            a.title && (c.title = a.title),
            this.outerHTML(c)) : ""
        }
        ,
        AbstractChosen.prototype.result_add_group = function(a) {
            var b, c;
            return (a.search_match || a.group_match) && a.active_options > 0 ? (b = [],
            b.push("group-result"),
            a.classes && b.push(a.classes),
            c = document.createElement("li"),
            c.className = b.join(" "),
            c.innerHTML = a.search_text,
            a.title && (c.title = a.title),
            this.outerHTML(c)) : ""
        }
        ,
        AbstractChosen.prototype.results_update_field = function() {
            return this.set_default_text(),
            this.is_multiple || this.results_reset_cleanup(),
            this.result_clear_highlight(),
            this.results_build(),
            this.results_showing ? this.winnow_results() : void 0
        }
        ,
        AbstractChosen.prototype.reset_single_select_options = function() {
            var a, b, c, d, e;
            for (d = this.results_data,
            e = [],
            b = 0,
            c = d.length; c > b; b++)
                a = d[b],
                a.selected ? e.push(a.selected = !1) : e.push(void 0);
            return e
        }
        ,
        AbstractChosen.prototype.results_toggle = function() {
            return this.results_showing ? this.results_hide() : this.results_show()
        }
        ,
        AbstractChosen.prototype.results_search = function(a) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }
        ,
        AbstractChosen.prototype.winnow_results = function() {
            var a, b, c, d, e, f, g, h, i, j, k, l;
            for (this.no_results_clear(),
            d = 0,
            f = this.get_search_text(),
            a = f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
            i = new RegExp(a,"i"),
            c = this.get_search_regex(a),
            l = this.results_data,
            j = 0,
            k = l.length; k > j; j++)
                b = l[j],
                b.search_match = !1,
                e = null,
                this.include_option_in_results(b) && (b.group && (b.group_match = !1,
                b.active_options = 0),
                null != b.group_array_index && this.results_data[b.group_array_index] && (e = this.results_data[b.group_array_index],
                0 === e.active_options && e.search_match && (d += 1),
                e.active_options += 1),
                b.search_text = b.group ? b.label : b.html,
                (!b.group || this.group_search) && (b.search_match = this.search_string_match(b.search_text, c),
                b.search_match && !b.group && (d += 1),
                b.search_match ? (f.length && (g = b.search_text.search(i),
                h = b.search_text.substr(0, g + f.length) + "</em>" + b.search_text.substr(g + f.length),
                b.search_text = h.substr(0, g) + "<em>" + h.substr(g)),
                null != e && (e.group_match = !0)) : null != b.group_array_index && this.results_data[b.group_array_index].search_match && (b.search_match = !0)));
            return this.result_clear_highlight(),
            1 > d && f.length ? (this.update_results_content(""),
            this.no_results(f)) : (this.update_results_content(this.results_option_build()),
            this.winnow_results_set_highlight())
        }
        ,
        AbstractChosen.prototype.get_search_regex = function(a) {
            var b;
            return b = this.search_contains ? "" : "^",
            new RegExp(b + a,"i")
        }
        ,
        AbstractChosen.prototype.search_string_match = function(a, b) {
            var c, d, e, f;
            if (b.test(a))
                return !0;
            if (this.enable_split_word_search && (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) && (d = a.replace(/\[|\]/g, "").split(" "),
            d.length))
                for (e = 0,
                f = d.length; f > e; e++)
                    if (c = d[e],
                    b.test(c))
                        return !0
        }
        ,
        AbstractChosen.prototype.choices_count = function() {
            var a, b, c, d;
            if (null != this.selected_option_count)
                return this.selected_option_count;
            for (this.selected_option_count = 0,
            d = this.form_field.options,
            b = 0,
            c = d.length; c > b; b++)
                a = d[b],
                a.selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }
        ,
        AbstractChosen.prototype.choices_click = function(a) {
            return a.preventDefault(),
            this.results_showing || this.is_disabled ? void 0 : this.results_show()
        }
        ,
        AbstractChosen.prototype.keyup_checker = function(a) {
            var b, c;
            switch (b = null != (c = a.which) ? c : a.keyCode,
            this.search_field_scale(),
            b) {
            case 8:
                if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)
                    return this.keydown_backstroke();
                if (!this.pending_backstroke)
                    return this.result_clear_highlight(),
                    this.results_search();
                break;
            case 13:
                if (a.preventDefault(),
                this.results_showing)
                    return this.result_select(a);
                break;
            case 27:
                return this.results_showing && this.results_hide(),
                !0;
            case 9:
            case 38:
            case 40:
            case 16:
            case 91:
            case 17:
            case 18:
                break;
            default:
                return this.results_search()
            }
        }
        ,
        AbstractChosen.prototype.clipboard_event_checker = function(a) {
            var b = this;
            return setTimeout(function() {
                return b.results_search()
            }, 50)
        }
        ,
        AbstractChosen.prototype.container_width = function() {
            return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
        }
        ,
        AbstractChosen.prototype.include_option_in_results = function(a) {
            return this.is_multiple && !this.display_selected_options && a.selected ? !1 : !this.display_disabled_options && a.disabled ? !1 : a.empty ? !1 : !0
        }
        ,
        AbstractChosen.prototype.search_results_touchstart = function(a) {
            return this.touch_started = !0,
            this.search_results_mouseover(a)
        }
        ,
        AbstractChosen.prototype.search_results_touchmove = function(a) {
            return this.touch_started = !1,
            this.search_results_mouseout(a)
        }
        ,
        AbstractChosen.prototype.search_results_touchend = function(a) {
            return this.touch_started ? this.search_results_mouseup(a) : void 0
        }
        ,
        AbstractChosen.prototype.outerHTML = function(a) {
            var b;
            return a.outerHTML ? a.outerHTML : (b = document.createElement("div"),
            b.appendChild(a),
            b.innerHTML)
        }
        ,
        AbstractChosen.browser_is_supported = function() {
            return /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : /IEMobile/i.test(window.navigator.userAgent) ? !1 : /Windows Phone/i.test(window.navigator.userAgent) ? !1 : /BlackBerry/i.test(window.navigator.userAgent) ? !1 : /BB10/i.test(window.navigator.userAgent) ? !1 : "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : !0
        }
        ,
        AbstractChosen.default_multiple_text = "Select Some Options",
        AbstractChosen.default_single_text = "Select an Option",
        AbstractChosen.default_no_result_text = "No results match",
        AbstractChosen
    }(),
    a = jQuery,
    a.fn.extend({
        chosen: function(b) {
            return AbstractChosen.browser_is_supported() ? this.each(function(c) {
                var d, e;
                return d = a(this),
                e = d.data("chosen"),
                "destroy" === b ? void (e instanceof Chosen && e.destroy()) : void (e instanceof Chosen || d.data("chosen", new Chosen(this,b)))
            }) : this
        }
    }),
    Chosen = function(c) {
        function Chosen() {
            return b = Chosen.__super__.constructor.apply(this, arguments)
        }
        return d(Chosen, c),
        Chosen.prototype.setup = function() {
            return this.form_field_jq = a(this.form_field),
            this.current_selectedIndex = this.form_field.selectedIndex,
            this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        }
        ,
        Chosen.prototype.set_up_html = function() {
            var b, c;
            return b = ["chosen-container"],
            b.push("chosen-container-" + (this.is_multiple ? "multi" : "single")),
            this.inherit_select_classes && this.form_field.className && b.push(this.form_field.className),
            this.is_rtl && b.push("chosen-rtl"),
            c = {
                "class": b.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            },
            this.form_field.id.length && (c.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"),
            this.container = a("<div />", c),
            this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),
            this.form_field_jq.hide().after(this.container),
            this.dropdown = this.container.find("div.chosen-drop").first(),
            this.search_field = this.container.find("input").first(),
            this.search_results = this.container.find("ul.chosen-results").first(),
            this.search_field_scale(),
            this.search_no_results = this.container.find("li.no-results").first(),
            this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(),
            this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(),
            this.selected_item = this.container.find(".chosen-single").first()),
            this.results_build(),
            this.set_tab_index(),
            this.set_label_behavior()
        }
        ,
        Chosen.prototype.on_ready = function() {
            return this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            })
        }
        ,
        Chosen.prototype.register_observers = function() {
            var a = this;
            return this.container.bind("touchstart.chosen", function(b) {
                return a.container_mousedown(b),
                b.preventDefault()
            }),
            this.container.bind("touchend.chosen", function(b) {
                return a.container_mouseup(b),
                b.preventDefault()
            }),
            this.container.bind("mousedown.chosen", function(b) {
                a.container_mousedown(b)
            }),
            this.container.bind("mouseup.chosen", function(b) {
                a.container_mouseup(b)
            }),
            this.container.bind("mouseenter.chosen", function(b) {
                a.mouse_enter(b)
            }),
            this.container.bind("mouseleave.chosen", function(b) {
                a.mouse_leave(b)
            }),
            this.search_results.bind("mouseup.chosen", function(b) {
                a.search_results_mouseup(b)
            }),
            this.search_results.bind("mouseover.chosen", function(b) {
                a.search_results_mouseover(b)
            }),
            this.search_results.bind("mouseout.chosen", function(b) {
                a.search_results_mouseout(b)
            }),
            this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function(b) {
                a.search_results_mousewheel(b)
            }),
            this.search_results.bind("touchstart.chosen", function(b) {
                a.search_results_touchstart(b)
            }),
            this.search_results.bind("touchmove.chosen", function(b) {
                a.search_results_touchmove(b)
            }),
            this.search_results.bind("touchend.chosen", function(b) {
                a.search_results_touchend(b)
            }),
            this.form_field_jq.bind("chosen:updated.chosen", function(b) {
                a.results_update_field(b)
            }),
            this.form_field_jq.bind("chosen:activate.chosen", function(b) {
                a.activate_field(b)
            }),
            this.form_field_jq.bind("chosen:open.chosen", function(b) {
                a.container_mousedown(b)
            }),
            this.form_field_jq.bind("chosen:close.chosen", function(b) {
                a.input_blur(b)
            }),
            this.search_field.bind("blur.chosen", function(b) {
                a.input_blur(b)
            }),
            this.search_field.bind("keyup.chosen", function(b) {
                a.keyup_checker(b)
            }),
            this.search_field.bind("keydown.chosen", function(b) {
                a.keydown_checker(b)
            }),
            this.search_field.bind("focus.chosen", function(b) {
                a.input_focus(b)
            }),
            this.search_field.bind("cut.chosen", function(b) {
                a.clipboard_event_checker(b)
            }),
            this.search_field.bind("paste.chosen", function(b) {
                a.clipboard_event_checker(b)
            }),
            this.is_multiple ? this.search_choices.bind("click.chosen", function(b) {
                a.choices_click(b)
            }) : this.container.bind("click.chosen", function(a) {
                a.preventDefault()
            })
        }
        ,
        Chosen.prototype.destroy = function() {
            return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action),
            this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex),
            this.container.remove(),
            this.form_field_jq.removeData("chosen"),
            this.form_field_jq.show()
        }
        ,
        Chosen.prototype.search_field_disabled = function() {
            return this.is_disabled = this.form_field_jq[0].disabled,
            this.is_disabled ? (this.container.addClass("chosen-disabled"),
            this.search_field[0].disabled = !0,
            this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action),
            this.close_field()) : (this.container.removeClass("chosen-disabled"),
            this.search_field[0].disabled = !1,
            this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
        }
        ,
        Chosen.prototype.container_mousedown = function(b) {
            return this.is_disabled || (b && "mousedown" === b.type && !this.results_showing && b.preventDefault(),
            null != b && a(b.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !b || a(b.target)[0] !== this.selected_item[0] && !a(b.target).parents("a.chosen-single").length || (b.preventDefault(),
            this.results_toggle()) : (this.is_multiple && this.search_field.val(""),
            a(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action),
            this.results_show()),
            this.activate_field())
        }
        ,
        Chosen.prototype.container_mouseup = function(a) {
            return "ABBR" !== a.target.nodeName || this.is_disabled ? void 0 : this.results_reset(a)
        }
        ,
        Chosen.prototype.search_results_mousewheel = function(a) {
            var b;
            return a.originalEvent && (b = a.originalEvent.deltaY || -a.originalEvent.wheelDelta || a.originalEvent.detail),
            null != b ? (a.preventDefault(),
            "DOMMouseScroll" === a.type && (b = 40 * b),
            this.search_results.scrollTop(b + this.search_results.scrollTop())) : void 0
        }
        ,
        Chosen.prototype.blur_test = function(a) {
            return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        }
        ,
        Chosen.prototype.close_field = function() {
            return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action),
            this.active_field = !1,
            this.results_hide(),
            this.container.removeClass("chosen-container-active"),
            this.clear_backstroke(),
            this.show_search_field_default(),
            this.search_field_scale()
        }
        ,
        Chosen.prototype.activate_field = function() {
            return this.container.addClass("chosen-container-active"),
            this.active_field = !0,
            this.search_field.val(this.search_field.val()),
            this.search_field.focus()
        }
        ,
        Chosen.prototype.test_active_click = function(b) {
            var c;
            return c = a(b.target).closest(".chosen-container"),
            c.length && this.container[0] === c[0] ? this.active_field = !0 : this.close_field()
        }
        ,
        Chosen.prototype.results_build = function() {
            return this.parsing = !0,
            this.selected_option_count = null,
            this.results_data = SelectParser.select_to_array(this.form_field),
            this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(),
            this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0,
            this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1,
            this.container.removeClass("chosen-container-single-nosearch"))),
            this.update_results_content(this.results_option_build({
                first: !0
            })),
            this.search_field_disabled(),
            this.show_search_field_default(),
            this.search_field_scale(),
            this.parsing = !1
        }
        ,
        Chosen.prototype.result_do_highlight = function(a) {
            var b, c, d, e, f;
            if (a.length) {
                if (this.result_clear_highlight(),
                this.result_highlight = a,
                this.result_highlight.addClass("highlighted"),
                d = parseInt(this.search_results.css("maxHeight"), 10),
                f = this.search_results.scrollTop(),
                e = d + f,
                c = this.result_highlight.position().top + this.search_results.scrollTop(),
                b = c + this.result_highlight.outerHeight(),
                b >= e)
                    return this.search_results.scrollTop(b - d > 0 ? b - d : 0);
                if (f > c)
                    return this.search_results.scrollTop(c)
            }
        }
        ,
        Chosen.prototype.result_clear_highlight = function() {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"),
            this.result_highlight = null
        }
        ,
        Chosen.prototype.results_show = function() {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }),
            !1) : (this.container.addClass("chosen-with-drop"),
            this.results_showing = !0,
            this.search_field.focus(),
            this.search_field.val(this.search_field.val()),
            this.winnow_results(),
            this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            }))
        }
        ,
        Chosen.prototype.update_results_content = function(a) {
            return this.search_results.html(a)
        }
        ,
        Chosen.prototype.results_hide = function() {
            return this.results_showing && (this.result_clear_highlight(),
            this.container.removeClass("chosen-with-drop"),
            this.form_field_jq.trigger("chosen:hiding_dropdown", {
                chosen: this
            })),
            this.results_showing = !1
        }
        ,
        Chosen.prototype.set_tab_index = function(a) {
            var b;
            return this.form_field.tabIndex ? (b = this.form_field.tabIndex,
            this.form_field.tabIndex = -1,
            this.search_field[0].tabIndex = b) : void 0
        }
        ,
        Chosen.prototype.set_label_behavior = function() {
            var b = this;
            return this.form_field_label = this.form_field_jq.parents("label"),
            !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = a("label[for='" + this.form_field.id + "']")),
            this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function(a) {
                return b.is_multiple ? b.container_mousedown(a) : b.activate_field()
            }) : void 0
        }
        ,
        Chosen.prototype.show_search_field_default = function() {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text),
            this.search_field.addClass("default")) : (this.search_field.val(""),
            this.search_field.removeClass("default"))
        }
        ,
        Chosen.prototype.search_results_mouseup = function(b) {
            var c;
            return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(),
            c.length ? (this.result_highlight = c,
            this.result_select(b),
            this.search_field.focus()) : void 0
        }
        ,
        Chosen.prototype.search_results_mouseover = function(b) {
            var c;
            return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(),
            c ? this.result_do_highlight(c) : void 0
        }
        ,
        Chosen.prototype.search_results_mouseout = function(b) {
            return a(b.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }
        ,
        Chosen.prototype.choice_build = function(b) {
            var c, d, e = this;
            return c = a("<li />", {
                "class": "search-choice"
            }).html("<span>" + this.choice_label(b) + "</span>"),
            b.disabled ? c.addClass("search-choice-disabled") : (d = a("<a />", {
                "class": "search-choice-close",
                "data-option-array-index": b.array_index
            }),
            d.bind("click.chosen", function(a) {
                return e.choice_destroy_link_click(a)
            }),
            c.append(d)),
            this.search_container.before(c)
        }
        ,
        Chosen.prototype.choice_destroy_link_click = function(b) {
            return b.preventDefault(),
            b.stopPropagation(),
            this.is_disabled ? void 0 : this.choice_destroy(a(b.target))
        }
        ,
        Chosen.prototype.choice_destroy = function(a) {
            return this.result_deselect(a[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(),
            this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(),
            a.parents("li").first().remove(),
            this.search_field_scale()) : void 0
        }
        ,
        Chosen.prototype.results_reset = function() {
            return this.reset_single_select_options(),
            this.form_field.options[0].selected = !0,
            this.single_set_selected_text(),
            this.show_search_field_default(),
            this.results_reset_cleanup(),
            this.form_field_jq.trigger("change"),
            this.active_field ? this.results_hide() : void 0
        }
        ,
        Chosen.prototype.results_reset_cleanup = function() {
            return this.current_selectedIndex = this.form_field.selectedIndex,
            this.selected_item.find("abbr").remove()
        }
        ,
        Chosen.prototype.result_select = function(a) {
            var b, c;
            return this.result_highlight ? (b = this.result_highlight,
            this.result_clear_highlight(),
            this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }),
            !1) : (this.is_multiple ? b.removeClass("active-result") : this.reset_single_select_options(),
            b.addClass("result-selected"),
            c = this.results_data[b[0].getAttribute("data-option-array-index")],
            c.selected = !0,
            this.form_field.options[c.options_index].selected = !0,
            this.selected_option_count = null,
            this.is_multiple ? this.choice_build(c) : this.single_set_selected_text(this.choice_label(c)),
            (a.metaKey || a.ctrlKey) && this.is_multiple || this.results_hide(),
            this.show_search_field_default(),
            (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {
                selected: this.form_field.options[c.options_index].value
            }),
            this.current_selectedIndex = this.form_field.selectedIndex,
            a.preventDefault(),
            this.search_field_scale())) : void 0
        }
        ,
        Chosen.prototype.single_set_selected_text = function(a) {
            return null == a && (a = this.default_text),
            a === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(),
            this.selected_item.removeClass("chosen-default")),
            this.selected_item.find("span").html(a)
        }
        ,
        Chosen.prototype.result_deselect = function(a) {
            var b;
            return b = this.results_data[a],
            this.form_field.options[b.options_index].disabled ? !1 : (b.selected = !1,
            this.form_field.options[b.options_index].selected = !1,
            this.selected_option_count = null,
            this.result_clear_highlight(),
            this.results_showing && this.winnow_results(),
            this.form_field_jq.trigger("change", {
                deselected: this.form_field.options[b.options_index].value
            }),
            this.search_field_scale(),
            !0)
        }
        ,
        Chosen.prototype.single_deselect_control_build = function() {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),
            this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        }
        ,
        Chosen.prototype.get_search_text = function() {
            return a("<div/>").text(a.trim(this.search_field.val())).html()
        }
        ,
        Chosen.prototype.winnow_results_set_highlight = function() {
            var a, b;
            return b = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"),
            a = b.length ? b.first() : this.search_results.find(".active-result").first(),
            null != a ? this.result_do_highlight(a) : void 0
        }
        ,
        Chosen.prototype.no_results = function(b) {
            var c;
            return c = a('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'),
            c.find("span").first().html(b),
            this.search_results.append(c),
            this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            })
        }
        ,
        Chosen.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove()
        }
        ,
        Chosen.prototype.keydown_arrow = function() {
            var a;
            return this.results_showing && this.result_highlight ? (a = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(a) : void 0 : this.results_show()
        }
        ,
        Chosen.prototype.keyup_arrow = function() {
            var a;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (a = this.result_highlight.prevAll("li.active-result"),
            a.length ? this.result_do_highlight(a.first()) : (this.choices_count() > 0 && this.results_hide(),
            this.result_clear_highlight())) : void 0 : this.results_show()
        }
        ,
        Chosen.prototype.keydown_backstroke = function() {
            var a;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()),
            this.clear_backstroke()) : (a = this.search_container.siblings("li.search-choice").last(),
            a.length && !a.hasClass("search-choice-disabled") ? (this.pending_backstroke = a,
            this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        }
        ,
        Chosen.prototype.clear_backstroke = function() {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"),
            this.pending_backstroke = null
        }
        ,
        Chosen.prototype.keydown_checker = function(a) {
            var b, c;
            switch (b = null != (c = a.which) ? c : a.keyCode,
            this.search_field_scale(),
            8 !== b && this.pending_backstroke && this.clear_backstroke(),
            b) {
            case 8:
                this.backstroke_length = this.search_field.val().length;
                break;
            case 9:
                this.results_showing && !this.is_multiple && this.result_select(a),
                this.mouse_on_container = !1;
                break;
            case 13:
                this.results_showing && a.preventDefault();
                break;
            case 32:
                this.disable_search && a.preventDefault();
                break;
            case 38:
                a.preventDefault(),
                this.keyup_arrow();
                break;
            case 40:
                a.preventDefault(),
                this.keydown_arrow()
            }
        }
        ,
        Chosen.prototype.search_field_scale = function() {
            var b, c, d, e, f, g, h, i, j;
            if (this.is_multiple) {
                for (d = 0,
                h = 0,
                f = "position:absolute; left: -1000px; top: -1000px; display:none;",
                g = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"],
                i = 0,
                j = g.length; j > i; i++)
                    e = g[i],
                    f += e + ":" + this.search_field.css(e) + ";";
                return b = a("<div />", {
                    style: f
                }),
                b.text(this.search_field.val()),
                a("body").append(b),
                h = b.width() + 25,
                b.remove(),
                c = this.container.outerWidth(),
                h > c - 10 && (h = c - 10),
                this.search_field.css({
                    width: h + "px"
                })
            }
        }
        ,
        Chosen
    }(AbstractChosen)
}
).call(this);
;/* @license GNU GPL v2 https://www.drupal.org/about/licensing */
(function($, Drupal, drupalSettings, once) {
    'use strict';
    if (typeof $ !== "undefined" && typeof $.trim === "undefined")
        $.trim = function(text) {
            if (text == null)
                return "";
            return String.prototype.trim.call(String(text));
        }
        ;
    $.fn.oldChosen = $.fn.chosen;
    $.fn.chosen = function(options) {
        var select = $(this)
          , is_creating_chosen = !!options;
        if (is_creating_chosen && select.css('position') === 'absolute')
            select.removeAttr('style');
        var ret = select.oldChosen(options);
        if (is_creating_chosen && select.css('display') === 'none') {
            select.attr('style', 'display:visible; position:absolute; width:0px; height: 0px; clip:rect(0,0,0,0)');
            select.attr('tabindex', -1);
        }
        return ret;
    }
    ;
    $(document).on('state:disabled', 'select', function(e) {
        $(e.target).trigger('chosen:updated');
    });
    Drupal.behaviors.chosen = {
        settings: {
            ignoreSelector: '#field-ui-field-storage-add-form select, #entity-form-display-edit-form select, #entity-view-display-edit-form select, .wysiwyg, .draggable select[name$="[weight]"], .draggable select[name$="[position]"], .locale-translate-filter-form select, .chosen-disable, .chosen-processed',
            optedInSelector: 'select.chosen-enable',
            selector: 'select:visible'
        },
        attach: function(context, settings) {
            this.settings = this.getSettings(settings);
            $(once('chosen', this.getElements(context))).each(function(i, element) {
                var $element = $(element);
                if ($element.parents('#drupal-modal').length)
                    $element.on('chosen:showing_dropdown', function(e) {
                        $element.next().find('.chosen-drop').css('position', 'static');
                        $element.trigger('dialogContentResize');
                    }).on('chosen:hiding_dropdown', function(e) {
                        $element.next().find('.chosen-drop').css('position', '');
                        $element.trigger('dialogContentResize');
                    });
                this.createChosen(element);
            }
            .bind(this));
        },
        createChosen: function(element) {
            var $element = $(element);
            var options = this.getElementOptions($element);
            $element.chosen(options);
            if (options.add_helper_buttons || $element.attr('chosen_add_helper_buttons'))
                if ($element.attr('multiple')) {
                    var $all = $('<button/>', {
                        type: 'button',
                        class: 'button chosen-helper-btn',
                        text: 'All',
                        click: function() {
                            $element.find('option').prop('selected', true);
                            $element.trigger('chosen:updated', true);
                        }
                    });
                    $element.parent().append($all);
                    var $none = $('<button/>', {
                        type: 'button',
                        class: 'button chosen-helper-btn',
                        text: 'None',
                        click: function() {
                            $element.find('option').prop('selected', false);
                            $element.trigger('chosen:updated', true);
                        }
                    });
                    $element.parent().append($none);
                }
        },
        filterElements: function(element) {
            var $element = $(element);
            if ($element.is(this.settings.ignoreSelector))
                return false;
            var minOptions = $element.attr('multiple') ? this.settings.minimum_multiple : this.settings.minimum_single;
            return !minOptions || $element.find('option').length >= minOptions;
        },
        getElements: function(context, selector) {
            var $context = $(context || document);
            var $elements = $context.find(selector || this.settings.selector);
            $elements = $elements.filter(function(i, element) {
                return this.filterElements(element);
            }
            .bind(this));
            $elements = $elements.add($context.find(this.settings.optedInSelector));
            return $elements;
        },
        getElementOptions: function(element) {
            var $element = $(element);
            var options = $.extend({}, this.settings.options);
            var dimension;
            var width;
            if (this.settings.minimum_width > 0) {
                if (this.settings.use_relative_width) {
                    dimension = '%';
                    width = ($element.width() / $element.parent().width() * 100).toPrecision(5);
                } else {
                    dimension = 'px';
                    width = $element.width();
                }
                if (width < this.settings.minimum_width)
                    options.width = this.settings.minimum_width + dimension;
                else
                    options.width = width + dimension;
            }
            var cardinality;
            if ($element.attr('multiple') && (cardinality = $element.data('cardinality')))
                options.max_selected_options = cardinality;
            return options;
        },
        getSettings: function(settings) {
            return $.extend(true, {}, this.settings, settings && settings.chosen || drupalSettings.chosen);
        }
    };
}
)(jQuery, Drupal, drupalSettings, once);
;/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function() {
    Drupal.behaviors.dataLayer = {
        langPrefixes: function langPrefixes() {
            var languages = Drupal.settings.dataLayer.languages
              , langList = [];
            for (var lang in languages)
                if (languages[lang].prefix !== '')
                    langList.push(languages[lang].prefix);
            return langList;
        },
        attach: function() {
            return;
        }
    };
}
)();
;( (Drupal, drupalSettings) => {
    Drupal.extlink = Drupal.extlink || {};
    Drupal.extlink.attach = (context, drupalSettings) => {
        if (typeof drupalSettings.data === 'undefined' || !drupalSettings.data.hasOwnProperty('extlink'))
            return;
        let extIconPlacement = 'append';
        if (drupalSettings.data.extlink.extIconPlacement && drupalSettings.data.extlink.extIconPlacement !== '0')
            extIconPlacement = drupalSettings.data.extlink.extIconPlacement;
        const pattern = /^(([^:]+?\.)*)([^.:]+)((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
        const host = window.location.host.replace(pattern, '$2$3$6');
        const subdomain = window.location.host.replace(host, '');
        let subdomains;
        if (drupalSettings.data.extlink.extSubdomains)
            subdomains = '([^/]*\\.)?';
        else if (subdomain === 'www.' || subdomain === '')
            subdomains = '(www\\.)?';
        else
            subdomains = subdomain.replace('.', '\\.');
        let whitelistedDomains = false;
        if (drupalSettings.data.extlink.whitelistedDomains) {
            whitelistedDomains = [];
            for (let i = 0; i < drupalSettings.data.extlink.whitelistedDomains.length; i++)
                whitelistedDomains.push(new RegExp(`^https?:\\/\\/${drupalSettings.data.extlink.whitelistedDomains[i].replace(/(\r\n|\n|\r)/gm, '')}.*$`,'i'));
        }
        const internalLink = new RegExp(`^https?://([^@]*@)?${subdomains}${host}`,'i');
        let extInclude = false;
        if (drupalSettings.data.extlink.extInclude)
            extInclude = new RegExp(drupalSettings.data.extlink.extInclude.replace(/\\/, '\\'),'i');
        let extExclude = false;
        if (drupalSettings.data.extlink.extExclude)
            extExclude = new RegExp(drupalSettings.data.extlink.extExclude.replace(/\\/, '\\'),'i');
        let extExcludeNoreferrer = false;
        if (drupalSettings.data.extlink.extExcludeNoreferrer)
            extExcludeNoreferrer = new RegExp(drupalSettings.data.extlink.extExcludeNoreferrer.replace(/\\/, '\\'),'i');
        let extCssExclude = false;
        if (drupalSettings.data.extlink.extCssExclude)
            extCssExclude = drupalSettings.data.extlink.extCssExclude;
        let extCssInclude = false;
        if (drupalSettings.data.extlink.extCssInclude)
            extCssInclude = drupalSettings.data.extlink.extCssInclude;
        let extCssExplicit = false;
        if (drupalSettings.data.extlink.extCssExplicit)
            extCssExplicit = drupalSettings.data.extlink.extCssExplicit;
        const externalLinks = [];
        const mailtoLinks = [];
        const telLinks = [];
        const extlinks = context.querySelectorAll('a:not([data-extlink]), area:not([data-extlink])');
        extlinks.forEach( (el) => {
            try {
                let url = '';
                if (typeof el.href === 'string')
                    url = el.href.toLowerCase();
                else {
                    if (typeof el.href === 'object')
                        url = el.href.baseVal;
                }
                const isExtCssIncluded = extCssInclude && (el.matches(extCssInclude) || el.closest(extCssInclude));
                if (url.indexOf('http') === 0 && ((!internalLink.test(url) && !(extExclude && extExclude.test(url))) || (extInclude && extInclude.test(url)) || isExtCssIncluded) && !(extCssExclude && el.matches(extCssExclude)) && !(extCssExclude && el.closest(extCssExclude)) && !(extCssExplicit && !el.closest(extCssExplicit))) {
                    let match = false;
                    if (!isExtCssIncluded && whitelistedDomains) {
                        for (let i = 0; i < whitelistedDomains.length; i++)
                            if (whitelistedDomains[i].test(url)) {
                                match = true;
                                break;
                            }
                    }
                    if (!match)
                        externalLinks.push(el);
                } else {
                    if (el.tagName !== 'AREA' && !(extCssExclude && el.closest(extCssExclude)) && !(extCssExplicit && !el.closest(extCssExplicit)))
                        if (url.indexOf('mailto:') === 0)
                            mailtoLinks.push(el);
                        else {
                            if (url.indexOf('tel:') === 0)
                                telLinks.push(el);
                        }
                }
            } catch (error) {
                return false;
            }
        }
        );
        const hasExtIcon = drupalSettings.data.extlink.extClass !== '0' && drupalSettings.data.extlink.extClass !== '';
        const hasAdditionalExtClasses = drupalSettings.data.extlink.extAdditionalLinkClasses !== '';
        Drupal.extlink.applyClassAndSpan(externalLinks, 'ext', hasExtIcon ? extIconPlacement : null);
        if (hasAdditionalExtClasses)
            Drupal.extlink.applyClassAndSpan(externalLinks, drupalSettings.data.extlink.extAdditionalLinkClasses, null);
        const hasMailtoClass = drupalSettings.data.extlink.mailtoClass !== '0' && drupalSettings.data.extlink.mailtoClass !== '';
        const hasAdditionalMailtoClasses = drupalSettings.data.extlink.extAdditionalMailtoClasses !== '';
        if (hasMailtoClass)
            Drupal.extlink.applyClassAndSpan(mailtoLinks, drupalSettings.data.extlink.mailtoClass, extIconPlacement);
        if (hasAdditionalMailtoClasses)
            Drupal.extlink.applyClassAndSpan(mailtoLinks, drupalSettings.data.extlink.extAdditionalMailtoClasses, null);
        const hasTelClass = drupalSettings.data.extlink.telClass !== '0' && drupalSettings.data.extlink.telClass !== '';
        const hasAdditionalTelClasses = drupalSettings.data.extlink.extAdditionalTelClasses !== '0' && drupalSettings.data.extlink.extAdditionalTelClasses !== '';
        if (hasTelClass)
            Drupal.extlink.applyClassAndSpan(telLinks, drupalSettings.data.extlink.telClass, extIconPlacement);
        if (hasAdditionalTelClasses)
            Drupal.extlink.applyClassAndSpan(mailtoLinks, drupalSettings.data.extlink.extAdditionalTelClasses, null);
        if (drupalSettings.data.extlink.extTarget) {
            externalLinks.forEach( (link, i) => {
                if (!(drupalSettings.data.extlink.extTargetNoOverride && link.matches('a[target]')))
                    externalLinks[i].setAttribute('target', '_blank');
            }
            );
            externalLinks.forEach( (link, i) => {
                const val = link.getAttribute('rel');
                if (val === null || typeof val === 'undefined') {
                    externalLinks[i].setAttribute('rel', 'noopener');
                    return;
                }
                if (val.indexOf('noopener') > -1)
                    if (val.indexOf('noopener') === -1)
                        externalLinks[i].setAttribute('rel', `${val} noopener`);
                    else {}
                else
                    externalLinks[i].setAttribute('rel', `${val} noopener`);
            }
            );
        }
        if (drupalSettings.data.extlink.extNofollow)
            externalLinks.forEach( (link, i) => {
                const val = link.getAttribute('rel');
                if (val === null || typeof val === 'undefined') {
                    externalLinks[i].setAttribute('rel', 'nofollow');
                    return;
                }
                let target = 'nofollow';
                if (drupalSettings.data.extlink.extFollowNoOverride)
                    target = 'follow';
                if (val.indexOf(target) === -1)
                    externalLinks[i].setAttribute('rel', `${val} nofollow`);
            }
            );
        if (drupalSettings.data.extlink.extTitleNoOverride === false)
            externalLinks.forEach( (link, i) => {
                const oldTitle = link.getAttribute('title');
                let newTitle = drupalSettings.data.extlink.extTarget ? drupalSettings.data.extlink.extTargetAppendNewWindowLabel : '';
                if (oldTitle !== null) {
                    if (Drupal.extlink.hasNewWindowText(oldTitle))
                        return;
                    newTitle = Drupal.extlink.combineLabels(oldTitle, newTitle);
                }
                if (newTitle)
                    externalLinks[i].setAttribute('title', newTitle);
            }
            );
        if (drupalSettings.data.extlink.extNoreferrer)
            externalLinks.forEach( (link, i) => {
                if (drupalSettings.data.extlink.extExcludeNoreferrer && extExcludeNoreferrer.test(link.getAttribute('href')))
                    return;
                const val = link.getAttribute('rel');
                if (val === null || typeof val === 'undefined') {
                    externalLinks[i].setAttribute('rel', 'noreferrer');
                    return;
                }
                externalLinks[i].setAttribute('rel', `${val} noreferrer`);
            }
            );
        Drupal.extlink = Drupal.extlink || {};
        Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || ( () => {
            if (drupalSettings.data.extlink.extAlert)
                return confirm(drupalSettings.data.extlink.extAlertText);
        }
        );
        const _that = this;
        Drupal.extlink.handleClick = function(event) {
            const shouldNavigate = Drupal.extlink.popupClickHandler.call(_that, event);
            if (typeof shouldNavigate !== 'undefined' && !shouldNavigate)
                event.preventDefault();
        }
        ;
        externalLinks.forEach( (val, i) => {
            externalLinks[i].removeEventListener('click', Drupal.extlink.handleClick);
            externalLinks[i].addEventListener('click', Drupal.extlink.handleClick);
        }
        );
    }
    ;
    Drupal.extlink.hasNewWindowText = function(label) {
        return label.toLowerCase().indexOf(Drupal.t('new window')) !== -1;
    }
    ;
    Drupal.extlink.combineLabels = function(labelA, labelB) {
        labelA = labelA || '';
        labelB = labelB || '';
        const labelANoParens = labelA.trim().replace('(', '').replace(')', '');
        const labelBNoParens = labelB.trim().replace('(', '').replace(')', '');
        if (labelA === labelANoParens) {
            if (labelB === labelBNoParens)
                return `${labelA}, ${labelB}`;
            return `${labelA} ${labelB}`;
        }
        if (labelB === labelBNoParens)
            return `${labelB} ${labelA}`;
        return `(${labelANoParens}, ${labelBNoParens})`;
    }
    ;
    Drupal.extlink.applyClassAndSpan = (links, className, iconPlacement) => {
        let linksToProcess;
        if (drupalSettings.data.extlink.extImgClass)
            linksToProcess = links;
        else
            linksToProcess = links.filter( (link) => {
                return link.querySelector('img, svg') === null;
            }
            );
        for (let i = 0; i < linksToProcess.length; i++) {
            if (className !== '0')
                linksToProcess[i].classList.add(className);
            if (className === drupalSettings.data.extlink.mailtoClass && drupalSettings.data.extlink.extAdditionalMailtoClasses)
                linksToProcess[i].classList.add(drupalSettings.data.extlink.extAdditionalMailtoClasses);
            else if (className === drupalSettings.data.extlink.telClass && drupalSettings.data.extlink.extAdditionalTelClasses)
                linksToProcess[i].classList.add(drupalSettings.data.extlink.extAdditionalTelClasses);
            else {
                if (drupalSettings.data.extlink.extAdditionalLinkClasses)
                    linksToProcess[i].classList.add(drupalSettings.data.extlink.extAdditionalLinkClasses);
            }
            linksToProcess[i].setAttribute('data-extlink', '');
            if (iconPlacement) {
                let link = linksToProcess[i];
                if (drupalSettings.data.extlink.extPreventOrphan && iconPlacement === 'append') {
                    let lastTextNode = link.lastChild;
                    let trailingWhitespace = null;
                    let parentNode = link;
                    while (lastTextNode)
                        if (lastTextNode.lastChild) {
                            parentNode = lastTextNode;
                            lastTextNode = lastTextNode.lastChild;
                        } else if (lastTextNode.nodeName === '#text' && parentNode.lastElementChild && lastTextNode.textContent.trim().length === 0) {
                            trailingWhitespace = lastTextNode;
                            parentNode = parentNode.lastElementChild;
                            lastTextNode = parentNode.lastChild;
                        } else
                            break;
                    if (lastTextNode && lastTextNode.nodeName === '#text' && lastTextNode.textContent.length > 0) {
                        const lastText = lastTextNode.textContent;
                        const lastWordRegex = new RegExp(/\S+\s*$/,'g');
                        const lastWord = lastText.match(lastWordRegex);
                        if (lastWord !== null) {
                            const breakPreventer = document.createElement('span');
                            breakPreventer.classList.add('extlink-nobreak');
                            breakPreventer.textContent = lastWord[0];
                            if (trailingWhitespace) {
                                trailingWhitespace.textContent = '';
                                breakPreventer.append(trailingWhitespace.textContent);
                            }
                            lastTextNode.textContent = lastText.substring(0, lastText.length - lastWord[0].length);
                            lastTextNode.parentNode.append(breakPreventer);
                            link = breakPreventer;
                        }
                    }
                }
                let iconElement;
                if (drupalSettings.data.extlink.extUseFontAwesome) {
                    iconElement = document.createElement('span');
                    iconElement.setAttribute('class', `fa-${className} extlink`);
                    if (className === drupalSettings.data.extlink.mailtoClass) {
                        if (drupalSettings.data.extlink.mailtoLabel)
                            link.ariaLabel = drupalSettings.data.extlink.mailtoLabel;
                        iconElement.innerHTML = Drupal.theme('extlink_fa_mailto', drupalSettings, iconPlacement);
                    } else if (className === drupalSettings.data.extlink.extClass) {
                        if (drupalSettings.data.extlink.extLabel)
                            link.ariaLabel = drupalSettings.data.extlink.extLabel;
                        iconElement.innerHTML = Drupal.theme('extlink_fa_extlink', drupalSettings, iconPlacement);
                    } else {
                        if (className === drupalSettings.data.extlink.telClass) {
                            if (drupalSettings.data.extlink.telLabel)
                                link.ariaLabel = drupalSettings.data.extlink.telLabel;
                            iconElement.innerHTML = Drupal.theme('extlink_fa_tel', drupalSettings, iconPlacement);
                        }
                    }
                } else {
                    iconElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    iconElement.setAttribute('focusable', 'false');
                    iconElement.classList.add(className);
                    iconElement.setAttribute('data-extlink-placement', iconPlacement);
                    if (className === drupalSettings.data.extlink.mailtoClass)
                        iconElement = Drupal.theme('extlink_mailto', iconElement, drupalSettings);
                    else if (className === drupalSettings.data.extlink.extClass)
                        iconElement = Drupal.theme('extlink_extlink', iconElement, drupalSettings);
                    else {
                        if (className === drupalSettings.data.extlink.telClass)
                            iconElement = Drupal.theme('extlink_tel', iconElement, drupalSettings);
                    }
                }
                iconElement.setAttribute('role', 'img');
                iconElement.setAttribute('aria-hidden', drupalSettings.data.extlink.extHideIcons);
                link[iconPlacement](iconElement);
            }
        }
    }
    ;
    Drupal.theme.extlink_fa_mailto = function(drupalSettings, iconPlacement) {
        return `<span class="${drupalSettings.data.extlink.extFaMailtoClasses}" data-extlink-placement="${iconPlacement}"></span>`;
    }
    ;
    Drupal.theme.extlink_fa_extlink = function(drupalSettings, iconPlacement) {
        return `<span class="${drupalSettings.data.extlink.extFaLinkClasses}" data-extlink-placement="${iconPlacement}"></span>`;
    }
    ;
    Drupal.theme.extlink_fa_tel = function(drupalSettings, iconPlacement) {
        return `<span class="${drupalSettings.data.extlink.extFaLinkClasses}" data-extlink-placement="${iconPlacement}"></span>`;
    }
    ;
    Drupal.theme.extlink_mailto = function(iconElement, drupalSettings) {
        iconElement.setAttribute('aria-label', drupalSettings.data.extlink.mailtoLabel);
        iconElement.setAttribute('viewBox', '0 10 70 20');
        iconElement.innerHTML = `<title>${drupalSettings.data.extlink.mailtoLabel}</title><path d="M56 14H8c-1.1 0-2 0.9-2 2v32c0 1.1 0.9 2 2 2h48c1.1 0 2-0.9 2-2V16C58 14.9 57.1 14 56 14zM50.5 18L32 33.4 13.5 18H50.5zM10 46V20.3l20.7 17.3C31.1 37.8 31.5 38 32 38s0.9-0.2 1.3-0.5L54 20.3V46H10z"/>`;
        return iconElement;
    }
    ;
    Drupal.theme.extlink_extlink = function(iconElement, drupalSettings) {
        iconElement.setAttribute('aria-label', drupalSettings.data.extlink.extLabel);
        iconElement.setAttribute('viewBox', '0 0 80 40');
        iconElement.innerHTML = `<title>${drupalSettings.data.extlink.extLabel}</title><path d="M48 26c-1.1 0-2 0.9-2 2v26H10V18h26c1.1 0 2-0.9 2-2s-0.9-2-2-2H8c-1.1 0-2 0.9-2 2v40c0 1.1 0.9 2 2 2h40c1.1 0 2-0.9 2-2V28C50 26.9 49.1 26 48 26z"/><path d="M56 6H44c-1.1 0-2 0.9-2 2s0.9 2 2 2h7.2L30.6 30.6c-0.8 0.8-0.8 2 0 2.8C31 33.8 31.5 34 32 34s1-0.2 1.4-0.6L54 12.8V20c0 1.1 0.9 2 2 2s2-0.9 2-2V8C58 6.9 57.1 6 56 6z"/>`;
        return iconElement;
    }
    ;
    Drupal.theme.extlink_tel = function(iconElement, drupalSettings) {
        iconElement.setAttribute('aria-label', drupalSettings.data.extlink.telLabel);
        iconElement.setAttribute('viewBox', '0 0 181.352 181.352');
        iconElement.innerHTML = `<title>${drupalSettings.data.extlink.telLabel}</title><path xmlns="http://www.w3.org/2000/svg" d="M169.393,167.37l-14.919,9.848c-9.604,6.614-50.531,14.049-106.211-53.404C-5.415,58.873,9.934,22.86,17.134,14.555L29.523,1.678c2.921-2.491,7.328-2.198,9.839,0.811l32.583,38.543l0.02,0.02c2.384,2.824,2.306,7.22-0.83,9.868v0.029l-14.44,10.415c-5.716,5.667-0.733,14.587,5.11,23.204l27.786,32.808c12.926,12.477,20.009,18.241,26.194,14.118l12.008-13.395c2.941-2.472,7.328-2.169,9.839,0.821l32.603,38.543v0.02C172.607,160.316,172.519,164.703,169.393,167.37z"/>`;
        return iconElement;
    }
    ;
    Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
    Drupal.behaviors.extlink.attach = (context, drupalSettings) => {
        if (typeof extlinkAttach === 'function')
            extlinkAttach(context);
        else
            Drupal.extlink.attach(context, drupalSettings);
    }
    ;
}
)(Drupal, drupalSettings);
;(function($, Drupal) {
    Drupal.theme.progressBar = function(id) {
        const escapedId = Drupal.checkPlain(id);
        return (`<div id="${escapedId}" class="progress" aria-live="polite">` + '<div class="progress__label">&nbsp;</div>' + '<div class="progress__track"><div class="progress__bar"></div></div>' + '<div class="progress__percentage"></div>' + '<div class="progress__description">&nbsp;</div>' + '</div>');
    }
    ;
    Drupal.ProgressBar = function(id, updateCallback, method, errorCallback) {
        this.id = id;
        this.method = method || 'GET';
        this.updateCallback = updateCallback;
        this.errorCallback = errorCallback;
        this.element = $(Drupal.theme('progressBar', id));
    }
    ;
    $.extend(Drupal.ProgressBar.prototype, {
        setProgress(percentage, message, label) {
            if (percentage >= 0 && percentage <= 100) {
                $(this.element).find('div.progress__bar').each(function() {
                    this.style.width = `${percentage}%`;
                });
                $(this.element).find('div.progress__percentage').html(`${percentage}%`);
            }
            $('div.progress__description', this.element).html(message);
            $('div.progress__label', this.element).html(label);
            if (this.updateCallback)
                this.updateCallback(percentage, message, this);
        },
        startMonitoring(uri, delay) {
            this.delay = delay;
            this.uri = uri;
            this.sendPing();
        },
        stopMonitoring() {
            clearTimeout(this.timer);
            this.uri = null;
        },
        sendPing() {
            if (this.timer)
                clearTimeout(this.timer);
            if (this.uri) {
                const pb = this;
                let uri = this.uri;
                if (!uri.includes('?'))
                    uri += '?';
                else
                    uri += '&';
                uri += '_format=json';
                $.ajax({
                    type: this.method,
                    url: uri,
                    data: '',
                    dataType: 'json',
                    success(progress) {
                        if (progress.status === 0) {
                            pb.displayError(progress.data);
                            return;
                        }
                        pb.setProgress(progress.percentage, progress.message, progress.label);
                        pb.timer = setTimeout( () => {
                            pb.sendPing();
                        }
                        , pb.delay);
                    },
                    error(xmlhttp) {
                        const e = new Drupal.AjaxError(xmlhttp,pb.uri);
                        pb.displayError(`<pre>${e.message}</pre>`);
                    }
                });
            }
        },
        displayError(string) {
            const error = $('<div class="messages messages--error"></div>').html(string);
            $(this.element).before(error).hide();
            if (this.errorCallback)
                this.errorCallback(this);
        }
    });
}
)(jQuery, Drupal);
;(function($, Drupal) {
    'use strict';
    Drupal.theme.progressBar = function(id) {
        return '<div class="progress-wrapper" aria-live="polite">' + '<div class="message"></div>' + '<div id ="' + id + '" class="progress progress-striped active">' + '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' + '<span class="percentage"></span>' + '</div>' + '</div>' + '<div class="progress-label"></div>' + '</div>';
    }
    ;
    $.extend(Drupal.ProgressBar.prototype, {
        setProgress: function(percentage, message, label) {
            if (percentage >= 0 && percentage <= 100) {
                $(this.element).find('.progress-bar').css('width', percentage + '%').attr('aria-valuenow', percentage);
                $(this.element).find('.percentage').html(percentage + '%');
            }
            if (message) {
                message = message.replace(/<br\/>&nbsp;|\s*$/, '');
                $('.message', this.element).html(message);
            }
            if (label)
                $('.progress-label', this.element).html(label);
            if (this.updateCallback)
                this.updateCallback(percentage, message, this);
        },
        displayError: function(string) {
            var error = $('<div class="alert alert-block alert-error"><button class="close" data-dismiss="alert">&times;</button><h4>' + Drupal.t('Error message') + '</h4></div>').append(string);
            $(this.element).before(error).hide();
            if (this.errorCallback)
                this.errorCallback(this);
        }
    });
}
)(jQuery, Drupal);
;/* @license MIT https://raw.githubusercontent.com/muicss/loadjs/4.3.0/LICENSE.txt */
loadjs = function() {
    var h = function() {}
      , o = {}
      , c = {}
      , f = {};
    function u(e, n) {
        if (e) {
            var t = f[e];
            if (c[e] = n,
            t)
                for (; t.length; )
                    t[0](e, n),
                    t.splice(0, 1)
        }
    }
    function l(e, n) {
        e.call && (e = {
            success: e
        }),
        n.length ? (e.error || h)(n) : (e.success || h)(e)
    }
    function p(t, r, i, s) {
        var o, e, u, n = document, c = i.async, f = (i.numRetries || 0) + 1, l = i.before || h, a = t.replace(/[\?|#].*$/, ""), d = t.replace(/^(css|img|module|nomodule)!/, "");
        if (s = s || 0,
        /(^css!|\.css$)/.test(a))
            (u = n.createElement("link")).rel = "stylesheet",
            u.href = d,
            (o = "hideFocus"in u) && u.relList && (o = 0,
            u.rel = "preload",
            u.as = "style");
        else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(a))
            (u = n.createElement("img")).src = d;
        else if ((u = n.createElement("script")).src = d,
        u.async = void 0 === c || c,
        e = "noModule"in u,
        /^module!/.test(a)) {
            if (!e)
                return r(t, "l");
            u.type = "module"
        } else if (/^nomodule!/.test(a) && e)
            return r(t, "l");
        !(u.onload = u.onerror = u.onbeforeload = function(e) {
            var n = e.type[0];
            if (o)
                try {
                    u.sheet.cssText.length || (n = "e")
                } catch (e) {
                    18 != e.code && (n = "e")
                }
            if ("e" == n) {
                if ((s += 1) < f)
                    return p(t, r, i, s)
            } else if ("preload" == u.rel && "style" == u.as)
                return u.rel = "stylesheet";
            r(t, n, e.defaultPrevented)
        }
        ) !== l(t, u) && n.head.appendChild(u)
    }
    function t(e, n, t) {
        var r, i;
        if (n && n.trim && (r = n),
        i = (r ? t : n) || {},
        r) {
            if (r in o)
                throw "LoadJS";
            o[r] = !0
        }
        function s(n, t) {
            !function(e, r, n) {
                var t, i, s = (e = e.push ? e : [e]).length, o = s, u = [];
                for (t = function(e, n, t) {
                    if ("e" == n && u.push(e),
                    "b" == n) {
                        if (!t)
                            return;
                        u.push(e)
                    }
                    --s || r(u)
                }
                ,
                i = 0; i < o; i++)
                    p(e[i], t, n)
            }(e, function(e) {
                l(i, e),
                n && l({
                    success: n,
                    error: t
                }, e),
                u(r, e)
            }, i)
        }
        if (i.returnPromise)
            return new Promise(s);
        s()
    }
    return t.ready = function(e, n) {
        return function(e, t) {
            e = e.push ? e : [e];
            var n, r, i, s = [], o = e.length, u = o;
            for (n = function(e, n) {
                n.length && s.push(e),
                --u || t(s)
            }
            ; o--; )
                r = e[o],
                (i = c[r]) ? n(r, i) : (f[r] = f[r] || []).push(n)
        }(e, function(e) {
            l(n, e)
        }),
        t
    }
    ,
    t.done = function(e) {
        u(e, [])
    }
    ,
    t.reset = function() {
        o = {},
        c = {},
        f = {}
    }
    ,
    t.isDefined = function(e) {
        return e in o
    }
    ,
    t
}();
;/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
Drupal.debounce = function(func, wait, immediate) {
    let timeout;
    let result;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate)
                result = func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            result = func.apply(context, args);
        return result;
    }
    ;
}
;
;(function(Drupal, debounce) {
    let liveElement;
    const announcements = [];
    Drupal.behaviors.drupalAnnounce = {
        attach(context) {
            if (!liveElement) {
                liveElement = document.createElement('div');
                liveElement.id = 'drupal-live-announce';
                liveElement.className = 'visually-hidden';
                liveElement.setAttribute('aria-live', 'polite');
                liveElement.setAttribute('aria-busy', 'false');
                document.body.appendChild(liveElement);
            }
        }
    };
    function announce() {
        const text = [];
        let priority = 'polite';
        let announcement;
        const il = announcements.length;
        for (let i = 0; i < il; i++) {
            announcement = announcements.pop();
            text.unshift(announcement.text);
            if (announcement.priority === 'assertive')
                priority = 'assertive';
        }
        if (text.length) {
            liveElement.innerHTML = '';
            liveElement.setAttribute('aria-busy', 'true');
            liveElement.setAttribute('aria-live', priority);
            liveElement.innerHTML = text.join('\n');
            liveElement.setAttribute('aria-busy', 'false');
        }
    }
    Drupal.announce = function(text, priority) {
        announcements.push({
            text,
            priority
        });
        return debounce(announce, 200)();
    }
    ;
}
)(Drupal, Drupal.debounce);
;( (Drupal) => {
    Drupal.Message = class {
        constructor(messageWrapper=null) {
            if (!messageWrapper)
                this.messageWrapper = Drupal.Message.defaultWrapper();
            else
                this.messageWrapper = messageWrapper;
        }
        static defaultWrapper() {
            let wrapper = document.querySelector('[data-drupal-messages]') || document.querySelector('[data-drupal-messages-fallback]');
            if (!wrapper) {
                wrapper = document.createElement('div');
                document.body.appendChild(wrapper);
            }
            if (wrapper.hasAttribute('data-drupal-messages-fallback')) {
                wrapper.removeAttribute('data-drupal-messages-fallback');
                wrapper.classList.remove('hidden');
            }
            wrapper.setAttribute('data-drupal-messages', '');
            return wrapper.innerHTML === '' ? Drupal.Message.messageInternalWrapper(wrapper) : wrapper.firstElementChild;
        }
        static getMessageTypeLabels() {
            return {
                status: Drupal.t('Status message'),
                error: Drupal.t('Error message'),
                warning: Drupal.t('Warning message')
            };
        }
        add(message, options={}) {
            if (!options.hasOwnProperty('type'))
                options.type = 'status';
            if (typeof message !== 'string')
                throw new Error('Message must be a string.');
            Drupal.Message.announce(message, options);
            options.id = options.id ? String(options.id) : `${options.type}-${Math.random().toFixed(15).replace('0.', '')}`;
            if (!Drupal.Message.getMessageTypeLabels().hasOwnProperty(options.type)) {
                const {type} = options;
                throw new Error(`The message type, ${type}, is not present in Drupal.Message.getMessageTypeLabels().`);
            }
            this.messageWrapper.appendChild(Drupal.theme('message', {
                text: message
            }, options));
            return options.id;
        }
        select(id) {
            return this.messageWrapper.querySelector(`[data-drupal-message-id^="${id}"]`);
        }
        remove(id) {
            return this.messageWrapper.removeChild(this.select(id));
        }
        clear() {
            Array.prototype.forEach.call(this.messageWrapper.querySelectorAll('[data-drupal-message-id]'), (message) => {
                this.messageWrapper.removeChild(message);
            }
            );
        }
        static announce(message, options) {
            if (!options.priority && (options.type === 'warning' || options.type === 'error'))
                options.priority = 'assertive';
            if (options.announce !== '')
                Drupal.announce(options.announce || message, options.priority);
        }
        static messageInternalWrapper(messageWrapper) {
            const innerWrapper = document.createElement('div');
            innerWrapper.setAttribute('class', 'messages__wrapper');
            messageWrapper.insertAdjacentElement('afterbegin', innerWrapper);
            return innerWrapper;
        }
    }
    ;
    Drupal.theme.message = ({text}, {type, id}) => {
        const messagesTypes = Drupal.Message.getMessageTypeLabels();
        const messageWrapper = document.createElement('div');
        messageWrapper.setAttribute('class', `messages messages--${type}`);
        messageWrapper.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
        messageWrapper.setAttribute('data-drupal-message-id', id);
        messageWrapper.setAttribute('data-drupal-message-type', type);
        messageWrapper.setAttribute('aria-label', messagesTypes[type]);
        messageWrapper.innerHTML = `${text}`;
        return messageWrapper;
    }
    ;
}
)(Drupal);
;(function($, Drupal) {
    Drupal.Message.getMessageTypeClass = function(type) {
        var classes = this.getMessageTypeClasses();
        return 'alert alert-' + (classes[type] || 'success');
    }
    ;
    Drupal.Message.getMessageTypeClasses = function() {
        return {
            status: 'success',
            error: 'danger',
            warning: 'warning',
            info: 'info'
        };
    }
    ;
    Drupal.Message.getMessageTypeLabel = function(type) {
        var labels = this.getMessageTypeLabels();
        return labels[type];
    }
    ;
    Drupal.Message.getMessageTypeLabels = function() {
        return {
            status: Drupal.t('Status message'),
            error: Drupal.t('Error message'),
            warning: Drupal.t('Warning message'),
            info: Drupal.t('Informative message')
        };
    }
    ;
    Drupal.Message.getMessageTypeRole = function(type) {
        var labels = this.getMessageTypeRoles();
        return labels[type];
    }
    ;
    Drupal.Message.getMessageTypeRoles = function() {
        return {
            status: 'status',
            error: 'alert',
            warning: 'alert',
            info: 'status'
        };
    }
    ;
    Drupal.theme.message = function(message, options) {
        options = options || {};
        var wrapper = Drupal.theme('messageWrapper', options.id || (new Date()).getTime(), options.type || 'status');
        if (options.dismissible === void 0 || !!options.dismissible) {
            wrapper.classList.add('alert-dismissible');
            wrapper.appendChild(Drupal.theme('messageClose'));
        }
        wrapper.appendChild(Drupal.theme('messageContents', message && message.text));
        return wrapper;
    }
    ;
    Drupal.theme.messageWrapper = function(id, type) {
        var wrapper = document.createElement('div');
        var label = Drupal.Message.getMessageTypeLabel(type);
        wrapper.setAttribute('class', Drupal.Message.getMessageTypeClass(type));
        wrapper.setAttribute('role', Drupal.Message.getMessageTypeRole(type));
        wrapper.setAttribute('aria-label', label);
        wrapper.setAttribute('data-drupal-message-id', id);
        wrapper.setAttribute('data-drupal-message-type', type);
        if (label)
            wrapper.appendChild(Drupal.theme('messageLabel', label));
        return wrapper;
    }
    ;
    Drupal.theme.messageClose = function() {
        var element = document.createElement('button');
        element.setAttribute('class', 'close');
        element.setAttribute('type', 'button');
        element.setAttribute('role', 'button');
        element.setAttribute('data-dismiss', 'alert');
        element.setAttribute('aria-label', Drupal.t('Close'));
        element.innerHTML = '<span aria-hidden="true">&times;</span>';
        return element;
    }
    ;
    Drupal.theme.messageLabel = function(label) {
        var element = document.createElement('h2');
        element.setAttribute('class', 'sr-only');
        element.innerHTML = label;
        return element;
    }
    ;
    Drupal.theme.messageContents = function(html) {
        var element = document.createElement('p');
        element.innerHTML = '' + html;
        return element;
    }
    ;
}
)(window.jQuery, window.Drupal);
;(function($, window, Drupal, drupalSettings, loadjs, {isFocusable, tabbable}) {
    Drupal.behaviors.AJAX = {
        attach(context, settings) {
            function loadAjaxBehavior(base) {
                const elementSettings = settings.ajax[base];
                if (typeof elementSettings.selector === 'undefined')
                    elementSettings.selector = `#${base}`;
                once('drupal-ajax', $(elementSettings.selector)).forEach( (el) => {
                    elementSettings.element = el;
                    elementSettings.base = base;
                    Drupal.ajax(elementSettings);
                }
                );
            }
            Object.keys(settings.ajax || {}).forEach(loadAjaxBehavior);
            Drupal.ajax.bindAjaxLinks(document.body);
            once('ajax', '.use-ajax-submit').forEach( (el) => {
                const elementSettings = {};
                elementSettings.url = $(el.form).attr('action');
                elementSettings.setClick = true;
                elementSettings.event = 'click';
                elementSettings.progress = {
                    type: 'throbber'
                };
                elementSettings.base = el.id;
                elementSettings.element = el;
                Drupal.ajax(elementSettings);
            }
            );
        },
        detach(context, settings, trigger) {
            if (trigger === 'unload')
                Drupal.ajax.expired().forEach( (instance) => {
                    Drupal.ajax.instances[instance.instanceIndex] = null;
                }
                );
        }
    };
    Drupal.AjaxError = function(xmlhttp, uri, customMessage) {
        let statusCode;
        let statusText;
        let responseText;
        if (xmlhttp.status)
            statusCode = `\n${Drupal.t('An AJAX HTTP error occurred.')}\n${Drupal.t('HTTP Result Code: !status', {
                '!status': xmlhttp.status
            })}`;
        else
            statusCode = `\n${Drupal.t('An AJAX HTTP request terminated abnormally.')}`;
        statusCode += `\n${Drupal.t('Debugging information follows.')}`;
        const pathText = `\n${Drupal.t('Path: !uri', {
            '!uri': uri
        })}`;
        statusText = '';
        try {
            statusText = `\n${Drupal.t('StatusText: !statusText', {
                '!statusText': xmlhttp.statusText.trim()
            })}`;
        } catch (e) {}
        responseText = '';
        try {
            responseText = `\n${Drupal.t('ResponseText: !responseText', {
                '!responseText': xmlhttp.responseText.trim()
            })}`;
        } catch (e) {}
        responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
        responseText = responseText.replace(/[\n]+\s+/g, '\n');
        const readyStateText = xmlhttp.status === 0 ? `\n${Drupal.t('ReadyState: !readyState', {
            '!readyState': xmlhttp.readyState
        })}` : '';
        customMessage = customMessage ? `\n${Drupal.t('CustomMessage: !customMessage', {
            '!customMessage': customMessage
        })}` : '';
        this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
        this.name = 'AjaxError';
        if (!Drupal.AjaxError.messages)
            Drupal.AjaxError.messages = new Drupal.Message();
        Drupal.AjaxError.messages.add(Drupal.t("Oops, something went wrong. Check your browser's developer console for more details."), {
            type: 'error'
        });
    }
    ;
    Drupal.AjaxError.prototype = new Error();
    Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;
    Drupal.ajax = function(settings) {
        if (arguments.length !== 1)
            throw new Error('Drupal.ajax() function must be called with one configuration object only');
        const base = settings.base || false;
        const element = settings.element || false;
        delete settings.base;
        delete settings.element;
        if (!settings.progress && !element)
            settings.progress = false;
        const ajax = new Drupal.Ajax(base,element,settings);
        ajax.instanceIndex = Drupal.ajax.instances.length;
        Drupal.ajax.instances.push(ajax);
        return ajax;
    }
    ;
    Drupal.ajax.instances = [];
    Drupal.ajax.expired = function() {
        return Drupal.ajax.instances.filter( (instance) => instance && instance.element !== false && !document.body.contains(instance.element));
    }
    ;
    Drupal.ajax.bindAjaxLinks = (element) => {
        once('ajax', '.use-ajax', element).forEach( (ajaxLink) => {
            const $linkElement = $(ajaxLink);
            const elementSettings = {
                progress: {
                    type: 'throbber'
                },
                dialogType: $linkElement.data('dialog-type'),
                dialog: $linkElement.data('dialog-options'),
                dialogRenderer: $linkElement.data('dialog-renderer'),
                base: $linkElement.attr('id'),
                element: ajaxLink
            };
            const href = $linkElement.attr('href');
            if (href) {
                elementSettings.url = href;
                elementSettings.event = 'click';
            }
            const httpMethod = $linkElement.data('ajax-http-method');
            if (httpMethod)
                elementSettings.httpMethod = httpMethod;
            Drupal.ajax(elementSettings);
        }
        );
    }
    ;
    Drupal.Ajax = function(base, element, elementSettings) {
        const defaults = {
            httpMethod: 'POST',
            event: element ? 'mousedown' : null,
            keypress: true,
            selector: base ? `#${base}` : null,
            effect: 'none',
            speed: 'none',
            method: 'replaceWith',
            progress: {
                type: 'throbber',
                message: Drupal.t('Processing...')
            },
            submit: {
                js: true
            }
        };
        $.extend(this, defaults, elementSettings);
        this.commands = new Drupal.AjaxCommands();
        this.instanceIndex = false;
        if (this.wrapper)
            this.wrapper = `#${this.wrapper}`;
        this.element = element;
        this.preCommandsFocusedElementSelector = null;
        this.elementSettings = elementSettings;
        if (this.element && this.element.form)
            this.$form = $(this.element.form);
        if (!this.url) {
            const $element = $(this.element);
            if (this.element.tagName === 'A')
                this.url = $element.attr('href');
            else {
                if (this.element && element.form)
                    this.url = this.$form.attr('action');
            }
        }
        const originalUrl = this.url;
        this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');
        if (drupalSettings.ajaxTrustedUrl[originalUrl])
            drupalSettings.ajaxTrustedUrl[this.url] = true;
        const ajax = this;
        ajax.options = {
            url: ajax.url,
            data: ajax.submit,
            isInProgress() {
                return ajax.ajaxing;
            },
            beforeSerialize(elementSettings, options) {
                return ajax.beforeSerialize(elementSettings, options);
            },
            beforeSubmit(formValues, elementSettings, options) {
                ajax.ajaxing = true;
                ajax.preCommandsFocusedElementSelector = null;
                return ajax.beforeSubmit(formValues, elementSettings, options);
            },
            beforeSend(xmlhttprequest, options) {
                ajax.ajaxing = true;
                return ajax.beforeSend(xmlhttprequest, options);
            },
            success(response, status, xmlhttprequest) {
                ajax.preCommandsFocusedElementSelector = document.activeElement.getAttribute('data-drupal-selector');
                if (typeof response === 'string')
                    response = $.parseJSON(response);
                if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url])
                    if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
                        const customMessage = Drupal.t('The response failed verification so will not be processed.');
                        return ajax.error(xmlhttprequest, ajax.url, customMessage);
                    }
                return (Promise.resolve(ajax.success(response, status)).then( () => {
                    ajax.ajaxing = false;
                    $(document).trigger('ajaxSuccess', [xmlhttprequest, this]);
                    $(document).trigger('ajaxComplete', [xmlhttprequest, this]);
                    if (--$.active === 0)
                        $(document).trigger('ajaxStop');
                }
                ));
            },
            error(xmlhttprequest, status, error) {
                ajax.ajaxing = false;
            },
            complete(xmlhttprequest, status) {
                if (status === 'error' || status === 'parsererror')
                    return ajax.error(xmlhttprequest, ajax.url);
            },
            dataType: 'json',
            jsonp: false,
            method: ajax.httpMethod
        };
        if (elementSettings.dialog)
            ajax.options.data.dialogOptions = elementSettings.dialog;
        if (!ajax.options.url.includes('?'))
            ajax.options.url += '?';
        else
            ajax.options.url += '&';
        let wrapper = `drupal_${elementSettings.dialogType || 'ajax'}`;
        if (elementSettings.dialogRenderer)
            wrapper += `.${elementSettings.dialogRenderer}`;
        ajax.options.url += `${Drupal.ajax.WRAPPER_FORMAT}=${wrapper}`;
        $(ajax.element).on(elementSettings.event, function(event) {
            if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url))
                throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
                    '!url': ajax.url
                }));
            return ajax.eventResponse(this, event);
        });
        if (elementSettings.keypress)
            $(ajax.element).on('keypress', function(event) {
                return ajax.keypressResponse(this, event);
            });
        if (elementSettings.prevent)
            $(ajax.element).on(elementSettings.prevent, false);
    }
    ;
    Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';
    Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';
    Drupal.Ajax.prototype.execute = function() {
        if (this.ajaxing)
            return;
        try {
            this.beforeSerialize(this.element, this.options);
            return $.ajax(this.options);
        } catch (e) {
            this.ajaxing = false;
            window.alert(`An error occurred while attempting to process ${this.options.url}: ${e.message}`);
            return $.Deferred().reject();
        }
    }
    ;
    Drupal.Ajax.prototype.keypressResponse = function(element, event) {
        const ajax = this;
        if (event.which === 13 || (event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number')) {
            event.preventDefault();
            event.stopPropagation();
            $(element).trigger(ajax.elementSettings.event);
        }
    }
    ;
    Drupal.Ajax.prototype.eventResponse = function(element, event) {
        event.preventDefault();
        event.stopPropagation();
        const ajax = this;
        if (ajax.ajaxing)
            return;
        try {
            if (ajax.$form) {
                if (ajax.setClick)
                    element.form.clk = element;
                ajax.$form.ajaxSubmit(ajax.options);
            } else {
                ajax.beforeSerialize(ajax.element, ajax.options);
                $.ajax(ajax.options);
            }
        } catch (e) {
            ajax.ajaxing = false;
            window.alert(`An error occurred while attempting to process ${ajax.options.url}: ${e.message}`);
        }
    }
    ;
    Drupal.Ajax.prototype.beforeSerialize = function(element, options) {
        if (this.$form && document.body.contains(this.$form.get(0))) {
            const settings = this.settings || drupalSettings;
            Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize');
        }
        options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;
        const pageState = drupalSettings.ajaxPageState;
        options.data['ajax_page_state[theme]'] = pageState.theme;
        options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
        options.data['ajax_page_state[libraries]'] = pageState.libraries;
    }
    ;
    Drupal.Ajax.prototype.beforeSubmit = function(formValues, element, options) {}
    ;
    Drupal.Ajax.prototype.beforeSend = function(xmlhttprequest, options) {
        if (this.$form) {
            options.extraData = options.extraData || {};
            options.extraData.ajax_iframe_upload = '1';
            const v = $.fieldValue(this.element);
            if (v !== null)
                options.extraData[this.element.name] = v;
        }
        $(this.element).prop('disabled', true);
        if (!this.progress || !this.progress.type)
            return;
        const progressIndicatorMethod = `setProgressIndicator${this.progress.type.slice(0, 1).toUpperCase()}${this.progress.type.slice(1).toLowerCase()}`;
        if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function')
            this[progressIndicatorMethod].call(this);
    }
    ;
    Drupal.theme.ajaxProgressThrobber = (message) => {
        const messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '';
        const throbber = '<div class="throbber">&nbsp;</div>';
        return `<div class="ajax-progress ajax-progress-throbber">${throbber}${messageMarkup}</div>`;
    }
    ;
    Drupal.theme.ajaxProgressIndicatorFullscreen = () => '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
    Drupal.theme.ajaxProgressMessage = (message) => `<div class="message">${message}</div>`;
    Drupal.theme.ajaxProgressBar = ($element) => $('<div class="ajax-progress ajax-progress-bar"></div>').append($element);
    Drupal.Ajax.prototype.setProgressIndicatorBar = function() {
        const progressBar = new Drupal.ProgressBar(`ajax-progress-${this.element.id}`,$.noop,this.progress.method,$.noop);
        if (this.progress.message)
            progressBar.setProgress(-1, this.progress.message);
        if (this.progress.url)
            progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
        this.progress.element = $(Drupal.theme('ajaxProgressBar', progressBar.element));
        this.progress.object = progressBar;
        $(this.element).after(this.progress.element);
    }
    ;
    Drupal.Ajax.prototype.setProgressIndicatorThrobber = function() {
        this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
        if ($(this.element).closest('[data-drupal-ajax-container]').length)
            $(this.element).closest('[data-drupal-ajax-container]').after(this.progress.element);
        else
            $(this.element).after(this.progress.element);
    }
    ;
    Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function() {
        this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
        $('body').append(this.progress.element);
    }
    ;
    Drupal.Ajax.prototype.commandExecutionQueue = function(response, status) {
        const ajaxCommands = this.commands;
        return Object.keys(response || {}).reduce( (executionQueue, key) => executionQueue.then( () => {
            const {command} = response[key];
            if (command && ajaxCommands[command])
                return ajaxCommands[command](this, response[key], status);
        }
        ), Promise.resolve());
    }
    ;
    Drupal.Ajax.prototype.success = function(response, status) {
        if (this.progress.element)
            $(this.progress.element).remove();
        if (this.progress.object)
            this.progress.object.stopMonitoring();
        $(this.element).prop('disabled', false);
        const elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray();
        const focusChanged = Object.keys(response || {}).some( (key) => {
            const {command, method} = response[key];
            return (command === 'focusFirst' || command === 'openDialog' || (command === 'invoke' && method === 'focus'));
        }
        );
        return (this.commandExecutionQueue(response, status).then( () => {
            if (!focusChanged) {
                let target = false;
                if (this.element) {
                    if ($(this.element).data('refocus-blur') && this.preCommandsFocusedElementSelector)
                        target = document.querySelector(`[data-drupal-selector="${this.preCommandsFocusedElementSelector}"]`);
                    if (!target && !$(this.element).data('disable-refocus')) {
                        for (let n = elementParents.length - 1; !target && n >= 0; n--)
                            target = document.querySelector(`[data-drupal-selector="${elementParents[n].getAttribute('data-drupal-selector')}"]`);
                    }
                }
                if (target)
                    $(target).trigger('focus');
            }
            if (this.$form && document.body.contains(this.$form.get(0))) {
                const settings = this.settings || drupalSettings;
                Drupal.attachBehaviors(this.$form.get(0), settings);
            }
            this.settings = null;
        }
        ).catch( (error) => console.error(Drupal.t('An error occurred during the execution of the Ajax response: !error', {
            '!error': error
        }))));
    }
    ;
    Drupal.Ajax.prototype.getEffect = function(response) {
        const type = response.effect || this.effect;
        const speed = response.speed || this.speed;
        const effect = {};
        if (type === 'none') {
            effect.showEffect = 'show';
            effect.hideEffect = 'hide';
            effect.showSpeed = '';
        } else if (type === 'fade') {
            effect.showEffect = 'fadeIn';
            effect.hideEffect = 'fadeOut';
            effect.showSpeed = speed;
        } else {
            effect.showEffect = `${type}Toggle`;
            effect.hideEffect = `${type}Toggle`;
            effect.showSpeed = speed;
        }
        return effect;
    }
    ;
    Drupal.Ajax.prototype.error = function(xmlhttprequest, uri, customMessage) {
        if (this.progress.element)
            $(this.progress.element).remove();
        if (this.progress.object)
            this.progress.object.stopMonitoring();
        $(this.wrapper).show();
        $(this.element).prop('disabled', false);
        if (this.$form && document.body.contains(this.$form.get(0))) {
            const settings = this.settings || drupalSettings;
            Drupal.attachBehaviors(this.$form.get(0), settings);
        }
        throw new Drupal.AjaxError(xmlhttprequest,uri,customMessage);
    }
    ;
    Drupal.theme.ajaxWrapperNewContent = ($newContent, ajax, response) => (response.effect || ajax.effect) !== 'none' && $newContent.filter( (i) => !(($newContent[i].nodeName === '#comment' || ($newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent))))).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent;
    Drupal.theme.ajaxWrapperMultipleRootElements = ($elements) => $('<div></div>').append($elements);
    Drupal.AjaxCommands = function() {}
    ;
    Drupal.AjaxCommands.prototype = {
        insert(ajax, response) {
            const $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
            const method = response.method || ajax.method;
            const effect = ajax.getEffect(response);
            const settings = response.settings || ajax.settings || drupalSettings;
            const parseHTML = (htmlString) => {
                const fragment = document.createDocumentFragment();
                const tempDiv = fragment.appendChild(document.createElement('div'));
                tempDiv.innerHTML = htmlString;
                return tempDiv.childNodes;
            }
            ;
            let $newContent = $(parseHTML(response.data));
            $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);
            switch (method) {
            case 'html':
            case 'replaceWith':
            case 'replaceAll':
            case 'empty':
            case 'remove':
                Drupal.detachBehaviors($wrapper.get(0), settings);
                break;
            default:
                break;
            }
            $wrapper[method]($newContent);
            if (effect.showEffect !== 'show')
                $newContent.hide();
            const $ajaxNewContent = $newContent.find('.ajax-new-content');
            if ($ajaxNewContent.length) {
                $ajaxNewContent.hide();
                $newContent.show();
                $ajaxNewContent[effect.showEffect](effect.showSpeed);
            } else {
                if (effect.showEffect !== 'show')
                    $newContent[effect.showEffect](effect.showSpeed);
            }
            $newContent.each( (index, element) => {
                if (element.nodeType === Node.ELEMENT_NODE && document.documentElement.contains(element))
                    Drupal.attachBehaviors(element, settings);
            }
            );
        },
        remove(ajax, response, status) {
            const settings = response.settings || ajax.settings || drupalSettings;
            $(response.selector).each(function() {
                Drupal.detachBehaviors(this, settings);
            }).remove();
        },
        changed(ajax, response, status) {
            const $element = $(response.selector);
            if (!$element.hasClass('ajax-changed')) {
                $element.addClass('ajax-changed');
                if (response.asterisk)
                    $element.find(response.asterisk).append(` <abbr class="ajax-changed" title="${Drupal.t('Changed')}">*</abbr> `);
            }
        },
        alert(ajax, response, status) {
            window.alert(response.text);
        },
        announce(ajax, response) {
            if (response.priority)
                Drupal.announce(response.text, response.priority);
            else
                Drupal.announce(response.text);
        },
        redirect(ajax, response, status) {
            window.location = response.url;
        },
        css(ajax, response, status) {
            $(response.selector).css(response.argument);
        },
        settings(ajax, response, status) {
            const ajaxSettings = drupalSettings.ajax;
            if (ajaxSettings)
                Drupal.ajax.expired().forEach( (instance) => {
                    if (instance.selector) {
                        const selector = instance.selector.replace('#', '');
                        if (selector in ajaxSettings)
                            delete ajaxSettings[selector];
                    }
                }
                );
            if (response.merge)
                $.extend(true, drupalSettings, response.settings);
            else
                ajax.settings = response.settings;
        },
        data(ajax, response, status) {
            $(response.selector).data(response.name, response.value);
        },
        focusFirst(ajax, response, status) {
            let focusChanged = false;
            const container = document.querySelector(response.selector);
            if (container) {
                const tabbableElements = tabbable(container);
                if (tabbableElements.length) {
                    tabbableElements[0].focus();
                    focusChanged = true;
                } else {
                    if (isFocusable(container)) {
                        container.focus();
                        focusChanged = true;
                    }
                }
            }
            if (ajax.hasOwnProperty('element') && !focusChanged)
                ajax.element.focus();
        },
        invoke(ajax, response, status) {
            const $element = $(response.selector);
            $element[response.method](...response.args);
        },
        restripe(ajax, response, status) {
            $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');
        },
        update_build_id(ajax, response, status) {
            document.querySelectorAll(`input[name="form_build_id"][value="${response.old}"]`).forEach( (item) => {
                item.value = response.new;
            }
            );
        },
        add_css(ajax, response, status) {
            if (typeof response.data === 'string') {
                Drupal.deprecationError({
                    message: 'Passing a string to the Drupal.ajax.add_css() method is deprecated in 10.1.0 and is removed from drupal:11.0.0. See https://www.drupal.org/node/3154948.'
                });
                $('head').prepend(response.data);
                return;
            }
            const allUniqueBundleIds = response.data.map(function(style) {
                const uniqueBundleId = style.href;
                if (!loadjs.isDefined(uniqueBundleId))
                    loadjs(`css!${style.href}`, uniqueBundleId, {
                        before(path, styleEl) {
                            Object.keys(style).forEach( (attributeKey) => {
                                styleEl.setAttribute(attributeKey, style[attributeKey]);
                            }
                            );
                        }
                    });
                return uniqueBundleId;
            });
            return new Promise( (resolve, reject) => {
                loadjs.ready(allUniqueBundleIds, {
                    success() {
                        resolve();
                    },
                    error(depsNotFound) {
                        const message = Drupal.t(`The following files could not be loaded: @dependencies`, {
                            '@dependencies': depsNotFound.join(', ')
                        });
                        reject(message);
                    }
                });
            }
            );
        },
        message(ajax, response) {
            const messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));
            if (response.clearPrevious)
                messages.clear();
            messages.add(response.message, response.messageOptions);
        },
        add_js(ajax, response, status) {
            const parentEl = document.querySelector(response.selector || 'body');
            const settings = ajax.settings || drupalSettings;
            const allUniqueBundleIds = response.data.map( (script) => {
                const uniqueBundleId = script.src;
                if (!loadjs.isDefined(uniqueBundleId))
                    loadjs(script.src, uniqueBundleId, {
                        async: false,
                        before(path, scriptEl) {
                            Object.keys(script).forEach( (attributeKey) => {
                                scriptEl.setAttribute(attributeKey, script[attributeKey]);
                            }
                            );
                            parentEl.appendChild(scriptEl);
                            return false;
                        }
                    });
                return uniqueBundleId;
            }
            );
            return new Promise( (resolve, reject) => {
                loadjs.ready(allUniqueBundleIds, {
                    success() {
                        Drupal.attachBehaviors(parentEl, settings);
                        resolve();
                    },
                    error(depsNotFound) {
                        const message = Drupal.t(`The following files could not be loaded: @dependencies`, {
                            '@dependencies': depsNotFound.join(', ')
                        });
                        reject(message);
                    }
                });
            }
            );
        },
        scrollTop(ajax, response) {
            const offset = $(response.selector).offset();
            let scrollTarget = response.selector;
            while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent())
                scrollTarget = $(scrollTarget).parent();
            if (offset.top - 10 < $(scrollTarget).scrollTop())
                scrollTarget.get(0).scrollTo({
                    top: offset.top - 10,
                    behavior: 'smooth'
                });
        }
    };
    const stopEvent = (xhr, settings) => {
        return (xhr.getResponseHeader('X-Drupal-Ajax-Token') === '1' && settings.isInProgress && settings.isInProgress());
    }
    ;
    $.extend(true, $.event.special, {
        ajaxSuccess: {
            trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings))
                    return false;
            }
        },
        ajaxComplete: {
            trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings)) {
                    $.active++;
                    return false;
                }
            }
        }
    });
}
)(jQuery, window, Drupal, drupalSettings, loadjs, window.tabbable);
;(function($, window, Drupal, drupalSettings) {
    Drupal.Ajax.prototype.findGlyphicon = function(element) {
        return $(element).closest('.form-item').find('.ajax-progress.glyphicon');
    }
    ;
    Drupal.Ajax.prototype.glyphiconStart = function(element, message) {
        var $glyphicon = this.findGlyphicon(element);
        if ($glyphicon[0]) {
            $glyphicon.addClass('glyphicon-spin');
            if ($.fn.tooltip && drupalSettings.bootstrap.tooltip_enabled) {
                $glyphicon.removeAttr('data-toggle').removeAttr('data-original-title').removeAttr('title').tooltip('destroy');
                ;if (message)
                    $glyphicon.attr('data-toggle', 'tooltip').attr('title', message).tooltip();
            }
            if (message)
                $glyphicon.parent().append('<div class="sr-only message">' + message + '</div>');
        }
        return $glyphicon;
    }
    ;
    Drupal.Ajax.prototype.glyphiconStop = function(element) {
        var $glyphicon = this.findGlyphicon(element);
        if ($glyphicon[0]) {
            $glyphicon.removeClass('glyphicon-spin');
            if ($.fn.tooltip && drupalSettings.bootstrap.tooltip_enabled) {
                $glyphicon.removeAttr('data-toggle').removeAttr('data-original-title').removeAttr('title').tooltip('destroy');
                ;
            }
        }
    }
    ;
    Drupal.Ajax.prototype.setProgressIndicatorThrobber = function() {
        var $element = $(this.element);
        var $glyphicon = this.glyphiconStart($element, this.progress.message);
        if ($glyphicon[0]) {
            this.progress.element = $glyphicon.parent();
            this.progress.glyphicon = true;
            return;
        }
        if (!this.progress.element)
            this.progress.element = $(Drupal.theme('ajaxThrobber'));
        if (this.progress.message)
            this.progress.element.after('<div class="message">' + this.progress.message + '</div>');
        if ($element.is('input') || $element.is('select'))
            $element.after(this.progress.element);
        else
            $element.append(this.progress.element);
    }
    ;
    var success = Drupal.Ajax.prototype.success;
    Drupal.Ajax.prototype.success = function(response, status) {
        if (this.progress.element)
            this.progress.element.parent().find('.message').remove();
        return success.apply(this, [response, status]);
    }
    ;
}
)(jQuery, this, Drupal, drupalSettings);
;(function(Drupal) {
    Drupal.AjaxCommands.prototype.gtagEvent = function(ajax, response) {
        gtag('event', response.event_name, response.data);
    }
    ;
}
)(Drupal);
;(function($, Drupal) {
    Drupal.behaviors.testat = {
        attach: function(context, options) {
            'use strict';
            if (window.location.host.includes('eite') || window.location.host.includes('pete') || window.location.host.includes('afsiep') || window.location.host.includes('prod')) {
                setTimeout( () => {
                    $('#toolbar-administration #toolbar-bar .toolbar-tab > a.is-active', context).css({
                        'color': 'black'
                    });
                }
                , 100);
                $('#toolbar-administration #toolbar-bar .toolbar-tab > a').on('click', function(evt) {
                    setTimeout(function() {
                        $('#toolbar-administration #toolbar-bar .toolbar-tab > a').css({
                            'color': drupalSettings.environmentIndicator.fgColor
                        });
                        if ($(evt.target).hasClass("is-active"))
                            $(evt.target).css({
                                'color': 'black'
                            });
                        else
                            $(evt.target).css({
                                'color': drupalSettings.environmentIndicator.fgColor
                            });
                    }, 100);
                });
            }
        }
    };
}
)(jQuery, Drupal);
;(function($, Drupal) {
    Drupal.behaviors.sNavAccordion = {
        attach: function(context, options) {
            'use strict';
            var btn = $('button.pup-second-nav-btn', context);
            var icon = btn.find('i');
            var nav_li = $('.pup-second-nav>li', context);
            var TABLET_WIDTH = 992;
            var CURRENT_WIDTH = window.innerWidth;
            var load = 0;
            var mobile = false;
            function toggle(expand) {
                if (expand) {
                    icon.addClass('fa-minus');
                    nav_li.removeClass('hidden');
                    btn.attr('aria-expanded', 'true');
                } else {
                    icon.removeClass('fa-minus');
                    nav_li.addClass('hidden');
                    btn.attr('aria-expanded', 'false');
                }
            }
            btn.on('click', function(event) {
                if (icon.hasClass('fa-minus'))
                    toggle(false);
                else
                    toggle(true);
                event.stopPropagation();
            });
            function initialSet() {
                if (window.innerWidth < TABLET_WIDTH) {
                    toggle(false);
                    load++;
                }
            }
            if (load == 0)
                initialSet();
            $(window).on('resize', function() {
                setTimeout(function() {
                    if (window.innerWidth < TABLET_WIDTH) {
                        if (load == 0) {
                            initialSet();
                            CURRENT_WIDTH = window.innerWidth;
                        }
                        if (mobile == false)
                            if (CURRENT_WIDTH != window.innerWidth)
                                toggle(false);
                        mobile = true;
                    } else {
                        toggle(true);
                        mobile = false;
                        CURRENT_WIDTH = window.innerWidth;
                    }
                }, 200);
            });
        }
    };
}
)(jQuery, Drupal);
;( (Drupal, once) => {
    Drupal.behaviors.pup_accordion = {
        attach: function(context, settings) {
            const createExpandCollapse = () => {
                const btnWrapper = document.createElement('div');
                btnWrapper.classList.add('accordionBtnWrapper');
                const expandBtn = document.createElement('button');
                const collapseBtn = document.createElement('button');
                expandBtn.type = 'button';
                collapseBtn.type = 'button';
                expandBtn.appendChild(document.createTextNode(Drupal.t('Expand all')));
                expandBtn.classList.add('expandBtn');
                expandBtn.addEventListener('click', (evt) => {
                    const items = evt.target.closest('div[role="region"]').querySelectorAll('.accordion .accordion-trigger[aria-expanded="false"]');
                    if (items && items.length > 0) {
                        for (const item of items)
                            item.click();
                    }
                }
                );
                collapseBtn.appendChild(document.createTextNode(Drupal.t('Collapse all')));
                collapseBtn.classList.add('collapseBtn');
                collapseBtn.addEventListener('click', (evt) => {
                    const items = evt.target.closest('div[role="region"]').querySelectorAll('.accordion .accordion-trigger[aria-expanded="true"]');
                    if (items && items.length > 0) {
                        for (const item of items)
                            item.click();
                    }
                }
                );
                btnWrapper.appendChild(expandBtn);
                btnWrapper.appendChild(collapseBtn);
                return btnWrapper;
            }
            ;
            const toggleButtonVisibility = (accordion) => {
                if (!accordion)
                    return;
                const expandCount = accordion.querySelectorAll('.accordion-trigger[aria-expanded="true"]').length;
                const collapseCount = accordion.querySelectorAll('.accordion-trigger[aria-expanded="false"]').length;
                if (expandCount && collapseCount) {
                    for (const btn of accordion.previousElementSibling.querySelectorAll('button').values()) {
                        btn.setAttribute('aria-hidden', false);
                        btn.style.display = 'inline-block';
                    }
                } else if (!expandCount) {
                    const btn = accordion.previousElementSibling.querySelector('.collapseBtn');
                    btn.setAttribute('aria-hidden', true);
                    btn.style.display = 'none';
                } else {
                    if (!collapseCount) {
                        const btn = accordion.previousElementSibling.querySelector('.expandBtn');
                        btn.setAttribute('aria-hidden', true);
                        btn.style.display = 'none';
                    }
                }
            }
            ;
            const handleHash = (hash) => {
                const elem = document.getElementById(hash.substring(1));
                if (elem)
                    if (elem.classList.contains('accordion-trigger') && elem.ariaExpanded !== 'true')
                        elem.click();
                    else {
                        if (elem.classList.contains('ck-anchor')) {
                            const panel = elem.closest('.accordion-panel');
                            if (panel && panel?.previousSibling.firstChild.ariaExpanded !== 'true') {
                                panel?.previousElementSibling.firstChild.click();
                                panel?.previousSibling.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                    inline: 'start'
                                });
                            }
                        }
                    }
            }
            ;
            once('links-once', '.region-content a[href^="#"], #content a[href^="#"]', context).forEach( (link) => {
                if (document.querySelector('.accordion'))
                    link.addEventListener('click', (evt) => {
                        handleHash(evt.target.hash);
                    }
                    );
            }
            );
            once('accordion-once', '.region-content .accordion, #content .accordion', context).forEach( (accordion) => {
                accordion.dataset.allowMultiple = '';
                window.addEventListener('beforeprint', (evt) => {
                    accordion.previousElementSibling.querySelector('.expandBtn').click();
                    accordion.previousElementSibling.style.display = 'none';
                }
                );
                window.addEventListener('afterprint', (evt) => {
                    accordion.previousElementSibling.style.display = '';
                    accordion.previousElementSibling.querySelector('.collapseBtn').click();
                    accordion.querySelector('.accordion-heading button').click();
                }
                );
                for (const [idx,btn] of accordion.querySelectorAll('.accordion-trigger').entries()) {
                    btn.setAttribute('aria-expanded', idx > 0 ? false : true);
                    btn.addEventListener('click', function() {
                        const isExpanded = (this.getAttribute('aria-expanded') === 'true');
                        this.setAttribute('aria-expanded', !isExpanded);
                        const panel = this.parentElement.nextElementSibling;
                        if (panel.hasAttribute('hidden')) {
                            panel.removeAttribute('hidden');
                            panel.classList.remove('visually-hidden');
                        } else {
                            panel.setAttribute('hidden', 'until-found');
                            panel.classList.add('visually-hidden');
                        }
                        for (const item of accordion.previousElementSibling.querySelectorAll('button[aria-hidden="true"]')) {
                            item.setAttribute('aria-hidden', false);
                            item.style.display = 'inline-block';
                        }
                        toggleButtonVisibility(accordion);
                    });
                }
                for (const [idx,panel] of accordion.querySelectorAll('.accordion-panel').entries())
                    if (idx > 0) {
                        panel.setAttribute('hidden', 'until-found');
                        panel.classList.add('visually-hidden');
                    }
                const wrapper = document.createElement('div');
                const btnWrapper = createExpandCollapse();
                wrapper.appendChild(btnWrapper);
                wrapper.setAttribute('role', 'region');
                if (accordion.dataset.title)
                    wrapper.setAttribute('aria-label', accordion.dataset.title);
                accordion.insertAdjacentElement('beforebegin', wrapper);
                wrapper.appendChild(accordion);
                if (location.hash)
                    handleHash(location.hash);
            }
            );
            once('accordion-beforematch', document.body, context).forEach( (body) => {
                if ('onbeforematch'in document.body)
                    body.addEventListener('beforematch', (evt) => {
                        const {target} = evt;
                        target.classList.remove('visually-hidden');
                        target.previousElementSibling.querySelector('.accordion-trigger').setAttribute('aria-expanded', true);
                        toggleButtonVisibility(target.closest('.accordion'));
                    }
                    );
                window.addEventListener('hashchange', () => {
                    handleHash(location.hash);
                }
                );
            }
            );
        }
    };
}
)(Drupal, once);
;(function($, Drupal, debounce) {
    $.fn.drupalGetSummary = function() {
        const callback = this.data('summaryCallback');
        if (!this[0] || !callback)
            return '';
        const result = callback(this[0]);
        return result ? result.trim() : '';
    }
    ;
    $.fn.drupalSetSummary = function(callback) {
        const self = this;
        if (typeof callback !== 'function') {
            const val = callback;
            callback = function() {
                return val;
            }
            ;
        }
        return (this.data('summaryCallback', callback).off('formUpdated.summary').on('formUpdated.summary', () => {
            self.trigger('summaryUpdated');
        }
        ).trigger('summaryUpdated'));
    }
    ;
    Drupal.behaviors.formSingleSubmit = {
        attach() {
            function onFormSubmit(e) {
                const $form = $(e.currentTarget);
                const formValues = new URLSearchParams(new FormData(e.target)).toString();
                const previousValues = $form.attr('data-drupal-form-submit-last');
                if (previousValues === formValues)
                    e.preventDefault();
                else
                    $form.attr('data-drupal-form-submit-last', formValues);
            }
            $(once('form-single-submit', 'body')).on('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);
        }
    };
    function triggerFormUpdated(element) {
        $(element).trigger('formUpdated');
    }
    function fieldsList(form) {
        return [].map.call(form.querySelectorAll('[name][id]'), (el) => el.id);
    }
    Drupal.behaviors.formUpdated = {
        attach(context) {
            const $context = $(context);
            const contextIsForm = context.tagName === 'FORM';
            const $forms = $(once('form-updated', contextIsForm ? $context : $context.find('form')));
            let formFields;
            if ($forms.length)
                $.makeArray($forms).forEach( (form) => {
                    const events = 'change.formUpdated input.formUpdated ';
                    const eventHandler = debounce( (event) => {
                        triggerFormUpdated(event.target);
                    }
                    , 300);
                    formFields = fieldsList(form).join(',');
                    form.setAttribute('data-drupal-form-fields', formFields);
                    $(form).on(events, eventHandler);
                }
                );
            if (contextIsForm) {
                formFields = fieldsList(context).join(',');
                const currentFields = $(context).attr('data-drupal-form-fields');
                if (formFields !== currentFields)
                    triggerFormUpdated(context);
            }
        },
        detach(context, settings, trigger) {
            const $context = $(context);
            const contextIsForm = context.tagName === 'FORM';
            if (trigger === 'unload')
                once.remove('form-updated', contextIsForm ? $context : $context.find('form')).forEach( (form) => {
                    form.removeAttribute('data-drupal-form-fields');
                    $(form).off('.formUpdated');
                }
                );
        }
    };
    Drupal.behaviors.fillUserInfoFromBrowser = {
        attach(context, settings) {
            const userInfo = ['name', 'mail', 'homepage'];
            const $forms = $(once('user-info-from-browser', '[data-user-info-from-browser]'));
            if ($forms.length)
                userInfo.forEach( (info) => {
                    const $element = $forms.find(`[name=${info}]`);
                    const browserData = localStorage.getItem(`Drupal.visitor.${info}`);
                    if (!$element.length)
                        return;
                    const emptyValue = $element[0].value === '';
                    const defaultValue = $element.attr('data-drupal-default-value') === $element[0].value;
                    if (browserData && (emptyValue || defaultValue))
                        $element.each(function(index, item) {
                            item.value = browserData;
                        });
                }
                );
            $forms.on('submit', () => {
                userInfo.forEach( (info) => {
                    const $element = $forms.find(`[name=${info}]`);
                    if ($element.length)
                        localStorage.setItem(`Drupal.visitor.${info}`, $element[0].value);
                }
                );
            }
            );
        }
    };
    const handleFragmentLinkClickOrHashChange = (e) => {
        let url;
        if (e.type === 'click')
            url = e.currentTarget.location ? e.currentTarget.location : e.currentTarget;
        else
            url = window.location;
        const hash = url.hash.substring(1);
        if (hash) {
            const $target = $(`#${hash}`);
            $('body').trigger('formFragmentLinkClickOrHashChange', [$target]);
            setTimeout( () => $target.trigger('focus'), 300);
        }
    }
    ;
    const debouncedHandleFragmentLinkClickOrHashChange = debounce(handleFragmentLinkClickOrHashChange, 300, true);
    $(window).on('hashchange.form-fragment', debouncedHandleFragmentLinkClickOrHashChange);
    $(document).on('click.form-fragment', 'a[href*="#"]', debouncedHandleFragmentLinkClickOrHashChange);
}
)(jQuery, Drupal, Drupal.debounce);
;(function($, window, Drupal, drupalSettings, once) {
    Drupal.behaviors.bootstrapForm = {
        attach: function(context) {
            if (drupalSettings.bootstrap && drupalSettings.bootstrap.forms_has_error_value_toggle) {
                var $context = $(context);
                $(once('error', '.form-item.has-error:not(.form-type-password.has-feedback)', context)).each(function() {
                    var $formItem = $(this);
                    var $input = $formItem.find(':input');
                    $input.on('keyup focus blur', function() {
                        if (this.defaultValue !== void 0) {
                            $formItem[this.defaultValue !== this.value ? 'removeClass' : 'addClass']('has-error');
                            $input[this.defaultValue !== this.value ? 'removeClass' : 'addClass']('error');
                        }
                    });
                });
            }
        }
    };
}
)(jQuery, this, Drupal, drupalSettings, once);
;(function($, window, Drupal, drupalSettings, once) {
    "use strict";
    var handleFragmentLinkClickOrHashChange = function handleFragmentLinkClickOrHashChange(e, $target) {
        $target.parents('.vertical-tabs-pane').each(function(index, pane) {
            $(pane).data('verticalTab').focus();
        });
    };
    Drupal.behaviors.verticalTabs = {
        attach: function(context) {
            var width = drupalSettings.widthBreakpoint || 640;
            var mq = '(max-width: ' + width + 'px)';
            if (window.matchMedia(mq).matches)
                return;
            $(once('vertical-tabs-fragments', 'body')).on('formFragmentLinkClickOrHashChange.verticalTabs', handleFragmentLinkClickOrHashChange);
            $(once('vertical-tabs', '[data-vertical-tabs-panes]', context)).each(function() {
                var $this = $(this).addClass('tab-content vertical-tabs-panes');
                var focusID = $(':hidden.vertical-tabs__active-tab', this).val();
                if (typeof focusID === 'undefined' || !focusID.length)
                    focusID = false;
                var tab_focus;
                var $details = $this.find('> .panel');
                if ($details.length === 0)
                    return;
                var tab_list = $('<ul class="nav nav-tabs vertical-tabs-list"></ul>');
                $this.wrap('<div class="tabbable tabs-left vertical-tabs clearfix"></div>').before(tab_list);
                $details.each(function() {
                    var $that = $(this);
                    var vertical_tab = new Drupal.verticalTab({
                        title: $that.find('> .panel-heading > .panel-title, > .panel-heading').last().html(),
                        details: $that
                    });
                    tab_list.append(vertical_tab.item);
                    $that.removeClass('collapsed').attr('open', true).removeClass('collapsible collapsed panel panel-default').addClass('tab-pane vertical-tabs-pane').data('verticalTab', vertical_tab).find('> .panel-heading').remove();
                    if (this.id === focusID)
                        tab_focus = $that;
                });
                $(tab_list).find('> li:first').addClass('first');
                $(tab_list).find('> li:last').addClass('last');
                if (!tab_focus) {
                    var $locationHash = $this.find(window.location.hash);
                    if (window.location.hash && $locationHash.length)
                        tab_focus = $locationHash.closest('.vertical-tabs-pane');
                    else
                        tab_focus = $this.find('> .vertical-tabs-pane:first');
                }
                if (tab_focus.length)
                    tab_focus.data('verticalTab').focus();
            });
            $(once('bootstrap-tabs', '.tabbable', context)).each(function() {
                var $wrapper = $(this);
                var $tabs = $wrapper.find('.nav-tabs');
                var $content = $wrapper.find('.tab-content');
                var borderRadius = parseInt($content.css('borderBottomRightRadius'), 10);
                var bootstrapTabResize = function() {
                    if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right'))
                        $content.css('min-height', $tabs.outerHeight());
                };
                bootstrapTabResize();
                if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right'))
                    $tabs.on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
                        bootstrapTabResize();
                        if ($wrapper.hasClass('tabs-left'))
                            if ($(e.target).parent().is(':first-child'))
                                $content.css('borderTopLeftRadius', '0');
                            else
                                $content.css('borderTopLeftRadius', borderRadius + 'px');
                        else if ($(e.target).parent().is(':first-child'))
                            $content.css('borderTopRightRadius', '0');
                        else
                            $content.css('borderTopRightRadius', borderRadius + 'px');
                    });
            });
        }
    };
    Drupal.verticalTab = function(settings) {
        var self = this;
        $.extend(this, settings, Drupal.theme('verticalTab', settings));
        this.link.attr('href', '#' + settings.details.attr('id'));
        this.link.on('click', function(e) {
            e.preventDefault();
            self.focus();
        });
        this.link.on('keydown', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.focus();
                $(".vertical-tabs-pane :input:visible:enabled:first").trigger('focus');
            }
        });
        this.details.on('summaryUpdated', function() {
            self.updateSummary();
        }).trigger('summaryUpdated');
    }
    ;
    Drupal.verticalTab.prototype = {
        focus: function() {
            this.details.siblings('.vertical-tabs-pane').each(function() {
                $(this).removeClass('active').find('> div').removeClass('in');
                var tab = $(this).data('verticalTab');
                tab.item.removeClass('selected');
            }).end().addClass('active').siblings(':hidden.vertical-tabs-active-tab').val(this.details.attr('id'));
            this.details.find('> div').addClass('in');
            this.details.data('verticalTab').item.find('a').tab('show');
            this.item.addClass('selected');
            $('#active-vertical-tab').remove();
            this.link.append('<span id="active-vertical-tab" class="visually-hidden">' + Drupal.t('(active tab)') + '</span>');
        },
        updateSummary: function() {
            this.summary.html(this.details.drupalGetSummary());
        },
        tabShow: function() {
            this.item.show();
            this.item.closest('.form-type-vertical-tabs').show();
            this.item.parent().children('.vertical-tab-button').removeClass('first').filter(':visible:first').addClass('first');
            this.details.removeClass('vertical-tab-hidden').show();
            this.focus();
            return this;
        },
        tabHide: function() {
            this.item.hide();
            this.item.parent().children('.vertical-tab-button').removeClass('first').filter(':visible:first').addClass('first');
            this.details.addClass('vertical-tab-hidden').hide();
            var $firstTab = this.details.siblings('.vertical-tabs-pane:not(.vertical-tab-hidden):first');
            if ($firstTab.length)
                $firstTab.data('verticalTab').focus();
            else
                this.item.closest('.form-type-vertical-tabs').hide();
            return this;
        }
    };
    Drupal.theme.verticalTab = function(settings) {
        var tab = {};
        tab.item = $('<li class="vertical-tab-button" tabindex="-1"></li>').append(tab.link = $('<a href="#' + settings.details[0].id + '" data-toggle="tab"></a>').append(tab.title = $('<span></span>').html(settings.title)).append(tab.summary = $('<div class="summary"></div>')));
        return tab;
    }
    ;
}
)(jQuery, this, Drupal, drupalSettings, once);
;(function($, Drupal) {
    'use strict';
    Drupal.behaviors.accordionLink = {
        attach: function(context, settings) {
            let $anchorLink = window.location.hash;
            if ($anchorLink.length > 0) {
                let $accordion = jQuery($anchorLink);
                if ($accordion.length > 0) {
                    for (let i = 0; i < $accordion.parent().parent()[0].classList.length; i++)
                        if ($accordion.parent().parent()[0].classList[i] === 'panel-body')
                            $accordion.parent().parent().parent().collapse('show');
                }
            }
        }
    };
}
)(jQuery, Drupal);
;(function($, Drupal) {
    Drupal.behaviors.footerAccordion = {
        attach: function() {
            'use strict';
            var Accordion = Accordion || {}
              , foot = $('.pup-footer').find(':header')
              , fnav = $('.pup-footer').find('ul.menu.nav');
            Accordion = {
                addingClsNids: function(elem) {
                    $(fnav).addClass('collapse');
                    $(foot).addClass("collapsed");
                    $(fnav).each(function(item, ele) {
                        elem = $(ele).attr('id', 'pup-foot-collapse-' + (item + 1));
                    });
                    $(foot).each(function(item, ele) {
                        elem = $(ele).attr({
                            "data-toggle": "collapse",
                            "data-parent": "#pup-footer-accordion",
                            "href": "#pup-foot-collapse-" + (item + 1)
                        });
                    });
                    $(foot).click(function(event) {
                        if ($(event.currentTarget).siblings('ul').hasClass('collapse')) {
                            $(this).addClass("up").toggleClass("collapsed");
                            $(this).find('ul').toggleClass('collapse');
                        } else
                            $(this).addClass("collapsed").toggleClass("up");
                    });
                },
                removingClsNids: function() {
                    $(fnav).attr({
                        'id': '',
                        'pup-foot-collapse-': ''
                    });
                    $(fnav).removeClass('collapse');
                    $(foot).attr({
                        "data-toggle": "",
                        "data-parent": "",
                        "href": ""
                    }).removeClass('collapsed');
                }
            };
            $(window).on("load", function() {
                if (this.innerWidth < 768)
                    Accordion.addingClsNids();
                $(this).resize(function() {
                    if (this.innerWidth < 768)
                        Accordion.addingClsNids();
                    else
                        Accordion.removingClsNids();
                });
            });
        }
    };
    $('.menu--pup-footer-navigation .footer-column-header').each(function(i, elem) {
        $(elem)[0].setAttribute('role', 'heading');
        $(elem)[0].setAttribute('aria-level', '2');
        $(elem).addClass('navbar-nav');
        $(elem).removeAttr('data-toggle');
        if (window.innerWidth > 767) {
            $(elem).wrapInner('<span class="footer-mobile-icon"></span>');
            $(elem).next().attr({
                'role': 'presentation'
            }).removeAttr('aria-labelledby');
        } else {
            const buttonId = 'footer-button-' + (i + 1);
            const regionId = 'footer-region-' + (i + 1);
            $(elem).wrapInner(`<button data-toggle="dropdown" class="footer-mobile-icon" aria-expanded="false" id=${buttonId} aria-controls=${regionId}></button>`);
            $(elem).next().attr({
                'aria-labelledby': buttonId
            }).attr({
                'id': regionId
            }).attr({
                'aria-hidden': true
            });
        }
    });
    $(window).on('resize', function() {
        const headingContents = document.querySelectorAll('.menu--pup-footer-navigation .footer-column-header .footer-mobile-icon');
        const submenuWrapper = document.querySelectorAll('.menu--pup-footer-navigation > li > div');
        if (window.innerWidth > 767) {
            headingContents.forEach(function(button) {
                $(button).replaceWith(function() {
                    return $('<span class="footer-mobile-icon" />').append($(this).contents());
                });
            });
            submenuWrapper.forEach(function(div, i) {
                const buttonId = 'footer-button-' + (i + 1);
                const regionId = 'footer-region-' + (i + 1);
                $(div).replaceWith(function() {
                    return $('<div role="presentation">').append($(this).contents());
                });
            });
        } else {
            headingContents.forEach(function(button, i) {
                const buttonId = 'footer-button-' + (i + 1);
                const regionId = 'footer-region-' + (i + 1);
                const expanded = button.parentElement.classList.contains('open') ? true : false;
                $(button).replaceWith(function() {
                    return $(`<button data-toggle="dropdown" class="footer-mobile-icon" aria-expanded=${expanded} id=${buttonId} aria-controls=${regionId}>`).append($(this).contents());
                });
            });
            submenuWrapper.forEach(function(div, i) {
                const buttonId = 'footer-button-' + (i + 1);
                const regionId = 'footer-region-' + (i + 1);
                const siblingHeading = div.previousElementSibling;
                const expanded = siblingHeading.classList.contains('open') ? true : false;
                $(div).replaceWith(function() {
                    return $(`<div role="region" id=${regionId} aria-labelledby=${buttonId} aria-hidden=${!expanded}>`).append($(this).contents());
                });
            });
        }
    });
    document.querySelectorAll('.menu--pup-footer-navigation .footer-column-header').forEach(function(elem, i) {
        elem.addEventListener('click', function() {
            const toggleExpanded = (value, items, attribute) => {
                items.forEach(function(item) {
                    item.setAttribute(attribute, value);
                });
            }
            ;
            if (window.innerWidth < 768) {
                const currentButton = this.querySelector("button");
                const buttons = document.querySelectorAll('.menu--pup-footer-navigation .footer-column-header button');
                const subMenus = document.querySelectorAll('.menu--pup-footer-navigation div[role="region"]');
                const parent = this.parentElement;
                const expandedRegion = parent.querySelector('[role="region"]');
                if (elem.classList.contains('open')) {
                    toggleExpanded(false, buttons, 'aria-expanded');
                    expandedRegion.setAttribute('aria-hidden', true);
                } else {
                    toggleExpanded(false, buttons, 'aria-expanded');
                    toggleExpanded(true, subMenus, 'aria-hidden');
                    currentButton.setAttribute('aria-expanded', true);
                    expandedRegion.setAttribute('aria-hidden', false);
                }
            }
        });
    });
    document.querySelectorAll(".menu--pup-footer-navigation .dropdown-toggle").forEach(function(footerColumn) {
        var mutationObserver = new MutationObserver(function(mutations, mut) {
            $(".menu--pup-footer-navigation .dropdown-toggle").next().attr("aria-hidden", true);
            $(".menu--pup-footer-navigation .dropdown-toggle.open").next().attr("aria-hidden", false);
        }
        );
        mutationObserver.observe(footerColumn, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    });
}
)(jQuery, Drupal);
;(function($, Drupal) {
    Drupal.behaviors.stickyNav = {
        attach: function(context, settings) {
            $(document).ready(function() {
                var $logo = $('.region-header-left .logo');
                if ($('ul.we-mega-menu-ul > li > .logo > img').length < 1)
                    $logo.clone().insertBefore('#block-pup-sticky-nav ul.we-mega-menu-ul li:nth-child(1)');
            });
            $(window).scroll(function() {
                var $limit = $('.pup-header-main').height();
                if ($('.pup-header-mobile-menu').is(':visible'))
                    if ($(this).scrollTop() > $limit) {
                        $('#block-mainnavigation-2').addClass('pup-stickynav-hidden');
                        $('#block-pup-sticky-nav').removeClass('pup-stickynav-hidden');
                    } else
                        $('#navbar').removeClass('pup-stickynav-mobile');
                else if ($(this).scrollTop() > $limit) {
                    $('#block-mainnavigation-2').addClass('pup-stickynav-hidden');
                    $('#block-pup-sticky-nav').removeClass('pup-stickynav-hidden');
                } else {
                    $('#block-mainnavigation-2').removeClass('pup-stickynav-hidden');
                    $('#block-pup-sticky-nav').addClass('pup-stickynav-hidden');
                }
            });
            $(window).resize(function() {
                var screenWidth = $('#navbar').width();
                if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
                    if (screenWidth > 990)
                        $('#navbar').removeClass('pup-stickynav-mobile');
                } else {
                    if (screenWidth > 974)
                        $('#navbar').removeClass('pup-stickynav-mobile');
                }
                $(window).trigger('scroll');
            });
        }
    };
}
)($, Drupal);
;!function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function(t) {
    var e = -1
      , o = -1
      , n = function(t) {
        return parseFloat(t) || 0;
    }
      , a = function(e) {
        var o = 1
          , a = t(e)
          , i = null
          , r = [];
        return a.each(function() {
            var e = t(this)
              , a = e.offset().top - n(e.css("margin-top"))
              , s = r.length > 0 ? r[r.length - 1] : null;
            null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e),
            i = a;
        }),
        r;
    }
      , i = function(e) {
        var o = {
            byRow: !0,
            property: "height",
            target: null,
            remove: !1
        };
        return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0),
        o);
    }
      , r = t.fn.matchHeight = function(e) {
        var o = i(e);
        if (o.remove) {
            var n = this;
            return this.css(o.property, ""),
            t.each(r._groups, function(t, e) {
                e.elements = e.elements.not(n);
            }),
            this;
        }
        return this.length <= 1 && !o.target ? this : (r._groups.push({
            elements: this,
            options: o
        }),
        r._apply(this, o),
        this);
    }
    ;
    r.version = "0.7.2",
    r._groups = [],
    r._throttle = 80,
    r._maintainScroll = !1,
    r._beforeUpdate = null,
    r._afterUpdate = null,
    r._rows = a,
    r._parse = n,
    r._parseOptions = i,
    r._apply = function(e, o) {
        var s = i(o)
          , h = t(e)
          , l = [h]
          , c = t(window).scrollTop()
          , p = t("html").outerHeight(!0)
          , u = h.parents().filter(":hidden");
        return u.each(function() {
            var e = t(this);
            e.data("style-cache", e.attr("style"));
        }),
        u.css("display", "block"),
        s.byRow && !s.target && (h.each(function() {
            var e = t(this)
              , o = e.css("display");
            "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"),
            e.data("style-cache", e.attr("style")),
            e.css({
                display: o,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            });
        }),
        l = a(h),
        h.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "");
        })),
        t.each(l, function(e, o) {
            var a = t(o)
              , i = 0;
            if (s.target)
                i = s.target.outerHeight(!1);
            else {
                if (s.byRow && a.length <= 1)
                    return void a.css(s.property, "");
                a.each(function() {
                    var e = t(this)
                      , o = e.attr("style")
                      , n = e.css("display");
                    "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                    var a = {
                        display: n
                    };
                    a[s.property] = "",
                    e.css(a),
                    e.outerHeight(!1) > i && (i = e.outerHeight(!1)),
                    o ? e.attr("style", o) : e.css("display", "");
                });
            }
            a.each(function() {
                var e = t(this)
                  , o = 0;
                s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")),
                o += n(e.css("padding-top")) + n(e.css("padding-bottom"))),
                e.css(s.property, i - o + "px"));
            });
        }),
        u.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null);
        }),
        r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
        this;
    }
    ,
    r._applyDataApi = function() {
        var e = {};
        t("[data-match-height], [data-mh]").each(function() {
            var o = t(this)
              , n = o.attr("data-mh") || o.attr("data-match-height");
            n in e ? e[n] = e[n].add(o) : e[n] = o;
        }),
        t.each(e, function() {
            this.matchHeight(!0);
        });
    }
    ;
    var s = function(e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups),
        t.each(r._groups, function() {
            r._apply(this.elements, this.options);
        }),
        r._afterUpdate && r._afterUpdate(e, r._groups);
    };
    r._update = function(n, a) {
        if (a && "resize" === a.type) {
            var i = t(window).width();
            if (i === e)
                return;
            e = i;
        }
        n ? o === -1 && (o = setTimeout(function() {
            s(a),
            o = -1;
        }, r._throttle)) : s(a);
    }
    ,
    t(r._applyDataApi);
    var h = t.fn.on ? "on" : "bind";
    t(window)[h]("load", function(t) {
        r._update(!1, t);
    }),
    t(window)[h]("resize orientationchange", function(t) {
        r._update(!0, t);
    });
});
;(function($, Drupal) {
    'use strict';
    Drupal.behaviors.taskCards = {
        attach: function(context, settings) {
            $('.equalHeight').matchHeight({
                byRow: false
            });
        }
    };
}
)(jQuery, Drupal);
;(function($, window, document) {
    "use strict";
    var pluginName = "accessibleMegaMenu"
      , defaults = {
        uuidPrefix: "accessible-megamenu",
        menuClass: "accessible-megamenu",
        topNavItemClass: "accessible-megamenu-top-nav-item",
        panelClass: "accessible-megamenu-panel",
        panelGroupClass: "accessible-megamenu-panel-group",
        hoverClass: "hover",
        focusClass: "focus",
        openClass: "open",
        toggleButtonClass: "accessible-megamenu-toggle",
        openDelay: 0,
        closeDelay: 250,
        openOnMouseover: false
    }
      , Keyboard = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        keyMap: {
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            59: ";",
            65: "a",
            66: "b",
            67: "c",
            68: "d",
            69: "e",
            70: "f",
            71: "g",
            72: "h",
            73: "i",
            74: "j",
            75: "k",
            76: "l",
            77: "m",
            78: "n",
            79: "o",
            80: "p",
            81: "q",
            82: "r",
            83: "s",
            84: "t",
            85: "u",
            86: "v",
            87: "w",
            88: "x",
            89: "y",
            90: "z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            190: "."
        }
    }
      , clearTimeout = window.clearTimeout
      , setTimeout = window.setTimeout
      , isOpera = window.opera && window.opera.toString() === '[object Opera]';
    function AccessibleMegaMenu(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.mouseTimeoutID = null;
        this.focusTimeoutID = null;
        this.mouseFocused = false;
        this.justFocused = false;
        this.init();
    }
    AccessibleMegaMenu.prototype = (function() {
        var uuid = 0, keydownTimeoutDuration = 1000, keydownSearchString = "", isTouch = 'ontouchstart'in window || window.navigator.msMaxTouchPoints, _getPlugin, _addUniqueId, _togglePanel, _clickHandler, _touchmoveHandler, _clickOutsideHandler, _DOMAttrModifiedHandler, _focusInHandler, _focusOutHandler, _keyDownHandler, _mouseDownHandler, _mouseOverHandler, _mouseOutHandler, _clickToggleHandler, _toggleExpandedEventHandlers, _addEventHandlers, _removeEventHandlers;
        _getPlugin = function(element) {
            return $(element).closest(':data(plugin_' + pluginName + ')').data("plugin_" + pluginName);
        }
        ;
        _addUniqueId = function(element) {
            element = $(element);
            var settings = this.settings;
            if (!element.attr("id"))
                element.attr("id", settings.uuidPrefix + "-" + new Date().getTime() + "-" + (++uuid));
        }
        ;
        _togglePanel = function(event, hide) {
            var target = $(event.target), that = this, settings = this.settings, menu = this.menu, topli = target.closest('.' + settings.topNavItemClass), panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass), newfocus;
            _toggleExpandedEventHandlers.call(this, true);
            if (hide) {
                topli = menu.find('.' + settings.topNavItemClass + ' .' + settings.openClass + ':first').closest('.' + settings.topNavItemClass);
                if (!(topli.is(event.relatedTarget) || topli.has(event.relatedTarget).length > 0)) {
                    if ((event.type === 'mouseout' || event.type === 'focusout') && topli.has(document.activeElement).length > 0)
                        return;
                    topli.find('[aria-expanded]').attr('aria-expanded', 'false').removeClass(settings.openClass).filter('.' + settings.panelClass).attr('aria-hidden', 'true');
                    if ((event.type === 'keydown' && event.keyCode === Keyboard.ESCAPE) || event.type === 'DOMAttrModified') {
                        newfocus = topli.find(':tabbable:first');
                        setTimeout(function() {
                            menu.find('[aria-expanded].' + that.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
                            newfocus.focus();
                            that.justFocused = false;
                        }, 99);
                    }
                } else {
                    if (topli.length === 0)
                        menu.find('[aria-expanded=true]').attr('aria-expanded', 'false').removeClass(settings.openClass).filter('.' + settings.panelClass).attr('aria-hidden', 'true');
                }
            } else {
                clearTimeout(that.focusTimeoutID);
                topli.siblings().find('[aria-expanded]').attr('aria-expanded', 'false').removeClass(settings.openClass).filter('.' + settings.panelClass).attr('aria-hidden', 'true');
                topli.find('[aria-expanded]').attr('aria-expanded', 'true').addClass(settings.openClass).filter('.' + settings.panelClass).attr('aria-hidden', 'false');
                var pageScrollPosition = $('html')[0].scrollTop;
                var openPanelTopPosition = $('.' + settings.panelClass + '.' + settings.openClass).parent().offset().top;
                if (pageScrollPosition > openPanelTopPosition)
                    $('html')[0].scrollTop = openPanelTopPosition;
                if (event.type === 'mouseover' && target.is(':tabbable') && topli.length === 1 && panel.length === 0 && menu.has(document.activeElement).length > 0) {
                    target.focus();
                    that.justFocused = false;
                }
                _toggleExpandedEventHandlers.call(that);
            }
        }
        ;
        _clickHandler = function(event) {
            var target = $(event.target).closest(':tabbable')
              , topli = target.closest('.' + this.settings.topNavItemClass)
              , panel = target.closest('.' + this.settings.panelClass);
            if (topli.length === 1 && panel.length === 0 && topli.find('.' + this.settings.panelClass).length === 1)
                if (!target.hasClass(this.settings.openClass) && this.justFocused) {
                    _togglePanel.call(this, event);
                    this.justFocused = false;
                } else if (this.justFocused) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.justFocused = false;
                } else {
                    if (isTouch || !isTouch && !this.settings.openOnMouseover) {
                        event.preventDefault();
                        event.stopPropagation();
                        _togglePanel.call(this, event, target.hasClass(this.settings.openClass));
                    }
                }
        }
        ;
        _touchmoveHandler = function() {
            this.justMoved = true;
        }
        ;
        _clickOutsideHandler = function(event) {
            if ($(event.target).closest(this.menu).length === 0) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        }
        ;
        _DOMAttrModifiedHandler = function(event) {
            if (event.originalEvent.attrName === 'aria-expanded' && event.originalEvent.newValue === 'false' && $(event.target).hasClass(this.settings.openClass)) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        }
        ;
        _focusInHandler = function(event) {
            clearTimeout(this.focusTimeoutID);
            var target = $(event.target)
              , panel = target.closest('.' + this.settings.panelClass);
            target.addClass(this.settings.focusClass);
            this.justFocused = !this.mouseFocused || (!this.settings.openOnMouseover && this.mouseFocused);
            this.mouseFocused = false;
            if (this.justFocused && this.panels.not(panel).filter('.' + this.settings.openClass).length) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event);
            }
        }
        ;
        _focusOutHandler = function(event) {
            this.justFocused = false;
            var that = this
              , target = $(event.target)
              , topli = target.closest('.' + this.settings.topNavItemClass);
            target.removeClass(this.settings.focusClass);
            if (window.cvox)
                that.focusTimeoutID = setTimeout(function() {
                    window.cvox.Api.getCurrentNode(function(node) {
                        if (topli.has(node).length)
                            clearTimeout(that.focusTimeoutID);
                        else
                            that.focusTimeoutID = setTimeout(function(scope, event, hide) {
                                _togglePanel.call(scope, event, hide);
                            }, 275, that, event, true);
                    });
                }, 25);
            else
                that.focusTimeoutID = setTimeout(function() {
                    if (that.mouseFocused && event.relatedTarget === null)
                        return;
                    _togglePanel.call(that, event, true);
                }, 300);
        }
        ;
        _keyDownHandler = function(event) {
            var that = (this.constructor === AccessibleMegaMenu) ? this : _getPlugin(this), settings = that.settings, target = $($(this).is('.' + settings.hoverClass + ':tabbable') ? this : event.target), menu = that.menu, topnavitems = that.topnavitems, topli = target.closest('.' + settings.topNavItemClass), tabbables = menu.find(':tabbable'), panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass), panelGroups = panel.find('.' + settings.panelGroupClass), currentPanelGroup = target.closest('.' + settings.panelGroupClass), next, keycode = event.keyCode || event.which, start, i, o, label, found = false, newString = Keyboard.keyMap[event.keyCode] || '', regex, isTopNavItem = (topli.length === 1 && panel.length === 0);
            if (target.is("input:focus, select:focus, textarea:focus, button:focus"))
                return;
            if (target.is('.' + settings.hoverClass + ':tabbable'))
                $('html').off('keydown.accessible-megamenu');
            switch (keycode) {
            case Keyboard.ESCAPE:
                this.mouseFocused = false;
                _togglePanel.call(that, event, true);
                break;
            case Keyboard.DOWN:
                event.preventDefault();
                this.mouseFocused = false;
                if (isTopNavItem) {
                    _togglePanel.call(that, event);
                    found = (topli.find('.' + settings.panelClass + ' :tabbable:first').focus().length === 1);
                } else
                    found = (tabbables.filter(':gt(' + tabbables.index(target) + '):first').focus().length === 1);
                if (!found && isOpera && (event.ctrlKey || event.metaKey)) {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                }
                break;
            case Keyboard.UP:
                event.preventDefault();
                this.mouseFocused = false;
                if (isTopNavItem)
                    found = (topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last').find(':tabbable:first').focus().length === 1);
                else
                    found = (tabbables.filter(':lt(' + tabbables.index(target) + '):last').focus().length === 1);
                if (!found && isOpera && (event.ctrlKey || event.metaKey)) {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                }
                break;
            case Keyboard.RIGHT:
                event.preventDefault();
                this.mouseFocused = false;
                if (isTopNavItem)
                    found = (topnavitems.filter(':gt(' + topnavitems.index(topli) + '):first').find(':tabbable:first').focus().length === 1);
                else {
                    if (panelGroups.length && currentPanelGroup.length)
                        found = (panelGroups.filter(':gt(' + panelGroups.index(currentPanelGroup) + '):first').find(':tabbable:first').focus().length === 1);
                    if (!found)
                        found = (topli.find(':tabbable:first').focus().length === 1);
                }
                break;
            case Keyboard.LEFT:
                event.preventDefault();
                this.mouseFocused = false;
                if (isTopNavItem)
                    found = (topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last').find(':tabbable:first').focus().length === 1);
                else {
                    if (panelGroups.length && currentPanelGroup.length)
                        found = (panelGroups.filter(':lt(' + panelGroups.index(currentPanelGroup) + '):last').find(':tabbable:first').focus().length === 1);
                    if (!found)
                        found = (topli.find(':tabbable:first').focus().length === 1);
                }
                break;
            case Keyboard.TAB:
                this.mouseFocused = false;
                i = tabbables.index(target);
                if (event.shiftKey && isTopNavItem && target.hasClass(settings.openClass)) {
                    _togglePanel.call(that, event, true);
                    next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                    if (next.children('.' + settings.panelClass).length)
                        found = next.children().attr('aria-expanded', 'true').addClass(settings.openClass).filter('.' + settings.panelClass).attr('aria-hidden', 'false').find(':tabbable:last').focus();
                } else if (event.shiftKey && i > 0)
                    found = (tabbables.filter(':lt(' + i + '):last').focus().length === 1);
                else if (!event.shiftKey && i < tabbables.length - 1)
                    found = (tabbables.filter(':gt(' + i + '):first').focus().length === 1);
                else {
                    if (isOpera) {
                        tabbables = $(':tabbable');
                        i = tabbables.index(target);
                        if (event.shiftKey)
                            found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):last').focus().length === 1);
                        else
                            found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                    }
                }
                if (found)
                    event.preventDefault();
                break;
            case Keyboard.ENTER:
                if (isTopNavItem) {
                    event.preventDefault();
                    event.stopPropagation();
                    window.location.href = $($(target)[0]).attr('href');
                }
                break;
            case Keyboard.SPACE:
                if (isTopNavItem) {
                    event.preventDefault();
                    event.stopPropagation();
                    _clickHandler.call(that, event);
                } else
                    return true;
                break;
            default:
                clearTimeout(this.keydownTimeoutID);
                keydownSearchString += newString !== keydownSearchString ? newString : '';
                if (keydownSearchString.length === 0)
                    return;
                this.keydownTimeoutID = setTimeout(function() {
                    keydownSearchString = '';
                }, keydownTimeoutDuration);
                if (isTopNavItem && !target.hasClass(settings.openClass))
                    tabbables = tabbables.filter(':not(.' + settings.panelClass + ' :tabbable)');
                else
                    tabbables = topli.find(':tabbable');
                if (event.shiftKey)
                    tabbables = $(tabbables.get().reverse());
                for (i = 0; i < tabbables.length; i++) {
                    o = tabbables.eq(i);
                    if (o.is(target)) {
                        start = (keydownSearchString.length === 1) ? i + 1 : i;
                        break;
                    }
                }
                regex = new RegExp('^' + keydownSearchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'),'i');
                for (i = start; i < tabbables.length; i++) {
                    o = tabbables.eq(i);
                    label = $.trim(o.text());
                    if (regex.test(label)) {
                        found = true;
                        o.focus();
                        break;
                    }
                }
                if (!found)
                    for (i = 0; i < start; i++) {
                        o = tabbables.eq(i);
                        label = $.trim(o.text());
                        if (regex.test(label)) {
                            o.focus();
                            break;
                        }
                    }
                break;
            }
            that.justFocused = false;
        }
        ;
        _mouseDownHandler = function(event) {
            if ($(event.target).closest(this.settings.panelClass) || $(event.target).closest(":focusable").length) {
                this.mouseFocused = true;
                if ($(event.target).closest(this.settings.menuClass))
                    $('html').on('keydown.accessible-megamenu', $.proxy(_keyDownHandler, event.target));
            }
            clearTimeout(this.mouseTimeoutID);
            this.mouseTimeoutID = setTimeout(function() {
                clearTimeout(this.focusTimeoutID);
            }, 1);
        }
        ;
        _mouseOverHandler = function(event) {
            clearTimeout(this.mouseTimeoutID);
            var that = this;
            if (!that.settings.openOnMouseover)
                return;
            this.mouseTimeoutID = setTimeout(function() {
                $(event.target).addClass(that.settings.hoverClass);
                _togglePanel.call(that, event);
                if ($(event.target).closest(that.settings.menuClass))
                    $('html').on('keydown.accessible-megamenu', $.proxy(_keyDownHandler, event.target));
            }, this.settings.openDelay);
        }
        ;
        _mouseOutHandler = function(event) {
            clearTimeout(this.mouseTimeoutID);
            var that = this;
            if (!that.settings.openOnMouseover)
                return;
            $(event.target).removeClass(that.settings.hoverClass);
            that.mouseTimeoutID = setTimeout(function() {
                _togglePanel.call(that, event, true);
            }, this.settings.closeDelay);
            if ($(event.target).is(':tabbable'))
                $('html').off('keydown.accessible-megamenu');
        }
        ;
        _clickToggleHandler = function() {
            var isExpanded = this.toggleButton.attr('aria-expanded') === 'true';
            this.toggleButton.attr({
                'aria-expanded': !isExpanded,
                'aria-pressed': !isExpanded
            });
        }
        ;
        _toggleExpandedEventHandlers = function(hide) {
            var menu = this.menu;
            if (hide) {
                $('html').off('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu');
                menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
            } else {
                $('html').on('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu', $.proxy(_clickOutsideHandler, this));
                menu.find('[aria-expanded=true].' + this.settings.panelClass).on('DOMAttrModified.accessible-megamenu', $.proxy(_DOMAttrModifiedHandler, this));
            }
        }
        ;
        _addEventHandlers = function() {
            var menu = this.menu
              , toggleButton = this.toggleButton;
            menu.on("focusin.accessible-megamenu", ":focusable, ." + this.settings.panelClass, $.proxy(_focusInHandler, this)).on("focusout.accessible-megamenu", ":focusable, ." + this.settings.panelClass, $.proxy(_focusOutHandler, this)).on("keydown.accessible-megamenu", $.proxy(_keyDownHandler, this)).on("mouseover.accessible-megamenu", $.proxy(_mouseOverHandler, this)).on("mouseout.accessible-megamenu", $.proxy(_mouseOutHandler, this)).on("mousedown.accessible-megamenu", $.proxy(_mouseDownHandler, this)).on("click.accessible-megamenu", $.proxy(_clickHandler, this));
            toggleButton.on('click.accessible-megamenu', $.proxy(_clickToggleHandler, this));
            if (isTouch)
                menu.on("touchmove.accessible-megamenu", $.proxy(_touchmoveHandler, this));
            if ($(document.activeElement).closest(menu).length)
                $(document.activeElement).trigger("focusin.accessible-megamenu");
        }
        ;
        _removeEventHandlers = function() {
            var menu = this.menu
              , toggleButton = this.toggleButton;
            menu.off('.accessible-megamenu');
            if (menu.find('[aria-expanded=true].' + this.settings.panelClass).length)
                _toggleExpandedEventHandlers.call(this, true);
            toggleButton.off('.accessible-megamenu');
        }
        ;
        return {
            constructor: AccessibleMegaMenu,
            init: function() {
                var settings = this.settings
                  , nav = $(this.element)
                  , menu = nav.children('ol,ul').first()
                  , topnavitems = menu.children()
                  , toggleButton = nav.children('button').first();
                this.start(settings, nav, menu, topnavitems, toggleButton);
            },
            start: function(settings, nav, menu, topnavitems, toggleButton) {
                var that = this;
                this.settings = settings;
                this.menu = menu;
                this.topnavitems = topnavitems;
                this.toggleButton = toggleButton;
                nav.attr("role", "navigation");
                _addUniqueId.call(that, menu);
                menu.addClass(settings.menuClass);
                menu.addClass(['js', settings.menuClass].join('-'));
                topnavitems.each(function(i, topnavitem) {
                    var topnavitemlink, topnavitempanel;
                    topnavitem = $(topnavitem);
                    topnavitem.addClass(settings.topNavItemClass);
                    topnavitemlink = topnavitem.find(":tabbable:first");
                    topnavitempanel = topnavitem.children(":not(:tabbable):last");
                    _addUniqueId.call(that, topnavitemlink);
                    if (topnavitempanel.length) {
                        _addUniqueId.call(that, topnavitempanel);
                        topnavitemlink.attr({
                            "aria-controls": topnavitempanel.attr("id"),
                            "aria-expanded": false,
                            "tabindex": 0
                        });
                        topnavitempanel.attr({
                            "role": "region",
                            "aria-expanded": false,
                            "aria-hidden": true
                        }).addClass(settings.panelClass).not("[aria-labelledby]").attr("aria-labelledby", topnavitemlink.attr("id"));
                    }
                });
                this.panels = menu.find("." + settings.panelClass);
                menu.find("hr").attr("role", "separator");
                toggleButton.addClass(settings.toggleButtonClass);
                toggleButton.attr({
                    'aria-expanded': false,
                    'aria-pressed': false,
                    'aria-controls': menu.attr('id')
                });
                _addEventHandlers.call(this);
            },
            destroy: function() {
                this.menu.removeClass(['js', this.settings.menuClass].join('-'));
                _removeEventHandlers.call(this, true);
            },
            getDefaults: function() {
                return this._defaults;
            },
            getOption: function(opt) {
                return this.settings[opt];
            },
            getAllOptions: function() {
                return this.settings;
            },
            setOption: function(opt, value, reinitialize) {
                this.settings[opt] = value;
                if (reinitialize)
                    this.init();
            }
        };
    }());
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            var pluginInstance = $.data(this, "plugin_" + pluginName);
            if (!pluginInstance)
                $.data(this, "plugin_" + pluginName, new $.fn[pluginName].AccessibleMegaMenu(this,options));
            else {
                if (typeof pluginInstance[options] === 'function')
                    pluginInstance[options].apply(pluginInstance, Array.prototype.slice.call(arguments, 1));
            }
        });
    }
    ;
    $.fn[pluginName].AccessibleMegaMenu = AccessibleMegaMenu;
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map")
                return false;
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
    }
    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName);
            }
            ;
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3]);
        }
        ,
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex")
              , isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
}(jQuery, window, document));
;(function($, Drupal) {
    Drupal.behaviors.alignSearchBox = {
        attach: function(context, settings) {
            $(document).ready(function() {
                $('.pup-site-header-search-block.pup-search-box-hidden').removeClass('pup-search-box-hidden');
            });
        }
    };
    Drupal.behaviors.handleLanguageSwitcher = {
        attach: function(context, settings) {
            once('lang-switcher', 'body', context).forEach(function() {
                var $langSwitch = $('#block-languageswitcher').wrap('<li></li>').parent();
                var currentLanguage = getLanguageCode();
                $langSwitch.insertAfter('#block-pup-irs-informationmenu-2 > ul li:nth-child(2)');
                if ($('#block-pup-irs-infomenumobile #block-languageswitcher').length < 1) {
                    $clonedLangSwitch = $langSwitch.clone();
                    $originalLangSwitchButton = $clonedLangSwitch.find('button#languageSwitcher');
                    if ($originalLangSwitchButton) {
                        var originalLangSwitchButtonID = $originalLangSwitchButton.attr("id");
                        var newLangSwitchButtonID = originalLangSwitchButtonID + "--2";
                        $originalLangSwitchButton.attr('id', newLangSwitchButtonID);
                    }
                    $originalLangSwitchUL = $clonedLangSwitch.find('ul[aria-labelledby="languageSwitcher"]');
                    if ($originalLangSwitchButton && $originalLangSwitchUL) {
                        var originalLangSwitchULAriaLabel = $originalLangSwitchUL.attr("aria-labelledby");
                        var newLangSwitchULAriaLabel = originalLangSwitchULAriaLabel + "--2";
                        $originalLangSwitchUL.attr('aria-labelledby', newLangSwitchULAriaLabel);
                    }
                    $clonedLangSwitch.insertAfter('#block-pup-irs-infomenumobile ul.nav > li:nth-child(2)');
                }
                $('.dropdown.pup-switch-hidden').removeClass('pup-switch-hidden');
            });
            $('#block-languageswitcher ul li').each(function() {
                var language = $(this).attr('class');
                add508Attribute($(this).find('a'), language);
            });
        }
    };
    function add508Attribute(element, language) {
        var languages = {};
        languages['en'] = 'English';
        languages['es'] = 'Español';
        languages['zh-hans'] = '中文 (简体)';
        languages['zh-hant'] = '中文 (繁體)';
        languages['ko'] = '한국어';
        languages['ru'] = 'Русский';
        languages['vi'] = 'Tiếng Việt';
        languages['ht'] = 'Kreyòl ayisyen';
    }
    function getLanguageCode() {
        var currentLanguage = $('#block-pup-irs-informationmenu-2').attr('class').split('-');
        if (currentLanguage.length == 4)
            return currentLanguage[2] + '-' + currentLanguage[3];
        else
            return currentLanguage[2];
    }
}
)(jQuery, Drupal, once);
;!function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(d) {
    "use strict";
    var s, l = window.Slick || {};
    s = 0,
    (l = function(i, e) {
        var t, o = this;
        o.defaults = {
            adaptiveHeight: !1,
            appendArrows: d(i),
            appendDots: d(i),
            arrows: !0,
            arrowsPlacement: null,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" type="button"><span class="slick-prev-icon" aria-hidden="true"></span><span class="slick-sr-only">Previous</span></button>',
            nextArrow: '<button class="slick-next" type="button"><span class="slick-next-icon" aria-hidden="true"></span><span class="slick-sr-only">Next</span></button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(i, e) {
                return d('<button type="button"><span class="slick-dot-icon" aria-hidden="true"></span><span class="slick-sr-only">Go to slide ' + (e + 1) + "</span></button>")
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            infinite: !0,
            initialSlide: 0,
            instructionsText: null,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            playIcon: '<span class="slick-play-icon" aria-hidden="true"></span>',
            pauseIcon: '<span class="slick-pause-icon" aria-hidden="true"></span>',
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            regionLabel: "carousel",
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useAutoplayToggleButton: !0,
            useCSS: !0,
            useGroupRole: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        },
        o.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            $instructionsText: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $pauseButton: null,
            $pauseIcon: null,
            $playIcon: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        },
        d.extend(o, o.initials),
        o.activeBreakpoint = null,
        o.animType = null,
        o.animProp = null,
        o.breakpoints = [],
        o.breakpointSettings = [],
        o.cssTransitions = !1,
        o.focussed = !1,
        o.interrupted = !1,
        o.hidden = "hidden",
        o.paused = !0,
        o.positionProp = null,
        o.respondTo = null,
        o.rowCount = 1,
        o.shouldClick = !0,
        o.$slider = d(i),
        o.$slidesCache = null,
        o.transformType = null,
        o.transitionType = null,
        o.visibilityChange = "visibilitychange",
        o.windowWidth = 0,
        o.windowTimer = null,
        t = d(i).data("slick") || {},
        o.options = d.extend({}, o.defaults, e, t),
        o.currentSlide = o.options.initialSlide,
        o.originalSettings = o.options,
        void 0 !== document.mozHidden ? (o.hidden = "mozHidden",
        o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden",
        o.visibilityChange = "webkitvisibilitychange"),
        o.autoPlay = d.proxy(o.autoPlay, o),
        o.autoPlayClear = d.proxy(o.autoPlayClear, o),
        o.autoPlayIterator = d.proxy(o.autoPlayIterator, o),
        o.autoPlayToggleHandler = d.proxy(o.autoPlayToggleHandler, o),
        o.changeSlide = d.proxy(o.changeSlide, o),
        o.clickHandler = d.proxy(o.clickHandler, o),
        o.selectHandler = d.proxy(o.selectHandler, o),
        o.setPosition = d.proxy(o.setPosition, o),
        o.swipeHandler = d.proxy(o.swipeHandler, o),
        o.dragHandler = d.proxy(o.dragHandler, o),
        o.instanceUid = s++,
        o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
        o.registerBreakpoints(),
        o.init(!0)
    }
    ).prototype.addSlide = l.prototype.slickAdd = function(i, e, t) {
        var o = this;
        if ("boolean" == typeof e)
            t = e,
            e = null;
        else if (e < 0 || e >= o.slideCount)
            return !1;
        o.unload(),
        "number" == typeof e ? 0 === e && 0 === o.$slides.length ? d(i).appendTo(o.$slideTrack) : t ? d(i).insertBefore(o.$slides.eq(e)) : d(i).insertAfter(o.$slides.eq(e)) : !0 === t ? d(i).prependTo(o.$slideTrack) : d(i).appendTo(o.$slideTrack),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slides.each(function(i, e) {
            d(e).attr("data-slick-index", i),
            d(e).attr("role", "group"),
            d(e).attr("aria-label", "slide " + i)
        }),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    l.prototype.animateHeight = function() {
        var i, e = this;
        1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical && (i = e.$slides.eq(e.currentSlide).outerHeight(!0),
        e.$list.animate({
            height: i
        }, e.options.speed))
    }
    ,
    l.prototype.animateSlide = function(i, e) {
        var t = {}
          , o = this;
        o.animateHeight(),
        !0 === o.options.rtl && !1 === o.options.vertical && (i = -i),
        !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: i
        }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
            top: i
        }, o.options.speed, o.options.easing, e) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
        d({
            animStart: o.currentLeft
        }).animate({
            animStart: i
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(i) {
                i = Math.ceil(i),
                !1 === o.options.vertical ? t[o.animType] = "translate(" + i + "px, 0px)" : t[o.animType] = "translate(0px," + i + "px)",
                o.$slideTrack.css(t)
            },
            complete: function() {
                e && e.call()
            }
        })) : (o.applyTransition(),
        i = Math.ceil(i),
        !1 === o.options.vertical ? t[o.animType] = "translate3d(" + i + "px, 0px, 0px)" : t[o.animType] = "translate3d(0px," + i + "px, 0px)",
        o.$slideTrack.css(t),
        e && setTimeout(function() {
            o.disableTransition(),
            e.call()
        }, o.options.speed))
    }
    ,
    l.prototype.getNavTarget = function() {
        var i = this.options.asNavFor;
        return i && null !== i && (i = d(i).not(this.$slider)),
        i
    }
    ,
    l.prototype.asNavFor = function(e) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = d(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }
    ,
    l.prototype.applyTransition = function(i) {
        var e = this
          , t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    l.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }
    ,
    l.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }
    ,
    l.prototype.autoPlayIterator = function() {
        var i = this
          , e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll,
        i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e))
    }
    ,
    l.prototype.autoPlayToggleHandler = function() {
        var i = this;
        i.paused ? (i.$playIcon.css("display", "none"),
        i.$pauseIcon.css("display", "inline"),
        i.$pauseButton.find(".slick-play-text").attr("style", "display: none"),
        i.$pauseButton.find(".slick-pause-text").removeAttr("style"),
        i.slickPlay()) : (i.$playIcon.css("display", "inline"),
        i.$pauseIcon.css("display", "none"),
        i.$pauseButton.find(".slick-play-text").removeAttr("style"),
        i.$pauseButton.find(".slick-pause-text").attr("style", "display: none"),
        i.slickPause())
    }
    ,
    l.prototype.buildArrows = function() {
        var i = this;
        if (!0 === i.options.arrows)
            if (i.$prevArrow = d(i.options.prevArrow).addClass("slick-arrow"),
            i.$nextArrow = d(i.options.nextArrow).addClass("slick-arrow"),
            i.slideCount > i.options.slidesToShow) {
                if (i.htmlExpr.test(i.options.prevArrow))
                    if (null != i.options.arrowsPlacement)
                        switch (i.options.arrowsPlacement) {
                        case "beforeSlides":
                        case "split":
                            i.$prevArrow.prependTo(i.options.appendArrows);
                            break;
                        case "afterSlides":
                            i.$prevArrow.appendTo(i.options.appendArrows)
                        }
                    else
                        i.$prevArrow.prependTo(i.options.appendArrows);
                if (i.htmlExpr.test(i.options.nextArrow))
                    if (null != i.options.arrowsPlacement)
                        switch (i.options.arrowsPlacement) {
                        case "beforeSlides":
                            i.$prevArrow.after(i.$nextArrow);
                            break;
                        case "afterSlides":
                        case "split":
                            i.$nextArrow.appendTo(i.options.appendArrows)
                        }
                    else
                        i.$nextArrow.appendTo(i.options.appendArrows);
                !0 !== i.options.infinite && i.$prevArrow.addClass("slick-disabled").prop("disabled", !0)
            } else
                i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").prop("disabled", !0)
    }
    ,
    l.prototype.buildDots = function() {
        var i, e, t = this;
        if (!0 === t.options.dots && t.slideCount > t.options.slidesToShow) {
            for (t.$slider.addClass("slick-dotted"),
            e = d("<ul />").addClass(t.options.dotsClass),
            i = 0; i <= t.getDotCount(); i += 1)
                e.append(d("<li />").append(t.options.customPaging.call(this, t, i)));
            t.$dots = e.appendTo(t.options.appendDots),
            t.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    l.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.$slides.each(function(i, e) {
            d(e).attr("data-slick-index", i).data("originalStyling", d(e).attr("style") || ""),
            t.options.useGroupRole && d(e).attr("role", "group").attr("aria-label", "slide " + (i + 1))
        }),
        t.$slider.addClass("slick-slider"),
        t.$slider.attr("role", "region"),
        t.$slider.attr("aria-label", t.options.regionLabel),
        t.$slider.attr("tabindex", -1),
        t.$slideTrack = 0 === t.slideCount ? d('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(),
        t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        t.$slideTrack.css("opacity", 0),
        !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1),
        d("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
        t.setupInfinite(),
        t.buildArrows(),
        t.buildDots(),
        t.updateDots(),
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
        !0 === t.options.draggable && t.$list.addClass("draggable"),
        t.options.autoplay && t.options.useAutoplayToggleButton && (t.$pauseIcon = d(t.options.pauseIcon).attr("aria-hidden", !0),
        t.$playIcon = d(t.options.playIcon).attr("aria-hidden", !0),
        t.$pauseButton = d('<button type="button" class="slick-autoplay-toggle-button">'),
        t.$pauseButton.append(t.$pauseIcon),
        t.$pauseButton.append(t.$playIcon.css("display", "none")),
        t.$pauseButton.append(d('<span class="slick-pause-text slick-sr-only">Pause</span>')),
        t.$pauseButton.append(d('<span class="slick-play-text slick-sr-only" style="display: none">Play</span>')),
        t.$pauseButton.prependTo(t.$slider)),
        null != t.options.instructionsText && "" != t.options.instructionsText && (t.$instructionsText = d('<p class="slick-instructions slick-sr-only">' + t.options.instructionsText + "</p>"),
        t.$instructionsText.prependTo(t.$slider))
    }
    ,
    l.prototype.buildRows = function() {
        var i, e, t, o = this, s = document.createDocumentFragment(), n = o.$slider.children();
        if (0 < o.options.rows) {
            for (t = o.options.slidesPerRow * o.options.rows,
            e = Math.ceil(n.length / t),
            i = 0; i < e; i++) {
                for (var l = document.createElement("div"), r = 0; r < o.options.rows; r++) {
                    for (var a = document.createElement("div"), d = 0; d < o.options.slidesPerRow; d++) {
                        var p = i * t + (r * o.options.slidesPerRow + d);
                        n.get(p) && a.appendChild(n.get(p))
                    }
                    l.appendChild(a)
                }
                s.appendChild(l)
            }
            o.$slider.empty().append(s),
            o.$slider.children().children().children().css({
                width: 100 / o.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    l.prototype.checkResponsive = function(i, e) {
        var t, o, s, n = this, l = !1, r = n.$slider.width(), a = window.innerWidth || d(window).width();
        if ("window" === n.respondTo ? s = a : "slider" === n.respondTo ? s = r : "min" === n.respondTo && (s = Math.min(a, r)),
        n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
            for (t in o = null,
            n.breakpoints)
                n.breakpoints.hasOwnProperty(t) && (!1 === n.originalSettings.mobileFirst ? s < n.breakpoints[t] && (o = n.breakpoints[t]) : s > n.breakpoints[t] && (o = n.breakpoints[t]));
            null !== o ? null !== n.activeBreakpoint && o === n.activeBreakpoint && !e || (n.activeBreakpoint = o,
            "unslick" === n.breakpointSettings[o] ? n.unslick(o) : (n.options = d.extend({}, n.originalSettings, n.breakpointSettings[o]),
            !0 === i && (n.currentSlide = n.options.initialSlide),
            n.refresh(i)),
            l = o) : null !== n.activeBreakpoint && (n.activeBreakpoint = null,
            n.options = n.originalSettings,
            !0 === i && (n.currentSlide = n.options.initialSlide),
            n.refresh(i),
            l = o),
            i || !1 === l || n.$slider.trigger("breakpoint", [n, l])
        }
    }
    ,
    l.prototype.changeSlide = function(i, e) {
        var t, o, s = this, n = d(i.currentTarget);
        switch (n.is("a") && i.preventDefault(),
        n.is("li") || (n = n.closest("li")),
        t = s.slideCount % s.options.slidesToScroll != 0 ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll,
        i.data.message) {
        case "previous":
            o = 0 == t ? s.options.slidesToScroll : s.options.slidesToShow - t,
            s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, e);
            break;
        case "next":
            o = 0 == t ? s.options.slidesToScroll : t,
            s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, e);
            break;
        case "index":
            var l = 0 === i.data.index ? 0 : i.data.index || n.index() * s.options.slidesToScroll;
            s.slideHandler(s.checkNavigable(l), !1, e),
            n.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    l.prototype.checkNavigable = function(i) {
        var e = this.getNavigableIndexes()
          , t = 0;
        if (i > e[e.length - 1])
            i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }
    ,
    l.prototype.cleanUpEvents = function() {
        var i = this;
        i.options.autoplay && i.options.useAutoplayToggleButton && i.$pauseButton.off("click.slick", i.autoPlayToggleHandler),
        i.options.dots && null !== i.$dots && d("li", i.$dots).off("click.slick", i.changeSlide).off("mouseenter.slick", d.proxy(i.interrupt, i, !0)).off("mouseleave.slick", d.proxy(i.interrupt, i, !1)),
        i.$slider.off("focus.slick blur.slick"),
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide),
        i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)),
        i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler),
        i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler),
        i.$list.off("touchend.slick mouseup.slick", i.swipeHandler),
        i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler),
        i.$list.off("click.slick", i.clickHandler),
        d(document).off(i.visibilityChange, i.visibility),
        i.cleanUpSlideEvents(),
        d(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange),
        d(window).off("resize.slick.slick-" + i.instanceUid, i.resize),
        d("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault),
        d(window).off("load.slick.slick-" + i.instanceUid, i.setPosition)
    }
    ,
    l.prototype.cleanUpSlideEvents = function() {
        var i = this;
        i.$list.off("mouseenter.slick", d.proxy(i.interrupt, i, !0)),
        i.$list.off("mouseleave.slick", d.proxy(i.interrupt, i, !1))
    }
    ,
    l.prototype.cleanUpRows = function() {
        var i;
        0 < this.options.rows && ((i = this.$slides.children().children()).removeAttr("style"),
        this.$slider.empty().append(i))
    }
    ,
    l.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(),
        i.stopPropagation(),
        i.preventDefault())
    }
    ,
    l.prototype.destroy = function(i) {
        var e = this;
        e.autoPlayClear(),
        e.touchObject = {},
        e.cleanUpEvents(),
        d(".slick-cloned", e.$slider).detach(),
        e.options.autoplay && e.options.useAutoplayToggleButton && e.$pauseButton.remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").prop("disabled", !1).css("display", ""),
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()),
        e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").prop("disabled", !1).css("display", ""),
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()),
        e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            d(this).attr("style", d(this).data("originalStyling"))
        }),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slideTrack.detach(),
        e.$list.detach(),
        e.$slider.append(e.$slides)),
        e.cleanUpRows(),
        e.$slider.removeClass("slick-slider"),
        e.$slider.removeClass("slick-initialized"),
        e.$slider.removeClass("slick-dotted"),
        e.unslicked = !0,
        i || e.$slider.trigger("destroy", [e])
    }
    ,
    l.prototype.disableTransition = function(i) {
        var e = {};
        e[this.transitionType] = "",
        !1 === this.options.fade ? this.$slideTrack.css(e) : this.$slides.eq(i).css(e)
    }
    ,
    l.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }),
        t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i),
        t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }),
        e && setTimeout(function() {
            t.disableTransition(i),
            e.call()
        }, t.options.speed))
    }
    ,
    l.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i),
        e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }
    ,
    l.prototype.filterSlides = l.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides,
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(i).appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    l.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(i) {
            var e = d(this);
            setTimeout(function() {
                t.options.pauseOnFocus && e.is(":focus") && (t.focussed = !0,
                t.autoPlay())
            }, 0)
        }).on("blur.slick", "*", function(i) {
            d(this);
            t.options.pauseOnFocus && (t.focussed = !1,
            t.autoPlay())
        })
    }
    ,
    l.prototype.getCurrent = l.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    l.prototype.getDotCount = function() {
        var i = this
          , e = 0
          , t = 0
          , o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow)
                ++o;
            else
                for (; e < i.slideCount; )
                    ++o,
                    e = t + i.options.slidesToScroll,
                    t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode)
            o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount; )
                ++o,
                e = t + i.options.slidesToScroll,
                t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else
            o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }
    ,
    l.prototype.getLeft = function(i) {
        var e, t, o, s, n = this, l = 0;
        return n.slideOffset = 0,
        t = n.$slides.first().outerHeight(!0),
        !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
        s = -1,
        !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)),
        l = t * n.options.slidesToShow * s),
        n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (l = i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1,
        (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
        n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth,
        l = (i + n.options.slidesToShow - n.slideCount) * t),
        n.slideCount <= n.options.slidesToShow && (l = n.slideOffset = 0),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0,
        n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
        e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + l,
        !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        e += (n.$list.width() - o.outerWidth()) / 2)),
        e
    }
    ,
    l.prototype.getOption = l.prototype.slickGetOption = function(i) {
        return this.options[i]
    }
    ,
    l.prototype.getNavigableIndexes = function() {
        for (var i = this, e = 0, t = 0, o = [], s = !1 === i.options.infinite ? i.slideCount : (e = -1 * i.options.slidesToScroll,
        t = -1 * i.options.slidesToScroll,
        2 * i.slideCount); e < s; )
            o.push(e),
            e = t + i.options.slidesToScroll,
            t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        return o
    }
    ,
    l.prototype.getSlick = function() {
        return this
    }
    ,
    l.prototype.getSlideCount = function() {
        var s, n = this, i = !0 === n.options.centerMode ? Math.floor(n.$list.width() / 2) : 0, l = -1 * n.swipeLeft + i;
        return !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(i, e) {
            var t = d(e).outerWidth()
              , o = e.offsetLeft;
            if (!0 !== n.options.centerMode && (o += t / 2),
            l < o + t)
                return s = e,
                !1
        }),
        Math.abs(d(s).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }
    ,
    l.prototype.goTo = l.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }
    ,
    l.prototype.init = function(i) {
        var e = this;
        d(e.$slider).hasClass("slick-initialized") || (d(e.$slider).addClass("slick-initialized"),
        e.buildRows(),
        e.buildOut(),
        e.setProps(),
        e.startLoad(),
        e.loadSlider(),
        e.initializeEvents(),
        e.updateArrows(),
        e.updateDots(),
        e.checkResponsive(!0),
        e.focusHandler()),
        i && e.$slider.trigger("init", [e]),
        e.options.autoplay && (e.paused = !1,
        e.autoPlay()),
        e.updateSlideVisibility(),
        null != e.options.accessibility && console.warn("accessibility setting is no longer supported."),
        null != e.options.focusOnChange && console.warn("focusOnChange is no longer supported."),
        null != e.options.focusOnSelect && console.warn("focusOnSelect is no longer supported.")
    }
    ,
    l.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide),
        i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide))
    }
    ,
    l.prototype.initDotEvents = function() {
        var i = this;
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && d("li", i.$dots).on("click.slick", {
            message: "index"
        }, i.changeSlide),
        !0 === i.options.dots && !0 === i.options.pauseOnDotsHover && i.slideCount > i.options.slidesToShow && d("li", i.$dots).on("mouseenter.slick", d.proxy(i.interrupt, i, !0)).on("mouseleave.slick", d.proxy(i.interrupt, i, !1))
    }
    ,
    l.prototype.initSlideEvents = function() {
        var i = this;
        i.options.pauseOnHover && (i.$list.on("mouseenter.slick", d.proxy(i.interrupt, i, !0)),
        i.$list.on("mouseleave.slick", d.proxy(i.interrupt, i, !1)))
    }
    ,
    l.prototype.initializeEvents = function() {
        var i = this;
        i.initArrowEvents(),
        i.initDotEvents(),
        i.initSlideEvents(),
        i.options.autoplay && i.options.useAutoplayToggleButton && i.$pauseButton.on("click.slick", i.autoPlayToggleHandler),
        i.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, i.swipeHandler),
        i.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, i.swipeHandler),
        i.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, i.swipeHandler),
        i.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, i.swipeHandler),
        i.$list.on("click.slick", i.clickHandler),
        d(document).on(i.visibilityChange, d.proxy(i.visibility, i)),
        d(window).on("orientationchange.slick.slick-" + i.instanceUid, d.proxy(i.orientationChange, i)),
        d(window).on("resize.slick.slick-" + i.instanceUid, d.proxy(i.resize, i)),
        d("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault),
        d(window).on("load.slick.slick-" + i.instanceUid, i.setPosition),
        d(i.setPosition)
    }
    ,
    l.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(),
        i.$nextArrow.show()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }
    ,
    l.prototype.lazyLoad = function() {
        var i, e, t, n = this;
        function o(i) {
            d("img[data-lazy]", i).each(function() {
                var i = d(this)
                  , e = d(this).attr("data-lazy")
                  , t = d(this).attr("data-srcset")
                  , o = d(this).attr("data-sizes") || n.$slider.attr("data-sizes")
                  , s = document.createElement("img");
                s.onload = function() {
                    i.animate({
                        opacity: 0
                    }, 100, function() {
                        t && (i.attr("srcset", t),
                        o && i.attr("sizes", o)),
                        i.attr("src", e).animate({
                            opacity: 1
                        }, 200, function() {
                            i.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        n.$slider.trigger("lazyLoaded", [n, i, e])
                    })
                }
                ,
                s.onerror = function() {
                    i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, i, e])
                }
                ,
                s.src = e
            })
        }
        if (!0 === n.options.centerMode ? t = !0 === n.options.infinite ? (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (e = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
        n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (e = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
        t = Math.ceil(e + n.options.slidesToShow),
        !0 === n.options.fade && (0 < e && e--,
        t <= n.slideCount && t++)),
        i = n.$slider.find(".slick-slide").slice(e, t),
        "anticipated" === n.options.lazyLoad)
            for (var s = e - 1, l = t, r = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)
                s < 0 && (s = n.slideCount - 1),
                i = (i = i.add(r.eq(s))).add(r.eq(l)),
                s--,
                l++;
        o(i),
        n.slideCount <= n.options.slidesToShow ? o(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? o(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && o(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }
    ,
    l.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(),
        i.$slideTrack.css({
            opacity: 1
        }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }
    ,
    l.prototype.next = l.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    l.prototype.orientationChange = function() {
        this.checkResponsive(),
        this.setPosition()
    }
    ,
    l.prototype.pause = l.prototype.slickPause = function() {
        this.autoPlayClear(),
        this.paused = !0
    }
    ,
    l.prototype.play = l.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(),
        i.options.autoplay = !0,
        i.paused = !1,
        i.focussed = !1,
        i.interrupted = !1
    }
    ,
    l.prototype.postSlide = function(i) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, i]),
        e.animating = !1,
        e.slideCount > e.options.slidesToShow && e.setPosition(),
        e.swipeLeft = null,
        e.options.autoplay && e.autoPlay(),
        e.updateSlideVisibility())
    }
    ,
    l.prototype.prev = l.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    l.prototype.preventDefault = function(i) {
        i.preventDefault()
    }
    ,
    l.prototype.progressiveLazyLoad = function(i) {
        i = i || 1;
        var e, t, o, s, n, l = this, r = d("img[data-lazy]", l.$slider);
        r.length ? (e = r.first(),
        t = e.attr("data-lazy"),
        o = e.attr("data-srcset"),
        s = e.attr("data-sizes") || l.$slider.attr("data-sizes"),
        (n = document.createElement("img")).onload = function() {
            o && (e.attr("srcset", o),
            s && e.attr("sizes", s)),
            e.attr("src", t).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === l.options.adaptiveHeight && l.setPosition(),
            l.$slider.trigger("lazyLoaded", [l, e, t]),
            l.progressiveLazyLoad()
        }
        ,
        n.onerror = function() {
            i < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(i + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            l.$slider.trigger("lazyLoadError", [l, e, t]),
            l.progressiveLazyLoad())
        }
        ,
        n.src = t) : l.$slider.trigger("allImagesLoaded", [l])
    }
    ,
    l.prototype.refresh = function(i) {
        var e, t = this, o = t.slideCount - t.options.slidesToShow;
        !t.options.infinite && t.currentSlide > o && (t.currentSlide = o),
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
        e = t.currentSlide,
        t.destroy(!0),
        d.extend(t, t.initials, {
            currentSlide: e
        }),
        t.init(),
        i || t.changeSlide({
            data: {
                message: "index",
                index: e
            }
        }, !1)
    }
    ,
    l.prototype.registerBreakpoints = function() {
        var i, e, t, o = this, s = o.options.responsive || null;
        if ("array" === d.type(s) && s.length) {
            for (i in o.respondTo = o.options.respondTo || "window",
            s)
                if (t = o.breakpoints.length - 1,
                s.hasOwnProperty(i)) {
                    for (e = s[i].breakpoint; 0 <= t; )
                        o.breakpoints[t] && o.breakpoints[t] === e && o.breakpoints.splice(t, 1),
                        t--;
                    o.breakpoints.push(e),
                    o.breakpointSettings[e] = s[i].settings
                }
            o.breakpoints.sort(function(i, e) {
                return o.options.mobileFirst ? i - e : e - i
            })
        }
    }
    ,
    l.prototype.reinit = function() {
        var i = this;
        i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"),
        i.slideCount = i.$slides.length,
        i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll),
        i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0),
        i.registerBreakpoints(),
        i.setProps(),
        i.setupInfinite(),
        i.buildArrows(),
        i.updateArrows(),
        i.initArrowEvents(),
        i.buildDots(),
        i.updateDots(),
        i.initDotEvents(),
        i.cleanUpSlideEvents(),
        i.initSlideEvents(),
        i.checkResponsive(!1, !0),
        i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0),
        i.setPosition(),
        i.focusHandler(),
        i.paused = !i.options.autoplay,
        i.autoPlay(),
        i.$slider.trigger("reInit", [i])
    }
    ,
    l.prototype.resize = function() {
        var i = this;
        d(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay),
        i.windowDelay = window.setTimeout(function() {
            i.windowWidth = d(window).width(),
            i.checkResponsive(),
            i.unslicked || i.setPosition()
        }, 50))
    }
    ,
    l.prototype.removeSlide = l.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i,
        o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
            return !1;
        o.unload(),
        !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    l.prototype.setCSS = function(i) {
        var e, t, o = this, s = {};
        !0 === o.options.rtl && (i = -i),
        e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        s[o.positionProp] = i,
        !1 === o.transformsEnabled || (!(s = {}) === o.cssTransitions ? s[o.animType] = "translate(" + e + ", " + t + ")" : s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
        o.$slideTrack.css(s)
    }
    ,
    l.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow),
        !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })),
        i.listWidth = i.$list.width(),
        i.listHeight = i.$list.height(),
        !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow),
        i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth),
        i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }
    ,
    l.prototype.setFade = function() {
        var t, o = this;
        o.$slides.each(function(i, e) {
            t = o.slideWidth * i * -1,
            !0 === o.options.rtl ? d(e).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            }) : d(e).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            })
        }),
        o.$slides.eq(o.currentSlide).css({
            zIndex: o.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    l.prototype.setHeight = function() {
        var i, e = this;
        1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical && (i = e.$slides.eq(e.currentSlide).outerHeight(!0),
        e.$list.css("height", i))
    }
    ,
    l.prototype.setOption = l.prototype.slickSetOption = function() {
        var i, e, t, o, s, n = this, l = !1;
        if ("object" === d.type(arguments[0]) ? (t = arguments[0],
        l = arguments[1],
        s = "multiple") : "string" === d.type(arguments[0]) && (o = arguments[1],
        l = arguments[2],
        "responsive" === (t = arguments[0]) && "array" === d.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")),
        "single" === s)
            n.options[t] = o;
        else if ("multiple" === s)
            d.each(t, function(i, e) {
                n.options[i] = e
            });
        else if ("responsive" === s)
            for (e in o)
                if ("array" !== d.type(n.options.responsive))
                    n.options.responsive = [o[e]];
                else {
                    for (i = n.options.responsive.length - 1; 0 <= i; )
                        n.options.responsive[i].breakpoint === o[e].breakpoint && n.options.responsive.splice(i, 1),
                        i--;
                    n.options.responsive.push(o[e])
                }
        l && (n.unload(),
        n.reinit())
    }
    ,
    l.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(),
        i.$slider.trigger("setPosition", [i])
    }
    ,
    l.prototype.setProps = function() {
        var i = this
          , e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left",
        "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0),
        i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex),
        void 0 !== e.OTransform && (i.animType = "OTransform",
        i.transformType = "-o-transform",
        i.transitionType = "OTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.MozTransform && (i.animType = "MozTransform",
        i.transformType = "-moz-transform",
        i.transitionType = "MozTransition",
        void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
        void 0 !== e.webkitTransform && (i.animType = "webkitTransform",
        i.transformType = "-webkit-transform",
        i.transitionType = "webkitTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.msTransform && (i.animType = "msTransform",
        i.transformType = "-ms-transform",
        i.transitionType = "msTransition",
        void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform",
        i.transformType = "transform",
        i.transitionType = "transition"),
        i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }
    ,
    l.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this, l = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
        !1 !== n.options.useGroupRole && !0 === n.options.centerMode && (l = l.find("slick-slide").attr("aria-label", function() {
            return d(this).attr("aria-label").replace(" (centered)", "")
        })),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode ? (o = n.options.slidesToShow % 2 == 0 ? 1 : 0,
        s = Math.floor(n.options.slidesToShow / 2),
        !0 === n.options.infinite && (s <= i && i <= n.slideCount - 1 - s ? n.$slides.slice(i - s + o, i + s + 1).addClass("slick-active").removeAttr("aria-hidden") : (e = n.options.slidesToShow + i,
        l.slice(e - s + 1 + o, e + s + 2).addClass("slick-active").removeAttr("aria-hidden")),
        0 === i ? l.eq(n.options.slidesToShow + n.slideCount + 1).addClass("slick-center").attr("aria-label", function() {
            return d(this).attr("aria-label") + " (centered)"
        }) : i === n.slideCount - 1 && l.eq(n.options.slidesToShow).addClass("slick-center").attr("aria-label", function() {
            return d(this).attr("aria-label") + " (centered)"
        })),
        n.$slides.eq(i).addClass("slick-center").attr("aria-label", function() {
            return d(this).attr("aria-label") + " (centered)"
        })) : 0 <= i && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").removeAttr("aria-hidden") : l.length <= n.options.slidesToShow ? l.addClass("slick-active").removeAttr("aria-hidden") : (t = n.slideCount % n.options.slidesToShow,
        e = !0 === n.options.infinite ? n.options.slidesToShow + i : i,
        n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? l.slice(e - (n.options.slidesToShow - t), e + t).addClass("slick-active").removeAttr("aria-hidden") : l.slice(e, e + n.options.slidesToShow).addClass("slick-active").removeAttr("aria-hidden")),
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }
    ,
    l.prototype.setupInfinite = function() {
        var i, e, t, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1),
        !0 === o.options.infinite && !1 === o.options.fade && (e = null,
        o.slideCount > o.options.slidesToShow)) {
            for (t = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow,
            i = o.slideCount; i > o.slideCount - t; --i)
                e = i - 1,
                d(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (i = 0; i < t + o.slideCount; i += 1)
                e = i,
                d(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                d(this).attr("id", "")
            })
        }
    }
    ,
    l.prototype.interrupt = function(i) {
        i || this.autoPlay(),
        this.interrupted = i
    }
    ,
    l.prototype.selectHandler = function(i) {
        var e = d(i.target).is(".slick-slide") ? d(i.target) : d(i.target).parents(".slick-slide")
          , t = (t = parseInt(e.attr("data-slick-index"))) || 0;
        this.slideCount <= this.options.slidesToShow ? this.slideHandler(t, !1, !0) : this.slideHandler(t)
    }
    ,
    l.prototype.slideHandler = function(i, e, t) {
        var o, s, n, l, r, a, d = this;
        if (e = e || !1,
        !(!0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === i))
            if (!1 === e && d.asNavFor(i),
            o = i,
            r = d.getLeft(o),
            l = d.getLeft(d.currentSlide),
            d.currentLeft = null === d.swipeLeft ? l : d.swipeLeft,
            !1 === d.options.infinite && !1 === d.options.centerMode && (i < 0 || i > d.getDotCount() * d.options.slidesToScroll))
                !1 === d.options.fade && (o = d.currentSlide,
                !0 !== t && d.slideCount > d.options.slidesToShow ? d.animateSlide(l, function() {
                    d.postSlide(o)
                }) : d.postSlide(o));
            else if (!1 === d.options.infinite && !0 === d.options.centerMode && (i < 0 || i > d.slideCount - d.options.slidesToScroll))
                !1 === d.options.fade && (o = d.currentSlide,
                !0 !== t && d.slideCount > d.options.slidesToShow ? d.animateSlide(l, function() {
                    d.postSlide(o)
                }) : d.postSlide(o));
            else {
                if (d.options.autoplay && clearInterval(d.autoPlayTimer),
                s = o < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : o - d.slideCount : o,
                d.animating = !0,
                d.$slider.trigger("beforeChange", [d, d.currentSlide, s]),
                n = d.currentSlide,
                d.currentSlide = s,
                d.setSlideClasses(d.currentSlide),
                d.options.asNavFor && (a = (a = d.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide),
                d.updateDots(),
                d.updateArrows(),
                !0 === d.options.fade)
                    return !0 !== t ? (d.fadeSlideOut(n),
                    d.fadeSlide(s, function() {
                        d.postSlide(s)
                    })) : d.postSlide(s),
                    void d.animateHeight();
                !0 !== t && d.slideCount > d.options.slidesToShow ? d.animateSlide(r, function() {
                    d.postSlide(s)
                }) : d.postSlide(s)
            }
    }
    ,
    l.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(),
        i.$nextArrow.hide()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
        i.$slider.addClass("slick-loading")
    }
    ,
    l.prototype.swipeDirection = function() {
        var i = this
          , e = i.touchObject.startX - i.touchObject.curX
          , t = i.touchObject.startY - i.touchObject.curY
          , o = Math.atan2(t, e)
          , s = Math.round(180 * o / Math.PI);
        return s < 0 && (s = 360 - Math.abs(s)),
        s <= 45 && 0 <= s || s <= 360 && 315 <= s ? !1 === i.options.rtl ? "left" : "right" : 135 <= s && s <= 225 ? !1 === i.options.rtl ? "right" : "left" : !0 === i.options.verticalSwiping ? 35 <= s && s <= 135 ? "down" : "up" : "vertical"
    }
    ,
    l.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1,
        o.swiping = !1,
        o.scrolling)
            return o.scrolling = !1;
        if (o.interrupted = !1,
        o.shouldClick = !(10 < o.touchObject.swipeLength),
        void 0 === o.touchObject.curX)
            return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e),
            o.touchObject = {},
            o.$slider.trigger("swipe", [o, t]))
        } else
            o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
            o.touchObject = {})
    }
    ,
    l.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend"in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
            switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1,
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
            !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
            }
    }
    ,
    l.prototype.swipeMove = function(i) {
        var e, t, o, s, n, l = this, r = void 0 !== i.originalEvent ? i.originalEvent.touches : null;
        return !(!l.dragging || l.scrolling || r && 1 !== r.length) && (e = l.getLeft(l.currentSlide),
        l.touchObject.curX = void 0 !== r ? r[0].pageX : i.clientX,
        l.touchObject.curY = void 0 !== r ? r[0].pageY : i.clientY,
        l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))),
        n = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))),
        !l.options.verticalSwiping && !l.swiping && 4 < n ? !(l.scrolling = !0) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = n),
        t = l.swipeDirection(),
        void 0 !== i.originalEvent && 4 < l.touchObject.swipeLength && (l.swiping = !0,
        i.preventDefault()),
        s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1),
        !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
        o = l.touchObject.swipeLength,
        (l.touchObject.edgeHit = !1) === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction,
        l.touchObject.edgeHit = !0),
        !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s,
        !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
        !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null,
        !1) : void l.setCSS(l.swipeLeft))))
    }
    ,
    l.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0,
        1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
            return !(t.touchObject = {});
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
        t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX,
        t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY,
        t.dragging = !0
    }
    ,
    l.prototype.unfilterSlides = l.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slidesCache.appendTo(i.$slideTrack),
        i.reinit())
    }
    ,
    l.prototype.unload = function() {
        var i = this;
        d(".slick-cloned", i.$slider).remove(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(),
        i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(),
        i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    l.prototype.unslick = function(i) {
        this.$slider.trigger("unslick", [this, i]),
        this.destroy()
    }
    ,
    l.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2);
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").prop("disabled", !1),
        i.$nextArrow.removeClass("slick-disabled").prop("disabled", !1),
        0 === i.currentSlide ? (document.activeElement === i.$prevArrow.get(0) && i.$slider.get(0).focus(),
        i.$prevArrow.addClass("slick-disabled").prop("disabled", !0),
        i.$nextArrow.removeClass("slick-disabled").prop("disabled", !1)) : (i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode || i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode) && (document.activeElement === i.$nextArrow.get(0) && i.$slider.get(0).focus(),
        i.$nextArrow.addClass("slick-disabled").prop("disabled", !0),
        i.$prevArrow.removeClass("slick-disabled").prop("disabled", !1)))
    }
    ,
    l.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").find("button").removeAttr("aria-current").end().end(),
        i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active").find("button").attr("aria-current", !0).end().end())
    }
    ,
    l.prototype.updateSlideVisibility = function() {
        this.$slideTrack.find(".slick-slide").attr("aria-hidden", "true").find("a, input, button, select").attr("tabindex", "-1"),
        this.$slideTrack.find(".slick-active").removeAttr("aria-hidden").find("a, input, button, select").removeAttr("tabindex")
    }
    ,
    l.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
    }
    ,
    d.fn.slick = function() {
        for (var i, e = this, t = arguments[0], o = Array.prototype.slice.call(arguments, 1), s = e.length, n = 0; n < s; n++)
            if ("object" == typeof t || void 0 === t ? e[n].slick = new l(e[n],t) : i = e[n].slick[t].apply(e[n].slick, o),
            void 0 !== i)
                return i;
        return e
    }
});
;(function($, Drupal) {
    Drupal.behaviors.homepageCarousels = {
        attach: function(context, settings) {
            var srPrevious = '<span class="slick-sr-only">' + Drupal.t('Previous') + '</span>';
            var srNext = '<span class="slick-sr-only">' + Drupal.t('Next') + '</span>';
            var dotTextPrefix = Drupal.t('Go to slide');
            $('#pup-homepage-tools').slick({
                arrows: true,
                draggable: false,
                dots: true,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                touchThreshold: 8,
                prevArrow: '<button class="slick-prev slick-arrow" type="button"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i>' + srPrevious + '</button>',
                nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i>' + srNext + '</button>',
                instructionsText: Drupal.t('Please use the Previous and Next buttons to navigate the interactive carousel.')
            });
            updateNavigationDots('#pup-homepage-tools');
            $('#pup-homepage-news').slick({
                arrows: true,
                draggable: false,
                dots: true,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                touchThreshold: 8,
                prevArrow: '<button class="slick-prev slick-arrow" type="button"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i>' + srPrevious + '</button>',
                nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i>' + srNext + '</button>',
                instructionsText: Drupal.t('Please use the Previous and Next buttons to navigate the interactive carousel.')
            });
            updateNavigationDots('#pup-homepage-news');
            function updateNavigationDots(carouselId) {
                var dotIndex = 1;
                $(carouselId + ' .pup-slick-slide').each(function(index) {
                    if (!$(this).parent().parent().hasClass('slick-cloned')) {
                        var dotText = dotTextPrefix + ' ' + dotIndex + ' : ' + $(this).attr('data-description');
                        $(carouselId + ' .slick-dots li:nth-child(' + dotIndex + ') .slick-sr-only').text(dotText);
                        dotIndex++;
                    }
                });
            }
        }
    };
}
)(jQuery, Drupal);
;(function($, Drupal) {
    Drupal.behaviors.ipsBehavior = {
        attach: function(context, settings) {
            'use strict';
            $(document).find('.ui-autocomplete-input').attr('placeholder', Drupal.t('Search'));
            $(document).find('#views-exposed-form-pup-spanish-index-search-spanish-search-srt-relevance .form-control').attr('placeholder', 'Buscar');
            $(document).find('#so-menu').change(function() {
                if ($(this).val() === 'Date') {
                    var $uhref = window.location.href;
                    var $uDatehref = $uhref.replace("site-index-search", "site-index-date-search");
                    window.location.replace($uDatehref);
                } else {
                    var $uhref = window.location.href;
                    var $uDatehref = $uhref.replace("site-index-date-search", "site-index-search");
                    window.location.replace($uDatehref);
                }
            });
            $(document).find('#so-mobile-menu').change(function() {
                if ($(this).val() === 'Date') {
                    var $uhref = window.location.href;
                    var $uDatehref = $uhref.replace("site-index-search", "site-index-date-search");
                    window.location.replace($uDatehref);
                } else {
                    var $uhref = window.location.href;
                    var $uDatehref = $uhref.replace("site-index-date-search", "site-index-search");
                    window.location.replace($uDatehref);
                }
            });
            $(document).find('#spo-menu').change(function() {
                if ($(this).val() === 'Date') {
                    var $uhref = window.location.href;
                    var $uDatehref = $uhref.replace("spanish-index-search", "spanish-index-date-search");
                    window.location.replace($uDatehref);
                } else {
                    var $uhref = window.location.href;
                    var $uDatehref = $uhref.replace("spanish-index-date-search", "spanish-index-search");
                    window.location.replace($uDatehref);
                }
            });
            $('#edit-sort-by', context).change(function() {
                if ($(this).val() === 'changed') {
                    var $uhref = window.location.href;
                    var $uDatehref = $uhref.replace("search_api_relevance", "changed");
                    window.location.replace($uDatehref);
                } else {
                    var $uhref = window.location.href;
                    var $uDatehref = $uhref.replace("changed", "search_api_relevance");
                    window.location.replace($uDatehref);
                }
            });
            $(document).find('#fnp-menu').change(function() {
                var $uhref = window.location.href;
                if ($(this).val() === 'Current') {
                    var $uDatehref = $uhref.replace("forms-pubs-prior-search", "forms-pubs-search");
                    $uDatehref = $uDatehref.replace("forms-pubs-accessible-search", "forms-pubs-search");
                    $uDatehref = $uDatehref.replace("forms-pubs-all-search", "forms-pubs-search");
                    window.location.replace($uDatehref);
                } else if ($(this).val() === 'Prior') {
                    var $uDatehref = $uhref.replace("forms-pubs-search", "forms-pubs-prior-search");
                    $uDatehref = $uDatehref.replace("forms-pubs-accessible-search", "forms-pubs-prior-search");
                    $uDatehref = $uDatehref.replace("forms-pubs-all-search", "forms-pubs-prior-search");
                    window.location.replace($uDatehref);
                } else if ($(this).val() === 'Accessible') {
                    var $uDatehref = $uhref.replace("forms-pubs-prior-search", "forms-pubs-accessible-search");
                    $uDatehref = $uDatehref.replace("forms-pubs-all-search", "forms-pubs-accessible-search");
                    $uDatehref = $uDatehref.replace("forms-pubs-search", "forms-pubs-accessible-search");
                    window.location.replace($uDatehref);
                } else {
                    if ($(this).val() === 'All') {
                        var $uDatehref = $uhref.replace("forms-pubs-accessible-search", "forms-pubs-all-search");
                        $uDatehref = $uDatehref.replace("forms-pubs-prior-search", "forms-pubs-all-search");
                        $uDatehref = $uDatehref.replace("forms-pubs-search", "forms-pubs-all-search");
                        window.location.replace($uDatehref);
                    }
                }
            });
            $(document).find('#efile-menu').change(function() {
                var $uhref = window.location.href;
                if ($(this).val() === 'Tax Professional') {
                    var $uDatehref = $uhref.replace("efile-index-taxpayer-search", "efile-index-taxpros-search");
                    window.location.replace($uDatehref);
                } else {
                    var $uDatehref = $uhref.replace("efile-index-taxpros-search", "efile-index-taxpayer-search");
                    window.location.replace($uDatehref);
                }
            });
            $(document).find('#efile-provider').attr("selected", "selected").change(function() {
                if ($(this).val() === 'ero') {
                    $(document).find('#edit-ero').val("1");
                    $(document).find('#edit-bureau').val("All");
                    $(document).find('#edit-developer').val("All");
                    $(document).find('#edit-transmitter').val("All");
                } else if ($(this).val() === 'bureau') {
                    $(document).find('#edit-ero').val("All");
                    $(document).find('#edit-bureau').val("1");
                    $(document).find('#edit-developer').val("All");
                    $(document).find('#edit-transmitter').val("All");
                } else if ($(this).val() === 'developer') {
                    $(document).find('#edit-ero').val("All");
                    $(document).find('#edit-bureau').val("All");
                    $(document).find('#edit-developer').val("1");
                    $(document).find('#edit-transmitter').val("All");
                } else if ($(this).val() === 'transmitter') {
                    $(document).find('#edit-ero').val("All");
                    $(document).find('#edit-bureau').val("All");
                    $(document).find('#edit-developer').val("All");
                    $(document).find('#edit-transmitter').val("1");
                } else {
                    $(document).find('#edit-ero').val("All");
                    $(document).find('#edit-bureau').val("All");
                    $(document).find('#edit-developer').val("All");
                    $(document).find('#edit-transmitter').val("All");
                }
            });
            if ($(".form-select").val() == "All") {
                $('#histCheck').attr("checked", "checked");
                $('#histCheckMobile').attr("checked", "checked");
            } else {
                $('#histCheck').prop('');
                $('#histCheckMobile').prop('');
            }
            $('#histCheck', context).on('click', function() {
                var $href = window.location.href;
                if ($('#histCheck').is(':checked'))
                    $href = $href.replace("l=1", "l=All").replace("l_1=1", "l_1=All");
                else
                    $href = $href.replace("l=All", "l=1").replace("l_1=All", "l_1=1");
                window.location.replace($href);
            });
            $('#histCheckMobile', context).on('click', function() {
                var href = window.location.href;
                if ($('#histCheckMobile').is(':checked'))
                    href = href.replace("field_pup_historical=1", "field_pup_historical=All").replace("field_pup_historical_1=1", "field_pup_historical_1=All");
                else
                    href = href.replace("field_pup_historical=All", "field_pup_historical=1").replace("field_pup_historical_1=All", "field_pup_historical_1=1");
                window.location.replace(href);
            });
            if ($(document).find(".form-item-field-pup-historical .form-select").val() == "All")
                $(document).find('#histCheckNews').attr("checked", "checked");
            $(document).find('#histCheckNews').click(function() {
                var histOpt = $(".form-item-field-pup-historical .form-select");
                $(document).find(histOpt).val('All');
                if ($(document).find('#histCheckNews').is(':checked') == false)
                    $(document).find(histOpt).val("1");
                if ($(document).find("#views-exposed-form-pup-newsroom-index-search-newsroom-search-block").length)
                    $(document).find("#views-exposed-form-pup-newsroom-index-search-newsroom-search-block").submit();
                else if ($(document).find("#views-exposed-form-pup-newsroom-index-search-newsroom-spanish-search-block").length)
                    $(document).find("#views-exposed-form-pup-newsroom-index-search-newsroom-spanish-search-block").submit();
                else
                    $(document).find("#pup-newsroom").submit();
            });
            $('#histCheckTax').change(function() {
                if ($(this).is(':checked')) {
                    var $uhref = window.location.href;
                    var $uAllhref = $uhref.replace("tax-pros-index-search", "tax-pros-index-all-search");
                    window.location.replace($uAllhref);
                } else {
                    var $uhref = window.location.href;
                    var $uAllhref = $uhref.replace("tax-pros-index-all-search", "tax-pros-index-search");
                    window.location.replace($uAllhref);
                }
            });
        }
    };
    Drupal.behaviors.searchForm = {
        attach: function(context, settings) {
            var $searchForm = $(context).find('#views-exposed-form-pup-site-index-search-site-search-srt-relevance #search-main');
            $searchForm.first().val("");
            var $mobileSearchForm = $(context).find('#views-exposed-form-pup-site-index-search-site-search-srt-relevance [data-drupal-selector="edit-search"]');
            $mobileSearchForm.first().val("");
        }
    };
    if ($('#solr-results-summary').length != 0) {
        var solrResultsText = $('#solr-results-summary').html();
        setTimeout(function() {
            $('#solr-results-summary').html(solrResultsText + ' ');
        }, 4000);
    }
}
)(jQuery, Drupal);
;+(function($) {
    'use strict';
    var trigger = $('.pup-filter-results')
      , overlay = $('.overlay')
      , child = $('.pup-filter-results i')
      , isClosed = false;
    trigger.click(function() {
        toggleDrawerElems();
    });
    function toggleDrawerElems() {
        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            child.removeClass('fa-chevron-down');
            child.addClass('fa-chevron-up');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            child.removeClass('fa-chevron-up');
            child.addClass('fa-chevron-down');
            isClosed = true;
        }
    }
    $('[data-toggle="offcanvas"]').click(function() {
        $('#sidebar-wrapper').toggleClass('pup-toggle-facets');
        $(this).toggleClass('pup-toggle-facets-button');
    });
}
)(jQuery);
;