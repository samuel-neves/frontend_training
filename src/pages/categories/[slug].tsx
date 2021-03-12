import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface iCategory {
  id: string;
  title: string;
}

interface ICategoriesProps {
  products: iCategory[];
}

export default function SearchResult({ products }: ICategoriesProps) {
  const route = useRouter();

  if (route.isFallback) {
    return (
      <p>Carregando...</p>
    );
  }

  return (
    <div>
      <h1>{route.query.slug}</h1>

      <section>

        <ul>
          {products.map(category => {
            return (
              <li key={category.id}>
                {category.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3333/categories');
  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id }
    }
  });

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ICategoriesProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}
