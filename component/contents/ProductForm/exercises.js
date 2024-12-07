import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom"; // Import useParams
import axios from "axios"; // Import axios for API calls
import "../Css/product.css"; // Import styles
const Exercises = () => {
    const { topic_id } = useParams(); // Retrieve topic_id from the route
    const [exercises, setExercises] = useState([]); // State for exercises
    const [error, setError] = useState(null); // State for errors

    useEffect(() => {
        // Fetch exercises based on topic_id
        const fetchExercises = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/exercises/${topic_id}`);
                setExercises(response.data); // Save exercises to state
            } catch (err) {
                console.error("Error fetching exercises:", err);
                setError("Không thể tải bài tập."); // Set error message
            }
        };

        fetchExercises();
    }, [topic_id]);

    if (error) return <div>{error}</div>; // Show error message if there's an error

    return (
        <div className="">
            <div className="py-20 p-4">
                <h1 className="font-semibold text-2xl">Danh sách bài tập</h1>
                <ul className="grid grid-cols-4 gap-2">
                    {exercises.map((exercise) => (
                        <Link
                            to={{
                                pathname: `/exercise-segments/${exercise.exercise_id}`,
                                search: `?token=${exercise.exercise_id}`, // Thêm token vào query string
                            }}
                            className="bg-slate-50 border-2 px-2 hover:bg-green-50"
                            key={exercise.exercise_id}
                        >
                            {exercise.title}
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Exercises;