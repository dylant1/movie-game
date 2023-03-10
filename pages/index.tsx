import Head from 'next/head'
//import Image from 'next/image';
import { useState, useEffect } from "react";

interface IMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Home() {
  const [movie, setMovie] = useState<IMedia>();
  let query: string = "the force awakens";

  //TODO: Make this server side environment variable
  //TODO: Do all this logic server side
  useEffect(() => {
    fetchMovie(query);
  }, [query]);

  useEffect(() => {
    if (movie) {
      console.log(movie);
    }
  }, [movie]);


  const fetchMovie = async (query: string) => {
    const res: Response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
    );
      const data = await res.json();
    //only want the first result
    setMovie(data.results[0]);
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {movie && (
          <div>
            <h1>{movie.title}</h1>
          </div>
        )}

      </main>
    </>
  );
}
