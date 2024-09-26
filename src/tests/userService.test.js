const userRepositories = require('../repositories/userRepositories');
const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


jest.mock('../repositories/userRepositories');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');



describe('userService', () => {
    

test('register new user successfully', async ()=>{

const newUser = { name : 'test' , email : 'test@gmail.com' , password : 'test' , role : 'customer' };

userRepositories.getUserByEmail.mockResolvedValue(null);
userRepositories.createUser.mockResolvedValue(newUser);

const result = await userService.register({ name : 'test' , email : 'test@gmail.com' , password : 'test' , role : 'customer' });

expect(result).toEqual(newUser);
expect(userRepositories.getUserByEmail).toHaveBeenCalledWith('test@gmail.com');
expect(userRepositories.createUser).toHaveBeenCalled();

});    


test('login user successfully', async ()=>{

    const mockUser = { id : 'user1' , name : 'test' , email : 'test@gmail.com' , password : 'test' , role : 'customer' };
    
    userRepositories.getUserByEmail.mockResolvedValue(mockUser);

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await userService.login({ email : 'test@gmail.com' , password : 'test' });

    expect(result).toEqual(mockUser);
    expect(userRepositories.getUserByEmail).toHaveBeenCalledWith('test@gmail.com');
});





})




// test('create session must return a status of 201', async () => {
//     const mocksession = { id: 'session1', movie: 'dsfghjfdrsezzeqruj', room: 'dfghfjkljjhgdfsqsdfg', dateTime: '12-02-2000', price: 222 };

//     sessionService.createSession.mockResolvedValue(mocksession);

//     await sessionController.createSession(req, res);
//     expect(res.statusCode).toBe(201);
//     expect(res.data).toEqual(mocksession);

// });
