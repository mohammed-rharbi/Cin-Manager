# 🎬 Cinema Management Application

## 📜 Project Context

The mission of this project is to develop a management application for a cinema. The application will allow the management of movies, reservations, rooms, screenings, and available seats. In addition, the application should enable administrators to create other administrators, while customers can create their own accounts. Reservations can only be made if the customer is authenticated.

## 🎯 Project Objectives

- Manage movies, screenings, rooms, and reservations.
- Authenticate users (customers and administrators) to secure access to certain features.
- Administrators can manage the entire system, including creating new administrators.
- Customers need to sign up and log in to access reservation features.

## 🚀 Key Features

### User Management

- **Customer Registration:**  
  Customers can create an account through the application (name, email, password, etc.) with data validation during registration.
  
- **Login and Authentication:**  
  Customers and administrators must log in to access certain features, such as reserving a seat for a movie.  
  **JWT** is used for secure session management.

- **Administrator Management:**  
  Administrators can create other administrators and have the ability to modify or delete administrator accounts.

### Movie Management

- **Add/Modify/Delete Movie:**  
  Administrators can add, update, or delete a movie.

- **List Available Movies:**  
  Customers and administrators can view the list of currently available movies.

### Room and Screening Management

- **Create a Room:**  
  Administrators can define cinema rooms (name, capacity, room type).

- **Schedule a Screening:**  
  Screenings are scheduled with details such as time, associated movie, room, and pricing.

- **Modify or Cancel a Screening:**  
  Administrators can update screening times or cancel them entirely.

- **View Available Screenings:**  
  Customers can view screenings for a movie and check availability.

### Reservation Management

- **Reserve Seats:**  
  Customers need to be authenticated to reserve seats for a given screening.

- **Reservation Confirmation:**  
  Customers receive an email confirmation with the screening details.

- **Cancel or Modify Reservation:**  
  Customers can cancel or modify their reservations.

### Seat Availability Management

- **Display Available Seats:**  
  Customers can view the number of available seats for a specific screening.

- **Select Specific Seats:**  
  Customers can choose their specific seat.

- **Real-Time Seat Updates:**  
  The system automatically updates seat availability after each reservation.

### Role and Permission Management

#### Administrators:
- **Create Other Administrators:**  
  Administrators can add, modify, or delete other administrators.

- **Manage Movies, Screenings, Rooms, and Reservations:**  
  Full access to all management features.

#### Customers:
- **Sign Up and Login:**  
  Customers can create accounts and log in to access features.

- **Reservation Only After Authentication:**  
  Customers must be authenticated to reserve seats.

- **Reservation History:**  
  Customers can view their reservation history through their accounts.

## 🛠️ Technologies Used

### Backend:
- **Node.js** with **Express.js** to create a RESTful API.
- **JWT** (JSON Web Token) for secure user authentication (both administrators and customers).
- Error handling to provide clear and detailed responses for CRUD operations.

### Database:
- **MongoDB** for storing user data, movies, screenings, reservations, and rooms.
- **Mongoose** for modeling data and managing relationships between movies, screenings, and rooms.


## API Endpoints:

#### User Management:
- `POST /api/auth/register` - Register a new customer.
- `POST /api/auth/login` - Log in a user (customer or administrator).
- `POST /api/auth/logout` - Log out a user (customer or administrator).
- `POST /api/admin/createAdmin` - Create a new administrator (admin only).
- `PUT /api/admin//updateAdmin/:id` - Update an administrator (admin only).
- `DELETE /api/admin/deleteAdmin/:id` - Delete an administrator (admin only).
- `POST /api/auth/forget` - Send an email to reset a password.
- `POST /api/auth//resetPassword/:resetToken` - Reset password via a token.
- `GET /api/auth/customers` - Retrieve customer information.

#### Movie Management:
- `POST /api/movie/createMovie` - create a new movie (admin only) .
- `PUT /api/movie/updateMovie/:id` - update a movie (admin only) .
- `DELETE /api/movie/deleteMovie/:id` - delete a  movie (admin only) .
- `GET /api/movie/allMovies` - get all movies .

#### Room Management:
- `POST /api/room/createRoom` - create a new Room (admin only) .
- `PUT /api/room/updateRoom/:id` - update a Room (admin only) .
- `DELETE /api/room/deleteRoom/:id` - delete a  Room (admin only) .
- `GET /api/room/getRooms` - get all Rooms .


#### ShowTime Management:
- `POST /api/showTime/createShowtime` - create a new showTime (admin only) .
- `PUT /api/showTime/updateShowtime/:id` - update a showTime (admin only) .
- `DELETE /api/showTime/deleteShowtime/:id` - delete a  showTime (admin only) .
- `GET /api/showTime/allShowtimes` - get all showTimes .
- `GET /api/showTime/getShowTimeSeats/:id` - get all showTimes seats .

#### Reservation Management:
- `POST /api/reservation/createReservation` - create a new Reservation (Customer only) .
- `PUT /api/reservation/updateReservation/:id` - update a Reservation (Customer only) .
- `POST /api/reservation/cancelReservation/:id` - cancel a Reservation (Customer only) .
- `GET /api/reservation/getAllReservations` - get all reservations .



### Security & Access Management:
- JWT-based authentication.
- Protection of sensitive routes with role-based access control.

## ✅ Unit Tests
- Authentication
- Movie Management
- ShowTime Management
- Reservation

## 🧰 Libraries Used:
- **bcryptjs** - Password hashing.
- **dotenv** - Environment variable management.
- **Express** - Web framework for building the API.
- **jsonwebtoken** - JWT for user sessions and authentication.
- **mongoose** - MongoDB object modeling.
- **nodemailer** - Sending email confirmations.
- **nodemon** - Automatically restarting the server during development.
- **Jest** - Unit testing framework.
- **joi** - data validation.


## 📚 Learning Objectives:
- Working with **MongoDB**.
- Building a **RESTful API**.
- Implementing **JWT** for authentication.
- Handling **JSON** data communication.
- Writing unit tests.
