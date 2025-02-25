export const formatDateToOnlyDate = (date) => {
    return new Date(date).toISOString().split('T')[0]
}
