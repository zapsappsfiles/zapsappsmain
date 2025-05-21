// Mock for @emailjs/browser

interface EmailJSResponseStatus {
  status: number;
  text: string;
}

const emailjs = {
  init: (publicKey: string): void => {
    console.log('Mock emailjs.init called with public key:', publicKey);
  },
  send: (serviceId: string, templateId: string, templateParams: Record<string, any>, publicKey?: string): Promise<EmailJSResponseStatus> => {
    console.log('Mock emailjs.send called with params:', { serviceId, templateId, templateParams, publicKey });
    return Promise.resolve({ status: 200, text: 'OK' });
  },
  sendForm: (serviceId: string, templateId: string, form: HTMLFormElement, publicKey?: string): Promise<EmailJSResponseStatus> => {
    console.log('Mock emailjs.sendForm called with params:', { serviceId, templateId, form, publicKey });
    return Promise.resolve({ status: 200, text: 'OK' });
  }
};

export default emailjs; 