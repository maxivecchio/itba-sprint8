"use client"
import React, { useState } from 'react';

const PaymentSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const invoices = [
    { id: 1, description: 'Servicio de Internet', amount: 50000.00, dueDate: '30/09/2024' },
    { id: 2, description: 'Servicio de Agua', amount: 17500.00, dueDate: '05/10/2024' },
    { id: 3, description: 'Servicio de Luz', amount: 22000.00, dueDate: '15/10/2024' },
  ];

  const totalAmount = selectedInvoice ? selectedInvoice.amount : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInvoiceSelect = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de llamada a API de pago
    setTimeout(() => {
      setLoading(false);
      alert(`Pago procesado con éxito para ${selectedInvoice.description}`);
      setSelectedInvoice(null);
      setFormData({ fullName: '', cardNumber: '', expiration: '', cvv: '' });
    }, 2000);
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Pagar Factura</h2>

          <div className="mt-6 mb-8">
            <h3 className="text-lg font-semibold">Selecciona una factura:</h3>
            <ul className="space-y-4">
              {invoices.map(invoice => (
                <li 
                  key={invoice.id} 
                  className={`p-4 border rounded-lg cursor-pointer ${selectedInvoice?.id === invoice.id ? 'bg-blue-100' : 'bg-gray-50'} hover:bg-blue-50`} 
                  onClick={() => handleInvoiceSelect(invoice)}
                >
                  <h4 className="font-medium">{invoice.description}</h4>
                  <p className="text-gray-600">Monto: <span className="font-bold">${invoice.amount.toFixed(2)}</span></p>
                  <p className="text-gray-600">Fecha de vencimiento: {invoice.dueDate}</p>
                </li>
              ))}
            </ul>
          </div>

          {selectedInvoice && (
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form onSubmit={handleSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Nombre completo*</label>
                    <input 
                      type="text" 
                      id="full_name" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                      placeholder="Nombre completo" 
                      required 
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Número de tarjeta*</label>
                    <input 
                      type="text" 
                      id="card-number-input" 
                      name="cardNumber" 
                      value={formData.cardNumber} 
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                      placeholder="xxxx-xxxx-xxxx-xxxx" 
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Fecha de expiración*</label>
                    <input 
                      type="text" 
                      id="card-expiration-input" 
                      name="expiration" 
                      value={formData.expiration} 
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" 
                      placeholder="MM/YY" 
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">CVV*</label>
                    <input 
                      type="number" 
                      id="cvv-input" 
                      name="cvv" 
                      value={formData.cvv} 
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                      placeholder="•••" 
                      required 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="flex w-full items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-black hover:bg-slate-500 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Pagar ahora"}
                </button>
              </form>

              <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total a Pagar</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
            Pago procesado por <a href="#" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Rossum Pagos</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;


