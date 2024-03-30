import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import setupRoutes from "./routes/"

dotenv.config();

const PORT = process.env.PORT || 3003

export const app = express()

app.use(express.json())
app.use(cors())

setupRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor rodando em localhost:${PORT}`)
})

