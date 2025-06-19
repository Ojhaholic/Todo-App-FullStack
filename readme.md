What I learned and used in the project:

Backend:

1. Made with MERN stack.
2. Learned how to make models using mongoose and use routes, middlewares and controllers.
3. Used the concept of RestAPIs and Postman for testing the backend.
4. Validated username, email and password using Zod Library.
5. Used bcryptjs for hashing the password (encrypting the pwd in database )
6. Authenticated credentials of user from DB.
7. Generated token for login and logout using JWT.
8. Used CORS middleware for connecting backend and frontend.
9. Used middlewares for authorization (user sees only their todos, and not someone else's)

---------------------------------------------------------------------------------------------------------

Frontend:
1. used react-router-dom package for defining routes of different pages like home, login, etc.
2. used axios for api handling in frontend
3. Use React Hot Toast for Prompts on screen
---------------------------------------------------------------------------------------------------------
*my code is open to use
# TO USE MY CODE, download the full project and just create .env files in backend and frontend with envs as follows
1. frontend:
   VITE_API_URL= URL at which your Backend is hosted
   
3. backend:
   PORT= your port number
   MONGODB_URI= your MDB url
   JWTsecretKey= your secret key
   Frontend_URL= URL at which your frontend is hosted

Happy Coding !
original author : Devansh Ojha ;)
