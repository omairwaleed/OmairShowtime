import MovieScreen from "@/components/pages/movie";
import Movie from "@/types/movie";

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const movieId = (await params).movieId;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  const movie: Movie = await res.json();
  return (
    <div
      className="h-screen bg-black overflow-y-hidden bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
      }}
    >
      <MovieScreen movie={movie} />
    </div>
  );
}
