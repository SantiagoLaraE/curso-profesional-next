import { useEffect, useState } from 'react';
import ProductsPagination from '@components/ProductsPagination';
import endPoints from '@services/api';
import { useRouter } from 'next/router';
import { PlusCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/solid';
import Modal from '@common/Modal';
import FormProduct from '@components/FormProducts';
import axios from 'axios';
import Alert from '@components/Alert';
import useAlert from '@hooks/useAlert';
import { deleteProduct } from '@services/api/products';
import Link from 'next/link';
import Image from 'next/image';

export default function Product() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

  const currentPage = parseInt(router.query.page) || 1;

  const productLimit = 5;
  let productOffset = (currentPage - 1) * productLimit;

  useEffect(() => {
    async function renderProducts() {
      const response = await axios.get(endPoints.products.getProducts(productLimit, productOffset));
      setProducts(response.data);
    }
    try {
      renderProducts();
    } catch (error) {
      console.log(error);
    }
  }, [productOffset, alert]);

  const handleDelete = (productId) => {
    deleteProduct(productId).then(() => {
      setAlert({
        active: true,
        message: 'Product deleted successfully',
        type: 'error',
        autoClose: false,
      });
    });
  };
  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">List of Products</h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpen(true)}
            >
              <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Product
            </button>
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image className="h-10 w-10 rounded-full" src={product.images[0]} alt={product.title} width="40" height="40" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                            <div className="text-sm text-gray-500">Description</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                        <div className="text-sm text-gray-500">{product.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{product.price}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 flex gap-2 justify-center">
                          Edit <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          type="button"
                          href="/edit"
                          className="flex gap-2 text-red-600 hover:text-red-900 justify-center"
                          onClick={() => {
                            handleDelete(product.id);
                          }}
                        >
                          Delete <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ProductsPagination productLimit={productLimit} productOffset={productOffset} currentPage={currentPage} change={alert} />
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </>
  );
}
