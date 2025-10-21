import { useEffect, useState } from "react";
import { fetchCourses } from "./api";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        const result = await fetchCourses();
        if (result.error) throw new Error(result.error.message);
        setCourses(result.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h1>Hello EduRate!</h1>
      <p>My course review platform is taking shape 🎓</p>

      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Available Courses</h2>
          {courses.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {courses.map((course) => (
                <li key={course.id} style={{ margin: "0.5rem 0" }}>
                  {course.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;