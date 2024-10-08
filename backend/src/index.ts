import express from 'express'
import cors from 'cors'
import connectDB from './db/db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

connectDB()

import UserRouter from './routes/user.routes'
app.use("/api/v1/users" , UserRouter)



app.listen(3000 , ()=>{
    console.log(`Server is running on 3000 port`)
})





