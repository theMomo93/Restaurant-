

function selectTable() {
    selectedTable = document.querySelector("#table").value;
    document.querySelector("#selected-table").textContent = selectedTable;
    localStorage.setItem('selectedTable', selectedTable);
}
const choicesH2 = document.querySelector('.choices');
function saveChoices() {
            const dishChoices = [];
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    dishChoices.push(checkbox.id);
                }
            });

            choicesH2.innerHTML = 'Selected choices: ' + dishChoices.join(', ');
            // You can do something with dishChoices here, e.g., send it to a server, process it, etc.

        }
        
