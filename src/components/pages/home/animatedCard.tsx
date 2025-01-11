import Movie from "@/types/movie";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@mantine/core";

type Props = {
  movies: Movie[];
};
const AnimatedCard = ({ movies }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [direction, setDirection] = useState("next"); // Direction state

  const handleNext = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % 3);
  }, []);
  const handlePrevious = useCallback(() => {
    setDirection("previous");

    setCurrentIndex((prev) => {
      const prevoius = prev - 1;
      if (prevoius === -1) return 2;
      else return prevoius;
    });
  }, []);
  useEffect(() => {
    setIsLoadingImage(false);
    setInterval(() => {
      handleNext();
    }, 2500);
  }, [handleNext]);

  return (
    <div className="w-full flex bg-green-200s justify-center my-5">
      <div className="w-4/5 md:w-1/2 h-[350]  ">
        <div className="w-full h-full  relative ">
          {!isLoadingImage && (
            <div className="absolute  left-8 top-8 rounded-xl   flex justify-center items-center cursor-pointer z-10">
              <p className=" text-xl md:text-3xl font-extrabold text-[#F9F9F9]">
                {movies[currentIndex].title}
              </p>
            </div>
          )}

          <div className="absolute w-10 h-10 left-8 top-[40%] rounded-xl  flex justify-center items-center cursor-pointer z-10">
            <div
              className="absolute inset-0 bg-[#F9F9F9] opacity-40 rounded-xl"
              onClick={handlePrevious}
            ></div>
            <FaChevronLeft color="#F9F9F9" size={20} />
          </div>

          <div className="absolute w-10 h-10 right-8 top-[40%] rounded-xl   flex justify-center items-center cursor-pointer z-10">
            <div
              className="absolute inset-0 bg-[#F9F9F9] opacity-40 rounded-xl"
              onClick={handleNext}
            ></div>
            <FaChevronRight color="#F9F9F9" size={20} />
          </div>
          <div></div>
          {!isLoadingImage ? (
            <AnimatePresence>
              <motion.div
                key={movies[currentIndex].id}
                initial={{ x: direction === "next" ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === "next" ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].backdrop_path}`}
                  alt={movies[currentIndex].title}
                  width={500}
                  height={350}
                  objectFit="cover"
                  className="w-full h-full rounded-3xl"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <Skeleton height="100%" mt={6} width="100%" radius="xl" />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AnimatedCard);
