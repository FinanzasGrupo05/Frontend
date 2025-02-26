<script>
export default {
  name: "initial.view.vue",
  props: {
    msg: {
      type: String,
      default: 'Sincronizando datos, por favor espere...'
    }
  }
}
</script>

<template>
  <div class="main__container flex col center max-height">
    <ProgressSpinner strokeWidth="4"/>
    <div class="container__title">{{ msg }}</div>
  </div>
</template>

<style scoped>
.main__container {

}
.container__title{
  font-size: 1.5rem;
  font-weight: 600;
}

</style>