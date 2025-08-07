const wishesList = document.getElementById('wishes');

function playMusic() {
  document.getElementById('birthdaySong').play();
  alert("🎊 Happy Birthday Once Again! 🎁");
}

function submitWish() {
  const wish = document.getElementById('wishInput').value;
  if (!wish) return alert("Please write something!");

  fetch('http://localhost:3000/wishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ wish })
  }).then(res => res.json()).then(data => {
    loadWishes();
    document.getElementById('wishInput').value = '';
  });
}

function loadWishes() {
  fetch('http://localhost:3000/wishes')
    .then(res => res.json())
    .then(data => {
      wishesList.innerHTML = '';
      data.forEach(w => {
        const li = document.createElement('li');
        li.innerText = w.wish;
        wishesList.appendChild(li);
      });
    });
}

loadWishes();
