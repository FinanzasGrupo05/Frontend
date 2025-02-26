<script>
export default {
  name: "link invoice",
  props: {
    visible: Boolean,
    invoices: {
      type: Array,
      default: [],
      required: false,
    },
  },
  data() {
    return {
      invoice: null,
      availableInvoices: this.invoices.filter(i => !i.walletId),
      noInvoicesMsg: 'No hay facturas para agregar',
    }
  },
  methods: {
    sendErrorMsg(msg){ return this.$toast.add({severity: 'error', summary: 'Error', detail: msg, life: 5000}) },
    close() { this.$emit('close') },
    linkInvoice() { this.$emit('linkInvoice', this.invoice) },
  }
}
</script>
<template>
  <Dialog :visible="visible" modal header="Vincular Factura" :style="{ width: '20rem' }">
    <template #closeicon>
      <Button icon="pi pi-times" class="p-button-text" @click="close" severity="secondary"/>
    </template>
    <div class="flex col gap-0-5 center">
      <FloatLabel>
        <Dropdown id="discountType" v-model="invoice" :options="invoices" :optionDisabled="option => option.walletId" optionLabel="name"/>
        <label for="discountType">Factura a Vincular</label>
      </FloatLabel>

      <div class="flex row gap-0-5 center">
        <Button label="Cancelar" severity="secondary" @click="close"/>
        <Button label="Vincular" @click="linkInvoice"/>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>

</style>