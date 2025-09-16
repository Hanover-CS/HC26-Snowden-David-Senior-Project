---
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

| Layer         | Technology              | Purpose |
|---------------|--------------------------|---------|
| **Frontend**  | **React.js**             | Build dynamic, component-based user interfaces such as survey forms, course pages, and filterable lists. |
| **Backend**   | **Node.js + Express.js** | Handle API routing, business logic, and communication between frontend and database. Express provides a lightweight, flexible framework for creating RESTful APIs. |
| **Database**  | **PostgreSQL**           | Store structured, relational data such as courses, professors, survey responses, and aggregated results. Ideal for managing complex relationships and performing analytical queries. |

---

### **Why This Stack?**
- **React** enables the creation of a fast and responsive user interface, with reusable components and easy state management.
- **Node.js** allows JavaScript to be used on both the client and server sides, minimizing context switching and reducing the overall learning curve.
- **Express.js** simplifies the process of building a secure and scalable backend API with clear routing and middleware support.
- **PostgreSQL** is a robust, open-source relational database system, ideal for structured data, relationships (e.g., between courses and professors), and advanced filtering or aggregation needs.

Together, these tools allow for **efficient full-stack development**, offering both performance and flexibility while remaining beginner-friendly and highly supported by online resources.

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

---
