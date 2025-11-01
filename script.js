// Initialize AOS
AOS.init();

// Smooth scroll for navbar links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  fetch(e.target.action, {
    method: 'POST',
    body: new FormData(e.target),
    headers: { 'Accept': 'application/json' }
  }).then(res => {
    if (res.ok) {
      alert('Message Sent Successfully!');
      e.target.reset();
    } else alert('Something went wrong.');
  });
});

// Demo popups
function openDemo(type) {
  const overlay = document.createElement('div');
  overlay.classList.add('demo-overlay');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.6)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '2000';
  overlay.addEventListener('click', () => overlay.remove());

  const demo = document.createElement('div');
  demo.style.background = '#fff';
  demo.style.padding = '2rem';
  demo.style.borderRadius = '10px';
  demo.style.textAlign = 'center';

  if (type === 'colorPicker') {
    demo.innerHTML = `
      <h3>🎨 Color Picker</h3>
      <input type="color" id="colorInput">
      <p>Selected: <span id="colorValue">#000000</span></p>
    `;
    demo.querySelector('#colorInput').addEventListener('input', e => {
      demo.querySelector('#colorValue').textContent = e.target.value;
    });
  } else if (type === 'calculator') {
    demo.innerHTML = `
      <h3>🧮 Calculator</h3>
      <input type="text" id="calcDisplay" readonly style="margin-bottom: 10px;">
      <div>
        <button onclick="appendToDisplay('1')">1</button>
        <button onclick="appendToDisplay('2')">2</button>
        <button onclick="appendToDisplay('+')">+</button>
        <button onclick="calculate()">=</button>
      </div>
    `;
    window.appendToDisplay = val => document.getElementById('calcDisplay').value += val;
    window.calculate = () => {
      try {
        document.getElementById('calcDisplay').value = eval(document.getElementById('calcDisplay').value);
      } catch {
        document.getElementById('calcDisplay').value = 'Error';
      }
    };
  }

  overlay.appendChild(demo);
  document.body.appendChild(overlay);
}