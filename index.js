const express = require("express")
const { connection } = require("./connect")
const { userRouter } = require("./routes/user.route")
const { employeeRouter } = require("./routes/employee.route")
const { auth } = require("./middlewares/auth.middleware")
const cors = require("cors")

const app = express()

app.use(cors())

app.use(express.json())



app.use("/", userRouter)

app.use(auth)

app.use("/employees", employeeRouter)





app.listen(8080, async() => {
    console.log("Server is running at 8080")
    try {
        await connection
        console.log("Server is connected to DB")
    } catch (error) {
        console.log(console.log(error))
    }
})