// Checkout Page JavaScript with jQuery Validation
$(document).ready(function () {
    // Show/hide card details based on payment method
    $('input[name="paymentMethod"]').on('change', function () {
        if ($(this).val() === 'card') {
            $('#cardDetails').removeClass('d-none');
        } else {
            $('#cardDetails').addClass('d-none');
            // Clear card field validations when hidden
            $('#cardDetails input').removeClass('is-invalid is-valid');
            $('#cardDetails .invalid-feedback').text('');
        }
    });

    // Enable/disable place order button based on terms checkbox
    $('#termsCheck').on('change', function () {
        $('#placeOrderBtn').prop('disabled', !$(this).is(':checked'));
    });

    // Card number formatting
    $('#cardNumber').on('input', function () {
        let value = $(this).val().replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        $(this).val(formattedValue);
    });

    // Expiry date formatting
    $('#cardExpiry').on('input', function () {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        $(this).val(value);
    });

    // CVV formatting (numbers only)
    $('#cardCVV').on('input', function () {
        $(this).val($(this).val().replace(/\D/g, ''));
    });

    // Real-time validation on blur
    $('#fullName, #email, #phone, #address, #city, #postalCode, #country').on('blur', function () {
        validateField($(this));
    });

    // Real-time validation for card fields
    $('#cardholderName, #cardNumber, #cardExpiry, #cardCVV').on('blur', function () {
        if ($('#paymentCard').is(':checked')) {
            validateField($(this));
        }
    });

    // Validation Functions
    function validateField($field) {
        const fieldId = $field.attr('id');
        const value = $field.val().trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous validation classes
        $field.removeClass('is-invalid is-valid');
        $field.next('.invalid-feedback').text('');

        switch (fieldId) {
            case 'fullName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Full name is required.';
                } else if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Full name must be at least 3 characters.';
                }
                break;

            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required.';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
                break;

            case 'phone':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Phone number is required.';
                } else if (!/^\d+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Phone number must contain only digits.';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Phone number must be at least 10 digits.';
                }
                break;

            case 'address':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Address is required.';
                }
                break;

            case 'city':
                if (!value) {
                    isValid = false;
                    errorMessage = 'City is required.';
                }
                break;

            case 'postalCode':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Postal code is required.';
                } else if (!/^\d+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Postal code must contain only numbers.';
                } else if (value.length < 4 || value.length > 6) {
                    isValid = false;
                    errorMessage = 'Postal code must be between 4 and 6 digits.';
                }
                break;

            case 'country':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a country.';
                }
                break;

            case 'cardholderName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Cardholder name is required.';
                }
                break;

            case 'cardNumber':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Card number is required.';
                } else {
                    const cardNumber = value.replace(/\s/g, '');
                    if (cardNumber.length < 13 || cardNumber.length > 19) {
                        isValid = false;
                        errorMessage = 'Card number must be between 13 and 19 digits.';
                    }
                }
                break;

            case 'cardExpiry':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Expiry date is required.';
                } else if (!/^\d{2}\/\d{2}$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid expiry date (MM/YY).';
                }
                break;

            case 'cardCVV':
                if (!value) {
                    isValid = false;
                    errorMessage = 'CVV is required.';
                } else if (value.length < 3 || value.length > 4) {
                    isValid = false;
                    errorMessage = 'CVV must be 3 or 4 digits.';
                }
                break;
        }

        // Apply validation styling
        if (isValid) {
            $field.addClass('is-valid');
        } else {
            $field.addClass('is-invalid');
            $field.next('.invalid-feedback').text(errorMessage);
        }

        return isValid;
    }

    // Validate payment method
    function validatePaymentMethod() {
        const paymentSelected = $('input[name="paymentMethod"]:checked').length > 0;
        if (!paymentSelected) {
            $('#paymentMethodError').text('Please select a payment method.').show();
            return false;
        } else {
            $('#paymentMethodError').text('').hide();

            // If card is selected, validate card fields
            if ($('#paymentCard').is(':checked')) {
                const cardFields = ['cardholderName', 'cardNumber', 'cardExpiry', 'cardCVV'];
                let allCardFieldsValid = true;
                cardFields.forEach(fieldId => {
                    if (!validateField($('#' + fieldId))) {
                        allCardFieldsValid = false;
                    }
                });
                return allCardFieldsValid;
            }
            return true;
        }
    }

    // Validate terms checkbox
    function validateTerms() {
        if (!$('#termsCheck').is(':checked')) {
            $('#termsCheck').addClass('is-invalid');
            $('#termsCheck').next('.form-check-label').next('.invalid-feedback').text('You must agree to the terms and conditions.');
            return false;
        } else {
            $('#termsCheck').removeClass('is-invalid');
            $('#termsCheck').next('.form-check-label').next('.invalid-feedback').text('');
            return true;
        }
    }

    // Form submission with full validation
    $('#checkoutForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const firstErrorField = [];

        // Validate all required fields
        const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
        requiredFields.forEach(fieldId => {
            if (!validateField($('#' + fieldId))) {
                isValid = false;
                if (firstErrorField.length === 0) {
                    firstErrorField.push($('#' + fieldId));
                }
            }
        });

        // Validate payment method
        if (!validatePaymentMethod()) {
            isValid = false;
            if (firstErrorField.length === 0) {
                firstErrorField.push($('input[name="paymentMethod"]').first());
            }
        }

        // Validate terms
        if (!validateTerms()) {
            isValid = false;
            if (firstErrorField.length === 0) {
                firstErrorField.push($('#termsCheck'));
            }
        }

        if (isValid) {
            // Scroll to top and show success message
            $('html, body').animate({ scrollTop: 0 }, 500);
            // Submit the form programmatically
            this.submit();
        } else {
            // Scroll to first error field
            if (firstErrorField.length > 0) {
                $('html, body').animate({
                    scrollTop: firstErrorField[0].offset().top - 100
                }, 500);
                firstErrorField[0].focus();
            }
        }
    });

    // Real-time validation for payment method
    $('input[name="paymentMethod"]').on('change', function () {
        validatePaymentMethod();
    });

    // Real-time validation for terms
    $('#termsCheck').on('change', function () {
        validateTerms();
    });
});

