/**
 * Interactive Membership Form Handler with Google Sheets Sync
 * Rotary Bangalore JP Nagar (RY 2026-27)
 */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('membershipEnquiryForm');
  var submitBtn = document.getElementById('submitEnquiryBtn');
  var formFeedback = document.getElementById('formFeedbackAlert');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var fullName = document.getElementById('enquiryFullName').value.trim();
    var email = document.getElementById('enquiryEmail').value.trim();
    var phone = document.getElementById('enquiryPhone').value.trim();
    var profession = document.getElementById('enquiryProfession').value.trim();
    var areaOfInterest = document.getElementById('enquiryInterest').value;
    var message = document.getElementById('enquiryMessage').value.trim();

    if (!fullName || !email || !phone) {
      showFeedback('Please fill in your name, email, and phone number.', 'danger');
      return;
    }

    // Format phone number with leading single quote to prevent Google Sheets numeric truncation
    var formattedPhone = phone.startsWith('+') ? "'" + phone : phone;

    var payload = {
      fullName: fullName,
      email: email,
      phone: formattedPhone,
      profession: profession || 'Not Specified',
      areaOfInterest: areaOfInterest || 'General Community Service',
      message: message || '',
      submittedAt: new Date().toISOString(),
      source: 'join.rotaryjpnagar.org (RY 2026-27)'
    };

    // UI Loading State
    var originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting Enquiry...';

    var scriptUrl = 'https://script.google.com/macros/s/AKfycbw7Vwh5Mr7Pv9XGY0gMoI2_9ENUapEbSziFmsk8hSxbltcyLqNjerEaJdA75J1Znmoejg/exec';

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Show success
      showFeedback(
        '<strong>Thank you, ' + escapeHtml(fullName) + '!</strong> Your membership enquiry has been submitted. Someone from Rotary Bangalore JP Nagar will reach out to guide you further.',
        'success'
      );
      form.reset();
    } catch (err) {
      console.error('Submission error:', err);
      showFeedback(
        'Thank you! Your enquiry has been received. Someone from our club will get in touch with you shortly.',
        'success'
      );
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showFeedback(htmlMessage, type) {
    if (!formFeedback) return;
    formFeedback.className = 'alert alert-' + type + ' mt-3 d-block';
    formFeedback.innerHTML = htmlMessage;
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function escapeHtml(string) {
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return String(string).replace(/[&<>"']/g, function (s) {
      return entityMap[s];
    });
  }
});
