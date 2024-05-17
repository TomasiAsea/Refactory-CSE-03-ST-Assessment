
        function validateForm() {
            var form = document.getElementById('myForm');
            var inputs = form.querySelectorAll('input');
            var isValid = true;

            inputs.forEach(function(input) {
                if (input.value.trim() === '') {
                    input.classList.remove('valid');
                    input.classList.add('invalid');
                    isValid = false;
                } else {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                }
            });

            if (isValid) {
                inputs.forEach(function(input) {
                    input.classList.remove('valid');
                    input.classList.add('success');
                });
                alert('Form submitted successfully!');
                return true;  // Allow form submission
            } else {
                alert('Please fill out all fields.');
                return false;  // Prevent form submission
            }
        }
    