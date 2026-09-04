import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/helpers';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const orders_state = useStore((state) => state.orders);
  const apiKey = useStore((state) => state.apiKey);

  useEffect(() => {
    if (!apiKey) {
      setLoading(false);
      return;
    }
    
    // Load orders from store
    setOrders(orders_state);
    setLoading(false);
  }, [apiKey, orders_state]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">My Orders</h1>

          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading orders...</p>
            </div>
          )}

          {orders.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-3 text-left font-semibold">Invoice</th>
                    <th className="px-6 py-3 text-left font-semibold">Product</th>
                    <th className="px-6 py-3 text-left font-semibold">Quantity</th>
                    <th className="px-6 py-3 text-left font-semibold">Total</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.invoice} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{order.invoice}</td>
                      <td className="px-6 py-4">{order.product}</td>
                      <td className="px-6 py-4">{order.qty}</td>
                      <td className="px-6 py-4 font-semibold">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          order.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(order.date || new Date())}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : !loading && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 mb-4">No orders yet</p>
              <a
                href="/products"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition inline-block"
              >
                Start Shopping
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
