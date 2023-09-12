<script setup>
import { ref, reactive, watch } from 'vue'
import Sorting from './components/Sorting.vue';
import { Player } from './classes/player.class';
import { Columns } from './classes/columns.class';
import data0 from './data/years/year-2024.json';
import data1 from './data/years/year-2023.json';
import data2 from './data/years/year-2022.json';
import data3 from './data/years/year-2021.json';


const totalGames = 38, today = new Date(), 
      year = ref(today.getFullYear() + (today.getMonth() > 5? 1 : 0)),
      searchPlayer = ref(''), budget = ref(0), moneySpent = ref(0);

let players = reactive(new Map());

function sortPlayers() {
  if(players.size) {
    const sortedKeys = Array.from(players.keys()).sort((a, b) => {
      let tmp;
      for(const item of columns.getSortings()) {
        const statA = players.get(a).getStatByYear(year.value)?.getPropByName(item.getLabel()) ?? 0,
              statB = players.get(b).getStatByYear(year.value)?.getPropByName(item.getLabel()) ?? 0;
        switch(item.getOrder().getType()) {
            case true: tmp = statB - statA; break;
            case false: tmp = statA - statB; break;
            default: tmp = 0; break;
        }
        if (tmp !== 0) {
          break;
        }
      }
      return tmp;
    });
    let tmpPlayers = reactive(new Map());
    for(const key of sortedKeys) {
      tmpPlayers.set(key, players.get(key));
    }
    players = tmpPlayers;
  }
}

const columns = reactive(new Columns());
columns.addItem('checkbox')
        .addItem('id', 'text')
        .addItem('name', 'text', 'Nome')
        .addItem('price', 'text', 'Prezzo')
        .addItem('role', 'text', 'R')
        .addItem('roleMantra', 'text', 'Rm')
        .addItem('team', 'text', 'Squadra')
        .addItem('pv', 'text', 'Pv', sortPlayers)
        .addItem('mv', 'text', 'Mv', sortPlayers)
        .addItem('fm', 'text', 'Fm', sortPlayers)
        .addItem('gf', 'text', 'Gf', sortPlayers)
        .addItem('gs', 'text', 'Gs', sortPlayers)
        .addItem('rp', 'text', 'Rp')
        .addItem('rc', 'text', 'Rc')
        .addItem('rPlus', 'text', 'R+')
        .addItem('rMinus', 'text', 'R-')
        .addItem('ass', 'text', 'Ass')
        .addItem('amm', 'text', 'Amm')
        .addItem('esp', 'text', 'Esp')
        .addItem('au', 'text', 'Au');

for(const item of data0) {
  players.set(item.Id, new Player(item.Id, item.Nome));
  players.get(item.Id).addStat(
    2024, item.R, item.Rm, item.Squadra, item.Pv, 
    parseFloat(item.Mv.toString().replace(',','.')), parseFloat(item.Fm.toString().replace(',','.')), item.Gf, item.Gs, item.Rp, item.Rc, 
    item['R+'], item['R-'], item.Ass, item.Amm, item.Esp, item.Au
  )
  for(const tmp of data1) {
    if(item.Id == tmp.Id) {
      players.get(tmp.Id).addStat(
        2023, tmp.R, tmp.Rm, tmp.Squadra, tmp.Pv, 
        parseFloat(tmp.Mv.toString().replace(',','.')), parseFloat(tmp.Fm.toString().replace(',','.')), tmp.Gf, tmp.Gs, tmp.Rp, tmp.Rc, 
        tmp['R+'], tmp['R-'], tmp.Ass, tmp.Amm, tmp.Esp, tmp.Au
      )
      break;
    }
  }
  for(const tmp of data2) {
    if(item.Id == tmp.Id) {
      players.get(tmp.Id).addStat(
        2022, tmp.R, tmp.Rm, tmp.Squadra, tmp.Pv, 
        parseFloat(tmp.Mv.toString().replace(',','.')), parseFloat(tmp.Fm.toString().replace(',','.')), tmp.Gf, tmp.Gs, tmp.Rp, tmp.Rc, 
        tmp['R+'], tmp['R-'], tmp.Ass, tmp.Amm, tmp.Esp, tmp.Au
      )
      break;
    }
  }
  for(const tmp of data3) {
    if(item.Id == tmp.Id) {
      players.get(tmp.Id).addStat(
        2021, tmp.R, tmp.Rm, tmp.Squadra, tmp.Pv, 
        parseFloat(tmp.Mv.toString().replace(',','.')), parseFloat(tmp.Fm.toString().replace(',','.')), tmp.Gf, tmp.Gs, tmp.Rp, tmp.Rc, 
        tmp['R+'], tmp['R-'], tmp.Ass, tmp.Amm, tmp.Esp, tmp.Au
      )
      break;
    }
  }
}

