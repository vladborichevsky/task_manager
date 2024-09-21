
<template>

  <div    
    v-if="hoverAction"
    @click="click()"
    class="standard_button_with_hover_action">
      <img :src=imgSrc :alt=text>
        {{ text }}
  </div>

  <div
    v-else
    @click="click()"
    class="standard_button">
      <img :src=imgSrc :alt=text>
        {{ text }}
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
    font-size: 20px;
    line-height: 20px;
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
    margin-right: 8px;
  }

  .standard_button_with_hover_action:hover img {
    transition: all 0.5s;
    transform: rotate(0.5turn);
  }
</style>