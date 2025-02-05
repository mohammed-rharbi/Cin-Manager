const express = require('express');
const connectDB = require('./src/config/database');
const AuthRouter = require('./src/routes/AuthRouter');
const adminRouter = require('./src/routes/adminRouter');
const movieRouter = require('./src/routes/movieRouter');
const roomRouter = require('./src/routes/roomRouter');
const showTimeRouter = require('./src/routes/showTimeRouter');
const reservationRouter = require('./src/routes/reservationRouter');
const favoriteRouter = require('./src/routes/favoriteRouter');
const ratingRouter = require('./src/routes/ratingRouter')
const commentRouter = require('./src/routes/commentRouter')
const swagger = require('./src/config/swagger');
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();



connectDB();
const app = express();


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST' , 'DELETE' , 'PUT'],
    credentials: true
}));

app.use(express.json());


swagger(app);


app.get('/' , (req , res)=>{

    res.send('hello');  
});


app.use('/api/auth', AuthRouter);
app.use('/api/admin', adminRouter);
app.use('/api/movie', movieRouter);
app.use('/api/room', roomRouter);
app.use('/api/showTime', showTimeRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/favorite' , favoriteRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/comments/' , commentRouter)




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})