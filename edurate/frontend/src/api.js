const API_URL = import.meta.env.VITE_API_URL; // this will be set in Vercel
console.log("API_URL:", API_URL);
export async function fetchCourses() {
  const response = await fetch(`${API_URL}/ping-supabase`);
  const data = await response.json();
  return data;
}