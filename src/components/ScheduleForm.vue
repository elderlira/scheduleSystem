<template>
  <div class="home container">
    <h1 v-text="title"></h1>
    <div class="inputs">
      <p>
        <span>Start:</span>
        <input type="date" name="" id="" v-model="inicial" />
        <span> End: </span> <input type="date" name="" id="" v-model="final" />
      </p>
    </div>
    <div>
      <input
        type="text"
        name="textoTarefa"
        id="textoTarefa"
        v-model="tarefa"
        placeholder="Insert your task"
      />
      <button class="add" @click="adicionarTarefa">
        <i class="bi bi-plus-circle"></i>
      </button>
      <button class="clear" @click="limparLis">
        <i class="bi bi-x-circle"></i>
      </button>
      <button class="clearAll" @click="clearAll">
        <i class="bi bi-calendar-x"></i>
      </button>
      <button class="download" @click="downloadList">
        <i class="bi bi-download"></i>
      </button>
    </div>
    <div v-if="tarefas.length === 0">
      <p class="normal">You don`t have any task</p>
    </div>
    <div v-else>
      <p>
        You have: {{ tarefas.length }} task from
        {{ dataStorage.dataInicial }} to {{ dataStorage.dataFinal }}
      </p>
      <table class="table table-striped table-hover align-middle">
        <thead>
          <tr class="color-table-text">
            <td>N.º</td>
            <td>TAREFA</td>
            <td>INSERIDO EM</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(tarefa, index) in tarefas"
            :key="index"
            class="table-info"
          >
            <td class="color-table-text">{{ index + 1 }}</td>
            <td>{{ tarefa.nome }}</td>
            <td>{{ tarefa.data }}</td>
            <td>
              <button @click="tarefas.splice(index, 1)" class="btn btn-danger">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import copy from "copy-to-clipboard";
import Swal from "sweetalert2";
import filters from "../mixins/filters.vue";
// @ is an alias to /src
export default {
  name: "Home",
  mixins: [filters],
  data() {
    return {
      title: "Week task list",
      inicial: this.$store.state.dataStorage.dataInicial || "",
      final: this.$store.state.dataStorage.dataFinal || "",
      tarefas: [],
      tarefa: "",
      dataInicialFormata: "",
      aCopiar: [],
    };
  },
  computed: {
    ...mapState(["dataStorage"]),
  },
  methods: {
    ...mapMutations(["GET_PERIODS_DATE"]),
    adicionarTarefa() {
      if (this.inicial === "" && this.final === "") {
        alert("informe o periodo da semana");
        return;
      }
      if (this.tarefa === "") {
        alert("é necessario preencher o campo tarefa");
        return;
      }
      function formatDate(date) {
        if (typeof date === "string") {
          date = new Date(...date.split("-"));
        } else {
          date = new Date(date);
        }

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      }
      const final = formatDate(this.final);
      const inicial = formatDate(this.inicial);
      this.tarefas = [
        ...this.tarefas,
        {
          nome: this.tarefa,
          data: formatDate(new Date()),
        },
      ];
      this.GET_PERIODS_DATE({
        inicial: inicial,
        final: final,
      });
      this.tarefa = "";
    },
    limparLis() {
      this.tarefas = [];
    },
    clearAll() {
      this.inicial = "";
      this.final = "";
    },
    downloadList() {
      // console.log(this.tarefas);
      try {
        if (this.tarefa.length !== "") {
          let valorACopiar = this.tarefas
            .map(({ nome }, index) => {
              return `${++index} - ${nome}`;
              // return this.aCopiar;
            })
            .join("\n");
          Swal.fire({
            icon: "success",
            text: "copiado com sucesso!",
            title: copy(valorACopiar),
            timer: 2000,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error,
          timer: 2000,
        });
      }
    },
  },
  mounted() {},
  components: {},
};
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

.clearAll {
  background: rgba(204, 103, 8, 0.788);
  color: #fff;
  font-weight: bold;
}

.download {
  background: rgb(220, 220, 220);
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

.color-table-text {
  font-weight: bolder;
}
</style>
