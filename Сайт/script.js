let users = [];
let currentUser = null;

// Загружаем пользователей
fetch('data/users.json')
  .then(res => res.json())
  .then(data => {
    users = data;
  });

document.getElementById("login").addEventListener("input", function () {
  const login = this.value;
  const user = users.find(u => u.login === login);
  if (user) {
    document.getElementById("avatar").src = `assets/avatars/${user.avatar}`;
  } else {
    document.getElementById("avatar").src = "assets/avatars/avatar1.png";
  }
});

function login() {
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.login === login && u.password === password);
  if (!user) {
    alert("Неверный логин или пароль");
    return;
  }

  currentUser = user;
  document.getElementById('lock-screen').classList.add('hidden');
  document.getElementById('welcome-screen').classList.remove('hidden');

  document.getElementById('welcome-name').textContent = user.login;
  document.getElementById('welcome-avatar').src = `assets/avatars/${user.avatar}`;

  setTimeout(() => {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
  }, 2000);
}

function fillContent(user) {
  const docs = user.desktop.folders.find(f => f.name === 'Документы');
  const mail = user.desktop.folders.find(f => f.name === 'Почта');

  document.getElementById('docs-content').innerHTML = docs.files.map(f => `<b>${f.name}</b><pre>${f.content}</pre>`).join('');
  document.getElementById('mail-content').innerHTML = mail.emails.map(m => `<b>${m.subject}</b><div>${m.body}</div>`).join('<hr>');
}

function openWindow(name) {
  document.getElementById(`window-${name}`).classList.remove('hidden');
}
function closeWindow(name) {
  document.getElementById(`window-${name}`).classList.add('hidden');
}