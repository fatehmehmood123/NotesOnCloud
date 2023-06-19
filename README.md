# Note Taking Website

This is a note-taking website that allows users to create, edit, and delete notes. It also provides features like user authentication, signup, and cloud storage for notes.

## Functionality

- User Signup: Users can create an account by providing their email and password.
- User Login: Registered users can log in using their email and password.
- Create Note: Users can create a new note by providing a title and content.
- Edit Note: Users can edit the title and content of an existing note.
- Delete Note: Users can delete a note they no longer need.
- Cloud Storage: Notes are securely stored in a cloud database for easy access and retrieval.

## Technologies Used

- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A web application framework for building APIs and server-side applications.
- MongoDB: A NoSQL database for storing and retrieving notes.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB.
- JSON Web Tokens (JWT): Used for user authentication and authorization.
- Crypto-js: A JavaScript library for cryptographic operations.
- dotenv: Used to load environment variables from a .env file.
- Cors: A middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- Nodemon: A tool for automatically restarting the server during development.

## Setup and Installation

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Create a `.env` file and provide the necessary environment variables.
4. Start the server using `npm start` or `nodemon` for development.
5. Access the website in your browser using the specified URL.

## API Endpoints

- `POST /signup`: Creates a new user account.
- `POST /login`: Logs in an existing user.
- `GET /notes`: Retrieves all notes for the authenticated user.
- `POST /notes`: Creates a new note.
- `GET /notes/:id`: Retrieves a specific note by ID.
- `PUT /notes/:id`: Updates a specific note by ID.
- `DELETE /notes/:id`: Deletes a specific note by ID.

## Future Enhancements

- **User Profile:** Allow users to update their profile information.
- **Sharing:** Enable users to share notes with others.
- **Tags or Categories:** Add functionality to organize notes using tags or categories.
- **Checkbox Functionality for Todo:** Implement checkboxes for todo items to mark them as complete or incomplete.
- **Email Verification:** Implement an email verification process during signup to ensure the validity of user email addresses.
- **Forgot Password:** Add a "Forgot Password" feature that allows users to reset their passwords through a password reset email.

These enhancements will further enhance the functionality and user experience of the note-taking website.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute, report issues, or suggest enhancements!
