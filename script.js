document.addEventListener("DOMContentLoaded", function () {
    let winCount = 0;
    let lossCount = 0;
    let historyData = [];

    function updatePeriod() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        let startHour = 5;
        let startMinute = 29;
        let elapsedMinutes = (hours * 60 + minutes) - (startHour * 60 + startMinute);

        if (elapsedMinutes < 0) elapsedMinutes = 0;

        let formattedDate = now.getFullYear() + 
            ("0" + (now.getMonth() + 1)).slice(-2) + 
            ("0" + now.getDate()).slice(-2);

        let periodNumber = "100001" + String(elapsedMinutes).padStart(4, "0");

        document.getElementById("period").innerText = formattedDate + periodNumber;
    }

    function fetchResult() {
        fetch('https://your-api.com/result') // Replace with actual API
            .then(response => response.json())
            .then(data => {
                let result = data.result; 
                document.getElementById("result").innerText = result.toUpperCase();

                let predictedResult = Math.random() < 0.5 ? "BIG" : "SMALL";
                let status = predictedResult === result ? "WIN" : "LOSS";

                if (status === "WIN") winCount++;
                else lossCount++;

                updateStats();
                addToHistory(formattedDate + periodNumber, predictedResult, status);
            });
    }

    function updateStats() {
        document.getElementById("winCount").innerText = winCount;
        document.getElementById("lossCount").innerText = lossCount;
        let winPercentage = winCount + lossCount > 0 ? ((winCount / (winCount + lossCount)) * 100).toFixed(2) + "%" : "0%";
        document.getElementById("winPercentage").innerText = winPercentage;
    }

    function addToHistory(period, prediction, status) {
        let historyList = document.getElementById("historyList");
        let row = document.createElement("tr");

        row.innerHTML = `<td>${period}</td>
                         <td>${prediction}</td>
                         <td class="${status.toLowerCase()}">${status}</td>`;

        historyList.prepend(row);
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }

    updatePeriod();
    setInterval(updatePeriod, 1000);
    setInterval(fetchResult, 60000);
});
