import { useRouter } from 'next/router';

export default function SearchResult() {
  const route = useRouter();

  return (
    <div>
      <h1>{route.query.slug}</h1>
    </div>
    )
  }
