(function () {
  var big = document.querySelector(".mk.big");
  var stage = document.getElementById("stage");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function run() {
    if (!big) return;
    big.classList.remove("run");
    void big.offsetWidth;
    big.classList.add("run");
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (big) big.classList.add("run");
  } else {
    run();
  }

  document.querySelectorAll("[data-piece]").forEach(function (el) {
    var key = el.getAttribute("data-piece");
    if (!key || !stage) return;
    function on() { stage.classList.add("lit-" + key); }
    function off() { stage.classList.remove("lit-" + key); }
    el.addEventListener("mouseenter", on);
    el.addEventListener("mouseleave", off);
    el.addEventListener("focus", on);
    el.addEventListener("blur", off);
  });

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setNav(open);
      if (open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setNav(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      var dialog = document.getElementById(button.getAttribute("data-open"));
      if (dialog && dialog.showModal) dialog.showModal();
    });
  });

  document.querySelectorAll("dialog").forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog || event.target.closest("[data-close]")) dialog.close();
    });
  });
})();
