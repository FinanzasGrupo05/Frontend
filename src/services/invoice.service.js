import useAxios from './shared/useAxios'
import { useApi } from './shared/useApi'

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
