export class Statistic {
    constructor(year, role, roleMantra, team, pv, mv, fm, gf, gs, rp, rc, rPlus, rMinus, ass, amm, esp, au) {
        this.year = year;
        this.role = role;
        this.roleMantra = roleMantra;
        this.team = team;
        this.Pv = pv;
        this.mv = mv;
        this.fm = fm;
        this.gf = gf;
        this.gs = gs;
        this.rp = rp;
        this.rc = rc;
        this.rPlus = rPlus;
        this.rMinus = rMinus;
        this.ass = ass;
        this.amm = amm;
        this.esp = esp;
        this.au = au;
        this.references = [];
    }

    getYear() { return this.year; }
    setYear(year) { this.year = year; return this; }

    getRole() { return this.role; }
    setRole(role) { this.role = role; return this; }

    getRoleMantra() { return this.roleMantra; }
    setRoleMantra(roleMantra) { this.roleMantra = roleMantra; return this; }

    getName() { return this.name; }
    setName(name) { this.name = name; return this; }

    getTeam() { return this.team; }
    setTeam(team) { this.team = team; return this; }
    
    getPv() { return this.pv; }
    setPv(pv) { this.pv = pv; return this; }

    getMv() { return this.mv; }
    setMv(mv) { this.mv = mv; return this; }

    getFm() { return this.fm; }
    setFm(fm) { this.fm = fm; return this; }

    getGf() { return this.gf; }
    setGf(gf) { this.gf = gf; return this; }
    getGs() { return this.gs; }
    setGs(gs) { this.gs = gs; return this; }
    
    getRp() { return this.rp; }
    setRp(rp) { this.rp = rp; return this; }
    
    getRc() { return this.rc; }
    setRc(rc) { this.rc = rc; return this; }
    
    getRPlus() { return this.rPlus; }
    setRPlus(rPlus) { this.rPlus = rPlus; return this; }
    
    getRMinus() { return this.rMinus; }
    setRMinus(rMinus) { this.rMinus = rMinus; return this; }
    
    getAss() { return this.ass; }
    setAss(ass) { this.ass = ass; return this; }
    
    getAmm() { return this.amm; }
    setAmm(amm) { this.amm = amm; return this; }
    
    getEsp() { return this.esp; }
    setEsp(esp) { this.esp = esp; return this; }
    
    getAu() { return this.au; }
    setAu(au) { this.au = au; return this; }

    setReferences(references = []) {
        const keys = Object.keys(references);
        if(!references || references.length < keys.length) {
            references = Object.keys(keys);
        }
        this.references = references;
        return this;
    }
    getReferences() { return this.references; }
    getPropByReference(index) { return index in this.references ? this[Object.keys(references)[index]] : null; }
}