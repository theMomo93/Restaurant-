// Data Structures
let menus = [
    { id: 1, name: "Meatballs", price: 10.99 },
    { id: 2, name: "Schnitzel", price: 12.99 },
    // Add more dishes as needed
];

let tables = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 6 },
    { id: 7 },
    // Add more tables as needed
];

let orders = [];

// Function to populate dropdowns
function populateDropdowns() {
    const tableSelect = document.querySelector("#tableSelect");
    const dishSelect = document.querySelector("#dishSelect");

    tableSelect.innerHTML = "";
    dishSelect.innerHTML = "";

    tables.forEach((table) => {
        const option = document.createElement("option");
        option.value = table.id;
        option.textContent = `Table ${table.id}`;
        tableSelect.appendChild(option);
    });

    menus.forEach((dish) => {
        const option = document.createElement("option");
        option.value = dish.id;
        option.textContent = `${dish.name} - $${dish.price}`;
        dishSelect.appendChild(option);
    });
}

// Function to update order list
function updateOrderList() {
    const orderList = document.querySelector("#orderList");
    orderList.innerHTML = "";

    orders.forEach((order) => {
        const li = document.createElement("li");
        li.textContent = `Table ${order.table} - ${menus.find(item => item.id === order.dish).name}`;
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel Order";
        cancelButton.addEventListener("click", () => cancelOrder(order));
        li.appendChild(cancelButton);
        orderList.appendChild(li);
    });
}

// Function to calculate the total bill for a table
function calculateTotalBill() {
    const totalBill = document.querySelector("#totalBill");
    const selectedTable = document.querySelector("#tableSelect").value;
    const tableOrders = orders.filter(order => order.table == selectedTable);
    const total = tableOrders.reduce((sum, order) => {
        const dish = menus.find(item => item.id === order.dish);
        return sum + dish.price;
    }, 0);
    totalBill.textContent = `Total Bill for Table ${selectedTable}: $${total.toFixed(2)}`;
}

// Function to update the list of menu items
function updateMenuList() {
    const menuList = document.querySelector("#menuList");
    menuList.innerHTML = ""; // Clear the list

    menus.forEach((dish, index) => {
        const li = document.createElement("li");
        li.textContent = `${dish.name} - $${dish.price}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            // Remove the parent container when the delete button is clicked
            menuList.removeChild(li);
            deleteDish(index); // Delete the corresponding dish from the data array
        });

        li.appendChild(deleteButton);
        menuList.appendChild(li);
    });
}


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

// Function to place an order
function placeOrder() {
    const tableId = document.querySelector("#tableSelect").value;
    const dishId = document.querySelector("#dishSelect").value;
    orders.push({ table: tableId, dish: dishId });
    updateOrderList();
    calculateTotalBill();
}

// Function to cancel an order
function cancelOrder(order) {
    const index = orders.indexOf(order);
    if (index > -1) {
        orders.splice(index, 1);
        updateOrderList();
        calculateTotalBill();
    }
}

// Event Listeners
document.querySelector("#addDishBtn").addEventListener("click", addDish);
document.querySelector("#placeOrderBtn").addEventListener("click", placeOrder);

// Initial population of dropdowns and order list
populateDropdowns();
updateOrderList();
updateMenuList();
calculateTotalBill()
placeOrder();
