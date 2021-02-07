const { json } = require('express');
const fs = require('fs');

class ShoppingData {

    constructor(filename, savingTimeout) {
        /*Default data*/
        this.itemTypes = [];
        this.listedItems = {};
        this.itemHistory = {};
        this.listsCreated = 0;
        this.firstListCreated = null;

        this.filename = filename;
        this.savingTimeout = savingTimeout;
        this.savingTimeoutSet = false;

        if(fs.existsSync(filename)) {
            let data = JSON.parse(fs.readFileSync(filename, 'utf8'));

            this.itemTypes = data.itemTypes;
            this.listedItems = data.listedItems;
            this.itemHistory = data.itemHistory;
            this.listsCreated = data.listsCreated;
            this.firstListCreated = data.firstListCreated;
        }
    }

    addItem(type) {
        if (!type) return false; 

        type = type.toLowerCase();

        //If item already exists, return false
        if(this.listedItems[type] !== undefined) {
            return false;
        }

        this.listedItems[type] = false;

        //Creates new item type if doesn't already exist
        if (!this.itemTypes.includes(type)) {
            this.itemTypes.push(type);
        }

        this.saveToFile();
        return true;
    }

    checkItem(type, checked) {
        if (!type) return false; 

        type = type.toLowerCase();

        if (this.itemTypes.includes(type)) {
            this.listedItems[type] = checked;
            this.saveToFile();
            return true;
        }
        return false;
    }

    deleteListedItems() {
        Object.keys(this.listedItems).map((label, index) => {
            //Add items to history
            if(this.listedItems[label]) {
                if(this.itemHistory[label] === undefined) {
                    this.itemHistory[label] = 1;
                } else {
                    this.itemHistory[label] += 1;
                }
            }
        });
        this.listsCreated += 1;
        this.listedItems = {};

        if(this.firstListCreated === null) {
            let d = new Date()
            this.firstListCreated = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
        }

        this.saveToFile();
    }

    saveToFile() {
        if(!this.savingTimeoutSet) {
            this.savingTimeoutSet = true;

            setTimeout(() => {
                let data = JSON.stringify({
                    itemTypes: this.itemTypes,
                    listedItems: this.listedItems,
                    itemHistory: this.itemHistory,
                    listsCreated: this.listsCreated,
                    firstListCreated: this.firstListCreated,
                });

                console.log("Saving...");
                fs.writeFile(this.filename, data, 'utf8', () => {
                    console.log("Saved successfully");
                });
                this.savingTimeoutSet = false;
            }, this.savingTimeout);
        }
    }

    //Getters
    getListedItems() {
        return this.listedItems;
    }

    getItemHistory() {
        return this.itemHistory;
    }

    getListsCreated() {
        return this.listsCreated;
    }

    getFirstListCreated() {
        return this.firstListCreated;
    }

    getItemTypes() {
        return this.itemTypes;
    }
}

module.exports = ShoppingData;