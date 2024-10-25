function convertToSubcurrency(amount: number | undefined, factor = 100) {
    if (amount) {
        return Math.round(amount * factor);
    }
}

export default convertToSubcurrency;