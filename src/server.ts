import "dotenv/config";
import { AppDataSource } from "./data-source";
import { app } from "./app";


AppDataSource.initialize()
.then(() => {
    console.log("Database Connected")

    const PORT: number | undefined = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => console.log(`App is running on port ${PORT}`));   
})
.catch((error) => console.error(error));