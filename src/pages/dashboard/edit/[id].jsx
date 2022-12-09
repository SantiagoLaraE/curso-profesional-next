import FormProduct from '@components/FormProducts';

import endPoints from '@services/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Edit() {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!router?.isReady) return;
    async function getProduct() {
      try {
        const response = await axios.get(endPoints.products.getProduct(id));
        setProduct(response.data);
      } catch (error) {
        router.push('/404');
      }
    }
    getProduct();
  }, [router?.isReady, router]);

  return (
    <>
      <FormProduct product={product} />
    </>
  );
}
