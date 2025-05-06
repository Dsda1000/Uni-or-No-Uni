// game.js
let boxes = [];
let remainingBoxes = 20;
let values = [0.01, 1, 5, 10, 25, 50, 100, 200, 500, 1000, 2500, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 500000, 1000000];

function initializeGame() {
    // Shuffle values and assign to boxes
    values = values.sort(() => Math.random() - 0.5);
    const container = document.getElementById("boxes");
    for (let i = 0; i < 20; i++) {
        const box = document.createElement("div");
        box.className = "box";
        box.id = `box-${i}`;
        box.innerHTML = i + 1;
        box.onclick = () => selectBox(i);
        container.appendChild(box);
        boxes.push({ id: i, value: values[i], opened: false });
    }
}

function selectBox(index) {
    if (boxes[index].opened) return;
    boxes[index].opened = true;
    remainingBoxes--;
    document.getElementById(`box-${index}`).style.background = "#gray";
    calculateOffer();
}

function calculateOffer() {
    // Simple banker offer: average of remaining values
    const unopened = boxes.filter(box => !box.opened).map(box => box.value);
    const average = unopened.reduce((a, b) => a + b, 0) / unopened.length;
    document.getElementById("offer").innerHTML = `Banker's Offer: $${average.toFixed(2)}`;
}

function deal() {
    alert(`You accepted $${document.getElementById("offer").innerText.split('$')[1]}!`);
    resetGame();
}

function noDeal() {
    if (remainingBoxes <= 1) {
        alert(`Your box had $${boxes.find(box => !box.opened).value}!`);
        resetGame();
    }
}

function resetGame() {
    boxes = [];
    remainingBoxes = 20;
    document.getElementById("boxes").innerHTML = "";
    initializeGame();
}

// Start the game
initializeGame();
