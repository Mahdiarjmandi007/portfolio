(function () {
    "use strict";

    var header = document.getElementById("siteHeader");
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");
    var docEl = document.documentElement;

    /* ---------- header on scroll ---------- */
    function updateHeader() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 12);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    /* ---------- mobile menu ---------- */
    function setMenu(open) {
        if (!navToggle || !navLinks) return;
        navToggle.setAttribute("aria-expanded", String(open));
        navToggle.setAttribute("aria-label", open ? "بستن منو" : "باز کردن منو");
        navLinks.classList.toggle("open", open);
        document.body.classList.toggle("menu-open", open);
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            setMenu(navToggle.getAttribute("aria-expanded") !== "true");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setMenu(false);
            });
        });

        document.addEventListener("click", function (event) {
            if (!navLinks.classList.contains("open")) return;
            if (navLinks.contains(event.target) || navToggle.contains(event.target)) return;
            setMenu(false);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") setMenu(false);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 920) setMenu(false);
        });
    }

    /* ---------- reveal on scroll ---------- */
    var revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("in");
                    revealObserver.unobserve(entry.target);
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
        );

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("in");
        });
    }

    /* safety net: if the tab is occluded or the observer never fires,
       make sure the first screen (and eventually everything) is visible */
    window.requestAnimationFrame(function () {
        revealItems.forEach(function (item) {
            var rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
                item.classList.add("in");
            }
        });
    });

    window.setTimeout(function () {
        if (!document.querySelector(".reveal.in")) {
            revealItems.forEach(function (item) {
                item.classList.add("in");
            });
        }
    }, 1800);

    /* ---------- active navigation link ---------- */
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

    function linkFor(id) {
        if (!navLinks) return null;
        return navLinks.querySelector('a[href="#' + id + '"]');
    }

    if (sections.length && navLinks && "IntersectionObserver" in window) {
        var spy = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    navLinks.querySelectorAll("a").forEach(function (link) {
                        link.classList.remove("active");
                        link.removeAttribute("aria-current");
                    });
                    var current = linkFor(entry.target.id);
                    if (current) {
                        current.classList.add("active");
                        current.setAttribute("aria-current", "true");
                    }
                });
            },
            { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
        );

        sections.forEach(function (section) {
            spy.observe(section);
        });
    }

    /* ---------- copy e-mail ---------- */
    var copyButton = document.getElementById("copyEmail");
    var copyLabel = document.getElementById("copyLabel");
    var toast = document.getElementById("toast");
    var toastTimer = null;

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () {
            toast.classList.remove("show");
        }, 2400);
    }

    function legacyCopy(text) {
        var field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        var copied = false;
        try {
            copied = document.execCommand("copy");
        } catch (error) {
            copied = false;
        }
        document.body.removeChild(field);
        return copied;
    }

    if (copyButton) {
        copyButton.addEventListener("click", function () {
            var email = copyButton.getAttribute("data-email") || "";

            function done() {
                if (copyLabel) copyLabel.textContent = "کپی شد ✓";
                showToast("ایمیل کپی شد: " + email);
                window.setTimeout(function () {
                    if (copyLabel) copyLabel.textContent = "کپی ایمیل";
                }, 2400);
            }

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(done).catch(function () {
                    if (legacyCopy(email)) done();
                    else showToast("کپی نشد؛ ایمیل را دستی انتخاب کن.");
                });
            } else if (legacyCopy(email)) {
                done();
            } else {
                showToast("کپی نشد؛ ایمیل را دستی انتخاب کن.");
            }
        });
    }

    /* ---------- footer year (Persian calendar) ---------- */
    var yearTarget = document.querySelector("[data-year]");
    if (yearTarget) {
        try {
            yearTarget.textContent = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());
        } catch (error) {
            /* keep the static fallback */
        }
    }

    /* ---------- mark document as enhanced ---------- */
    docEl.classList.add("ready");
})();
