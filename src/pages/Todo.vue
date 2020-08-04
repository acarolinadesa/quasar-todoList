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
      <q-item
      v-ripple
      v-for="(task, index) in tasks"
      :key="task.titulo"
      @click="updateDone(task)"
      clickable
      :class="{'done bg-red-1' : task.done}">

        <q-item-section avatar>
          <q-checkbox
           v-model="task.done"
           class="no-pointer-events"
           color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{task.titulo}}</q-item-label>
        </q-item-section>

        <q-item-section
          v-if="task.done"
          side>
          <q-btn
          @click.stop="deleteConfirm(task, index)"
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
  name: 'todo',
  data (){
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
      ],
      // showComplete: false
    }
  },

  mounted() {
    this.getTodos();
  },

  methods: {
    // getTodos() {
    //   console.log(this.$axios.defaults.baseURL)
    //   this.$axios.get('/').then(response => {
    //     this.tasks = response.data
    //   }).catch(error => console.log(error))
    //   // if (localStorage.getItem('tasks')) {
    //   //   this.tasks = JSON.parse(localStorage.getItem('tasks'));
    //   // }
    // },

    getTodos: async function () {
      try {
        const response = await this.$axios.get('/')
        this.tasks = response.data
      } catch (error) {
        console.log(error)
      }
    },


    // addTask(){
    //   console.log('addTask')
    //   const body = {
    //     titulo: this.newTask,
    //     done: false
    //   }
    //   this.$axios.post('/', body).then(response => {
    //     if (response.data.inserted) {
    //       this.tasks.unshift(response.data.dbres)
    //     }
    //   }).catch(error => console.log(error))
    //   // this.tasks.unshift({
    //   //   id: this.tasks.length,
    //   //   title: this.newTask,
    //   //   done: false,
    //   // })
    //   this.newTask = ''
    // },

    addTask: async function(){
      try {
        const body = {
          titulo: this.newTask,
          done: false
        }
        const response = await this.$axios.post('/', body)
        if (response.data.inserted) {
          this.tasks.unshift(response.data.dbres)
        }
      } catch (error) {
        console.log(error)
      }
      this.newTask = ''
    },

    updateDone: async function(task){
      try {
        const response = await this.$axios.patch(`/${task._id}`, {done: !task.done})
        if (response.data.patched) {
          task.done = !task.done
        }
      } catch (error) {
        console.log(error)
      }
      this.newTask = ''
    },

    deleteConfirm(task, index){
      this.$q.dialog({
        title: 'Excluir tarefa',
        message: `Você quer mesmo excluir a tarefa: ${task.titulo}`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(task, index)
      })
    },

    deleteTask: async function(task, index){
      try {
        const response = await this.$axios.delete(`/${task._id}`)
        if(response.data.deleted){
          console.log(`${task.titulo} deleted`)
          this.tasks.splice(index, 1)
          this.$q.notify(`${task.titulo} excluido`)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // deleteTask(index) {
    //    this.$q.dialog({
    //     title: 'Excluir tarefa',
    //     message: 'Você quer mesmo excluir essa tarefa?',
    //     cancel: true,
    //     persistent: true
    //   }).onOk(() => {
    //     this.tasks.splice(this.tasks.indexOf(index), 1);
    //     // this.todoList.splice(this.todoList.indexOf(item), 1);
    //     this.$q.notify('Tarefa excluida')
    //   })
    // }

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
