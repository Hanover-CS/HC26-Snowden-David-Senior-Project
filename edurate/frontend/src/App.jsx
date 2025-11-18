import { useState, useEffect } from 'react';
import { fetchCourses } from './api';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from API
  useEffect(() => {
    async function loadCourses() {
      try {
        const result = await fetchCourses();
        if (result.status === 'success' && result.data) {
          // Add default ratings for now (until you have reviews table)
          const coursesWithRatings = result.data.map(course => ({
            ...course,
            rating: 0.0, // Default rating until reviews are added
            numReviews: 0 // Default review count
          }));
          setCourses(coursesWithRatings);
        } else if (result.status === 'failed') {
          throw new Error(result.message || 'Failed to fetch courses');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  // Filter courses based on search and department
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.Course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.Course_ID.toString().includes(searchTerm);
    const matchesDepartment = selectedDepartment === 'All' || course.Department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Get unique departments for dropdown
  const departments = ['All', ...new Set(courses.map(c => c.Department))];

  // Helper function to get rating color
  const getRatingColor = (rating) => {
    if (rating >= 4.0) return '#dc2626'; // Red for great
    if (rating >= 3.0) return '#f59e0b'; // Orange for good
    if (rating > 0) return '#6b7280'; // Gray for okay
    return '#9ca3af'; // Light gray for no rating
  };

  return (
    <div style={{ maxWidth: '1200px', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Navigation Bar */}
      <nav style={{
        Width: '2400px',
        backgroundColor: '#1e3a8a',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '1.75rem',
            fontWeight: 'bold',
            margin: 0
          }}>
            EduRate
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              Courses
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              opacity: 0.5
            }}>
              Professors
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Search */}
      <div style={{
        backgroundColor: 'white',
        padding: '3rem 2rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1e3a8a',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Find Your Perfect Course
          </h2>
          <p style={{
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Search courses and read reviews from real students
          </p>

          {/* Search Bar and Filters */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            Width: '2400px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              placeholder="Search by course name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '300px',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div style={{
        maxWidth: '2400px',
        margin: '2rem auto',
        padding: '0 2rem'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              Loading courses...
            </p>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#dc2626', fontSize: '1.125rem' }}>
              {error}
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                Available Courses
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredCourses.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div >
                        <h4 style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#1f2937',
                          marginBottom: '0.5rem',
                          lineHeight: '1.3'
                        }}>
                          {course.Course_name}
                        </h4>
                        <p style={{
                          color: '#6b7280',
                          fontSize: '0.875rem',
                          marginBottom: '0.25rem'
                        }}>
                          <strong>Department:</strong> {course.Department}
                        </p>
                        <p style={{
                          color: '#6b7280',
                          fontSize: '0.875rem'
                        }}>
                          <strong>Course ID:</strong> {course.Course_ID}
                        </p>
                      </div>

                      {/* Rating Circle */}
                      <div style={{
                        backgroundColor: getRatingColor(course.rating),
                        color: 'white',
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginLeft: '1rem'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          lineHeight: 1
                        }}>
                          {course.rating === 0 ? 'N/A' : course.rating.toFixed(1)}
                        </div>
                        {course.rating > 0 && (
                          <div style={{
                            fontSize: '0.625rem',
                            marginTop: '0.125rem'
                          }}>
                            / 5.0
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Reviews Count */}
                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid #e5e7eb',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        color: '#6b7280',
                        fontSize: '0.875rem'
                      }}>
                        {course.numReviews === 0 ? 'No reviews yet' : `${course.numReviews} reviews`}
                      </span>
                      <span style={{
                        color: '#1e3a8a',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        View Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1.125rem'
                }}>
                  No courses found matching your search.
                </p>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem'
                }}>
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;