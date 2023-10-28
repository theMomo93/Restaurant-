
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
        deleteButton.textContent = "X";
        deleteButton.className ="deleteButton";
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
    const dishNameInput = document.querySelector("#dishName");
    const dishPriceInput = document.querySelector("#dishPrice");


    if (dishName && dishPrice) {
        const newDish = { id: menus.length + 1, name: dishName, price: dishPrice };
        menus.push(newDish);
        populateDropdowns();
        updateMenuList(); // Update the menu list
        saveDataToLocalStorage();
        dishNameInput.value = "";
        dishPriceInput.value = "";
    }
}


//LOCAL STORAGE 

function deleteDish(index) {
    // Remove the dish at the specified index from the "menus" array
    if (index >= 0 && index < menus.length) {
        menus.splice(index, 1);

        removeFromLocalStorage(index);
        updateMenuList();
    }   
}
function saveDataToLocalStorage() {
    localStorage.setItem('menus', JSON.stringify(menus));
}
function loadInitialData() {
    const storedMenus = localStorage.getItem('menus');

    if (storedMenus) {
        menus = JSON.parse(storedMenus);
        populateDropdowns();
        updateMenuList();
    }
}

loadInitialData();

function removeFromLocalStorage(index) {
    const storedMenus = localStorage.getItem('menus');

    if (storedMenus) {
        const parsedMenus = JSON.parse(storedMenus);
        if (index >= 0 && index < parsedMenus.length) {
            parsedMenus.splice(index, 1);
            localStorage.setItem('menus', JSON.stringify(parsedMenus));
        }
    }
}


// PLACE ORDER 

function placeOrder() {

    const tableSelect = document.querySelector("#tableSelect");
    const selectedTable = tableSelect.options[tableSelect.selectedIndex].textContent;
    const dishSelect = document.querySelector("#dishSelect");
    const selectedDish = dishSelect.options[dishSelect.selectedIndex].textContent;

    // select the orders
    const orderList = document.querySelector("#orderList");
    

    const newOrderItem = document.createElement("li");
    
    newOrderItem.textContent = ` ${selectedTable} - ${selectedDish}`;

    orderList.appendChild(newOrderItem);

        // Create a Cancel button for the order
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className ="cancelButton";
    cancelButton.addEventListener("click", () => cancelOrder(newOrderItem));
    newOrderItem.appendChild(cancelButton);

    tableSelect.selectedIndex = 0;
    dishSelect.selectedIndex = 0;
}
function cancelOrder(orderItem) {

    const orderList = document.querySelector("#orderList");
    orderList.removeChild(orderItem);
}

// CALCULATE THE BILL 

function calculateTotalBill() {
    const billByTable = {};

    // Select all order items
    const orderItems = document.querySelectorAll("#orderList li");

    orderItems.forEach((orderItem) => {
        const table = orderItem.textContent.split(" - ")[0];
        const dishName = orderItem.textContent.split(" - ")[1];
        
        // Find the dish price from the menu based on the dish name
        const dishPrice = findDishPriceFromMenu(dishName);

        if (!billByTable[table]) {
            billByTable[table] = 0;
        }

        billByTable[table] += dishPrice;
    });

    const totalBillList = document.querySelector("#totalBill");
    totalBillList.innerHTML = "";

    for (const table in billByTable) {
        const tableBillItem = document.createElement("li");
        tableBillItem.textContent = ` ${table}: Bill - $${billByTable[table].toFixed(2)}`;
        totalBillList.appendChild(tableBillItem);
    }
}

// Function to find the dish price from the menu
function findDishPriceFromMenu(dishName) {
    for (const dish of menus) {
        if (dish.name === dishName) {
            return dish.price;
        }
    }
    return 0; 
}

// Event Listeners
document.querySelector("#addDishBtn").addEventListener("click", addDish);
document.querySelector("#placeOrderBtn").addEventListener("click", placeOrder);
document.querySelector("#calculateTotalBillBtn").addEventListener("click", calculateTotalBill);
// Initial population of dropdowns and order list
populateDropdowns();
updateMenuList();
calculateTotalBill();


//LOCAL STORAGE 

localStorage.setItem('menus', JSON.stringify(menus));
localStorage.setItem('orders', JSON.stringify(orders));

// Check if menus and orders data exists in local storage
const storedMenus = localStorage.getItem('menus');
const storedOrders = localStorage.getItem('orders');

// If the data exists, parse it into your arrays
if (storedMenus) {
  menus = JSON.parse(storedMenus);
}

if (storedOrders) {
  orders = JSON.parse(storedOrders);
}

