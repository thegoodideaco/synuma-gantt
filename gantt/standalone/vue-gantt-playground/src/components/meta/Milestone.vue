<template>
  <div class="row milestone align-items-center gantt-row">
    <div class="col">
      <i class="fas fa-check-circle mr-2"
         :class="status.class" />
      {{ status.name }}
    </div>
    <div class="col task-list"
         @mouseover="tooltip = true"
         @mouseout="tooltip = false">
      <!-- Popover -->
      <popover ref="popover"
               v-model="tooltip"
               apply-styles
               class="popover">
        <!-- Task Table -->
        <div class="task-table">
          <h5>Executed LOI Tasks</h5>

          <table class="table">
            <tbody>
              <!-- Headers -->
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Status</th>
              </tr>

              <!-- Rows -->
              <tr v-for="(item, index) in popoverItems"
                  :key="index">
                <td>{{ item.task }}</td>
                <td>{{ item.assignedTo }}</td>
                <td>{{ item.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </popover>
      {{ status.message }}
      <!-- {{ tooltip }} -->
    </div>
    <div class="col assigned-to">
      {{ status.username }}
    </div>
  </div>
</template>

<script>
import PopoverVue from '../Popover.vue'
export default {
  components: {
    Popover: PopoverVue
  },
  props: {
    /**
     * @type {Vue.PropOptions<MileStone>}
     */
    data: {
      type: Object
    }
  },
  data() {
    return {
      tooltip: false
    }
  },
  computed: {
    milestone() {
      /** @type {Milestone} */
      const d = this.data

      return d
    },

    status() {
      const { isComplete, tasks } = this.milestone

      const finishedTasks = tasks.filter(
        v =>
          v.actualCompleteDate != null &&
          Date.parse(v.actualCompleteDate) <= Date.now()
      )

      const { assignedToFirstName: first, assignedToLastName: last } = tasks[0]
      return {
        name,
        class:   [isComplete ? 'text-green' : 'text-light'],
        message: `${finishedTasks.length} of ${tasks.length} task${
          tasks.length > 1 ? 's' : ''
        } complete`,
        username: `${first} ${last}`
      }
    },

    popoverItems() {
      /**
       * @type {Milestone}
       */
      const { tasks } = this.milestone

      return tasks.map(v => {
        return {
          task:       v.name,
          assignedTo: v.assignedToFirstName + ' ' + v.assignedToLastName,
          status:     v.statusName
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  position: absolute;
  min-width: 100px;
  min-height: 100px;
  z-index: 300px;
}
</style>
