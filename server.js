const express = require('express');
const connectDB = require('./src/config/database');
const userRouter = require('./src/routes/userRouter');

connectDB();
const app = express();


app.use(express.json());





app.get('/' , (req , res)=>{

    res.send('hello');
});

app.use('/api/auth', userRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})