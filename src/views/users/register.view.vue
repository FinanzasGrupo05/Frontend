<script>
import loading from "@/views/loading.view.vue";
import {FloatLabel} from "primevue";
import registerService from "@/services/users/register.service.js";
import {sexes} from "@/services/values.js";
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
    login(){
      this.$router.push({name: 'login'})
    },
    async register() {
      this.$toast.removeAllGroups()
      this.loading = true
      try {
        const response = await registerService({
          username: this.username,
          password: this.password,
          name: this.name,
          sex: this.sex
        })
        this.$emit('login', response)
      } catch (e) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error al crear la cuenta',
          detail: 'Ya existe otra cuenta con estas credenciales',
          life: 5000
        })
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  },
  data(){
    return {
      name: '',
      username: '',
      password: '',
      sex: null,

      sexes,
      loading: false
    }
  },
  created() {
    if(this.user) this.$router.push({name: 'home'})
  }
}
</script>

<template>
  <loading v-if="loading" msg="Creando cuenta..."/>
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
      <FloatLabel>
        <label for="nombres">Nombre</label>
        <InputText v-model="name" id="nombres"/>
      </FloatLabel>
      <FloatLabel>
        <label for="sexo">Sexo</label>
        <Select v-model="sex" id="sexo" :options="sexes" optionLabel="name" optionValue="value"/>
      </FloatLabel>

      <div class="flex row center gap-1">
        <Button label="Volver a Login" class="margin-top-1" @click="login" severity="secondary"/>
        <Button label="Registrarme" class="margin-top-1" @click="register"/>
      </div>

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