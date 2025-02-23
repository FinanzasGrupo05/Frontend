<script>
import { RouterLink, RouterView } from 'vue-router'
import router from "@/router/index.js";
import {keys} from "@/services/values.js";
import {getDefaultValue, getLocalStorageItem, setLocalStorageItem} from "@/services/functions.js";
export default {
  name: 'TF Economia Natalia Cabanillas',
  data() {
    return {
      dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
      user: getLocalStorageItem(keys.user),
      invoices: getLocalStorageItem(keys.invoices, getDefaultValue(keys.invoices)),
      wallets: getLocalStorageItem(keys.wallets, getDefaultValue(keys.wallets)),
      wallet: null,
      processing: false,
    }
  },
  methods: {
    saveUser(user) {
      this.user = user
      setLocalStorageItem(keys.user, user)
    },

    //Auth functions
    login(user) {
      this.saveUser(user)
      this.$router.push({name: 'home'})
    },
    logout() {
      this.saveUser(null)
      this.$router.push({name: 'login'})
    },

    //Jumpers
    goToInvoices() {
      this.$router.push({name: 'invoices'})
    },
    goToWallets(){
      this.$router.push({name: 'wallets'})
    },
    goToWallet(wallet){
      this.wallet = wallet;
      this.$router.push({name: 'wallet'})
    },



    //CRUD Methods
    async createInvoice(invoice) {
      try {
        this.processing = 'Creando Factura...'
        invoice.id = this.invoices.length ? this.invoices[this.invoices.length-1].id + 1 : 1
        this.invoices.push(invoice)
        //await 1 seconds
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
        setLocalStorageItem(keys.invoices, this.invoices)
      } catch (error) {
        console.error(error)
      } finally {
        this.processing = false
      }
    },
    async unlinkInvoice(invoice){
      try {
        this.processing = 'Desvinculando Factura...'

        //Remove invoice from wallet
        this.wallet = this.wallets.find(w => w.id === invoice.walletId)
        if(this.wallet) this.wallet.invoices = this.wallet.invoices.filter(i => i.id !== invoice.id)

        //Remove walletId from invoice
        invoice.walletId = null

        //await 1 seconds
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
        setLocalStorageItem(keys.invoices, this.invoices)
        setLocalStorageItem(keys.wallets, this.wallets)
      } catch (error) {
        console.error(error)
      } finally {
        this.processing = false
      }
    },
    async linkInvoice(invoice) {
      this.wallet = this.wallets.find(w => w.id === invoice.walletId)
      if(this.wallet) this.wallet.invoices = this.wallet.invoices.filter(i => i.id !== invoice.id)
    },
    async deleteInvoice(invoice){
      try {
        this.processing = 'Eliminando Factura...'
        this.invoices = this.invoices.filter(i => i !== invoice)

        if(invoice.walletId){
          const wallet = this.wallets.find(w => w.id === invoice.walletId)
          if(wallet){ wallet.invoices = wallet.invoices.filter(i => i !== invoice) }
        }
        //await 1 seconds
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
        setLocalStorageItem(keys.invoices, this.invoices)
        setLocalStorageItem(keys.wallets, this.wallets)
      } catch (error) {
        console.error(error)
      } finally {
        this.processing = false
      }
    },
    async createWallet(wallet){
      try {
        this.processing = 'Creando Cartera...'

        wallet.id = this.wallets.length ? this.wallets[this.wallets.length-1].id + 1 : 1
        wallet.invoices.forEach(invoice => {
          const i = this.invoices.find(i => i.id === invoice.id)
          if(i) {
            i.walletId = wallet.id
            invoice = i;
          }
        })
        this.wallets.push(wallet)

        //await 1 seconds
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

        setLocalStorageItem(keys.wallets, this.wallets)
        setLocalStorageItem(keys.invoices, this.invoices)
      } catch (error) {
        console.error(error)
      } finally {
        this.processing = false
      }
    },
    async deleteWallet(wallet){
      try {
        this.processing = 'Eliminando Cartera...'
        this.wallets = this.wallets.filter(w => w !== wallet)

        this.invoices.forEach(invoice => {
          if(invoice.walletId === wallet.id) invoice.walletId = null
        })
        //await 1 seconds
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
        setLocalStorageItem(keys.wallets, this.wallets)
        setLocalStorageItem(keys.invoices, this.invoices)
      } catch (error) {
        console.error(error)
      } finally {
        this.processing = false
      }
    },
  },
  created() {
    this.invoices.forEach((invoice, index) => {
      invoice.id = index;
    })
    setLocalStorageItem(keys.invoices, this.invoices)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => { this.dark = e.matches; });
    this.$router.push({name: this.user?'home':'login'})
  }
}
</script>

<template>
  <Toast/>
  <ConfirmDialog/>
  <header :class="user?'appear':'vanish'">
    <div class="flex row row-justify-center padding-0-5">
      <img :src="dark?'/logo-dark.png':'/logo-light.png'" alt="Logo" class="header__logo"/>
      <div class="flex row center padding-1">
        <div @click="goToInvoices" class="text-button">Mis Facturas</div>
        <Divider layout="vertical"/>
        <div @click="goToWallets" class="text-button">Reporte Cartera</div>
        <Divider layout="vertical"/>
        <div @click="logout" class="text-button">Cerrar Sesión</div>
      </div>
    </div>
  </header>
  <main :class="user?'normal':'full'">
    <RouterView :user="user" :dark="dark" :invoices="invoices" :wallets="wallets" :wallet="wallet"
                :processing="processing"
                @login="login" @logout="saveUser(null)"
                @createInvoice="createInvoice" @deleteInvoice="deleteInvoice" @unlinkInvoice="unlinkInvoice"
                @createWallet="createWallet" @deleteWallet="deleteWallet" @goToWallet="goToWallet"/>
  </main>
  <footer :class="user?'appear':'vanish'">
    <div class="flex col center max-height">
      <div>© CarteraGo Corporation - 2024</div>
      <div>Todos los derechos reservados</div>
    </div>
  </footer>
</template>

<style>
.header__logo{
  height: 5rem;
}
</style>
