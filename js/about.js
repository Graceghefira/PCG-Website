/* ==========================================================
   FILE: js/about.js
   PT PRASADA CAKRA GUSNA
   Premium About Interactions
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const loader = document.getElementById("pageLoader");
    const navbar = document.getElementById("navbar");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const revealElements =
        document.querySelectorAll(".reveal");

    const counters =
        document.querySelectorAll("[data-counter]");


    /* ======================================================
       PAGE LOADER
    ======================================================= */

    body.classList.add("loading");

    window.addEventListener("load", () => {

        window.setTimeout(() => {

            if (loader) {
                loader.classList.add("hidden");
            }

            body.classList.remove("loading");

        }, 450);

    });


    /* ======================================================
       NAVBAR
    ======================================================= */

    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* ======================================================
       MOBILE MENU
    ======================================================= */

    const closeMobileMenu = () => {

        if (!mobileMenu || !mobileMenuButton) {
            return;
        }

        mobileMenu.classList.remove("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    };


    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.toggle("open");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            });

    }


    /* ======================================================
       ESCAPE KEY
    ======================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    /* ======================================================
       SCROLL REVEAL
    ======================================================= */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* ======================================================
       COUNTERS
    ======================================================= */

    const animateCounter = (element) => {

        const target =
            Number(element.dataset.counter);

        if (
            !Number.isFinite(target) ||
            target <= 0
        ) {
            return;
        }

        const duration = 1300;
        const startTime = performance.now();


        const updateCounter = (currentTime) => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    easedProgress * target
                );


            element.textContent =
                currentValue.toLocaleString("id-ID");


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

                return;

            }


            element.textContent =
                target.toLocaleString("id-ID");

        };


        requestAnimationFrame(
            updateCounter
        );

    };


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateCounter(
                        entry.target
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach((counter) => {

        counterObserver.observe(counter);

    });


    /* ======================================================
       HERO CARD MOUSE PARALLAX
    ======================================================= */

    const heroVisual =
        document.querySelector(
            ".about-hero-visual"
        );

    const heroCard =
        document.querySelector(
            ".about-hero-card"
        );


    if (
        heroVisual &&
        heroCard &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                const rotateY =
                    x * 8;


                const rotateX =
                    y * -8;


                heroCard.style.transform =
                    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                heroCard.style.transform =
                    "rotate(-3deg)";

            }
        );

    }


    /* ======================================================
       VALUE CARD TILT
    ======================================================= */

    const valueCards =
        document.querySelectorAll(
            ".premium-value-card"
        );


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        valueCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5;


                    const y =
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${y * -4}deg)
                         rotateY(${x * 5}deg)
                         translateY(-10px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* ======================================================
       SMOOTH INTERNAL LINKS
    ======================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight -
                        15;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });

});