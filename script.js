let display = document.getElementById("display");
let history = [];
let soundEnabled = true;
let isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
  document.body.classList.add('dark-mode');
}

loadHistory();
setupEventListeners();

function setupEventListeners() {
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('soundToggle').addEventListener('click', toggleSound);
  document.getElementById('historyBtn').addEventListener('click', toggleHistory);
  document.getElementById('shareBtn').addEventListener('click', openShareModal);
  document.addEventListener('click', function(event) {
    if (event.target === document.getElementById('shareModal')) {
      closeShareModal();
    }
  });
}

function append(value) {
  display.value += value;
  playSound();
  addButtonAnimation(event.target);
}

function clearDisplay() {
  display.value = "";
  playSound();
  addButtonAnimation(event.target);
}

function calculate() {
  try {
    const result = eval(display.value);
    const calculation = display.value + ' = ' + result;
    history.push(calculation);
    saveHistory();
    updateHistoryDisplay();
    display.value = result;
    playSound();
  } catch (e) {
    display.value = "Error";
    playSound();
  }
  addButtonAnimation(event.target);
}

function addButtonAnimation(button) {
  button.style.animation = 'none';
  setTimeout(() => {
    button.style.animation = 'buttonClick 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }, 10);
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  playSound();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('soundToggle');
  btn.textContent = soundEnabled ? '🔊' : '🔇';
  playSound();
}

function playSound() {
  if (!soundEnabled) return;
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log('Audio not available');
  }
}

function toggleHistory() {
  const panel = document.getElementById('historyPanel');
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
  playSound();
}

function saveHistory() {
  localStorage.setItem('calcHistory', JSON.stringify(history));
}

function loadHistory() {
  const saved = localStorage.getItem('calcHistory');
  history = saved ? JSON.parse(saved) : [];
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  
  history.slice().reverse().forEach((item) => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.textContent = item;
    div.onclick = () => {
      const result = item.split(' = ')[1];
      display.value = result;
      playSound();
    };
    historyList.appendChild(div);
  });
}

function clearHistory() {
  history = [];
  saveHistory();
  updateHistoryDisplay();
  playSound();
}

function openShareModal() {
  document.getElementById('shareModal').classList.add('show');
  playSound();
}

function closeShareModal() {
  document.getElementById('shareModal').classList.remove('show');
}

function copyLink() {
  const link = 'https://bridge-e0267.web.app';
  navigator.clipboard.writeText(link).then(() => {
    alert('Link copied!');
    playSound();
  });
}

const style = document.createElement('style');
style.textContent = `
  @keyframes buttonClick {
    0% { transform: scale(1); }
    50% { transform: scale(0.92); }
    100% { transform: scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);