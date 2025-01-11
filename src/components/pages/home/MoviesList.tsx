import Movie from "@/types/movie";
import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import { notifications } from "@mantine/notifications";
import { usePathname } from "next/navigation";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

type MoviesListProps = {
  movies: Movie[] | undefined;
  searchTerm: string;
  removeMovie?: (movie: Movie) => void;
};
type MovieProps = {
  movie: Movie;
  removeMovie?: (movie: Movie) => void;
};
const MoviesList = ({ movies, searchTerm, removeMovie }: MoviesListProps) => {
  const pathname = usePathname();

  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(
    movies === undefined ? true : false
  );
  useEffect(() => {
    if (searchTerm) setLoading(true);

    const debounce = setTimeout(async () => {
      if (searchTerm) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/search?query=${searchTerm}`
        );
        const data = await res.json();
        setSearchMovies(data.data);
        setLoading(false);
      } else {
        setSearchMovies([]);
        setLoading(false);
      }
    }, 600);
    return () => clearTimeout(debounce);
  }, [searchTerm]);
  useEffect(() => {
    if (movies && pathname === "favorites") setLoading(false);
  }, [movies, pathname]);
  return (
    <div className="p-10">
      <p className="text-white text-3xl font-extrabold mb-10">
        {pathname === "/" ? "Top Popular" : "Favorites"}
      </p>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {loading ? (
          <>
            <Loader color="#F8B319" />
          </>
        ) : searchMovies.length > 0 ? (
          searchMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        ) : searchTerm || (pathname === "/favorites" && movies?.length == 0) ? (
          <div className="bg-[#21242D] p-5 rounded-2xl">
            <p className="text-white text-2xl">No Items found</p>
          </div>
        ) : (
          movies!.map((movie) => (
            <MovieCard movie={movie} key={movie.id} removeMovie={removeMovie} />
          ))
        )}
      </div>
    </div>
  );
};

const MovieCard = ({ movie, removeMovie }: MovieProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const addMovieToLocalStorage = useCallback((movie: Movie) => {
    const savedMovies: Movie[] = JSON.parse(
      localStorage.getItem("FavoriteMovies") || "[]"
    );
    // Check if the movie is already saved
    if (!savedMovies.some((savedMovie) => savedMovie.id === movie.id)) {
      savedMovies.push(movie);
      localStorage.setItem("FavoriteMovies", JSON.stringify(savedMovies));
      notifications.show({
        title: "Success",
        message: `${movie.title} added to your favourites`,
      });
    } else {
      notifications.show({
        title: "Fail",
        message: `${movie.title} is already in your favourites`,
        color: "red",
      });
    }
  }, []);
  return (
    <div
      className="w-56 h-80  rounded-lg bg-cover bg-no-repeat relative bg-center cursor-pointer "
      onClick={() => router.push(`movie/${movie.id}`)}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
      }}
    >
      <div className="absolute w-14 h-14 rounded-xl bottom-3 left-3 justify-center items-center flex cursor-pointer">
        <div
          className="absolute inset-0 bg-[#F9F9F9] opacity-40 rounded-xl"
          onClick={(event) => {
            event.stopPropagation();
            if (pathname === "/") addMovieToLocalStorage(movie);
            else removeMovie?.(movie);
          }}
        ></div>
        {pathname === "/favorites" ? (
          <MdOutlineRemoveCircleOutline color="#F9F9F9" size={35} />
        ) : (
          <IoMdAdd color="#F9F9F9" size={35} />
        )}
      </div>
    </div>
  );
};

export default MoviesList;
