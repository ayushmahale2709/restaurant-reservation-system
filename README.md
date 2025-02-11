# Restaurant Reservation System

This is a simple restaurant reservation system built using React. It allows customers to make reservations, check in, check out, and manage seats in the restaurant. The system tracks available seats, reservation details, and allows filtering and sorting based on various parameters.


## Features

- Reservation Form: Allows users to input their name, phone number, and guest count.
- Seat Management: Displays the number of seats left and prevents overbooking.
- Reservation List: Shows all reservations with details such as name, guest count, check-in time, check-out time, and status.
- Edit and Delete Reservations: Users can edit existing reservations or delete them.
- Sort Reservations: Allows sorting of reservations by check-in time or name.
- Filter Reservations: Filter reservations by their status (pending/completed).
- Checkout: Allows users to mark their reservation as completed when they check out.
## Deployment

To run this project locally, follow these steps:

- Clone the repository:

```bash
  git clone https://github.com/ayushmahale2709/restaurant-reservation-system.git
```
- Navigate to the project directory:

```bash
  cd restaurant-reservation-system
```
- Install dependencies:
```bash
  npm install
```
- Start the development server:
```bash
  npm run dev
```



## Usage

- Reserve a Seat: Fill out the form with your name, phone number, and number of guests. Click "Reserve" to submit your reservation.
- Edit a Reservation: Click "Edit" on an existing reservation to update its details.
- Delete a Reservation: Click "Delete" to remove a reservation.
- Checkout: Click "Checkout" when you're done with your reservation to mark it as completed and free up the seats.
- Sort Reservations: Use the dropdown to sort reservations by check-in time or name.
- Filter Reservations: Use the filter to show only pending or completed reservations.
## Screenshots
### User Interface: 
![Image](https://github.com/user-attachments/assets/1383b780-ac46-4a88-99c8-67555269f799)

### Lets add a reservation:
![Image](https://github.com/user-attachments/assets/d08e8ef5-9fee-4088-aa5d-8266bce0dc18)

## Technologies Used
- React (useState for state management)
- CSS (for styling)

## Conclusion

The Restaurant Reservation System simplifies the process of managing restaurant bookings by providing an intuitive interface for reservations, edits, checkouts, and filtering. With planned future enhancements, it aims to become a more robust and scalable solution for restaurant management.
