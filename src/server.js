import express from "express";
import { authRouter } from "./routers/auth.router.js";



function bootstrapt() {
    try {
        const app = express();
        app.use(express.json());

        // Routers
        app.use(authRouter);
        // app.use(userRouter);

        app.listen(3000, () => console.log('running...'))

    } catch (error) {
        console.log(error.message);

        process.exit(1);
    }
}

bootstrapt();