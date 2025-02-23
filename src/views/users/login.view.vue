<script>
import loading from "@/views/loading.view.vue";
import {FloatLabel} from "primevue";
export default {
  name: "login.view.vue",
  components: {FloatLabel, loading},
  props: {
    dark: Boolean,
    user: {
      type: Object,
      default: null
    }
  },
  methods: {
    login() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$emit('login', {username: this.username, password: this.password})
      }, 2000)
    }
  },
  data(){
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  created() {
    if(this.user) this.$router.push({name: 'home'})
  }
}
</script>

<template>
  <loading v-if="loading" msg="Iniciando Sesión..."/>
  <div class="main__container flex col center max-height" v-else>
    <img :src="dark?'/logo-dark.png':'/logo-light.png'" alt="Logo" class="logo"/>
    <div class="login__form center">
      <FloatLabel>
        <label for="username">Usuario</label>
        <InputText v-model="username" id="username"/>
      </FloatLabel>
      <FloatLabel>
        <label for="password">Contraseña</label>
        <InputText v-model="password" id="password"/>
      </FloatLabel>

      <Button label="Iniciar sesión" class="margin-top-1" @click="login"/>
    </div>
  </div>
</template>

<style scoped>
.login__form{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.logo{
  width: 15rem;
  margin-bottom: 1rem;
}
</style>