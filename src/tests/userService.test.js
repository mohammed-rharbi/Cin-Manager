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



test('should throw an error when user enters wrong password', async () => {
    const existingUser = { name: 'test', email: 'test@gmail.com', password: 'hashedPassword', role: 'customer' };
  
    userRepositories.getUserByEmail.mockResolvedValue(existingUser);
  
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
  
    await expect(userService.login({ email: 'test@gmail.com', password: 'wrongPassword' }))
      .rejects
      .toThrow('invalid credentials');
  
    expect(userRepositories.getUserByEmail).toHaveBeenCalledWith('test@gmail.com');
  });
  


  test('should throw an error when logging in with a non-existent email', async () => {

     userRepositories.getUserByEmail.mockResolvedValue(null);
  
    await expect(userService.login({ email: 'nonexistent@gmail.com', password: 'test' }))
      .rejects
      .toThrow('user not found');
  
    expect(userRepositories.getUserByEmail).toHaveBeenCalledWith('nonexistent@gmail.com');
  });


  test('should send reset password email', async () => {
    const existingUser = { _id: 'userId123', email: 'test@gmail.com' };
  

    userRepositories.getUserByEmail.mockResolvedValue(existingUser);
    const mockSendMail = jest.fn().mockResolvedValue(true);
    jest.spyOn(nodemailer, 'createTransport').mockReturnValue({ sendMail: mockSendMail });
  
    await userService.resetPasswordRequist('test@gmail.com');
  
    expect(userRepositories.getUserByEmail).toHaveBeenCalledWith('test@gmail.com');
    expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'test@gmail.com',
      subject: 'email reset',
      html: expect.stringContaining('http://localhost:5000/api/auth/resetPassword/')
    }));
  });
  
  



});
