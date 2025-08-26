import express from "express"
import cors from "cors"
import { errorHandlerMiddleware } from "./middlewares/error-handler"

const app = express()

app.use(cors())
app.use(express.json())

// colocar o caminho para rotac aqui 
// app.use("api/", router)

app.use(errorHandlerMiddleware)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado na porta http://localhost:${PORT}`))


