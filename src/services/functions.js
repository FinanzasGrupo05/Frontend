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
    const diffTime = date2 - date1
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function calcInteresDescontado({porcentajeTasa, tipoTasa, periodoTasa }) {

}

function calcTCEA({monto, gastoInicial, gastoFinal, fechaDescuento, fechaFinal, porcentajeTasa, tipoTasa, periodoTasa }){
    const dias = getDaysBetweenDates(fechaDescuento, fechaFinal);
    porcentajeTasa = porcentajeTasa / 100;

    const discountType = discountTypes.find((type) => type.id === tipoTasa.id)
    if(!discountType) return 'Tipo de tasa no encontrado'

    const TEX = discountType.toTex({period: periodoTasa.value, percentage: porcentajeTasa, newPeriod: dias});

    const tasaDescuento = TEX / (1 + TEX);

    const valorNeto = monto * (1 - tasaDescuento)
    const interestDescontado = monto - valorNeto;
    const valorRecibido = valorNeto - gastoInicial;
    const valorEntregado = monto + gastoFinal;


    return {
        TCEA: Math.pow(valorEntregado / valorRecibido, 360 / dias) - 1,
        descontado: interestDescontado,
        recibido: valorRecibido,
        entregado: valorEntregado
    }
}
export { getLocalStorageItem, setLocalStorageItem, getDefaultValue, parseDate, calcTCEA, calcInteresDescontado }