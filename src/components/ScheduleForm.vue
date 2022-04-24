<template>
  <div class="home container">
    <!-- {{ dataStorage }} -->
    <h1 v-text="title"></h1>
    <div class="inputs">
      <p>
          <span>Start:</span> <input type="date" name="" id="" v-model="inicial">
          <span> End: </span> <input type="date" name="" id="" v-model="final">
      </p>
    </div>
    <div>
      <input type="text" name="" id="" v-model="tarefa" >       
      <button class="add" @click="adicionarTarefa">Add</button>
      <button class="clear" @click="limparLis">Clear</button>
    </div>
    <div v-if="tarefas.length === 0 ">
      <p class="normal">You don`t have any task</p>
    </div>
    <div v-else>
      <p>You have: {{tarefas.length}} task from {{ dataStorage.dataInicial }} to {{ dataStorage.dataFinal }}</p>
      <ol>
        <li
          :class="tarefa.length === 0 ? 'normal' : 'ativa' "
          v-for="(tarefa, index) in tarefas" 
          :key="index">
          {{tarefa.nome}} - {{tarefa.data}}
        <button @click="tarefas.splice(index, 1)">Remove</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      title: "Week task list",
      inicial: this.$store.state.dataStorage.dataInicial || '',
      final: this.$store.state.dataStorage.dataFinal || '',
      tarefas: [],
      tarefa: '',
      dataInicialFormata: ''
    }
  },
  computed: {
    ...mapState(['dataStorage'])
  },
  methods: {
    ...mapMutations(['GET_PERIODS_DATE']),
    adicionarTarefa() {
      if(this.inicial === '' && this.final==='') {
        alert('informe o periodo da semana')
        return
      }
      if(this.tarefa === '') {
        alert('é necessario preencher o campo tarefa')
        return
      }
      function formatDate(date) {
        date = new Date(date)
        const day = date.getDate() +1
        const month = date.getMonth()
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
      }
      this.final = formatDate(this.final);
      this.inicial = formatDate(this.inicial)
      this.tarefas = [
        ...this.tarefas, {
         nome: this.tarefa, 
         data: formatDate(new Date())
        }]
       this.GET_PERIODS_DATE({
        inicial: this.inicial,
        final: this.final
      })
      this.tarefa = ''
    },
  limparLis() {
    this.tarefas = []
    }
  },
  mounted() {
  },
  components: {
  }
}
</script>

<style>
.inputs {
  /* background: blueviolet; */
  padding: 10px 0;
}

span {
  font-weight: bold;
  margin-right: 4px;
  margin-left: 12px;
}
.add {
  background: lightblue;
  color: black;
  font-weight: bolder;
}

.clear {
  background: lightcoral;
  color: white;
  font-weight: bolder;
}


li {
  list-style-type: none;
}
.normal {
  color: black;
  font-weight: bold;
  font-size: 20px;
}
.ativa {
  color: rgba(39, 185, 204, 0.856);
  font-size: 30px;
}
</style>
