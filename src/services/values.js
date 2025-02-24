const keys = {
    user: 'user--data',
    invoices: 'invoices--data',
    wallets: 'wallets--data',
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
        toTea({period, percentage}){
            return (Math.pow(1 + percentage, 360/period) - 1)
        },
    },
    {
        id: 2,
        name: 'Nominal',
        value: 2,
        sig: 'N',
        toTea({period, percentage}){
            return (Math.pow((1 + percentage/period), 360) - 1)
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
]
export {keys, currencies, discountTypes, discountPeriods, invoiceStatuses}