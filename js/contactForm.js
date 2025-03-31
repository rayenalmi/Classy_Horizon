// contactForm.js

function validateForm() {
    var emailField = document.getElementById("email");
    var emailError = document.getElementById("emailError");
    if (!emailField || !emailError) return false;
  
    var email = emailField.value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailPattern.test(email)) {
      emailError.style.display = "block";
      return false;
    } else {
      emailError.style.display = "none";
      return true;
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contactForm");
    var successMessage = document.getElementById("successMessage");
  
    if (!form || !successMessage) return;
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents form submission
      if (validateForm()) {
        var formData = new FormData(this);
        fetch("https://formspree.io/f/xpwpjyej", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              successMessage.style.display = "block";
              form.reset();
            } else {
              alert("There was a problem sending your message. Please try again.");
            }
          })
          .catch((error) => {
            alert("Error: " + error.message);
          });
      }
    });
  });
  