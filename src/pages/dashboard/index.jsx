import { useFetch } from '@hooks/useFetch';
import endPoints from '@services/api';
import { Chart } from '@common/Chart';

export default function Dashboard() {
  const productLimit = 0;
  const productOffset = 0;

  const products = useFetch(endPoints.products.getProducts(productLimit, productOffset));

  const categoryNames = products?.map(({ category }) => category.name);

  const countOccurrences = (arr) => arr?.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryNames),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
      <Chart className="mb-8 mt-2" chartData={data} />
    </>
  );
}
