(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Starfield: ligero, se pausa cuando no se ve ---------- */

  var canvas = document.getElementById("starfield");

  function initStarfield() {
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var stars = [];
    var raf = null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      build();
    }

    function build() {
      var count = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 14000));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: (Math.random() * 1.1 + 0.3) * dpr,
          a: Math.random() * 0.5 + 0.15,
          tw: Math.random() * 0.02 + 0.004
        });
      }
    }

    var t = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var alpha = s.a + Math.sin(t * s.tw) * 0.12;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.7, alpha));
        ctx.fillStyle = "#aab3bf";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y -= 0.03 * dpr;
        if (s.y < -2) s.y = canvas.height + 2;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!document.hidden && !raf && !reduceMotion) {
        raf = requestAnimationFrame(draw);
      }
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });

    resize();
    draw();
  }

  initStarfield();

  /* ---------- Maqueta del agente: tareas resolviéndose en bucle ---------- */

  function initDemo() {
    var tasks = Array.prototype.slice.call(document.querySelectorAll("[data-task]"));
    var status = document.getElementById("demo-status");
    if (!tasks.length) return;

    if (reduceMotion) {
      tasks.forEach(function (t) { t.classList.add("is-done"); });
      if (status) status.textContent = "completado";
      return;
    }

    var i = 0;
    var HOLD_DONE = 2200;

    function step() {
      if (i > 0) tasks[i - 1].classList.replace("is-active", "is-done");
      if (i >= tasks.length) {
        if (status) status.textContent = "completado";
        setTimeout(function () {
          tasks.forEach(function (t) { t.classList.remove("is-done", "is-active"); });
          i = 0;
          if (status) status.textContent = "procesando";
          setTimeout(step, 600);
        }, HOLD_DONE);
        return;
      }
      tasks[i].classList.add("is-active");
      i += 1;
      setTimeout(step, 1400);
    }

    setTimeout(step, 800);
  }

  initDemo();

  /* ---------- Navegación móvil ---------- */

  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Cerrar menú de navegación" : "Abrir menú de navegación"
      );
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  initNav();

  /* ---------- Formulario: validación inline + estados ---------- */

  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");
    var submit = form.querySelector(".btn-submit");

    var rules = {
      nombre: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      mensaje: function (v) { return v.trim().length >= 10; }
    };

    function fieldByName(name) {
      return form.querySelector('[name="' + name + '"]');
    }

    function errorByName(name) {
      return document.getElementById("e-" + name);
    }

    function validate(name, touched) {
      var input = fieldByName(name);
      var error = errorByName(name);
      if (!input || !rules[name]) return true;
      var ok = rules[name](input.value);
      if (!touched && ok) return ok;
      if (!touched && !ok) return ok;
      input.setAttribute("aria-invalid", String(!ok));
      if (error) error.hidden = ok;
      return ok;
    }

    Object.keys(rules).forEach(function (name) {
      var input = fieldByName(name);
      if (!input) return;
      input.addEventListener("blur", function () { validate(name, true); });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validate(name, true);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        var ok = validate(name, true);
        if (!ok && !firstBad) firstBad = fieldByName(name);
      });
      if (firstBad) {
        firstBad.focus();
        setStatus("Revisa los campos marcados antes de enviar.", "is-error");
        return;
      }

      submit.disabled = true;
      setStatus("Enviando…", "");

      var payload = {
        nombre: form.nombre.value.trim(),
        email: form.email.value.trim(),
        empresa: form.empresa.value.trim(),
        mensaje: form.mensaje.value.trim()
      };

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("http " + res.status);
          return res.json();
        })
        .then(function () {
          form.reset();
          Object.keys(rules).forEach(function (name) {
            var input = fieldByName(name);
            var error = errorByName(name);
            if (input) input.removeAttribute("aria-invalid");
            if (error) error.hidden = true;
          });
          setStatus("¡Gracias por escribirnos! Te respondemos dentro de las próximas 24 horas hábiles.", "is-ok");
        })
        .catch(function () {
          setStatus("No pudimos enviar tu mensaje (problema de conexión). Tu texto sigue escrito: inténtalo de nuevo en unos minutos o escríbenos a contacto@astromind.cl.", "is-error");
        })
        .finally(function () {
          submit.disabled = false;
        });
    });

    function setStatus(text, cls) {
      if (!status) return;
      status.textContent = text;
      status.className = "form-status" + (cls ? " " + cls : "");
    }
  }

  initForm();
})();
