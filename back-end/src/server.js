import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import { startDbServer } from './services/database.service';

const PORT = process.env.PORT || 8080;

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

app.use(
    cors({
        origin: [
            '*',
            'http://localhost:3000',
            'http://ernesto-react.s3-website.us-east-2.amazonaws.com',
        ],
        credentials: true,
    })
);

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(({ method, path, handler, middleware }) => {
    if (middleware) {
        app[method](path, [...middleware, handler]);
    } else {
        app[method](path, [handler]);
    }
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
startDbServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
