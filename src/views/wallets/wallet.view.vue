<script>
import loadingView from "@/views/loading.view.vue";
import createInvoice from "@/components/invoices/create.invoice.vue";
import {currencies, invoiceStatuses} from "@/services/values.js";
import {parseDate} from "@/services/functions.js";
import {Select} from "primevue";
export default {
  name: "wallet.view.vue",
  components: {Select, loadingView, createInvoice},
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
      currency: currencies[0],
      currencies,
      invoiceStatuses,
      dialogs: {
        newInvoice: false,
      }
    }
  },
  methods: {
    parseDate,
    createInvoice(invoice) {
      this.dialogs.newInvoice = false
      invoice.walletId = this.wallet.id;
      this.$emit('createInvoice', invoice)
    },
    unlinkInvoice(invoice) {
      this.$emit('unlinkInvoice', invoice)
    },
  }
}
</script>

<template>
  <createInvoice v-if="dialogs.newInvoice" :dark="dark" @createInvoice="createInvoice" @close="dialogs.newInvoice = false"/>

  <loadingView v-if="processing" :dark="dark" :msg="processing"/>
  <div class="main__container flex col col-top-center max-height max-width padding-2 gap-1" v-else-if="wallet">
    <div class="max-width font-30">{{wallet.name}}</div>
    <div class="flex row row-justify-center gap-1 max-width">
      <div class="flex row gap-0-5">
        <div class="flex col center">Moneda:</div>
        <Select :options="currencies" optionLabel="name" v-model="currency"/>
      </div>
    </div>
    <DataTable :value="wallet.invoices" :paginator="true" :rows="5" :rowsPerPageOptions="[5,10,20]"
               :paginatorPosition="'bottom'" class="max-width" tableClass="max-width"
               :emptyMessage="'No hay facturas en esta cartera'" sortMode="single">
      <Column field="name" header="Nombre" sortable/>
      <Column header="Cliente">
        <template #body="slotProps">
          {{slotProps.data.client.name}}
        </template>
      </Column>
      <Column header="Monto" field="amount" sortable>
        <template #body="slotProps">
          {{ currency.symbol}} {{ (slotProps.data.amount / currency.rate).toFixed(2) }}
        </template>
      </Column>
      <Column header="Fecha Emisión" field="emission" sortable>
        <template #body="slotProps">
          {{parseDate(slotProps.data.emission)}}
        </template>
      </Column>
      <Column header="Fecha Vencimiento" field="expiration" sortable>
        <template #body="slotProps">
          {{parseDate(slotProps.data.expiration)}}
        </template>
      </Column>
      <Column header="Interés Descontado">
        <template #body="slotProps">
          <div class="flex col center">
            <div>Calcúlame</div>
            <img src="/esta.png" alt="Ésta" class="size-100"/>
          </div>
        </template>
      </Column>
      <Column header="Estado" field="status">
        <template #body="slotProps">
          <Select :options="invoiceStatuses" optionLabel="name" v-model="slotProps.data.status"/>
        </template>
      </Column>
      <Column header="Desvincular">
        <template #body="slotProps">
          <Button icon="pi pi-link" @click="unlinkInvoice(slotProps.data)"/>
        </template>
      </Column>
    </DataTable>
    <div class="transparent">.</div>
  </div>
  <div v-else class="screen-height flex col center">
    No hay una cartera seleccionada
  </div>
</template>

<style scoped>

</style>