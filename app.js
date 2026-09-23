(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })

    // Project cards: flip on click/tap, keyboard accessible
    document.querySelectorAll(".project-card").forEach(card => {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        const toggleFlip = () => card.classList.toggle("flipped");
        card.addEventListener("click", toggleFlip);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFlip();
            }
        });
    });

    // Reveal project cards as they scroll into view, staggered
    if ("IntersectionObserver" in window) {
        const cards = [...document.querySelectorAll(".project-card")];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${(index % 3) * 0.12}s`;
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        cards.forEach(card => observer.observe(card));
    } else {
        document.querySelectorAll(".project-card").forEach(card => card.classList.add("in-view"));
    }
})();
