<template>
  <div class="home container">
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
      <table class="container">
        <thead>
          <tr>
            <td>Nome</td>
            <td>Data</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tarefa, index) in tarefas" 
          :key="index">
            <td>{{tarefa.nome}}</td>
            <td>{{tarefa.data}}</td>
            <td><button @click="tarefas.splice(index, 1)">Remove</button></td>
          </tr>
        </tbody>
      </table>
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
      if(this.inicial === '' && this.final === '') {
        alert('informe o periodo da semana')
        return
      }
      if(this.tarefa === '') {
        alert('é necessario preencher o campo tarefa')
        return
      }
      function formatDate(date) {
        if (typeof date === 'string') {
          date = new Date(...date.split('-'))
        } else {
          date = new Date(date)
        }

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
      }
      const final = formatDate(this.final)
      const inicial = formatDate(this.inicial)
      this.tarefas = [
        ...this.tarefas, {
         nome: this.tarefa, 
         data: formatDate(new Date())
        }]
       this.GET_PERIODS_DATE({
        inicial: inicial,
        final: final
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
