<template>
  <div class="home container">
    <h1 v-text="title"></h1>
    <div>
      <p>
          Inicio: <input type="date" name="" id="" v-model="inicial">
          Fim: <input type="date" name="" id="" v-model="final">
      </p>
    </div>
    <div>
      <input type="text" name="" id="" v-model="tarefa" >       
      <button class="add" @click="adicionarTarefa">Add</button>
      <button class="clear" @click="limparLis">Clear</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      title: "Listagem das tarefas da semana",
      inicial: '',
      final: '',
      tarefas: [],
      tarefa: '',
      dataInicialFormata: ''
    }
  },
  methods: {
    adicionarTarefa() {
      if(this.inicial === '' && this.final==='') {
        alert('informe o periodo da semana')
        return
      }
      if(this.tarefa === '') {
        alert('é necessario preencher o campo tarefa')
        return
      }
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
  font-size: 50px;
}
.ativa {
  color: blue;
  font-size: 40px;
}
</style>
