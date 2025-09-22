title: "EduRate: A Web App for Fair Course Reviews"
layout: default
---

# **EduRate: A Web App for Fair Course Reviews**

EduRate is a structured, survey-based web application that enables students to make informed decisions when selecting courses and professors. Unlike existing platforms that rely on free-form user input—which can often lead to biased, inflammatory, or misleading reviews—EduRate replaces open-ended feedback with guided surveys. These surveys are then analyzed to automatically generate neutral, data-driven summaries for each course or professor.

The goal is to provide a system that balances transparency and helpfulness with fairness and professionalism, while protecting faculty from unfair attacks.

---

## **Platform Target and Technologies**

EduRate will be developed as a **Web Application**, allowing easy access across devices including desktop and mobile via browser.

### **Programming Languages**

| Layer         | Technology                              | Purpose |
|---------------|------------------------------------------|---------|
| **Frontend**  | **React.js (Hosted on Vercel)**          | Build dynamic, component-based user interfaces such as survey forms, course pages, and filterable lists. |
| **Backend**   | **Node.js + Express.js (Hosted on Render)** | Handle API routing, business logic, and communication between frontend and database. Express provides a lightweight, flexible framework for creating RESTful APIs. |
| **Database**  | **Supabase (Managed PostgreSQL)**        | Store structured, relational data such as courses, professors, survey responses, and aggregated results. Ideal for managing complex relationships and performing analytical queries. |

---

### **Why This Stack?**

- **Why React?**  
  I selected React for its component-based architecture, large community, and wide range of UI libraries. This makes React optimal for building interactive, form-driven interfaces like surveys, search filters, and data summaries, which are essential for helping users clearly understand and navigate EduRate. I chose to host the frontend on Vercel because of its one-click deployment from GitHub (with built-in CI/CD), minimal setup complexity, and performance optimizations for React apps.

- **Alternative to React**  
  **Vue.js** offered a lightweight and user-friendly alternative to React, although it lacked the extensive ecosystem that React provides—such as third-party libraries and a large community with abundant documentation—making React easier to learn from and build upon.

- **Alternative to Vercel**  
  I considered **Netlify** for frontend hosting due to its user-friendly features and strong documentation. However, after research, I found it better suited for more static sites, while Vercel’s performance and deeper integration with React gave it the edge.

- **Why Node.js + Express?**  
  Node.js enables JavaScript usage across the full stack, reducing the learning curve and allowing for consistent development. Express offers a minimalist framework ideal for fast API development, particularly suited for RESTful interactions with survey data. I chose Render to host the backend because it offers simple deployment directly from GitHub, a free service tier, and support for persistent storage—making it easier to manage continuous interactions and database operations.

- **Alternative to Node.js + Express.js**  
  **Flask** was a strong contender due to its strengths in data handling and rapid development. However, using a different language from the frontend would have increased complexity and slowed down full-stack development.

- **Alternative to Render**  
  The most appealing alternative to Render was **Railway.app**, which offers full-stack hosting and ease of use. Still, Render’s more comprehensive documentation and free tier offerings gave it the advantage in my decision-making.

- **Why Supabase (Managed PostgreSQL)?**  
  I chose Supabase because it offers a fully managed relational database with built-in features like authentication, real-time APIs, and an intuitive dashboard—all without the overhead of manual setup. Its support for structured, relational data makes it ideal for managing courses, professors, and survey responses in EduRate.

- **Alternative to Supabase**  
  I explored **MongoDB Atlas**, a document-oriented database offering a flexible schema and robust development tools. However, its model was less suited for relational queries—such as joining surveys with courses and professors—and I found SQL more intuitive and efficient for this purpose.

---

## **Key Features**

- **Survey-Based Feedback**  
  Students rate courses and professors using multiple-choice and scaled questions instead of open-ended reviews.

- **Auto-Generated Summaries**  
  Survey results are aggregated and summarized using natural language templates or AI-powered text generation.

- **Upvoting System**  
  Students can upvote helpful reviews, surfacing the most credible summaries.

- **Hate Speech Prevention**  
  By removing open text input, EduRate reduces the chance of toxic or defamatory content.

- **Search and Filter Tools**  
  Allows students to browse and filter professors and courses by department, difficulty, workload, and more.

---

## **Comparison to Existing Solutions**

### 1. **RateMyProfessors**  
- **Link:** [https://www.ratemyprofessors.com](https://www.ratemyprofessors.com)  
- **Type of Source:** Primary source – publicly available web platform  
- **Relation to EduRate:** Competing program  

**Description:**  
RateMyProfessors allows anonymous reviews of professors using numerical ratings and free-text comments. It includes ratings for helpfulness, clarity, and easiness.

**Feature Discussion:**  
While popular, RateMyProfessors suffers from unfiltered and sometimes abusive content. EduRate improves on this by enforcing structured input, eliminating subjective narratives, and using automatic summaries for fairness.

---

### 2. **Niche College Reviews**  
- **Link:** [https://www.niche.com/colleges/search/best-professors](https://www.niche.com/colleges/search/best-professors)  
- **Type of Source:** Secondary source – review aggregator  
- **Relation to EduRate:** Comparable platform  

**Description:**  
Niche compiles user-generated ratings about colleges, professors, and academic life. It uses a mix of quantitative surveys and optional written reviews.

**Feature Discussion:**  
Niche supports structured data but still allows free-text submissions. EduRate goes further by entirely removing open-ended feedback, focusing on unbiased summaries and reducing toxicity.

---

### 3. **Glassdoor**  
- **Link:** [https://www.glassdoor.com](https://www.glassdoor.com)  
- **Type of Source:** Secondary source – workplace review site  
- **Relation to EduRate:** Inspirational model for anonymous, structured feedback  

**Description:**  
Glassdoor collects employee reviews about workplaces, salaries, and management using structured questions and optional comments.

**Feature Discussion:**  
Glassdoor’s structure helps users make informed job decisions, but it still faces bias in user comments. EduRate adopts its structured approach but replaces subjective comments with auto-generated reviews from aggregated data.

---

### 4. **Coursicle**  
- **Link:** [https://www.coursicle.com](https://www.coursicle.com)  
- **Type of Source:** Primary source – course scheduling tool  
- **Relation to EduRate:** Complementary app  

**Description:**  
Coursicle helps students plan class schedules and notifies them when seats open. It includes some basic course ratings.

**Feature Discussion:**  
While helpful for registration, Coursicle lacks deep course/professor feedback. EduRate enhances this space with in-depth, structured, and unbiased course reviews.

---

## **References**

[1] RateMyProfessors, “Rate My Professors,” [Online]. Available: https://www.ratemyprofessors.com  
[2] Niche, “Best Professors Ranking,” [Online]. Available: https://www.niche.com/colleges/search/best-professors  
[3] Glassdoor, “Company Reviews,” [Online]. Available: https://www.glassdoor.com  
[4] Coursicle, “Class Scheduling Made Easy,” [Online]. Available: https://www.coursicle.com