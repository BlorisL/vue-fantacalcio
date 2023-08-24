import { ref, reactive } from 'vue'

class Sorting {
    constructor(type, content = null, sorting = null, reference = null) {
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
        this.reference = reference;
        this.setSorting(sorting);
    }

    setType(type) { this.type = type; return this; }
    getType() { return this.type; }

    isCheckbox() { return this.getType() == 'checkbox'; }
    isText() { return this.getType() == 'text'; }

    setContent(content) { this.content = content; return this; }
    getContent() { return this.content; }

    setModel(model) { this.model = model; return this; }
    getModel() { return this.model; }

    setSorting(sorting) { 
        if(sorting) {
            this.sorting = reactive({ type: false });
            this.sorting.event = () => {
                switch(this.sorting.type) {
                    case true: 
                        this.sorting.type = false; 
                        this.sorting.classes = ['fa-solid', 'fa-sort-down'];
                        break;
                    case false: 
                        this.sorting.type = null; 
                        this.sorting.classes = ['fa-solid', 'fa-sort'];
                        break;
                    case null: 
                        this.sorting.type = true; 
                        this.sorting.classes = ['fa-solid', 'fa-sort-up'];
                        break;
                }
                if(sorting instanceof Function) {
                    sorting();
                }
            };
            this.sorting.event();
        } else {
            this.sorting = null;
        }
        return this;
    }
    getSorting() { return this.sorting; }
    getSortingClasses() { return this.sorting.classes; }
    getSortingEvent(...parameters) { return this.sorting.event(...parameters); }

    setReference(reference) { this.reference = reference; return this; }
    getReference() { return this.reference; }
}

export class Columns {
    constructor() {
        this.items = [];
        this.sortingIndexes = [];
    }
    
    setItems(items = []) { this.items = items; return this; }
    getItems() { return this.items; }
    
    setSortingIndexes(sortingIndexes = []) { this.sortingIndexes = sortingIndexes; return this; }
    getSortingIndexes() { return this.sortingIndexes; }
    addSortingIndex(index) { 
        if(!(index in this.sortingIndexes)) {
            this.sortingIndexes.push(index); 
        }
        return this;
    }
    delSortingIndex(index) { 
        if(index in this.sortingIndexes) {
            this.sortingIndexes.splice(index, 1);
        }
        return this;
    }

    addItem(type, content = null, sorting = null) { 
        const item = new Sorting(type, content);
        this.items.push(item);
        const index = this.sortingIndexes.length;
        if(sorting) {
            const callback = function() {
                switch(item.getType()) {
                    case null: this.delSortingIndex(index); break;
                    case true: case false: this.addSortingIndex(index); break;
                }
            };
            this.addSortingIndex(index);
            if(sorting instanceof Function) {
                item.setSorting(function() { callback(); sorting(); });
            } else if(sorting) {
                item.setSorting(function() { callback(); });
            }
        }
        return this;
    }
    getItemByIndex(index) { return this.items[index]; }

    /*sortPlayers(index, a, b) {
        switch(type) {
            case true: a.getPropByReference
        }
      }
    }*/
}