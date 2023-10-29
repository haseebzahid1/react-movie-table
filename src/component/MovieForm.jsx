import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Joi from "joi-browser";
// import Form from "./common/Form";
import { useNavigate } from "react-router-dom";
import { genres } from "../servies/fakeGenreService";
import { saveMovie, getMovie } from "../servies/fakeMovieService";

const MovieForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  useEffect(() => {
    if (id === "new") return;
    const movie = getMovie(id);
    setFormData(movie);
  }, []);

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
    numberInStock: Joi.string().min(1).required(),
    dailyRentalRate: Joi.string().min(1).required(),
    _id: Joi.string().optional(),
  });

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    // console.log(validationErrors);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    } else {
      saveMovie(formData);
      navigate("/movies");
    }

    // Form is valid, handle submission logic here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <div>
      <form className="mb-5" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="mb-2" htmlFor="title">
            Name
          </label>
          <input
            name="title"
            id="title"
            className="form-control"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        {errors.title && <div className="error">{errors.title}</div>}

        <div className="form-group mt-4">
          <label className="mb-2" htmlFor="genre">
            Genre
          </label>

          <select
            name="genre"
            id="genre"
            value={formData.genre._id}
            onChange={handleInputChange}
            className="form-select form-control"
          >
            <option value="">Select a Genre</option>
            {genres.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mt-4">
          <label className="mb-2" htmlFor="numberInStock">
            Number In Stock
          </label>
          <input
            name="numberInStock"
            id="numberInStock"
            className="form-control"
            type="text"
            value={formData.numberInStock}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mt-4">
          <label className="mb-2" htmlFor="dailyRentalRate">
            Daily Rental Rate
          </label>
          <input
            name="dailyRentalRate"
            id="dailyRentalRate"
            className="form-control"
            type="text"
            value={formData.dailyRentalRate}
            onChange={handleInputChange}
          />
        </div>

        {errors.dailyRentalRate && (
          <div className="error">{errors.dailyRentalRate}</div>
        )}
        <button  disabled={validateForm()} type="submit" className="btn btn-primary mt-5">
          Submit
        </button>
      </form>
     
    </div>
  );
};

export default MovieForm;
