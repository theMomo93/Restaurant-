
let menus = [];
let orders = [];
    // Add more dishes as needed

let tables = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 6 },
        // Add more tables as needed
];

// THIS WORKS CORRECTLY
// Function to populate dropdowns with table and dishes 
function populateDropdowns() {
    const tableSelect = document.querySelector("#tableSelect");
    const dishSelect = document.querySelector("#dishSelect");

    tableSelect.innerHTML = "";
    dishSelect.innerHTML = "";

    tables.forEach((table) => {
        const option = document.createElement("option");
        option.value = table.id;
        option.textContent = "Table " + table.id;
        tableSelect.appendChild(option);
    });

    menus.forEach((dish) => {
        const option = document.createElement("option");
        option.value = dish.id;
        option.textContent = dish.name + " - $" + dish.price;
        dishSelect.appendChild(option);
    });
}
// THIS WORKS CORRECTLY
// Function to update the list of menu items
function updateMenuList() {
    const menuList = document.querySelector("#menuList");
    menuList.innerHTML = ""; // Clear the list

    menus.forEach((dish, index) => {
        const li = document.createElement("li");
        li.textContent = `${dish.name} - $${dish.price}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", index);

    deleteButton.addEventListener("click", (event) => {
            // Remove the parent container when the delete button is clicked
            const indexToRemove = event.target.getAttribute("data-index"); // Get the index from the custom attribute
            if (indexToRemove !== null) {
                // Remove the dish from both the UI and the data array
                menuList.removeChild(li);
                deleteDish(indexToRemove);
                // Update the menu list after deletion
                updateMenuList();
            }
        });

        li.appendChild(deleteButton);
        menuList.appendChild(li);
    });
}


// THIS WORKS CORRECTLY
// Function to add a dish to the menu
function addDish() {
    const dishName = document.querySelector("#dishName").value;
    const dishPrice = parseFloat(document.querySelector("#dishPrice").value);

    if (dishName && dishPrice) {
        const newDish = { id: menus.length + 1, name: dishName, price: dishPrice };
        menus.push(newDish);
        populateDropdowns();
        updateMenuList(); // Update the menu list
    }
}

function deleteDish(index) {
    // Remove the dish at the specified index from the "menus" array
    if (index >= 0 && index < menus.length) {
        menus.splice(index, 1);
    }

}



// Event Listeners
document.querySelector("#addDishBtn").addEventListener("click", addDish);
document.querySelector("#placeOrderBtn").addEventListener("click", placeOrder);

// Initial population of dropdowns and order list
populateDropdowns();
updateMenuList();

