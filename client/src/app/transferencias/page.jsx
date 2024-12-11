import React from 'react';

const Transferencias = () => {
  // Datos de transferencias como un array de objetos
  const transacciones = [
    { fecha: '2024-09-14', descripcion: 'Transferencia recibida', monto: '+ $79.000,00', tipo: 'ingreso' },
    { fecha: '2024-09-13', descripcion: 'Insumos médicos', monto: '- $5.120,45', tipo: 'egreso' },
    { fecha: '2024-09-12', descripcion: 'Electrodomésticos', monto: '- $340.000,40', tipo: 'egreso' },
    { fecha: '2024-09-11', descripcion: 'Pago de tarjeta de crédito', monto: '- $3.200,00', tipo: 'egreso' },
    { fecha: '2024-09-10', descripcion: 'Depósito en cuenta', monto: '+ $5.000,00', tipo: 'ingreso' },
    { fecha: '2024-09-09', descripcion: 'Compra en tienda online', monto: '- $1.200,00', tipo: 'egreso' },
    { fecha: '2024-09-08', descripcion: 'Transferencia enviada', monto: '- $2.000,00', tipo: 'egreso' },
    { fecha: '2024-09-07', descripcion: 'Transferencia recibida', monto: '+ $1.500,00', tipo: 'ingreso' },
    { fecha: '2024-09-06', descripcion: 'Pago de servicios públicos', monto: '- $900,00', tipo: 'egreso' },
    { fecha: '2024-09-05', descripcion: 'Transferencia recibida', monto: '+ $83.0000,00', tipo: 'ingreso' },
    { fecha: '2024-09-04', descripcion: 'Retiro en cajero automático', monto: '- $500,00', tipo: 'egreso' },
    { fecha: '2024-09-03', descripcion: 'Transferencia enviada', monto: '- $1.000,00', tipo: 'egreso' },
    { fecha: '2024-09-02', descripcion: 'Transferencia recibida', monto: '+ $3.000,00', tipo: 'ingreso' },
  ];

  return (
    <div className="dashboard max-w-[900px] mx-auto ml-0 text-left">
      <h1 className="text-2xl font-bold mb-6">Historial de transferencias</h1>
      <table className="w-full border-collapse mt-5">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-3 text-left">Fecha</th>
            <th className="px-4 py-3 text-left">Descripción</th>
            <th className="px-4 py-3 text-left">Monto</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map((transaccion, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3 text-left text-gray-700" data-label="Fecha">{transaccion.fecha}</td>
              <td className="px-4 py-3 text-left text-gray-700" data-label="Descripción">{transaccion.descripcion}</td>
              <td 
                className={`px-4 py-3 font-bold ${transaccion.tipo === 'ingreso' ? 'text-green-600' : 'text-red-700'}`} 
                data-label="Monto"
              >
                {transaccion.monto}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transferencias;