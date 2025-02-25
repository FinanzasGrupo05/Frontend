import useAxios from "../../server/hooks/useAxios.js";
import useApi from "../../server/hooks/useApi.js";

export class InvoiceService {
    constructor() {
        this.apiMethods = useApi('/factura')
        this.axiosInstance = useAxios()
    }

    async getInvoices() {
        return await this.apiMethods.getObjects()
    }

    async createInvoice(factura) {
        return await this.apiMethods.postObject(factura)
    }
}