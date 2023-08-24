import { Statistic } from './statistic.class';

export class Player {
    constructor(id, name, price = null, selected = false, stats = {}) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.selected = selected;
        this.stats = stats;
    }

    setId(id) { this.id = id; return this; }
    getId() { return this.id; }
    
    setName(name) { this.name = name; return this; }
    getName() { return this.name; }
    
    setPrice(price) { this.price = price; return this; }
    getPrice() { return this.price; }
    
    setSelected(selected) { this.selected = selected; return this; }
    getSelected() { return this.selected; }

    setStats(stats = {}) { this.stats = stats; return this; }
    addStat(year, role, roleMantra, team, pv, mv, fm, gf, gs, rp, rc, rPlus, rMinus, ass, amm, esp, au) { 
        this.stats[year] = new Statistic(year, role, roleMantra, team, pv, mv, fm, gf, gs, rp, rc, rPlus, rMinus, ass, amm, esp, au);
        return this;
    }
    getStats() { return this.stats; }

    isYearInStat(year) { return year in this.getStats() }
    getStatByYear(year) { return this.isYearInStat(year) ? this.getStats()[year] : null }
}