import { useState } from 'react';
import { formatCurrency } from '@/lib/helpers';

export default function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      // Handle buy logic here
      console.log('Buying product:', product.id);
    } catch (error) {
      console.error('Error buying product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary font-bold text-xl">
            {formatCurrency(product.price)}
          </span>
          <span className={`px-3 py-1 rounded text-sm font-semibold ${
            product.stock > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            Stock: {product.stock}
          </span>
        </div>

        <button
          onClick={handleBuy}
          disabled={product.stock === 0 || isLoading}
          className={`w-full py-2 rounded font-semibold transition ${
            product.stock > 0
              ? 'bg-primary text-white hover:bg-opacity-90 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Processing...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
}
