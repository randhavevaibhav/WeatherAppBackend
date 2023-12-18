import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { API_KEY } from './Global.js';
import { PORT } from './Global.js';
const app = express();

//Middleware for CORS POLICY
app.use(cors());


app.use(express.json());



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
app.get("/",(request,response)=>{
  const greetings = {greet:"Hello"}
return (response.send(greetings));
})

app.post('/getWeather', async (request,response)=>{
   
    try {
        axios({
            method: 'post',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${request.body.city}&units=Metric&appid=${API_KEY}`
          })
            .then(function (Wresponse) {
                   
                    return response.status(201).send(Wresponse.data);
                });
       
    } catch (error) {
       console.log(`Error occured in the POST method  ${error.message}`);
       response.send({message:error.message}); 
    }


})

export default app;