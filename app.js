const express = require("express")
const next = require("next")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

// Display stack traces for uncaught errors.
function logError(prefix, err) {
  console.error(`${prefix}: `, err)
  throw err
}
process.on("uncaughtException", err => logError("Uncaught Exception", err))
process.on("unhandledRejection", err => logError("Uncaught Rejection", err))
