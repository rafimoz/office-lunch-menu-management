# Office Lunch Menu Management System

## Description

The Office Lunch Menu Management System is a web application designed to streamline the process of managing daily lunch options in an office environment. Admins can easily add and manage daily lunch menus, while employees can view these menus and select their lunch preferences. This system aims to simplify the lunch ordering process and ensure that all employees' choices are recorded efficiently.

## Technologies Used

### Backend
- Node.js
- Express.js

### Frontend
- React (with Vite)

### Database
- MySQL

## Features

### Admin Interface
- **Add Daily Menu Options:** Admins can add new lunch options for specific dates.
- **View Employee Choices:** Admins can view which employees have chosen which lunch options.

### Employee Interface
- **View Daily Menu:** Employees can see the lunch options available for the current day.
- **Select Lunch Choice:** Employees can select their preferred lunch option from the daily menu.

## Database Schema

The database consists of the following tables:

### Users
- `id`: INT, Primary Key, Auto Increment
- `name`: VARCHAR(255), Not Null
- `choice`: VARCHAR(255), Not Null

### Menus
- `id`: INT, Primary Key, Auto Increment
- `date`: DATE, Not Null
- `options`: TEXT, Not Null

### Choices
- `id`: INT, Primary Key, Auto Increment
- `user_id`: INT, Foreign Key (references Users.id), Not Null
- `menu_id`: INT, Foreign Key (references Menus.id), Not Null

## Setup Instructions

### Backend Setup (Node.js with Express.js)

1. Clone the repository:
   ```bash
   git clone https://github.com/rafimoz/office-lunch-menu-management.git
   cd office-lunch-menu-management
   ```

2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Go to index.js in `backend` directory and add your MySQL configuration:
   ```js
   const db = mysql.createConnection({
   host: "Localhost",
   user: 'root',
   password: '',
   database: 'office_lunch_menu'
   })
   ```

6. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup (React with Vite)

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```
   
4. Start the frontend server:
   ```bash
   npm run dev
   ```

### Running the Project

1. Ensure the backend server is running:
   ```bash
   cd backend
   npm start
   ```

2. Ensure the frontend server is running:
   ```bash
   cd ../frontend
   npm run dev
   ```



## Feel free to comment :)
