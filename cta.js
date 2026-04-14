/* ============================================
   ミライ建設ナビ - CTA Form JavaScript
   ============================================ */

let currentStep = 1;
const totalSteps = 4;

function goToStep(step) {
  // Validate current step before moving forward
  if (step > currentStep) {
    if (!validateStep(currentStep)) {
      return;
    }
  }

  // Update current step
  currentStep = step;

  // Hide all step contents
  document.querySelectorAll('.step-content').forEach(function (el) {
    el.classList.remove('active');
  });

  // Show target step
  var targetId = 'step' + step;
  var targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.classList.add('active');
  }

  // Update step navigation
  document.querySelectorAll('.step-item').forEach(function (el) {
    var stepNum = parseInt(el.getAttribute('data-step'));
    el.classList.remove('active');
    el.classList.remove('completed');

    if (stepNum === step) {
      el.classList.add('active');
    } else if (stepNum < step) {
      el.classList.add('completed');
    }
  });

  // Scroll to top of form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  // Go to previous page (main site)
  if (currentStep === 1) {
    window.location.href = 'index.html';
  } else {
    goToStep(currentStep - 1);
  }
}

function validateStep(step) {
  switch (step) {
    case 1:
      var timing = document.getElementById('timing');
      var location = document.getElementById('location');

      if (!timing.value) {
        timing.classList.add('error');
        timing.focus();
        return false;
      }
      timing.classList.remove('error');

      if (!location.value) {
        location.classList.add('error');
        location.focus();
        return false;
      }
      location.classList.remove('error');
      return true;

    case 2:
      var jobtype = document.getElementById('jobtype');
      var employment = document.getElementById('employment');

      if (!jobtype.value) {
        jobtype.classList.add('error');
        jobtype.focus();
        return false;
      }
      jobtype.classList.remove('error');

      if (!employment.value) {
        employment.classList.add('error');
        employment.focus();
        return false;
      }
      employment.classList.remove('error');
      return true;

    case 3:
      var name = document.getElementById('name');
      var phone = document.getElementById('phone');

      if (!name.value.trim()) {
        name.classList.add('error');
        name.focus();
        return false;
      }
      name.classList.remove('error');

      if (!phone.value.trim() || phone.value.replace(/[^\d]/g, '').length < 10) {
        phone.classList.add('error');
        phone.focus();
        return false;
      }
      phone.classList.remove('error');
      return true;

    default:
      return true;
  }
}

function submitForm() {
  var email = document.getElementById('email');
  var privacy = document.getElementById('privacy');

  // Validate email
  if (!email.value.trim() || !isValidEmail(email.value)) {
    email.classList.add('error');
    email.focus();
    return;
  }
  email.classList.remove('error');

  // Validate privacy checkbox
  if (!privacy.checked) {
    alert('プライバシーポリシーに同意してください。');
    return;
  }

  // Collect all form data
  var formData = {
    timing: document.getElementById('timing').value,
    location: document.getElementById('location').value,
    jobtype: document.getElementById('jobtype').value,
    employment: document.getElementById('employment').value,
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: email.value.trim(),
    message: document.getElementById('message').value.trim()
  };

  console.log('Form submitted:', formData);

  // Redirect to thank you page
  window.location.href = 'thanks.html';
}

function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Remove error class on input change
document.addEventListener('DOMContentLoaded', function () {
  var inputs = document.querySelectorAll('.form-input, .form-select');
  inputs.forEach(function (input) {
    input.addEventListener('change', function () {
      this.classList.remove('error');
    });
    input.addEventListener('input', function () {
      this.classList.remove('error');
    });
  });
});
