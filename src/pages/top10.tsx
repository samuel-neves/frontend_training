import { GetStaticProps } from "next";
import { Title } from "../styles/Home";

interface IProduct {
  id: string;
  title: string;
}

interface ITop10 {
  products: IProduct[];
}

export default function Home({ products }: ITop10) {
  return (
    <div>
      <section>
        <h1>Top 10</h1>

        <ul>
          {products.map(products => {
            return (
              <li key={products.id}>
                {products.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ITop10> = async () => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 5,
  }
}
