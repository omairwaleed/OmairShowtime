"use client";
import Home from "@/components/pages/home";
import Movie from "@/types/movie";
import { notifications } from "@mantine/notifications";
import React, { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [favoroteMovies, setFavoriteMovies] = useState<Movie[] | undefined>(
    undefined
  );
  const getSavedMovies = useCallback(() => {
    const savedMovies: Movie[] = JSON.parse(
      localStorage.getItem("FavoriteMovies") || "[]"
    );
    setFavoriteMovies(savedMovies);
  }, []);
  const removeMovie = useCallback((movie: Movie) => {
    let favorites: Movie[] = JSON.parse(
      localStorage.getItem("FavoriteMovies") || "[]"
    );
    favorites = favorites.filter((m) => m.id !== movie.id);
    localStorage.setItem("FavoriteMovies", JSON.stringify(favorites));
    setFavoriteMovies(favorites);
    notifications.show({
      title: "Success",
      message: `${movie.title} removed from your favourites`,
    });
  }, []);
  useEffect(() => {
    getSavedMovies();
  }, [getSavedMovies]);
  return (
    <div>
      <Home movies={favoroteMovies} removeMovie={removeMovie} />
    </div>
  );
};

export default Page;
