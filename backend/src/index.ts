import express from 'express'
import cors from 'cors'
import connectDB from './db/db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors())

connectDB().then(()=>{
    app.listen(3000 , ()=>{
        console.log(`Server is running on 3000 port`)
    })
})


