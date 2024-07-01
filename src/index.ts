import Express from "express"
import { config } from "dotenv"
import cors from "cors"

config()

const app = Express()

app.use(cors())
app.use(Express.json())

const PORT = process.env.PORT ?? 3000

app.get("/", (_, res) => {
  res.json({
    message: "MB Peluquería's Websocket Server",
    timestamp: new Date(),
  })
})

app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))
