<template>
  <div class="bottom_block">

    <btn-bottom-block
      :buttonName="buttonNames.outstanding"
      :mainArray="outstandingTasks"
      @outstanding="goToOutstandingTasksPage()">
        <p>Outstanding tasks</p>
    </btn-bottom-block>

    <btn-bottom-block
      :buttonName="buttonNames.upcoming"
      :mainArray="upcomingTasks"
      @upcoming="goToUpcomingTasksPage()">
        <p>Upcoming tasks</p>
    </btn-bottom-block>

  </div>
</template>

<script setup>
  import BtnBottomBlock from '@/components/UI/BtnBottomBlock.vue'

  import { useStore } from 'vuex'
  import { computed } from 'vue' 
  import { useRouter } from 'vue-router'

  const buttonNames = {
    'outstanding': 'outstanding',
    'upcoming': 'upcoming'
  }

  const store = useStore() 
  const router = useRouter()

  const outstandingTasks = computed( () => store.state.objOfTasks.outstandingTasks)
  const upcomingTasks = computed( () => store.state.objOfTasks.upcomingTasks)

  const goToOutstandingTasksPage = () => {
    router.push('/outstanding_tasks')
  }

  const goToUpcomingTasksPage = () => {
    router.push('/upcoming_tasks')
  }

</script>

<style lang="scss" scoped>
  .bottom_block {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>