# Critiq – Book Review Web App

**Critiq** is a full-stack review platform where users can register, log in, browse books, and leave star-rated reviews. Admins have a dedicated dashboard to add and manage books. Built with **TypeScript**, **React**, **Node.js**, **Prisma**, **PostgreSQL**, and custom **CSS**, this project demonstrates scalable architecture, type safety, and end-to-end testing using **Playwright**.

## Features

### User App
- User registration and login with JWT authentication
- Browse all books with title, image, and average rating
- Write detailed reviews and rate books with stars
- View reviews under each book with sorting options
- View your review history
- future scope: Add search feature, filter & sort reviews/books etc, add profile image upload

### Admin Panel
- Admin login
- Add new books (title, author, image, etc.)
- Future scope: Add/edit/delete movies, games, and other categories

## Tech Stack

### Frontend
- React
- TS
- Tanstack Queries

### Backend
- Node.js
- Express

### others
- ORM - Prisma
- Auth - JWT
- Styling - CSS (used plain CSS to practice CSS fundamentals. future scope - use TailwindCSS or AntDesign)
- Testing - Playwright

## 🛠️ Local Setup

Follow these steps to run the app locally:

### 1. **Clone the Repository**
```bash
git clone https://github.com/sajid-01/critiq.git
cd critiq
```

### 2. **Setup Backend**
```bash
cd backend
npm install
```
Create a .env file simillar to this:
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/critiq
JWT_SECRET_KEY=some_secret_key

Then run:
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
Server will run at: http://localhost:5000

### 3. **Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev
```
Frontend will run at: http://localhost:5173

Thats it! you have Critiq up and running!

### 4. **Run Playwright Tests** (Optional)
```bash
cd frontend
npx playwright install
npx playwright test
```

## Authentication :
- JWT-based
- Access tokens stored in localStorage
- Admin routes are protected

## Future Improvements - 
- Add Movies/Shows/Games/Anime categories
- Pagination and search for books
- Admin CRUD for content(books, movies etc),reviews
- User likes/dislikes on reviews

# Author
Shaik Sajid Ahamed
Portfolio Project for Resume - Built for Learning and to Practice App development
GitHub: https://github.com/sajid-01
LinkedIn: https://www.linkedin.com/in/sajid-ahamed-shaik-01b00918b/



