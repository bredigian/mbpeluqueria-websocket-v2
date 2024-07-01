import Express from "express"
import { IShift } from "./types/shifts.types"
import { Server } from "socket.io"
import { config } from "dotenv"
import cors from "cors"
import { createServer } from "http"

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

const socketServer = createServer(app)
const io = new Server(socketServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log(`${socket.handshake.query.user} is connected.`)

  socket.on("reserve-shift", async (data: IShift) =>
    socket.broadcast.emit("reserve-shift", data)
  )

  socket.on("cancel-shift", async (data: IShift) =>
    socket.broadcast.emit("cancel-shift", data)
  )

  socket.on("disconnect", () =>
    console.log(`${socket.handshake.query.user} is disconnected.`)
  )
})

socketServer.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))