function getPlayer(player) { 
  const firstColumn = columns.getItemByIndex(0);
  return ((firstColumn.getModel() && player.getSelected()) || !firstColumn.getModel()) &&
         ((searchPlayer.value.length && (player.getName().includes(searchPlayer.value) || 
          searchPlayer.value.includes(player.getName()))) || searchPlayer.value.length == 0); 
}

function togglePlayer(player, value) {
  player.setSelected(value);
  moneySpent.value += player.getPrice() * (value ? 1 : -1);
}

function setMoneySpent(player, value, changePrice = true) {
  const oldPrice = player.getPrice() ? player.getPrice() : 0;
  if(changePrice) {
    player.setPrice(value);
  }
  if(player.getSelected()) {
    moneySpent.value = parseInt(moneySpent.value - oldPrice + player.getPrice());
  }
}
</script>

<template>
  <div class="container">
    <div class="columns">
      <div class="column col-2" style="text-align: center;">
        <label>
          <p style="margin:0;">Anno di visualizzazione</p>
          <select v-model="year" style="display:block;margin:0 auto;">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </label>
      </div>
      <div class="column col-2" style="text-align: center;">
        <label>
          <p style="margin:0 auto;">Ricerca</p>
          <input v-model="searchPlayer" type="text" placeholder="Cerca un giocatore..." />
        </label>
      </div>
      <div class="column col-2" style="text-align: center;">
        <label>
          <p style="margin:0 auto;">Soldi totali</p>
          <input v-model="budget" type="number" placeholder="Soldi totali per l'asta..." />
        </label>
      </div>
      <div class="column col-2" style="text-align: center;">
        <label>
          <p style="margin:0 auto;">Soldi spesi</p>
          <p style="margin:0 auto;font-weight: bold;">{{ moneySpent }}</p>
        </label>
      </div>
      <div class="column col-2" style="text-align: center;">
        <label>
          <p style="margin:0 auto;">Soldi rimasti</p>
          <p style="margin:0 auto;font-weight: bold;">{{ budget - moneySpent }}</p>
        </label>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="columns">
        <div class="column col-12">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th v-for="(column, index) in columns.getItems()">
                  <input v-if="column.isCheckbox()" v-model="column.model.value" type="checkbox">
                  <template v-else-if="column.isText()">
                    <template v-if="column.getOrder()">
                      <span class="badge" :data-badge="column.getOrder().getIndex()">
                        {{ column.getContent() }} 
                        <i :class="column.getOrder().getClasses()" style="cursor: pointer;" @click="() => { column.getOrder().getCallback() }"></i>
                      </span>
                    </template>
                    <template v-else>{{ column.getContent() }} </template>
                  </template>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="([key, player]) in players">
                <tr v-if="getPlayer(player)">
                  <td><input type="checkbox" @input="togglePlayer(player, $event.target.checked)"></td>
                  <td>{{ player.getId() }}</td>
                  <td>{{ player.getName() }}</td>
                  <td><input type="number" @input="setMoneySpent(player, $event.target.value)" /></td>
                  <td>{{ player.getStatByYear(year)?.getRole() ?? 'N/D' }}</td>
                  <td>{{ player.getStatByYear(year)?.getRoleMantra() ?? 'N/D' }}</td>
                  <td>{{ player.getStatByYear(year)?.getTeam() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getPv() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getMv() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getFm() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getGf() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getGs() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getRp() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getRc() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getRPlus() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getRMinus() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getAss() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getAmm() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getEsp() ?? 0 }}</td>
                  <td>{{ player.getStatByYear(year)?.getAu() ?? 0 }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://unpkg.com/spectre.css/dist/spectre.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');
</style>
