!function() {
    var e, t, s, n, i, a, c = window.settings.zendesk_chat.key;
    if (void 0 === c)
        throw "Missing Zendesk Chat credentials";
    window.zE || (e = document,
    t = "script",
    s = c,
    n = window.zE = window.zEmbed = function() {
        n._.push(arguments)
    }
    ,
    i = n.s = e.createElement(t),
    a = e.getElementsByTagName(t)[0],
    n.set = function(e) {
        n.set._.push(e)
    }
    ,
    n._ = [],
    n.set._ = [],
    i.async = !0,
    i.setAttribute("charset", "utf-8"),
    i.src = "https://static.zdassets.com/ekr/asset_composer.js?key=" + s,
    n.t = +new Date,
    i.type = "text/javascript",
    a.parentNode.insertBefore(i, a))
}();
