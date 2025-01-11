import Home from "@/components/pages/home";

export default async function HomePage() {
  // server component so no problem with using api key
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  return (
    <div>
      <Home movies={data.results} />
    </div>
  );
}
