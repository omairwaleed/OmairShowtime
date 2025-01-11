import Movie from "@/types/movie";
import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import Stars from "./stars";

type Props = {
  movie: Movie;
};
const MovieScreen = ({ movie }: Props) => {
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  return (
    <div className="p-10">
      <Link href={"/"} className="flex flex-row items-center mb-5  md:mb-12 ">
        <div className=" w-10 h-10  rounded-xl  flex justify-center items-center cursor-pointer relative">
          <div className="absolute inset-0  bg-[#F9F9F9] opacity-40 rounded-xl"></div>
          <FaChevronLeft color="#F9F9F9" size={20} />
        </div>
        <p className="text-white text-xl font-semibold ml-5">Back Home</p>
      </Link>
      <p className="text-white text-2xl font-bold mb-2">
        {movie.original_title}
      </p>
      <Stars rating={Math.round(movie.vote_average / 2)} />
      <div className="flex flex-row items-center flex-wrap my-3">
        {movie.genres.length > 0 ? (
          movie.genres.map((genre) => (
            <div
              key={genre.id}
              className=" bg-slate-400 rounded-2xl p-1 px-2 mr-2 mb-2 flex justify-center items-center"
            >
              <p className="text-gray-700">{genre.name}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <p className="text-gray-400">
        {hours} hour{hours !== 1 ? "s" : ""} {minutes} minute
        {minutes !== 1 ? "s" : ""}
      </p>
      <p className="text-xl w-full md:w-1/2 text-white mt-5">
        {movie.overview}
      </p>
    </div>
  );
};

export default MovieScreen;
