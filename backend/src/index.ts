import express from 'express'

const app = express()

const PORT = 3000

app.get('/', (req, res)=> {
    res.send('i am just checking')
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
