import {keys, discountTypes} from "@/services/values.js";
function getLocalStorageItem(key, defaultValue = null) {
  return localStorage.getItem(key)?
      JSON.parse(localStorage.getItem(key)):
      defaultValue
}
function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
function parseDate(date){
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
}
function getDefaultValue(key){
    switch (key) {
        case keys.user:
            return {
                id: null,
                name: "",
                email: "",
                password: "",
                role: "",
                status: "",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        case keys.invoices:
            return [
                {
                    id: 1,
                    name: 'Factura 1',
                    amount: 100,
                    client: {
                        id: 1,
                        name: 'Cliente 1',
                    },
                    //Date in milliseconds
                    emission: 1740000000000,
                    expiration: 1780000000000,
                },
            ]
        case keys.wallets: return [];
    }
}



function getDaysBetweenDates(date1, date2){
    const diffTime = Math.abs(date2 - date1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
function calcTCEA({monto, gastoInicial, gastoFinal, fechaDescuento, fechaFinal, porcentajeTasa, tipoTasa, periodoTasa }){
    const dias = getDaysBetweenDates(fechaDescuento, fechaFinal);
    const valorEntregado = monto + gastoFinal;

    const TEA = tipoTasa.toTea()
    const tasaEfectivaDescuento = TEA / (1 + TEA);
}
export { getLocalStorageItem, setLocalStorageItem, getDefaultValue, parseDate }