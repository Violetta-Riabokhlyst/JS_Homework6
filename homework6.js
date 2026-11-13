//1

const character = {
    name: "Alex",
    level: 1,
    health: 100,
    maxHealth: 100,
    mana: 50,

    stats: {
        strength: 10,
        defense: 5,
        speed: 7
    },

    inventory: ["Sword", "Shield"],
    effects: ["Strength boost"],

    takeDamage(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            console.log("Invalid damage");
            return;
        }

        this.health = this.health - amount;

        if (this.health < 0) {
            this.health = 0;
        }

        console.log("Health:", this.health);
    },

    heal(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            console.log("Invalid healing");
            return;
        }

        this.health = this.health + amount;

        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }

        console.log("Health:", this.health);
    },

    levelUp() {
        this.level++;
        this.maxHealth = this.maxHealth + 20;
        this.health = this.maxHealth;
        this.mana = this.mana + 10;

        console.log("New level:", this.level);
    },

    addItem(item) {
        if (typeof item !== "string" || item === "") {
            console.log("Invalid item");
            return;
        }

        this.inventory.push(item);
        console.log("Item added:", item);
    }
};

character.takeDamage(30);
character.heal(15);
character.levelUp();
character.addItem("Potion");
character["nickname"] = "Hero";
console.log(character);
const characterCopy = {
    ...character,
    stats: { ...character.stats },
    inventory: [...character.inventory],
    effects: [...character.effects]
};
characterCopy.stats.strength = 20;
characterCopy.inventory.push("Bow");

console.log("Original:", character);
console.log("Copy:", characterCopy);

//2

const settingNames = ["theme", "language", "notifications"];

const settings = {};

for (let i = 0; i < settingNames.length; i++) {
    settings[settingNames[i]] = "";
}

const userSettings = {
    data: settings,

    changeSetting(name, value) {
        this.data[name] = value;
    },

    deleteSetting(name) {
        delete this.data[name];
    },

    getSetting(name) {
        return this.data[name];
    }
};

userSettings.changeSetting("theme", "dark");
userSettings.changeSetting("language", "English");
userSettings.changeSetting("notifications", "enabled");
console.log(userSettings.getSetting("theme"));
userSettings.deleteSetting("notifications");
const keys = Object.keys(userSettings.data);
console.log(keys);
const entries = Object.entries(userSettings.data);
console.log(entries);
const newSettings = Object.fromEntries(entries);
console.log(newSettings);

//3

const user = {
    personalData: {
        name: "Alex",
        age: 20
    },

    settings: {
        theme: "dark",
        language: "English"
    },

    address: {
        city: "London",
        street: "Green Street"
    },

    friends: ["Tom", "Anna"],

    history: [
        {
            action: "Login",
            date: "10.11.2026"
        },
        {
            action: "Logout",
            date: "10.11.2026"
        }
    ]
};

function deepCopy(object) {
    if (object === null || typeof object !== "object") {
        return object;
    }

    let copy;

    if (object instanceof Array) {
        copy = [];
    } 
    else {
        copy = {};
    }

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            copy[key] = deepCopy(object[key]);
        }
    }

    return copy;
}

const userCopy = deepCopy(user);
userCopy.personalData.name = "John";
userCopy.settings.theme = "light";
userCopy.address.city = "Paris";
userCopy.friends.push("Mike");
userCopy.history[0].action = "Registration";
console.log("Original:", user);
console.log("Copy:", userCopy);

//4

function createProduct(name, price, category, quantity) {
    return {
        name: name,
        price: price,
        category: category,
        quantity: quantity,

        addQuantity(amount) {
            if (typeof amount !== "number" || amount <= 0) {
                return;
            }

            this.quantity = this.quantity + amount;
        },

        removeQuantity(amount) {
            if (typeof amount !== "number" || amount <= 0) {
                return;
            }

            if (amount > this.quantity) {
                console.log("Not enough products");
                return;
            }

            this.quantity = this.quantity - amount;
        }
    };
}

const store = {
    products: [
        createProduct("Phone", 500, "Electronics", 10),
        createProduct("Book", 20, "Education", 30),
        createProduct("Laptop", 1000, "Electronics", 5)
    ],

    searchProduct(name) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].name === name) {
                return this.products[i];
            }
        }

        return null;
    },

    deleteProduct(name) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].name === name) {
                for (let j = i; j < this.products.length - 1; j++) {
                    this.products[j] = this.products[j + 1];
                }

                this.products.length--;
                return;
            }
        }
    },

    changePrice(name, newPrice) {
        if (typeof newPrice !== "number" || newPrice <= 0) {
            return;
        }

        const product = this.searchProduct(name);

        if (product !== null) {
            product.price = newPrice;
        }
    },

    getTotalCost() {
        let total = 0;

        for (let i = 0; i < this.products.length; i++) {
            total = total + this.products[i].price * this.products[i].quantity;
        }

        return total;
    }
};

console.log(store.searchProduct("Phone"));
store.products[0].addQuantity(5);
store.products[1].removeQuantity(2);
store.changePrice("Phone", 600);
store.deleteProduct("Book");
console.log("Total cost:", store.getTotalCost());

const extraCharacteristics = {
    color: "Black",
    warranty: "2 years"
};

const product1 = store.searchProduct("Phone");
const productCopy1 = Object.assign({}, product1, extraCharacteristics);
console.log(productCopy1);
const productCopy2 = {
    ...product1,
    color: "White",
    warranty: "1 year"
};

console.log(productCopy2);

//5

function Character(name, health) {
    this.name = name;
    this.health = health;
}

Character.prototype.attack = function() {
    console.log(this.name + " attacks");
};

function Warrior(name, health) {
    Character.call(this, name, health);
}

Warrior.prototype = new Character("", 0);
Warrior.prototype.constructor = Warrior;

Warrior.prototype.attack = function() {
    console.log(this.name + " attacks with a sword");
};

Warrior.prototype.defend = function() {
    console.log(this.name + " blocks the attack");
};

function Mage(name, health) {
    Character.call(this, name, health);
}

Mage.prototype = new Character("", 0);
Mage.prototype.constructor = Mage;

Mage.prototype.attack = function() {
    console.log(this.name + " uses magic");
};

Mage.prototype.heal = function() {
    console.log(this.name + " uses healing magic");
};

function Archer(name, health) {
    Character.call(this, name, health);
}

Archer.prototype = new Character("", 0);
Archer.prototype.constructor = Archer;

Archer.prototype.attack = function() {
    console.log(this.name + " shoots an arrow");
};

Archer.prototype.aim = function() {
    console.log(this.name + " takes aim");
};

const warrior = new Warrior("Alex", 150);
const mage = new Mage("Tom", 100);
const archer = new Archer("Anna", 120);

warrior.attack();
warrior.defend();

mage.attack();
mage.heal();

archer.attack();
archer.aim();

console.log(warrior instanceof Character);
console.log(mage instanceof Character);
console.log(archer instanceof Character);