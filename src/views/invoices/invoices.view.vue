<script>
import {currencies} from "@/services/values.js";
import {parseDate} from "@/services/functions.js";
import createInvoice from "@/components/invoices/create.invoice.vue";
import createWallet from "@/components/wallet/create.wallet.vue";
import loadingView from "@/views/loading.view.vue";
export default {
  name: "wallets.view.vue",
  components: { createInvoice, createWallet, loadingView, },
  props: {
    dark: Boolean,
    user: {
      type: Object,
      default: null,
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
      currency: currencies[0],
      currencies,
      dialogs: {
        newInvoice: false,
        newWallet: false,
      }
    }
  },
  methods: {
    parseDate,
    createInvoice(invoice) {
      this.dialogs.newInvoice = false
      this.$emit('createInvoice', invoice)
    },
    createWallet(wallet) {
      this.dialogs.newWallet = false
      this.$emit('createWallet', wallet)
    },
    deleteInvoice(invoice) {
      this.$confirm.require({
        header: 'Eliminar Factura',
        message: `¿Estás seguro de eliminar ${invoice.name}?`,
        icon: 'pi pi-exclamation-triangle',
        acceptProps: {
          label: 'Eliminar'
        },
        accept: () => this.$emit('deleteInvoice', invoice),
        rejectProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true
        },
      })
    }
  },
  created() {

    if(!this.user) this.$router.push({name: 'login'})
  }
}
</script>

<template>
  <createInvoice :visible="dialogs.newInvoice" @close="dialogs.newInvoice = false" @save="createInvoice"/>
  <createWallet :visible="dialogs.newWallet" @close="dialogs.newWallet = false" @save="createWallet"
                :invoices="invoices"/>
  <loadingView v-if="processing" :msg="processing"/>
  <div class="main__container flex col col-top-center max-height max-width padding-2 gap-1" v-else>
    <div class="max-width font-30">Facturas:</div>
    <div class="max-width flex row row-justify-center">
      <div class="flex row gap-1 center">
        <div class="font-16">Moneda:</div>
        <Dropdown v-model="currency" :options="currencies" optionLabel="name"/>
      </div>

      <div class="flex row gap-1 center">
        <Button label="Nueva Factura" icon="pi pi-plus" @click="this.dialogs.newInvoice = true"/>
        <Button label="Nueva Cartera" icon="pi pi-plus" @click="this.dialogs.newWallet = true" severity="secondary"/>
      </div>
    </div>

    <div v-if="invoices.length === 0">No hay facturas porque eres pobre como Natalia Cabanillas</div>
    <div v-else class="max-width flex col gap-1">
      <Card v-for="invoice in invoices" :key="invoice.id" class="wallet__container max-width">
        <template #content>
          <div class="flex row row-justify-center gap-2">
            <div class="flex-col max-width">
              <div class="wallet__name">{{ invoice.name }}</div>


              <div class="flex row row-justify-center">
                <div class="flex col max-width" id="left__side">
                  <div class="wallet__client">
                    Cliente: {{ invoice.client.name }}
                  </div>

                  <div class="wallet__balance">
                    Monto: {{ currency.symbol}} {{ (invoice.amount / currency.rate).toFixed(2) }}
                  </div>
                </div>
                <div class="flex col max-width" id="right__side">
                  <div class="wallet__date">
                    Fecha Emisión:
                    {{ parseDate(invoice.emission) }}
                  </div>
                  <div class="wallet__date">
                    Fecha Vencimiento:
                    {{ parseDate(invoice.expiration) }}
                  </div>
                </div>
              </div>

            </div>
            <div class="flex row gap-1">
              <div class="flex col center">
                <i class="pi pi-trash text-button margin-1" @click="deleteInvoice(invoice)"/>
              </div>
            </div>

          </div>

        </template>
      </Card>
      <div class="transparent">.</div>
    </div>
  </div>
</template>

<style scoped>
.wallet__name{
  font-weight: 300;
  font-size: 1.5rem;
  padding-bottom: 0.3rem;
}
</style>