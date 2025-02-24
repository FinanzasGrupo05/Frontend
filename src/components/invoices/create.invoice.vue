<script>
function getNewInvoice() {
  return {
    name: '',
    client: {
      name: '',
    },
    amount: 0,
    emission: 0,
    expiration: 0,
  }
}
import {invoiceStatuses} from "@/services/values.js";
export default {
  name: "create.invoce",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      invoice: getNewInvoice(),
      emissionDate: null,
      expirationDate: null,
    }
  },
  methods: {
    // Emitir el cambio de visibilidad
    sendErrorMsg(msg){
      return this.$toast.add({severity: 'error', summary: 'Error', detail: msg, life: 5000})
    },
    close() {this.$emit('close')},
    save() {
      console.log(this.invoice)
      if(!this.invoice.name) return this.sendErrorMsg('Por favor, complete el nombre de la factura.')
      if(!this.invoice.client.name) return this.sendErrorMsg('Por favor, complete el nombre del cliente.')
      if(!this.invoice.amount) return this.sendErrorMsg('Por favor, complete el monto de la factura.')
      if(!this.invoice.emission) return this.sendErrorMsg('Por favor, complete la fecha de emisión de la factura.')
      if(!this.invoice.expiration) return this.sendErrorMsg('Por favor, complete la fecha de vencimiento de la factura.')
      if(this.invoice.emission > this.invoice.expiration) return this.sendErrorMsg('La fecha de emisión debe ser anterior a la fecha de vencimiento.')

      this.invoice.status = invoiceStatuses[0]

      this.$emit('save', this.invoice)
      this.invoice = getNewInvoice()
    },
  },
  watch: {
    emissionDate: {
      handler: function (val) { this.invoice.emission = val.getTime() },
      deep: true
    },
    expirationDate: {
      handler: function (val) { this.invoice.expiration = val.getTime() },
      deep: true
    }
  }
}
</script>

<template>
  <Dialog :visible="visible" modal header="Crear Nueva Factura" :style="{ width: '20rem' }" >
    <template #closeicon>
      <Button icon="pi pi-times" class="p-button-text" @click="close" severity="secondary"/>
    </template>
    <div class="flex col gap-0-5 center">
      <FloatLabel>
        <label for="name">Nombre de la Factura</label>
        <InputText id="name" class="flex-auto" autocomplete="off" v-model="invoice.name"/>
      </FloatLabel>
      <FloatLabel>
        <label for="client">Nombre del Cliente</label>
        <InputText id="client" class="flex-auto" autocomplete="off" v-model="invoice.client.name"/>
      </FloatLabel>
      <FloatLabel>
        <label for="amount">Monto</label>
        <InputNumber id="amount" class="flex-auto" mode="currency" currency="PEN" v-model="invoice.amount"/>
      </FloatLabel>
      <FloatLabel>
        <label for="emission">Fecha de Emisión</label>
        <Calendar id="emission" class="flex-auto" v-model="emissionDate"/>
      </FloatLabel>
      <FloatLabel>
        <label for="expiration">Fecha de Vencimiento</label>
        <Calendar id="expiration" class="flex-auto" v-model="expirationDate"/>
      </FloatLabel>

      <div class="flex row gap-0-5 center">
        <Button label="Cancelar" severity="secondary" @click="close"/>
        <Button label="Guardar" @click="save"/>
      </div>
    </div>

  </Dialog>
</template>

<style scoped>

</style>