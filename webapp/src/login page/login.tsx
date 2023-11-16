const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-form-submit');
const loginErrorMsg = document.getElementById('login-error-msg');

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  console.log(
    'This is the username:',
    username,
    '\nThis is the password:',
    password
  );
  if (username === 'a' && password === 'b') {
    alert('Successful Login, pathway to corresponding account.');
    location.reload();
  } else {
    loginErrorMsg.style.opacity = 1;
  }
});
