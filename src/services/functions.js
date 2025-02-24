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
        case keys.invoices: return []
        case keys.wallets: return [];
    }
}


function getDaysBetweenDates(date1, date2){
    const diffTime = Math.abs(date2 - date1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function calcInteresDescontado({porcentajeTasa, tipoTasa, periodoTasa }) {

    const discountType = discountTypes.find((type) => type.id === tipoTasa.id)
    if (!discountType) return 'Tipo de tasa no encontrado'

    porcentajeTasa = porcentajeTasa / 100;

    const TEA = discountType.toTea({period: periodoTasa.value, percentage: porcentajeTasa});
    return ((TEA / (1 + TEA))*100).toFixed(2) + '%';
}

function calcTCEA({monto, gastoInicial, gastoFinal, fechaDescuento, fechaFinal, porcentajeTasa, tipoTasa, periodoTasa }){
    const dias = getDaysBetweenDates(fechaDescuento, fechaFinal);
    const valorEntregado = monto + gastoFinal;

    const discountType = discountTypes.find((type) => type.id === tipoTasa.id)
    if(!discountType) return 'Tipo de tasa no encontrado'

    porcentajeTasa = porcentajeTasa / 100;

    const TEA = discountType.toTea({period: periodoTasa.value, percentage: porcentajeTasa});
    const tasaEfectivaDescuento = TEA / (1 + TEA);

    const valorNeto = monto * (1 - tasaEfectivaDescuento)
    const valorRecibido = valorNeto - gastoInicial;

    return Math.pow(valorEntregado / valorRecibido, periodoTasa.value / dias) - 1;
}
export { getLocalStorageItem, setLocalStorageItem, getDefaultValue, parseDate, calcTCEA, calcInteresDescontado }