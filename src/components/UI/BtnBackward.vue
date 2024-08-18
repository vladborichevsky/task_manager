<template>
  <div
    @click="router.go(-1)" 
    class="backward">
      <img src="/icons/icon-back.png" alt="backward">
      backward
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>

<style scoped>
  .backward {
    cursor: pointer;
    background-color: inherit;
    color: var(--black-color);
    width: fit-content;
    padding: 10px 20px;
    font-size: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid var(--main-background-color);
    margin: 0 auto;
  }

  .backward:hover {
    border-bottom: 2px solid var(--black-color);
  }

  .backward img {
    width: 25px;
    margin-right: 8px;
  }
</style>