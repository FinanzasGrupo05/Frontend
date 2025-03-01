<script>
import loadingView from "@/views/loading.view.vue";
import createInvoice from "@/components/invoices/create.invoice.vue";
import linkInvoice from "@/components/wallet/link.invoice.vue";
import {currencies, invoiceStatuses, keys} from "@/services/values.js";
import {
  parseDate,
  calcTCEA,
  calcInteresDescontado,
  setLocalStorageItem,
  getLocalStorageItem
} from "@/services/functions.js";
import {Select} from "primevue";
export default {
  name: "wallet.view.vue",
  components: {Select, loadingView, createInvoice, linkInvoice},
  emits: ['createInvoice', 'unlinkInvoice', 'linkInvoice'],
  props: {
    dark: Boolean,
    user: {
      type: Object,
      default: null,
      required: false,
    },
    wallet: {
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
      currency: currencies.find(c => c.id === getLocalStorageItem(keys.currency, currencies[0].id)),
      currencies,
      invoiceStatuses,
      dialogs: {
        newInvoice: false,
        linkInvoice: false,
      },
      parsedInvoices: [],
    }
  },
  methods: {
    calcTCEA,
    calcInteresDescontado,
    parseDate,
    createInvoice(invoice) {
      this.dialogs.newInvoice = false
      invoice.walletId = this.wallet.id;
      this.$emit('createInvoice', invoice)
    },
    unlinkInvoice(invoice) {
      this.$emit('unlinkInvoice', invoice)
    },
    linkInvoice(invoice) {
      this.dialogs.linkInvoice = false
      this.$emit('linkInvoice', invoice)
    }
  },
  created() {
    if(!this.user) this.$router.push({name: 'login'})
  },
  watch: {
    currency: {
      handler(){ if(this.currency) setLocalStorageItem(keys.currency, this.currency.id) },
      deep: true
    },
    wallet: {
      handler(){
        this.parsedInvoices = this.wallet.invoices.map(i => ({
            ...i,
            ...calcTCEA({
              monto: i.amount,
              gastoInicial: this.wallet.startingBills,
              gastoFinal: this.wallet.endingBills,
              fechaDescuento: this.wallet.discount.date,
              fechaFinal: i.expiration,
              porcentajeTasa: this.wallet.discount.percentage,
              tipoTasa: this.wallet.discount.type,
              periodoTasa: this.wallet.discount.period,
            })
          })
        )
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<template>
  <createInvoice :visible="dialogs.newInvoice" :currency="currency" v-if="dialogs.newInvoice"
                 @save="createInvoice" @close="dialogs.newInvoice = false"/>
  <linkInvoice :invoices="invoices" :visible="dialogs.linkInvoice" v-if="dialogs.linkInvoice"
               @linkInvoice="linkInvoice" @close="dialogs.linkInvoice = false"/>
  <loadingView v-if="processing" :dark="dark" :msg="processing"/>
  <div class="main__container flex col col-top-center max-height max-width padding-2 gap-1" v-else-if="wallet">
    <div class="max-width font-30">
      {{wallet.name}}
    </div>
    <div class="flex row row-justify-center max-width">
      <div class="flex col col-center-left max-width">
        <div class="wallet__client">
          Tasa: {{wallet.discount.percentage}}%
          T{{wallet.discount.type.sig}}{{wallet.discount.period.sig}}
          (Tasa {{wallet.discount.type.name}} {{wallet.discount.period.name}})
        </div>
        <div class="wallet__balance">
          Fecha de Descuento: {{parseDate(wallet.discount.date)}}
        </div>
      </div>
      <div class="flex col col-center-left max-width">
        <div class="wallet__balance">
          Costo Inicial: {{currency.symbol}}{{(wallet.startingBills / currency.rate).toFixed(2)}}
        </div>
        <div class="wallet__balance">
          Costo Final: {{currency.symbol}}{{(wallet.endingBills / currency.rate).toFixed(2)}}
        </div>
      </div>
    </div>
    <div class="flex row row-justify-center gap-1 max-width">
      <div class="flex row gap-0-5">
        <div class="flex col center">Moneda:</div>
        <Select :options="currencies" optionLabel="name" v-model="currency"/>
      </div>
      <div class="flex row gap-0-5">
        <Button icon="pi pi-plus" @click="dialogs.newInvoice = true" label="Nueva Factura"/>
        <Button icon="pi pi-plus" secondary @click="dialogs.linkInvoice = true" label="Vincular Factura"/>
      </div>
    </div>
    <DataTable :value="parsedInvoices" :paginator="true" :rows="5" :rowsPerPageOptions="[5,10,20]"
               :paginatorPosition="'bottom'" class="max-width" tableClass="max-width"
               :emptyMessage="'No hay facturas en esta cartera'" sortMode="single">
      <Column field="name" header="Nombre" sortable/>
      <Column header="Cliente">
        <template #body="slotProps">
          {{slotProps.data.client.name}}
        </template>
      </Column>
      <Column header="Monto" field="amount">
        <template #body="slotProps">
          {{ currency.symbol}}{{ (slotProps.data.amount / currency.rate).toFixed(2) }}
        </template>
      </Column>
      <Column header="Emisión" field="emission">
        <template #body="slotProps">
          {{parseDate(slotProps.data.emission)}}
        </template>
      </Column>
      <Column header="Vencimiento" field="expiration">
        <template #body="slotProps">
          {{parseDate(slotProps.data.expiration)}}
        </template>
      </Column>
      <Column header="Interés Descontado">
        <template #body="slotProps">
          <div>{{currency.symbol}}{{(slotProps.data.descontado / currency.rate).toFixed(2)}}</div>
        </template>
      </Column>
      <Column header="Valor Neto">
        <template #body="slotProps">
          <div>{{currency.symbol}}{{(slotProps.data.neto/ currency.rate).toFixed(2)}}</div>
        </template>
      </Column>
      <Column header="Valor Recibido">
        <template #body="slotProps">
          <div>{{currency.symbol}}{{(slotProps.data.recibido / currency.rate).toFixed(2)}}</div>
        </template>
      </Column>
      <Column header="Valor Entregado">
        <template #body="slotProps">
          <div>{{currency.symbol}}{{(slotProps.data.entregado / currency.rate).toFixed(2)}}</div>
        </template>
      </Column>
      <Column header="Estado" field="status">
        <template #body="slotProps">
          <Select :options="invoiceStatuses" optionLabel="name" v-model="slotProps.data.status"
                  :disabled="slotProps.data.status === invoiceStatuses[1]" class="enana"/>
        </template>
      </Column>
      <Column header="TCEA">
        <template #body="slotProps">
          <div>{{ (slotProps.data.TCEA * 100).toFixed(2) }}%</div>
        </template>
      </Column>
      <Column >
        <template #header>
          <div class="flex col center max-width">
            <i class="pi pi-link"/>
          </div>
        </template>
        <template #body="slotProps">
            <Button icon="pi pi-link" @click="unlinkInvoice(slotProps.data)"
                    :disabled="slotProps.data.status === invoiceStatuses[1]"/>
        </template>
      </Column>
    </DataTable>
    <div class="transparent">.</div>
  </div>
  <div v-else class="screen-height flex col center">
    No hay una cartera seleccionada
  </div>
</template>

<style>
.enana{
  width: 9.5rem!important;
  min-width: 9.5rem!important;
  max-width: 9.5rem!important;
}
.enana .p-select-label{
  width: 7rem;
  min-width: 7rem;
  max-width: 7rem;
}
</style>