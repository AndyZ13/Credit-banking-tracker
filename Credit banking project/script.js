// =====================
// 🌐 Language Translations
// =====================
const translations = {
  en: {
    title: "Micro Budget & Credit Tracker",
    income: "Total Income:",
    expense: "Total Expense:",
    balance: "Balance:",
    history: "Transaction History",
    creditClear: "has no active credit on record.",
    creditOwing: "has an existing credit of",
    atBank: "at",
    status: "Status",
    placeholderDesc: "Description",
    placeholderAmount: "Amount (e.g. 500)",
    typeIncome: "Income",
    typeExpense: "Expense",
    btnAdd: "Add Transaction",
    btnCredit: "Check Credit",
    summaryTitle: "Summary",
    graphPlaceholder: "[Graph Placeholder]",
    creditTitle: "Client Credit Status"
  },
  fr: {
    title: "Suivi de Budget & Crédit",
    income: "Revenus Totaux :",
    expense: "Dépenses Totales :",
    balance: "Solde :",
    history: "Historique des Transactions",
    creditClear: "n’a aucun crédit actif enregistré.",
    creditOwing: "a un crédit en cours de",
    atBank: "à la banque",
    status: "Statut",
    placeholderDesc: "Description",
    placeholderAmount: "Montant (ex. 500)",
    typeIncome: "Revenu",
    typeExpense: "Dépense",
    btnAdd: "Ajouter",
    btnCredit: "Vérifier le Crédit",
    summaryTitle: "Résumé",
    graphPlaceholder: "[Espace Graphique]",
    creditTitle: "Statut du Crédit Client"
  },
  es: {
    title: "Control de Presupuesto y Crédito",
    income: "Ingreso Total:",
    expense: "Gasto Total:",
    balance: "Saldo:",
    history: "Historial de Transacciones",
    creditClear: "no tiene crédito activo registrado.",
    creditOwing: "tiene un crédito actual de",
    atBank: "en",
    status: "Estado",
    placeholderDesc: "Descripción",
    placeholderAmount: "Cantidad (ej. 500)",
    typeIncome: "Ingreso",
    typeExpense: "Gasto",
    btnAdd: "Añadir",
    btnCredit: "Verificar Crédito",
    summaryTitle: "Resumen",
    graphPlaceholder: "[Gráfico Placeholder]",
    creditTitle: "Estado del Crédito del Cliente"
  }
};

// =====================
// 🔁 Language Switch
// =====================
function changeLanguage() {
  const lang = document.getElementById('language-select').value;
  const t = translations[lang];
  document.getElementById('app-title').innerText = t.title;
  document.getElementById('income-label').innerText = t.income;
  document.getElementById('expense-label').innerText = t.expense;
  document.getElementById('balance-label').innerText = t.balance;
  document.getElementById('history-title').innerText = t.history;
  document.getElementById('credit-title').innerText = t.creditTitle;
  document.getElementById('add-transaction').innerText = t.btnAdd;
  document.getElementById('summary-title').innerText = t.summaryTitle;
  document.getElementById('add-btn').innerText = t.btnAdd;
  document.getElementById('credit-btn').innerText = t.btnCredit;
  document.getElementById('desc').placeholder = t.placeholderDesc;
  document.getElementById('amount').placeholder = t.placeholderAmount;
  document.getElementById('type').options[0].text = t.typeIncome;
  document.getElementById('type').options[1].text = t.typeExpense;
}

// =====================
// 💰 Transaction Logic
// =====================
let transactions = [];
let creditChecks = [];
let checkedNames = [];

const categoryKeywords = {
  Communication: ["airtime", "data", "phone"],
  "Food & Dining": ["grocery", "food", "restaurant"],
  Transport: ["uber", "taxi", "bus", "transport"],
  Education: ["school", "fees", "university"],
  "Health & Medical": ["doctor", "hospital", "pharmacy"],
  "Housing & Utilities": ["rent", "electricity", "water"]
};

function betterCategoryLogic(description) {
  const desc = description.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(k => desc.includes(k))) return category;
  }
  return "Other";
}

function addTransaction() {
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  if (!desc || isNaN(amount)) return alert("Please enter a valid description and amount.");
  const category = betterCategoryLogic(desc);
  transactions.push({ desc, amount, type, timestamp: new Date().toISOString(), category });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  document.getElementById('desc').value = "";
  document.getElementById('amount').value = "";
  updateUI();
}

