import Home from './Home';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return <Home searchParams={searchParams} />;
}
