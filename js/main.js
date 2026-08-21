/* ==========================================================
   FILE: js/main.js
   PT PRASADA CAKRA GUSNA
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const loader = document.getElementById("pageLoader");
    const navbar = document.getElementById("navbar");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const navLinks =
        document.querySelectorAll(
            '.nav-link, .mobile-menu a'
        );

    const revealElements =
        document.querySelectorAll(".reveal");


    /* ======================================================
       PAGE LOADER
    ======================================================= */

    body.classList.add("loading");


    window.addEventListener("load", () => {

        window.setTimeout(() => {

            loader.classList.add("hidden");

            body.classList.remove("loading");

        }, 500);

    });


    /* ======================================================
       NAVBAR SCROLL
    ======================================================= */

    const updateNavbar = () => {

        if (window.scrollY > 30) {

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

        mobileMenu.classList.remove("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    };


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


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


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
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* ======================================================
       ACTIVE NAVIGATION
    ======================================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.id;

                    document
                        .querySelectorAll(
                            ".desktop-nav .nav-link"
                        )
                        .forEach((link) => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


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

});

/* ==========================================================
   PART 2
   PORTFOLIO FILTER
=========================================================== */

const portfolioFilterButtons =
    document.querySelectorAll(
        ".portfolio-filter-button"
    );

const portfolioCards =
    document.querySelectorAll(
        ".portfolio-card"
    );


portfolioFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter =
            button.dataset.filter;


        portfolioFilterButtons.forEach(
            (filterButton) => {

                filterButton.classList.remove(
                    "active"
                );

            }
        );


        button.classList.add("active");


        portfolioCards.forEach((card) => {

            const cardCategory =
                card.dataset.category;


            const shouldShow =
                selectedFilter === "all" ||
                cardCategory === selectedFilter;


            if (shouldShow) {

                card.classList.remove(
                    "is-hidden"
                );

            } else {

                card.classList.add(
                    "is-hidden"
                );

            }

        });

    });

});


/* ==========================================================
   PART 2
   LIGHTBOX
=========================================================== */

const lightbox =
    document.getElementById(
        "portfolioLightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxTriggers =
    document.querySelectorAll(
        "[data-lightbox-image]"
    );

const lightboxCloseButtons =
    document.querySelectorAll(
        "[data-lightbox-close]"
    );


function openPortfolioLightbox(
    imageSource,
    title
) {

    if (
        !lightbox ||
        !lightboxImage ||
        !lightboxTitle
    ) {

        return;

    }


    lightboxImage.src =
        imageSource;

    lightboxImage.alt =
        title;

    lightboxTitle.textContent =
        title;


    lightbox.classList.add(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "lightbox-open"
    );

}


function closePortfolioLightbox() {

    if (!lightbox) {

        return;

    }


    lightbox.classList.remove(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "lightbox-open"
    );


    window.setTimeout(() => {

        if (lightboxImage) {

            lightboxImage.src = "";

        }

    }, 350);

}


lightboxTriggers.forEach((trigger) => {

    trigger.addEventListener(
        "click",
        () => {

            const imageSource =
                trigger.dataset.lightboxImage;

            const title =
                trigger.dataset.lightboxTitle ||
                "PT Prasada Cakra Gusna";


            if (!imageSource) {

                return;

            }


            openPortfolioLightbox(
                imageSource,
                title
            );

        }
    );

});


lightboxCloseButtons.forEach((button) => {

    button.addEventListener(
        "click",
        closePortfolioLightbox
    );

});


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            lightbox?.classList.contains("open")
        ) {

            closePortfolioLightbox();

        }

    }
);