const express = require('express');
const connectDB = require('./src/config/database');
const AuthRouter = require('./src/routes/AuthRouter');
const adminRouter = require('./src/routes/adminRouter');
const movieRouter = require('./src/routes/movieRouter');
const roomRouter = require('./src/routes/roomRouter');

connectDB();
const app = express();


app.use(express.json());





app.get('/' , (req , res)=>{

    res.send('hello');
});


app.use('/api/auth', AuthRouter);
app.use('/api/admin', adminRouter);
app.use('/api/movie', movieRouter);
app.use('/api/room', roomRouter);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})