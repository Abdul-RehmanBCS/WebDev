    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
      const menuButton = document.querySelector(".mobile-menu");
      const nav = document.getElementById("primary-nav");
      if (menuButton && nav) {
        function setOpen(open) {
          nav.classList.toggle("active", open);
          menuButton.setAttribute("aria-expanded", String(open));
        }
        let isOpen = false;
        menuButton.addEventListener("click", () => {
          isOpen = !isOpen;
          setOpen(isOpen);
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && isOpen) {
            isOpen = false;
            setOpen(false);
            menuButton.focus();
          }
        });
        nav.querySelectorAll("a").forEach((a) =>
          a.addEventListener("click", () => {
            isOpen = false;
            setOpen(false);
          })
        );
      }

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const id = this.getAttribute("href");
          if (id.length > 1) {
            const target = document.querySelector(id);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
          if (this.closest("nav")) {
            document
              .querySelectorAll("nav a")
              .forEach((a) => a.classList.remove("is-active"));
            this.classList.add("is-active");
          }
        });
      });

      $(function () {
        const $form = $("#contact form, .contact form").first();
        function showError($field, msg) {
          $field.addClass("error");
          $field.attr("aria-invalid", "true");
          let $msg = $('<div class="error-text" role="alert"></div>').text(msg);
          $field.next(".error-text").remove();
          $field.after($msg);
        }
        function clearError($field) {
          $field.removeClass("error");
          $field.removeAttr("aria-invalid");
          $field.next(".error-text").remove();
        }
        $form.on("submit", function (e) {
          let ok = true;
          const $name = $("#name");
          const $email = $("#email");
          const $subject = $("#subject");
          const $message = $("#message");
          const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
          clearError($name);
          clearError($email);
          clearError($subject);
          clearError($message);
          if (!$name.val().trim()) {
            ok = false;
            showError($name, "Please enter your name.");
          }
          if (!$email.val().trim() || !emailRx.test($email.val().trim())) {
            ok = false;
            showError($email, "Enter a valid email address.");
          }
          if (!$subject.val().trim()) {
            ok = false;
            showError($subject, "Please enter a subject.");
          }
          if (!$message.val().trim() || $message.val().trim().length < 10) {
            ok = false;
            showError($message, "Message must be at least 10 characters.");
          }
          if (!ok) {
            e.preventDefault();
          }
        });
        $form.find(".form-control").on("input blur", function () {
          const $f = $(this);
          if ($f.val().trim().length) {
            clearError($f);
          }
        });
      });
