let formData = { email: '', message: '' };

const feedbackForm = document.querySelector('.feedback-form');
const emailField = document.querySelector('#input-email');
const messageField = document.querySelector('#input-text');

const savedFormData = localStorage.getItem('feedback-form-state');
if (savedFormData) {
  formData = JSON.parse(savedFormData);
  feedbackForm.elements.email.value = formData.email || '';
  feedbackForm.elements.message.value = formData.message || '';
}
feedbackForm.addEventListener('input', function (event) {
  formData.email = feedbackForm.elements.email.value.trim();
  formData.message = feedbackForm.elements.message.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  if (emailField.value.trim() !== '' && messageField.value.trim() !== '') {
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    formData.email = '';
    formData.message = '';
    feedbackForm.reset();
  } else {
    console.log('Fill please all fields');
  }
});
