// Shows one language at a time, and marks where the reader is in the policy.
//
// The address chooses the language: #vi (App Store Connect's Vietnamese links)
// or any anchor inside the Vietnamese half. Without one, the browser's own
// language decides. Nothing is stored. Without this script both halves show,
// one after the other.
(function () {
  "use strict";

  var root = document.documentElement;
  var halves = {
    en: document.querySelector('article[data-lang="en"]'),
    vi: document.querySelector('article[data-lang="vi"]')
  };
  if (!halves.en || !halves.vi) return;

  var titles = { en: document.title, vi: root.getAttribute("data-title-vi") || document.title };
  var current = null;

  function fromAddress() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id === "en" || id === "vi") return id;
    var target = id && document.getElementById(id);
    if (!target) return null;
    if (halves.vi.contains(target)) return "vi";
    if (halves.en.contains(target)) return "en";
    return null;
  }

  function fromBrowser() {
    var languages = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < languages.length; i++) {
      if (/^vi\b/i.test(languages[i])) return "vi";
      if (/^en\b/i.test(languages[i])) return "en";
    }
    return "en";
  }

  function show(language) {
    if (language === current) return;
    current = language;
    root.setAttribute("data-show", language);
    root.lang = language;
    document.title = titles[language];

    document.querySelectorAll(".lang a").forEach(function (link) {
      link.setAttribute("aria-current", link.getAttribute("hreflang") === language ? "true" : "false");
    });
    // Links to the other page keep the language: data-href-vi holds its Vietnamese address.
    document.querySelectorAll("[data-href-vi]").forEach(function (link) {
      if (!link.hasAttribute("data-href-en")) link.setAttribute("data-href-en", link.getAttribute("href"));
      link.setAttribute("href", link.getAttribute("data-href-" + language));
    });
    observeSections();
  }

  // A new language starts from the top of its page, or at the anchor asked for.
  // Instant: the page under it has just changed, so there is nothing to glide over.
  function settle() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id === "en" || id === "vi") {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (id && document.getElementById(id)) {
      document.getElementById(id).scrollIntoView({ behavior: "instant" });
    }
  }

  // The table of contents follows the section being read.
  var observer = null;
  function observeSections() {
    if (observer) observer.disconnect();
    if (!("IntersectionObserver" in window)) return;
    var half = halves[current];
    var links = half.querySelectorAll(".toc a[href^='#']");
    if (!links.length) return;
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });
    var visible = {};
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      var first = null;
      half.querySelectorAll(".prose section[id]").forEach(function (section) {
        if (!first && visible[section.id]) first = section.id;
      });
      if (!first) return;
      links.forEach(function (link) { link.setAttribute("aria-current", "false"); });
      if (byId[first]) byId[first].setAttribute("aria-current", "true");
    }, { rootMargin: "-80px 0px -55% 0px" });
    half.querySelectorAll(".prose section[id]").forEach(function (section) { observer.observe(section); });
  }

  root.classList.add("js");
  show(fromAddress() || fromBrowser());
  settle();

  window.addEventListener("hashchange", function () {
    var language = fromAddress();
    if (language && language !== current) {
      show(language);
      settle();
    }
  });

  // The contents stay open beside the policy on a wide screen, and fold into
  // one line above it on a narrow one; a section picked there folds them again.
  var wide = window.matchMedia("(min-width: 1080px)");
  function fitContents() {
    document.querySelectorAll(".toc details").forEach(function (details) { details.open = wide.matches; });
  }
  fitContents();
  if (wide.addEventListener) wide.addEventListener("change", fitContents);
  document.querySelectorAll(".toc a").forEach(function (link) {
    link.addEventListener("click", function () {
      var details = link.closest("details");
      if (details && !wide.matches) details.open = false;
    });
  });
})();
