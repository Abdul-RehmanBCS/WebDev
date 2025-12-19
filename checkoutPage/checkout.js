
      $(document).ready(function () {
        $('input[name="paymentMethod"]').on("change", function () {
          if ($("#credit").is(":checked")) {
            $("#cardDetails").addClass("active");
          } else {
            $("#cardDetails").removeClass("active");
          }
        });

        $("#terms").on("change", function () {
          $("#placeOrder").prop("disabled", !$(this).is(":checked"));
        });

        $("#checkoutForm").on("submit", function (e) {
          e.preventDefault(); 

          let valid = true;
          $(".is-invalid").removeClass("is-invalid");
          $(".invalid-feedback").hide();
          $("#paymentMethodError").hide();

          function showError(id, message) {
            valid = false;
            $("#" + id).addClass("is-invalid");
            $("#" + id)
              .next(".invalid-feedback")
              .text(message)
              .show();
          }

          const fullName = $("#fullName").val().trim();
          if (fullName === "") {
            showError("fullName", "Full name is required.");
          } else if (fullName.length < 3) {
            showError("fullName", "Full name must be at least 3 characters.");
          }

          const email = $("#email").val().trim();
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (email === "") {
            showError("email", "Email is required.");
          } else if (!emailRegex.test(email)) {
            showError("email", "Please enter a valid email address.");
          }

          const phone = $("#phone").val().trim();
          const phoneRegex = /^\d+$/;
          if (phone === "") {
            showError("phone", "Phone number is required.");
          } else if (!phoneRegex.test(phone)) {
            showError("phone", "Phone number must contain digits only.");
          } else if (phone.length < 10) {
            showError("phone", "Phone number must be at least 10 digits.");
          }

          const address = $("#address").val().trim();
          if (address === "") {
            showError("address", "Address is required.");
          }

          const city = $("#city").val().trim();
          if (city === "") {
            showError("city", "City is required.");
          }

          const country = $("#country").val();
          if (country === "") {
            showError("country", "Please select your country.");
          }

          const postalCode = $("#postalCode").val().trim();
          const postalCodeRegex = /^\d+$/;
          if (postalCode === "") {
            showError("postalCode", "Postal code is required.");
          } else if (!postalCodeRegex.test(postalCode)) {
            showError("postalCode", "Postal code must contain digits only.");
          } else if (postalCode.length < 4 || postalCode.length > 6) {
            showError("postalCode", "Postal code must be 4-6 digits.");
          }

          const paymentMethod = $('input[name="paymentMethod"]:checked').val();
          if (!paymentMethod) {
            valid = false;
            $("#paymentMethodError").show();
          }

          if ($("#credit").is(":checked")) {
            const cardholder = $("#cardholder").val().trim();
            if (cardholder === "") {
              showError("cardholder", "Cardholder name is required.");
            }

            const cardNumber = $("#cardNumber").val().trim();
            const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
            if (cardNumber === "") {
              showError("cardNumber", "Card number is required.");
            } else if (!cardNumberRegex.test(cardNumber)) {
              showError(
                "cardNumber",
                "Please enter a valid card number (format: XXXX XXXX XXXX XXXX)."
              );
            }

            const expiry = $("#expiry").val().trim();
            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (expiry === "") {
              showError("expiry", "Expiry date is required.");
            } else if (!expiryRegex.test(expiry)) {
              showError(
                "expiry",
                "Please enter a valid expiry date (format: MM/YY)."
              );
            }

            const cvv = $("#cvv").val().trim();
            const cvvRegex = /^\d{3,4}$/;
            if (cvv === "") {
              showError("cvv", "CVV is required.");
            } else if (!cvvRegex.test(cvv)) {
              showError("cvv", "Please enter a valid CVV (3 or 4 digits).");
            }
          }

          if (!$("#terms").is(":checked")) {
            valid = false;
            $("#terms").addClass("is-invalid");
            $("#terms").next(".invalid-feedback").show();
          }

          if (valid) {
            alert("Order placed successfully! Thank you for your purchase.");

          } else {
            $("html, body").animate(
              {
                scrollTop: $(".is-invalid").first().offset().top - 100,
              },
              500
            );
          }
        });

        $("#fullName").on("input", function () {
          const value = $(this).val().trim();
          if (value.length >= 3) {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next(".invalid-feedback").hide();
          } else {
            $(this).removeClass("is-valid");
          }
        });

        $("#email").on("input", function () {
          const value = $(this).val().trim();
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(value)) {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next(".invalid-feedback").hide();
          } else {
            $(this).removeClass("is-valid");
            if (value === "") {
              $(this).removeClass("is-invalid");
              $(this).next(".invalid-feedback").hide();
            }
          }
        });

        $("#phone").on("input", function () {
          const value = $(this).val().trim();
          const phoneRegex = /^\d+$/;
          if (phoneRegex.test(value) && value.length >= 10) {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next(".invalid-feedback").hide();
          } else {
            $(this).removeClass("is-valid");
            if (value === "") {
              $(this).removeClass("is-invalid");
              $(this).next(".invalid-feedback").hide();
            }
          }
        });

        $("#postalCode").on("input", function () {
          const value = $(this).val().trim();
          const postalCodeRegex = /^\d+$/;
          if (
            postalCodeRegex.test(value) &&
            value.length >= 4 &&
            value.length <= 6
          ) {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next(".invalid-feedback").hide();
          } else {
            $(this).removeClass("is-valid");
            if (value === "") {
              $(this).removeClass("is-invalid");
              $(this).next(".invalid-feedback").hide();
            }
          }
        });

        $("#placeOrder").prop("disabled", true);
      });
