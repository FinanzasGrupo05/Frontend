const keys = {
    user: 'user--data',
    invoices: 'invoices--data',
    wallets: 'wallets--data',
    currency: 'selected--currency',
}
const currencies = [
    {
        id: 1,
        small: 'USD',
        name: 'Dólares',
        symbol: '$',
        rate: 3.82
    },
    {
        id: 2,
        small: 'PEN',
        name: 'Soles',
        symbol: 'S/.',
        rate: 1
    }
];
const discountTypes = [
    {
        id: 1,
        name: 'Efectiva',
        value: 1,
        sig: 'E',
        toTex({period, percentage, newPeriod}){
            return (Math.pow(1 + percentage, newPeriod/period) - 1)
        },
    },
    {
        id: 2,
        name: 'Nominal',
        value: 2,
        sig: 'N',
        toTex({period, percentage, newPeriod}){
            return (Math.pow((1 + percentage/period), newPeriod) - 1)
        },
    }
];
const discountPeriods = [
    {
        id: 1,
        name: 'Diaria',
        sig: 'D',
        value: 1
    },
    {
        id: 2,
        name: 'Quincenal',
        sig: 'Q',
        value: 15
    },
    {
        id: 3,
        name: 'Mensual',
        sig: 'M',
        value: 30
    },
    {
        id: 4,
        name: 'Bimestral',
        sig: 'B',
        value: 60
    },
    {
        id: 5,
        name: 'Trimestral',
        sig: 'T',
        value: 90
    },
    {
        id: 6,
        name: 'Cuatrimestral',
        sig: 'C',
        value: 120
    },
    {
        id: 7,
        name: 'Semestral',
        sig: 'S',
        value: 180
    },
    {
        id: 8,
        name: 'Anual',
        sig: 'A',
        value: 360
    }
];
const invoiceStatuses = [
    {
        id: 1,
        name: 'Descontada',
        value: 1
    },
    {
        id: 2,
        name: 'Cancelada',
        value: 2
    }
];
const sexes = [
    {
        id: 1,
        name: 'Masculino',
        welcome: 'Bienvenido',
        value: true
    },
    {
        id: 2,
        name: 'Femenino',
        welcome: 'Bienvenida',
        value: false
    }
];
const calendarLabels = {
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    chooseYear: "Elegir Año",
    chooseMonth: "Elegir Mes",
    chooseDate: "Elegir Fecha",
    prevDecade: "Década Anterior",
    nextDecade: "Década Siguiente",
    prevYear: "Año Anterior",
    nextYear: "Año Siguiente",
    prevMonth: "Mes Anterior",
    nextMonth: "Mes Siguiente",
    prevHour: "Hora Anterior",
    nextHour: "Hora Siguiente",
    prevMinute: "Minuto Anterior",
    nextMinute: "Minuto Siguiente",
    prevSecond: "Segundo Anterior",
    nextSecond: "Segundo Siguiente",
    today: "Hoy",
    clear: "Borrar",
    dateFormat: "dd/mm/yy"
}
export {keys, currencies, discountTypes, discountPeriods, invoiceStatuses, sexes, calendarLabels}