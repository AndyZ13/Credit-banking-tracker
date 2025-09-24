/* =====================
   🎨 Base Styling
===================== */
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f2f2f2;
  color: #333;
  opacity: 0;
  animation: fadeInPage 0.7s ease-in-out forwards;
}

.dark-mode {
  background-color: #121212;
  color: #fff;
}

.container {
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

/* =====================
   🧾 Header & Footer
===================== */
.mobile-header, .mobile-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #4CAF50;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.mobile-footer {
  justify-content: center;
  margin-top: 2rem;
  font-size: 0.9rem;
}

.dark-mode .mobile-header, .dark-mode .mobile-footer {
  background-color: #333;
}

/* =====================
   🧩 Cards + Sections
===================== */
.card {
  background-color: #fff;
  padding: 1.2rem;
  margin-top: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: transform 0.4s ease, opacity 0.6s ease;
  opacity: 0;
  transform: translateY(40px);
  animation: slideFadeIn 0.8s ease forwards;
}

.dark-mode .card {
  background-color: #1e1e1e;
}

/* =====================
   💡 Inputs + Buttons
===================== */
input, select, button {
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.6rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border 0.3s;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
}

button:hover {
  transform: scale(1.04);
  background-color: #45a049;
}

.dark-mode button {
  background-color: #444;
}

/* =====================
   📊 Chart Container
===================== */
canvas {
  margin-top: 1.5rem;
  max-width: 100%;
}

/* =====================
   🧠 Language Select
===================== */
.language-box {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* =====================
   📝 History List
===================== */
#history-list li {
  padding: 0.6rem 0;
  border-bottom: 1px solid #ccc;
  animation: slideInLeft 0.6s ease;
}

.dark-mode #history-list li {
  border-color: #444;
}

/* =====================
   🌗 Animations
===================== */
@keyframes fadeInPage {
  to { opacity: 1; }
}

@keyframes slideFadeIn {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  0% {
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* =====================
   ✅ Responsive Tweak
===================== */
@media (max-width: 500px) {
  .container {
    padding: 1rem;
  }

  .mobile-header h1 {
    font-size: 1.2rem;
  }

  button {
    font-size: 0.9rem;
  }
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}
.balance-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 8px 12px;
  border-radius: 6px;
}
.card-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.summary-row span {
  font-weight: bold;
  color: #2b6cb0;
}