// =====================
// 💼 UI Update
// =====================
function updateUI() {
  let income = 0, expense = 0;
  const list = document.getElementById('history-list');
  list.innerHTML = "";
  transactions.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.desc} [${t.category}] - ${t.type === 'income' ? '+' : '-'}${t.amount}`;
    li.classList.add('fade-in');
    list.appendChild(li);
    t.type === 'income' ? income += t.amount : expense += t.amount;
  });
  document.getElementById('total-income').textContent = income;
  document.getElementById('total-expense').textContent = expense;
  document.getElementById('balance').textContent = income - expense;
  renderCharts();
}

// =====================
// 📊 Dual Chart Rendering
// =====================
function renderCharts() {
  renderChartByType('income');
  renderChartByType('expense');
}

function renderChartByType(chartType) {
  const canvasId = chartType === 'income' ? 'incomeChart' : 'expenseChart';
  const ctx = document.getElementById(canvasId).getContext('2d');
  const filtered = transactions.filter(t => t.type === chartType);

  const categories = {};
  filtered.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(categories);
  const values = Object.values(categories);
  const colors = ['#e91e63', '#3f51b5', '#00bcd4', '#4caf50', '#ff9800', '#9c27b0'];

  if (window[`${chartType}Chart`] && typeof window[`${chartType}Chart`].destroy === 'function') {
    window[`${chartType}Chart`].destroy();
  }

  const selectedType = document.getElementById(`${chartType}-style`)?.value || 'pie';

  window[`${chartType}Chart`] = new Chart(ctx, {
    type: selectedType,
    data: {
      labels,
      datasets: [{
        label: `${chartType} by Category`,
        data: values,
        backgroundColor: colors
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(2)} CFA`
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            color: document.body.classList.contains('dark-mode') ? '#fff' : '#000'
          }
        }
      },
      animation: {
        animateScale: true,
        duration: 800
      }
    }
  });
}

// =====================
// 💳 Credit Checker
// =====================
const creditDatabase = {
  "Awa Diarra": { bank: "UBA", amount: 150000, status: "Active", delays: true, previousLoans: 2 },
  "John Doe": { bank: "Ecobank", amount: 50000, status: "Repaid", delays: false, previousLoans: 1 },
  "Saliou Bamba": { bank: "Bank of Africa", amount: 200000, status: "Active", delays: true, previousLoans: 3 }
};

function calculateCreditScore(record) {
  let score = 500;
  if (record.status === "Repaid") score += 150;
  if (record.status === "Active") score -= 100;
  if (record.previousLoans > 1) score -= (record.previousLoans - 1) * 50;
  if (record.delays) score -= 75;
  return Math.max(300, Math.min(score, 850));
}

function checkCredit() {
  const name = document.getElementById("client-name").value.trim();
  const resultBox = document.getElementById("credit-status");
  const lang = document.getElementById("language-select").value;
  const t = translations[lang];
  if (!name) {
    resultBox.innerText = lang === "fr" ? "Veuillez entrer le nom du client." :
                          lang === "es" ? "Por favor ingrese el nombre del cliente." :
                          "Please enter a client name.";
    return;
  }
  if (!checkedNames.includes(name)) checkedNames.push(name);
  if (creditDatabase[name]) {
    const record = creditDatabase[name];
    const score = calculateCreditScore(record);
    creditChecks.push({ name, ...record, score });
    localStorage.setItem("creditChecks", JSON.stringify(creditChecks));
    resultBox.innerHTML = `⚠️ <strong>${name}</strong> ${t.creditOwing} <strong>${record.amount} CFA</strong> ${t.atBank} <strong>${record.bank}</strong><br>💼 Credit Score: <strong>${score}</strong> / 850`;
    resultBox.style.color = "red";
  } else {
    resultBox.innerHTML = `✅ <strong>${name}</strong> ${t.creditClear}`;
    resultBox.style.color = "green";
  }
  document.getElementById("client-name").value = "";
}

// =====================
// 🧹 Utility
// =====================
function clearAllData() {
  localStorage.clear();
  transactions = [];
  creditChecks = [];
  updateUI();
  document.getElementById("credit-status").innerText = "";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if (document.activeElement.id === "desc" || document.activeElement.id === "amount") {
      event.preventDefault();
      addTransaction();
    } else if (document.activeElement.id === "client-name") {
      event.preventDefault();
      checkCredit();
    }
  }
});

function applyDarkMode() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark-mode", prefersDark);
}

// =====================
// 🚀 Init
// =====================
window.addEventListener("load", () => {
  applyDarkMode();
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
  const savedCreditChecks = JSON.parse(localStorage.getItem("creditChecks"));
  if (savedTransactions) transactions.push(...savedTransactions);
  if (savedCreditChecks) creditChecks.push(...savedCreditChecks);
  updateUI();
  changeLanguage();
});

