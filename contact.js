const form = document.querySelector('#contact-form');
const status = document.querySelector('#status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;
  const data = { name, email, message };
  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    status.innerHTML = result.message;
    form.reset();
  } catch (error) {
    console.error(error);
    status.innerHTML = 'Oops! Something went wrong.';
  }
});
