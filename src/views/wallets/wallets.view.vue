<script>
import loadingView from "@/views/loading.view.vue";
import createWallet from "@/components/wallet/create.wallet.vue";
import {currencies, keys} from "@/services/values.js";
import {getLocalStorageItem, parseDate, setLocalStorageItem} from "@/services/functions.js";
export default {
  name: "wallets.view.vue",
  components: { loadingView,createWallet},
  props: {
    dark: Boolean,
    user: {
      type: Object,
      default: null,
      required: false,
    },
    wallets: {
      type: Array,
      default: [],
      required: false,
    },
    invoices: {
      type: Array,
      default: [],
      required: false,
    },
    processing: {
      type: String,
      default: "",
      required: false,
    },
  },
  data(){
    return {
      currency: currencies.find(c => c.id === getLocalStorageItem(keys.currency, currencies[0].id)),
      currencies,
      dialogs: {
        newWallet: false,
      }
    }
  },
  methods: {
    parseDate,
    createWallet(wallet) {
      this.dialogs.newWallet = false
      this.$emit('createWallet', wallet)
    },
    deleteWallet(wallet){
      this.$confirm.require({
        header: 'Eliminar Cartera',
        message: `¿Estás seguro de eliminar ${wallet.name}?`,
        icon: 'pi pi-exclamation-triangle',
        acceptProps: {
          label: 'Eliminar'
        },
        accept: () => this.$emit('deleteWallet', wallet),
        rejectProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true
        }
      })
    },
    seeWallet(wallet){
      this.$emit('goToWallet', wallet)
    }
  },
  watch: {
    currency: {
      handler(){
        if(this.currency) setLocalStorageItem(keys.currency, this.currency.id)
      },
      deep: true
    }
  }
}
</script>

<template>
  <createWallet :visible="dialogs.newWallet" @close="dialogs.newWallet = false" @save="createWallet"
                :invoices="invoices" :currency="currency"/>
  <loadingView v-if="processing" :msg="processing"/>
  <div class="main__container flex col col-top-center max-height max-width padding-2 gap-1" v-else>
    <div class="max-width font-30">Carteras:</div>
    <div class="max-width flex row row-justify-center">
      <div class="flex row gap-1 center">
        <div class="font-16">Moneda:</div>
        <Dropdown v-model="currency" :options="currencies" optionLabel="name"/>
      </div>

      <div class="flex row gap-1 center">
        <Button label="Nueva Cartera" icon="pi pi-plus" @click="this.dialogs.newWallet = true"/>
      </div>
    </div>

    <div v-if="wallets.length === 0">No hay carteras creadas</div>
    <div v-else class="max-width flex col gap-1">
      <Card v-for="wallet in wallets" :key="wallet.id" class="wallet__container max-width">
        <template #content>
          <div class="flex row row-justify-center gap-2">
            <div class="flex-col">
              <div class="wallet__name">{{ wallet.name }}</div>

              <div class="wallet__client">
                Tasa: {{ wallet.discount.percentage }}%
                T{{ wallet.discount.type.sig }}{{ wallet.discount.period.sig }}
                (Tasa {{ wallet.discount.type.name }} {{ wallet.discount.period.name }})
              </div>

              <div class="wallet__balance">
                Fecha de Descuento: {{ parseDate(wallet.discount.date) }}
              </div>
            </div>
            <div class="flex row gap-2 margin-1">
                <i class="pi pi-eye text-button" @click="seeWallet(wallet)"/>
                <i class="pi pi-trash text-button" @click="deleteWallet(wallet)"/>
            </div>
          </div>
        </template>
      </Card>
      <div class="transparent">.</div>
    </div>
  </div>
</template>

<style scoped>

</style>