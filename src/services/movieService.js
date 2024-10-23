    const movieRepositories = require('../repositories/movieRepositories');
    const ShowtimeRepositories = require('../repositories/showTimeRepositories');
    const cloudinary = require('cloudinary');
    const minioClient = require('../config/minioConfig');




    class MovieService{


        async createMovie(movieData){
    

            const newMovie = await movieRepositories.create(movieData);

            return  newMovie
        }

        async uploadVideoToMovie(videoFile){

            return new Promise((resolve , reject)=>{
                
                const bocket = 'movies';
                const videoPath = videoFile.path;
                const videoName = videoFile.originalname;

                minioClient.fPutObject(bocket , videoName , videoPath , (err , etag)=>{
                    
                    if(err){
                        console.log('Error uploading video', err);
                        reject(err);
                    }

                
                minioClient.presignedUrl('GET' , bocket , videoName , 24 * 60 * 60 , (err , videoUrl)=>{
                  
                    if(err){
                        console.log('Error getting video url', err);
                        reject(err);
                    }

                    resolve(videoUrl);
                })

                
                })
            })

        }


        async addVideoToMovie(movieId , videoUrl){

            const movie = await movieRepositories.getMovieById(movieId);

            if(!movie) throw new Error('Movie not found');

            movie.video = videoUrl;

            await movie.save();

            return movie;
        }


        async getMovieById(id){

            const movie = await movieRepositories.getMovieById(id);
            if(!movie) throw new Error('Movie not found');
            return movie;
        }

        async getMovies(){

            const movies = await movieRepositories.getMovies();

            return movies;  

        }


        async updateMovie(id , movieData){


            const movie = await movieRepositories.updateMovie(id , movieData);

            return movie;

        }


        async deleteMovie(id){


            await movieRepositories.deleteMovie(id);
            
            return 'movie was deleted successfully';

        }

        async getRealtedMovies(movieId){

            const movie = await movieRepositories.getMovieById(movieId);

            if(!movie){

                throw new Error('movie not found');
            } 

            const der = movie.deroctor

            const gen = movie.gen

            const date = movie.relseDate


            const realted = await movieRepositories.getRealtedMovies(movieId , der , gen , date);


            return realted;

        }


        async getLatestMovies(){


            const latestMovies = await movieRepositories.getLatestMovies();

            if(!latestMovies){

                throw new Erorr('no latest movies found');
            }


            return latestMovies;

        }


    }

    module.exports = new MovieService();