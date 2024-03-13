import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import setupRoutes from "./routes/"

dotenv.config();

export const app = express()

app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" }))

setupRoutes(app);

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando em localhost:${process.env.PORT || 3003}`)
})

