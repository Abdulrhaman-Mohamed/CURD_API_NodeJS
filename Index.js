const express =require('express');
const app = express();
const Joi = require("joi");
app.use(express.json());

let coruses =[
    {id :1 , name:"CS" },
    {id :2 , name:"IT" },
    {id :3 , name:"AI" },
    {id :4 , name:"C#" }

]


let Genres=[
    {id: 1 , name :"action"},
    {id: 2 , name :"Comady"},
    {id: 3 , name :"Drama"}
]
//Get
app.get("/api/genres" , (req , res) =>
{
    res.send(Genres);
});
//Post
app.post("/api/genre" ,(req ,res)=> 
{
    const schema =Joi.object( {
        name: Joi.string().required()
    });
    const result =schema.validate(req.body);
    if(result.error)
    {
        res.status(404).send(result.error.toString());
    }

    const genres = {
        name:req.body.name,
        id:Genres.length+1
    };
    Genres.push(genres);
    res.send(genres);
});
//PUT
app.put("/api/genres/:id" , (req, res) => 
{
    let findGenre = Genres.find(x=> x.id === parseInt( req.params.id));
    if(!findGenre )
    {
        res.status(404).send("Not Found ");
    }

    const schema =Joi.object( {
        name: Joi.string().required()
        
    });
    const result =schema.validate(req.body);
    if(result.error)
    {
        res.status(404).send(result.error.toString());
    }

    findGenre.name = req.body.name;
    res.send(findGenre);
    
});
//Delete
app.delete("/api/genre/:id", (req ,res) =>
{
    let findGenre = Genres.find(x=> x.id === parseInt( req.params.id));
    if(!findGenre)
    {
        res.status(404).send("Not Found ");
    }
    const genre = Genres.indexOf(findGenre);
    Genres.splice(genre,1);
    res.send(Genres);

    

});


app.get("/api/courses" ,(req , res ) =>
{
    res.send('messsage');
});

app.get("/api/course/:id" , (req ,res) =>
{
    
   res.send( coruses.find(x=> x.id == req.params.id));
});
app.get("/api/course/all" , (req ,res) =>
{
   res.send(coruses);
});
app.listen(3000 , () => {
    console.log("Running in 3000");
});