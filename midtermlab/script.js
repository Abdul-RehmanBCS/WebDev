      // Smooth scrolling for navigation links
      document.querySelectorAll("nav a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 20,
              behavior: "smooth",
            });
          }
        });
      });

      // Highlight active nav link based on scroll position
      window.addEventListener("scroll", function () {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav a");

        let currentSection = "";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
          }
        });
      });

      // Expandable sections
      document.querySelectorAll(".item-title").forEach((title) => {
        title.addEventListener("click", function () {
          const content = this.nextElementSibling;
          this.classList.toggle("active");
          content.classList.toggle("expanded");
        });
      });

      // Animate sections on scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      document.querySelectorAll(".section").forEach((section) => {
        observer.observe(section);
      });

      // Theme toggle functionality
      const themeToggle = document.querySelector(".theme-toggle");
      themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const icon = this.querySelector("i");
        if (document.body.classList.contains("dark-mode")) {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        } else {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        }
      });

      // Profile image animation
      const profileImg = document.querySelector(".profile-img");
      profileImg.addEventListener("click", function () {
        this.classList.toggle("animated");
      });

      // Skill hover effects
      document.querySelectorAll(".skill").forEach((skill) => {
        skill.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-5px) scale(1.05)";
        });

        skill.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0) scale(1)";
        });
      });
