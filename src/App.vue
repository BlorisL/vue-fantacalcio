<script setup>
import { ref, reactive, watch } from 'vue'
import Sorting from './components/Sorting.vue';
import { Player } from './classes/player.class';
import { Columns } from './classes/columns.class';
import data0 from './data/years/year-2024.json';
import data1 from './data/years/year-2023.json';
import data2 from './data/years/year-2022.json';
import data3 from './data/years/year-2021.json';


const tatalGames = 38, today = new Date(), 
      year = ref(today.getFullYear() + (today.getMonth() > 5? 1 : 0)),
      searchPlayer = ref(''), budget = ref(0), moneySpent = ref(0);

function sortPlayers() {
  for(const player of columns.getSortingIndexes()) {
    players.sort(function(a, b) {
      
    })
  }
}

const columns = reactive(new Columns());
columns.addItem('checkbox')
        .addItem('text', 'Id')
        .addItem('text', 'Nome')
        .addItem('text', 'Prezzo')
        .addItem('text', 'R')
        .addItem('text', 'Rm')
        .addItem('text', 'Squadra')
        .addItem('text', 'Pv', true)
        .addItem('text', 'Mv')
        .addItem('text', 'Fm')
        .addItem('text', 'Gf')
        .addItem('text', 'Gs')
        .addItem('text', 'Rp')
        .addItem('text', 'Rc')
        .addItem('text', 'R+')
        .addItem('text', 'R-')
        .addItem('text', 'Ass')
        .addItem('text', 'Amm')
        .addItem('text', 'Esp')
        .addItem('text', 'Au');

/*watch(columns.sortingIndexes, (newValue, oldValue) => {
  console.log('Valore cambiato:', newValue);
  // Esegui qui le azioni quando il valore cambia
});*/

/*function sortPlayers(reference) {
  const properties = Object.keys(new Player(0, ''));
    for(const index of columns.getSortingIndexes()) {
        players.sort(function(a, b) {
          switch(columns.getItemByIndex(index).getType()) {
              case true: a.
          }
        });
    }
}*/

//let showSelected = ref(false);

const players = reactive({});

for(const item of data0) {
  players[item.Id] = new Player(item.Id, item.Nome);
  players[item.Id].addStat(
    2024, item.R, item.Rm, item.Nome, item.Squadra, item.Pv, 
    item.Mv, item.Fm, item.Gf, item.Gs, item.Rp, item.Rc, 
    item['R+'], item['R-'], item.Ass, item.Amm, item.Esp, item.Au
  )
  for(const tmp of data1) {
    if(item.Id == tmp.Id) {
      players[tmp.Id].addStat(
        2023, tmp.R, tmp.Rm, tmp.Nome, tmp.Squadra, tmp.Pv, 
        tmp.Mv, tmp.Fm, tmp.Gf, tmp.Gs, tmp.Rp, tmp.Rc, 
        tmp['R+'], tmp['R-'], tmp.Ass, tmp.Amm, tmp.Esp, tmp.Au
      )
      break;
    }
  }
  for(const tmp of data2) {
    if(item.Id == tmp.Id) {
      players[tmp.Id].addStat(
        2022, tmp.R, tmp.Rm, tmp.Nome, tmp.Squadra, tmp.Pv, 
        tmp.Mv, tmp.Fm, tmp.Gf, tmp.Gs, tmp.Rp, tmp.Rc, 
        tmp['R+'], tmp['R-'], tmp.Ass, tmp.Amm, tmp.Esp, tmp.Au
      )
      break;
    }
  }
  for(const tmp of data3) {
    if(item.Id == tmp.Id) {
      players[tmp.Id].addStat(
        2021, tmp.R, tmp.Rm, tmp.Nome, tmp.Squadra, tmp.Pv, 
        tmp.Mv, tmp.Fm, tmp.Gf, tmp.Gs, tmp.Rp, tmp.Rc, 
        tmp['R+'], tmp['R-'], tmp.Ass, tmp.Amm, tmp.Esp, tmp.Au
      )
      break;
    }
  }
}

function getSorting(callback = null) {
  const item = { type: ref(false), classes: ref([]) };
  item.toggle = function() {
    switch(item.type.value) {
      case true: 
        item.type.value = false; 
        item.classes.value = ['fa-solid', 'fa-sort-down'];
        break;
      case false: 
        item.type.value = null; 
        item.classes.value = ['fa-solid', 'fa-sort'];
        break;
      case null: 
        item.type.value = true; 
        item.classes.value = ['fa-solid', 'fa-sort-up'];
        break;
    }
    if(callback) {
      callback();
    }
  }
  item.click = item.toggle;
  item.count = 
  item.toggle();
  return item;
}

/*function sortPlayers() {
  return players;
  const items = {};
  let keys = Object.keys(players);

  for(const column of columns) {
    if(column.sorting) {

    }
  }
  keys = keys.sort(function(a, b) {
    oggetto[a] - oggetto[b]
  });
  return items;
}*/

function getPlayer(player) { 
  const firstColumn = columns.getItemByIndex(0);
  return ((firstColumn.getModel() && player.getSelected()) || !firstColumn.getModel()) &&
         ((searchPlayer.value.length && (player.getName().includes(searchPlayer.value) || searchPlayer.value.includes(player.getName()))) || searchPlayer.value.length == 0); 
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
    <div class="columns ">
        <div class="column col-12">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th v-for="(column, index) in columns.getItems()">
                  <input v-if="column.isCheckbox()" v-model="column.model.value" type="checkbox">
                  <template v-else-if="column.isText()">
                    <template v-if="column.getSorting()">
                      <span class="badge" data-badge="">
                        {{ column.getContent() }} 
                        <i :class="column.getSortingClasses()" style="cursor: pointer;" @click="column.getSortingEvent()"></i>
                      </span>
                    </template>
                    <template v-else>{{ column.getContent() }} </template>
                  </template>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(player, propertyName, index) in players" :key="player.getId()">
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
        <!--
        <div class="column col-6">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Id</th>
                <th>Nome</th>
                <th>R</th>
                <th>Squadra</th>
                <th>Pv</th>
                <th>Mv</th>
                <th>Fm</th>
                <th>Gf</th>
                <th>Gs</th>
              </tr>
            </thead>
            <tbody v-for="role in team">
              <tr v-for="player in role">
                <td><input type="checkbox" @click="togglePlayer"></td>
                <td>{{ player.Id }}</td>
                <td>{{ player.Nome }}</td>
                <td>{{ player.R }}</td>
                <td>{{ player.Squadra }}</td>
                <td>{{ player.Pv }}</td>
                <td>{{ player.Mv }}</td>
                <td>{{ player.Fm }}</td>
                <td>{{ player.Gf }}</td>
                <td>{{ player.Gs }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      -->
    </div>
  </div>
</template>

<style scoped>
@import url('https://unpkg.com/spectre.css/dist/spectre.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');
</style>
