let balance = 0;
let energy = 1000;
const maxEnergy = 1000;
let doubleCoins = false;
let energyRegenBoost = false;
const coinCountElem = document.getElementById('coin-count');
const energyElem = document.getElementById('energy');
const energyTextElem = document.getElementById('energy-text');
const rankElem = document.getElementById('rank');
const mainCoin = document.getElementById('main-coin-large');
const boostModal = document.getElementById('boost-modal');
const boostsButton = document.getElementById('boosts');
const closeBoostsButton = document.getElementById('close-boosts'); 

function updateDisplay() {
    coinCountElem.textContent = balance.toLocaleString();
    energyTextElem.textContent = `⚡ ${energy}`;
    energyElem.style.width = `${(energy / maxEnergy) * 100}%`;

    if (balance >= 100000000) {
        rankElem.textContent = 'Diamond';
    } else if (balance >= 10000000) {
        rankElem.textContent = 'Gold';
    } else if (balance >= 100000) {
        rankElem.textContent = 'Silver';
    } else if (balance >= 10000) {
        rankElem.textContent = 'Bronze';
    } else {
        rankElem.textContent = 'None';
    }
}

function buyNotcoin(event) {
    if (energy > 0) {
        balance += doubleCoins ? 2 : 1;
        energy--;
        updateDisplay();
        showClickNumber(event, doubleCoins ? 2 : 1);
    } else {
        alert('Not enough energy to buy Notcoin!');
    }
}

function showClickNumber(event, amount) {
    const clickNumber = document.createElement('div');
    clickNumber.textContent = `+${amount}`;
    clickNumber.classList.add('click-number');
    clickNumber.style.left = `${event.clientX}px`;
    clickNumber.style.top = `${event.clientY}px`;
    document.body.appendChild(clickNumber);
    setTimeout(() => {
        document.body.removeChild(clickNumber);
    }, 1000);
    saveData();
}

function regenEnergy() {
    if (energy < maxEnergy) {
        energy += energyRegenBoost ? 2 : 1;
        updateDisplay();
    }
}

function saveData() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('energy', energy);
    localStorage.setItem('doubleCoins', doubleCoins);
    localStorage.setItem('energyRegenBoost', energyRegenBoost);
}

function loadData() {
    balance = parseInt(localStorage.getItem('balance')) || 0;
    energy = parseInt(localStorage.getItem('energy')) || maxEnergy;
    doubleCoins = localStorage.getItem('doubleCoins') === 'true';
    energyRegenBoost = localStorage.getItem('energyRegenBoost') === 'true';
    updateDisplay();
}

mainCoin.addEventListener('click', (event) => {
    buyNotcoin(event);
    mainCoin.style.transform = 'scale(0.9)';
    setTimeout(() => {
        mainCoin.style.transform = 'scale(1)';
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    loadData();
    setInterval(regenEnergy, 5000);
});

boostsButton.addEventListener('click', () => {
    boostModal.style.display = 'block';
});

closeBoostsButton.addEventListener('click', () => {
    boostModal.style.display = 'none';
});

document.getElementById('buy-double-coins').addEventListener('click', () => {
    if (balance >= 1000) {
        balance -= 1000;
        doubleCoins = true;
        saveData();
        updateDisplay();
        boostModal.style.display = 'none';
    } else {
        alert('Not enough coins to buy Double Coins boost!');
    }
});

document.getElementById('buy-energy-regen').addEventListener('click', () => {
    if (balance >= 2000) {
        balance -= 2000;
        energyRegenBoost = true;
        saveData();
        updateDisplay();
        boostModal.style.display = 'none';
    } else {
        alert('Not enough coins to buy Energy Regen Boost!');
    }
});

window.addEventListener('beforeunload', saveData);
