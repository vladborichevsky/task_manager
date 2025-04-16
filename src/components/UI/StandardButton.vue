
<template>

  <div    
    v-if="hoverAction"
    @click="click()"
    :title="text"
    class="standard_button_with_hover_action">
      <img :src=imgSrc :alt=text>
  </div>

  <div
    v-else
    @click="click()"
    :title="text"
    class="standard_button">
      <img :src=imgSrc :alt=text>
  </div>
  
</template>


<script>
  export default {
    name: 'standard-button',

    props: {  
      imgSrc: {
        type: String,
        required: true
      },

      text: {
        type: String,
        required: true
      },

      hoverAction: {
        type: Boolean,
        required: false
      }
    },

    emits:{ 
      click: null,
    },

    methods: {
      click() {
        this.$emit('click') 
      }
    }
  }
</script>


<style lang="scss" scoped>
  .standard_button, .standard_button_with_hover_action {
    cursor: pointer;
    background-color: inherit;
    color: $black-color;
    width: fit-content;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid $main-background-color;
  }
  
  .standard_button:hover, .standard_button_with_hover_action:hover {
    border-bottom: 2px solid $black-color;
  }

  .standard_button img, .standard_button_with_hover_action img {
    width: 25px;
  }

  .standard_button_with_hover_action:hover img {
    transition: all 0.5s;
    transform: rotate(0.5turn);
  }


  @media (max-width: 600px) {
    .standard_button, .standard_button_with_hover_action {
      padding: 7px 12px;
    }

    .standard_button img, .standard_button_with_hover_action img {
      width: 20px;
    }
  }
</style>