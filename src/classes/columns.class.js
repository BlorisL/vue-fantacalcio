import { ref, reactive } from 'vue'

class Order {
    constructor(index = null, type = null, callback = null) {
        this.index = index;
        this.setType(type).setCallback(callback);
    }

    setIndex(index = null) { this.index = index; return this; }
    getIndex() { return this.index; }

    setType(type = null) {
        switch(type) {
            case false: 
                this.type = false; 
                this.setClasses('fa-solid', 'fa-sort-down');
                break;
            case null: 
                this.type = null; 
                this.setClasses('fa-solid', 'fa-sort');
                break;
            case true: 
                this.type = true; 
                this.setClasses('fa-solid', 'fa-sort-up');
                break;
        }
        return this;
    }
    getType() { return this.type; }
    toggleType() {
        let type = this.getType();
        switch(type) {
            case true: type = false; break;
            case false: type = null; break;
            case null: type = true; break;
        }
        this.setType(type);
        return this;
    }

    setClasses(...classes) { 
        if(this.getClasses() == null) {
            this.classes = ref([]);
        }
        this.classes.value = classes; 
        return this; 
    }
    getClasses() { return this.classes; }

    setCallback(callback = false) {
        if(callback instanceof Function) {
            this.callback = () => { this.toggleType(); callback(); };
        } else {
            this.callback = () => { this.toggleType(); };
        }
    }
    getCallback() { 
        this.callback(); 
    }
}

class Column {
    constructor(type, label, content = null, order = null) {
        this.type = type;
        switch(this.type) {
            case 'text':
                this.content = content;
                this.model = null;
                break;
            case 'checkbox':
                this.content = null;
                this.model = false;
                break;
            default:
                this.content = null;
                this.model = null;
                break;
        }
        this.label = label;
        this.order = false;
    }

    setType(type) { this.type = type; return this; }
    getType() { return this.type; }

    setLabel(label) { this.label = label; return this; }
    getLabel() { return this.label; }

    isCheckbox() { return this.getType() == 'checkbox'; }
    isText() { return this.getType() == 'text'; }

    setContent(content) { this.content = content; return this; }
    getContent() { return this.content; }

    setModel(model) { this.model = model; return this; }
    getModel() { return this.model; }

    setOrder(callback) { this.order = new Order(null, null, callback); return this; }
    getOrder() { return this.order; }
}

export class Columns {
    constructor() {
        this.items = [];
        this.sortings = [];
    }
    
    setItems(items = []) { this.items = items; return this; }
    getItems() { return this.items; }
    
    setSortings(sortings = []) { this.sortings = sortings; return this; }
    getSortings() { return this.sortings; }
    addSorting(item) { 
        if(!this.sortings.includes(item)) {
            this.sortings.push(item); 
        }
        if(item.getOrder()) {
            const index = this.sortings.indexOf(item);
            if(index !== -1) {
                item.getOrder().setIndex(index + 1);
            }
        }
        return this;
    }
    delSorting(item) { 
        if(this.sortings.includes(item)) {
            this.sortings.splice(item, 1);
        }
        if(item.getOrder()) {
            const index = this.sortings.indexOf(item);
            if(index === -1) {
                item.getOrder().setIndex();
            }
        }
        for(const index in this.sortings) {
            this.sortings[index].getOrder().setIndex(parseInt(index + 1));
        }
        return this;
    }

    addItem(label, type, content = null, sorting = null) { 
        const item = new Column(type, label, content);
        this.items.push(item);
        if(sorting) {
            const callback = () => {
                switch(item.getOrder().getType()) {
                    case null: this.delSorting(item); break;
                    case true: case false: this.addSorting(item); break;
                }
            };
            if(sorting instanceof Function) {
                item.setOrder(function() { callback(); sorting(); });
            } else if(sorting) {
                item.setOrder(function() { callback(); });
            }
        }
        return this;
    }
    getItemByIndex(index) { return this.items[index]; }
}