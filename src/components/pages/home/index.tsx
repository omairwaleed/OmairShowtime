"use client";
import Header from "@/components/layout/header";
import Movie from "@/types/movie";
import React, { useState } from "react";
import AnimatedCard from "./animatedCard";
import MoviesList from "./MoviesList";
import { usePathname } from "next/navigation";
type Props = {
  movies: Movie[] | undefined;
  removeMovie?: (movie: Movie) => void;
};
const Home = ({ movies, removeMovie }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm === "" && pathname === "/" && (
        <AnimatedCard movies={movies!.slice(0, 3)} />
      )}
      <MoviesList
        movies={movies}
        searchTerm={searchTerm}
        removeMovie={removeMovie}
      />
    </div>
  );
};

export default Home;
