const axios = require('axios')
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const patients = require('./routes/economy.js');
const auth = require('./routes/auth');
const {validateToken} = require('./utils/authUtils');

const app = express();
const PORT = 3000;
const SWAGGER = "swagger-ui/index.html"


// Middleware to parse JSON
app.use(express.json());

// Enable CORS with all origins, methods, and headers
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow all methods
    allowedHeaders: '*', // Allow all headers
}));

// Swagger setup
app.use(`/${SWAGGER}`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use routes from the routes file
app.use('/api/v1/auth', auth);

//middleware for other routes
app.use((req, res, next) => {
    if(req.path.startsWith('/api/v1/auth') || req.path.startsWith(`/${SWAGGER}`))
        return next();
    const token = req.headers.token;
    if(!token || !validateToken(token))
        return res.status(axios.HttpStatusCode.Unauthorized).json({error:"Token inválido"})
    return next();
})
app.use('/api/v1/economy', patients);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/${SWAGGER}`);
});