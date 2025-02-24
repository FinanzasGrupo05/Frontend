<script>
import {discountTypes, discountPeriods} from "@/services/values.js";
import {FloatLabel} from "primevue";
function getNewWallet() {
  return {
    name: '',
    discount: {
      date: 0,
      percentage: null,
      type: null,
      period: null,
    },

    startingBills: null,
    endingBills: null,
    invoices: [],
  }
}

export default {
  name: "create.wallet",
  components: {FloatLabel},
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
      wallet: getNewWallet(),
      discountDate: null,
      discountTypes,
      discountPeriods,
      noInvoicesMsg: 'No hay facturas para agregar',
    }
  },
  methods: {
    sendErrorMsg(msg){ return this.$toast.add({severity: 'error', summary: 'Error', detail: msg, life: 5000}) },
    close() {this.$emit('close')},
    save() {
      console.log(this.wallet)
      if(!this.wallet.name) return this.sendErrorMsg('Por favor, complete el nombre de la cartera.')
      if(!this.wallet.discount.date) return this.sendErrorMsg('Por favor, complete la fecha de descuento de la cartera.')
      if(!this.wallet.discount.percentage) return this.sendErrorMsg('Por favor, complete el porcentaje de descuento de la cartera.')
      if(!this.wallet.discount.type) return this.sendErrorMsg('Por favor, complete el tipo de descuento de la cartera.')
      if(!this.wallet.discount.period) return this.sendErrorMsg('Por favor, complete el periodo de descuento de la cartera.')
      if(!this.wallet.startingBills) return this.sendErrorMsg('Por favor, complete el monto inicial de la cartera.')
      if(!this.wallet.endingBills) return this.sendErrorMsg('Por favor, complete el monto final de la cartera.')
      if(!this.wallet.invoices.length) return this.sendErrorMsg('Por favor, seleccione facturas para agregar a la cartera.')

      this.$emit('save', this.wallet)
      this.wallet = getNewWallet()
    },
  },
  watch: {
    discountDate: {
      handler: function (val) { this.wallet.discount.date = val.getTime() },
      deep: true
    }
  }
}
</script>

<template>
  <Dialog :visible="visible" modal header="Crear Nueva Cartera" :style="{ width: '20rem' }">
    <template #closeicon>
      <Button icon="pi pi-times" class="p-button-text" @click="close" severity="secondary"/>
    </template>
    <div class="flex col gap-0-5 center">
      <FloatLabel>
        <InputText id="name" class="flex-auto" autocomplete="off" v-model="wallet.name"/>
        <label for="name">Nombre de la Cartera</label>
      </FloatLabel>
      <FloatLabel>
        <Calendar id="discountDate" v-model="discountDate"/>
        <label for="discountDate">Fecha de Descuento</label>
      </FloatLabel>
      <FloatLabel>
        <label for="discountPercentage">Porcentaje de Descuento</label>
        <InputNumber id="discountPercentage" v-model="wallet.discount.percentage" mode="decimal" min="0" max="100"/>
      </FloatLabel>
      <FloatLabel>
        <Dropdown id="discountType" v-model="wallet.discount.type" :options="discountTypes" optionLabel="name"/>
        <label for="discountType">Tipo de Descuento</label>
      </FloatLabel>
      <FloatLabel>
        <Dropdown id="discountPeriod" v-model="wallet.discount.period" :options="discountPeriods" optionLabel="name"/>
        <label for="discountPeriod">Periodo de Descuento</label>
      </FloatLabel>

      <FloatLabel>
        <label for="startingBills">Monto Inicial</label>
        <InputNumber id="startingBills" v-model="wallet.startingBills" mode="currency" currency="PEN"/>
      </FloatLabel>
      <FloatLabel>
        <label for="endingBills">Monto Final</label>
        <InputNumber id="endingBills" v-model="wallet.endingBills" mode="currency" currency="PEN"/>
      </FloatLabel>

      <FloatLabel>
        <MultiSelect v-if="invoices.length" id="invoices" optionLabel="name" v-model="wallet.invoices"
                    :options="invoices" :optionDisabled="invoice=>invoice.walletId"/>
        <InputText v-else id="invoices" v-model="noInvoicesMsg" disabled/>
        <label for="invoices">Facturas</label>
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