<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        square
        filled
        bg-color="white"
        placeholder="Adicionar tarefa"
        dense>

        <template v-slot:append>
          <q-btn
            @click="addTask"
            round
            dense
            flat
            icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white"
      separator
      bordered
      >
       <!-- v-for pra pegar as info da lista  -->
      <q-item
      v-ripple
      v-for="(task, index) in tasks"
      :key="task.title"
      @click="task.done = !task.done"
      clickable
      :class="{'done bg-red-1' : task.done}">

        <q-item-section avatar>
          <q-checkbox
           v-model="task.done"
           class="no-pointer-events"
           color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
        </q-item-section>

        <q-item-section
          v-if="task.done"
          side>
          <q-btn
          @click.stop="deleteTask(index)"
          flat
          round
          dense
          color="primary"
          icon="delete"/>
        </q-item-section>
      </q-item>

    </q-list>
    <div
      v-if="!tasks.length"
      class="no-tasks absolute-center">
      <q-icon
        name="check"
        size="100px"
        color=primary />
      <div class="text-h5 text-primary text-center">
        Vazio
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data(){
    return {
      newTask: '',
      tasks: [
        // {
        //  title: 'Buscar a bicicleta no conserto',
        //  done: false
        // },
        // {
        //  title: 'Fazer os layouts pro curso de Android + Kotlin',
        //  done: false
        // },
        // {
        //  title: 'Escolher disciplinas da faculdade',
        //  done: false
        // },
      ],
      // showComplete: false
    }
  },

  mounted() {
    this.getTodos();
  },
  watch: {
    tasks: {
      handler: function(updatedList) {
        localStorage.setItem('tasks', JSON.stringify(updatedList));
      },
      deep: true
    }
  },



  methods: {
    getTodos() {
      if (localStorage.getItem('tasks')) {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    },

    deleteTask(index) {
       this.$q.dialog({
        title: 'Excluir tarefa',
        message: 'Você quer mesmo excluir essa tarefa?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(this.tasks.indexOf(index), 1);
        // this.todoList.splice(this.todoList.indexOf(item), 1);
        this.$q.notify('Tarefa excluida')
      })
    },

    addTask(){
      console.log('addTask')
      this.tasks.unshift({
        id: this.tasks.length,
        title: this.newTask,
        done: false,
      })
      this.newTask = ''
    }
  }
}




</script>


<style lang="scss">
  .done{
    .q-item__label {
      text-decoration: line-through;
      color: #bbb;
    }
  }
  .no-tasks {
    opacity: 0.5;
  }

</style>
