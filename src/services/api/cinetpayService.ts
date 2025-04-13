declare global {
  interface Window {
    CinetPay: any;
  }
}

interface CinetPayConfig {
  apikey: string;
  site_id: string;
  notify_url: string;
  mode: 'PRODUCTION' | 'DEVELOPMENT';
}

interface PaymentData {
  transaction_id: string;
  amount: number;
  currency: string;
  description: string;
  customer_name: string;
  customer_surname: string;
  customer_email: string;
  customer_phone_number: string;
  customer_address?: string;
  customer_city?: string;
  customer_country?: string;
  customer_state?: string;
  customer_zip_code?: string;
}

export class CinetPayService {
  private static config: CinetPayConfig = {
    apikey: import.meta.env.VITE_CINETPAY_APIKEY,
    site_id: import.meta.env.VITE_CINETPAY_SITE_ID,
    notify_url: `${import.meta.env.VITE_API_URL}/payments/notify/`,
    mode: import.meta.env.PROD ? 'PRODUCTION' : 'DEVELOPMENT'
  };

  static initializePayment(paymentData: PaymentData): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof window.CinetPay === 'undefined') {
        reject(new Error('CinetPay SDK not loaded'));
        return;
      }

      window.CinetPay.setConfig(this.config);

      window.CinetPay.getCheckout({
        ...paymentData,
        channels: 'ALL',
      });

      window.CinetPay.waitResponse((response: any) => {
        if (response.status === 'ACCEPTED') {
          resolve(response);
        } else if (response.status === 'REFUSED') {
          reject(new Error('Payment refused'));
        }
      });

      window.CinetPay.onError((error: any) => {
        reject(error);
      });
    });
  }
}
