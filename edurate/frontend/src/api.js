const API_URL = import.meta.env.VITE_API_URL; // this will be set in Vercel

export async function fetchCourses() {
  const response = await fetch(`${API_URL}/test-db`);
  const data = await response.json();
  return data;
}