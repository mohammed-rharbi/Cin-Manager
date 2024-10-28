    const movieRepositories = require('../repositories/movieRepositories');
    const ShowtimeRepositories = require('../repositories/showTimeRepositories');
    const cloudinary = require('cloudinary');
    const minioClient = require('../config/minioConfig');
    const fs = require('fs');
    const path = require('path');




    class MovieService{


        async createMovie(movieData){
    

            const newMovie = await movieRepositories.create(movieData);

            return  newMovie
        }

        async uploadVideoToMovie(videoFile) {
            const fs = require('fs');
            const path = require('path');
            const bucket = 'movies';
            const videoName = videoFile.originalname;
            const tempDir = path.join(__dirname, '../temp');
            const tempFilePath = path.join(tempDir, videoName);
        
            // Check if temp directory exists; if not, create it
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
        
            return new Promise((resolve, reject) => {
                // Write the buffer to a temporary file
                fs.writeFile(tempFilePath, videoFile.buffer, (err) => {
                    if (err) {
                        console.log('Error writing temporary file:', err);
                        return reject(err);
                    }
        
                    // Upload the file to MinIO
                    minioClient.fPutObject(bucket, videoName, tempFilePath, (err, etag) => {
                        // Delete the temporary file after upload
                        fs.unlink(tempFilePath, () => {
                            if (err) {
                                console.log('Error uploading video:', err);
                                return reject(err);
                            }
        
                            // Get a pre-signed URL for accessing the video
                            minioClient.presignedUrl('GET', bucket, videoName, 24 * 60 * 60, (err, videoUrl) => {
                                if (err) {
                                    console.log('Error getting video URL:', err);
                                    return reject(err);
                                }
        
                                resolve(videoUrl);
                            });
                        });
                    });
                });
            });
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