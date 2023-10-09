import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovie} from "../servies/fakeMovieService";

import { useNavigate } from "react-router-dom";



const MovieForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    const movie = getMovie(id);
    setSelectedMovie(movie);
  }, []);
  

  return (
    <div>
      <h1>{selectedMovie.title}</h1>
      {/* <button className="btn btn-primary" onClick={ () => allMovies.push('/movies')} >Save</button> */}
      <button className="btn btn-primary" onClick={ () => navigate('/movies')} >Save</button>
    </div>
  );
};

export default MovieForm;
