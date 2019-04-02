<template>
  <div class="row milestone align-items-center gantt-row">
    <div class="col">
      <i class="fas fa-check-circle mr-2"
         :class="status.class" />
      {{ status.name }}
    </div>
    <div class="col task-list">
      {{ status.message }}
    </div>
    <div class="col assigned-to">
      {{ status.username }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    /** @returns {Milestone} */
    milestone() {
      return this.data
    },

    status() {
      const { isComplete, tasks} = this.milestone

      const finishedTasks = tasks.filter(v => v.actualCompleteDate != null && Date.parse(v.actualCompleteDate) <= Date.now())

      /** @type {Task} */
      const {
        assignedToFirstName: first,
        assignedToLastName: last,
        name
      } = tasks[0]
      return {
        name,
        class:    [isComplete ? 'text-green' : 'text-light'],
        message:  `${finishedTasks.length} of ${tasks.length} task${tasks.length > 1 ? 's' : ''} complete`,
        username: `${first} ${last}`
      }
    }
  }
}
</script>

<style>
</style>
