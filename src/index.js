const express=require("express");

// const app=express();
// const path=require("path");
// const hbs=require("hbs");
// const collection=require("./mongodb");
// const templatePath=path.join(__dirname,'../templates');

// app.use(express.json())
// app.set("view engine",hbs)
// app.set("views",templatePath)

// app.get("/",(req,res)=>{
//     res.render("login");
//     });

//     app.get("/signup",(req,res)=>{
//         res.render("signup");
//         });
    
// app.post("/signup",async(req,res)=>{
// const data={
//     name:req.body.name,
//     password:req.body.password,
// }
// await collection.insertMany([data]);
// res.render("home");
// })


// app.listen(1441,()=>{

//     console.log("port connected");
// })

const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 1441
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await LogInCollection.findOne({ name: req.body.name })

   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.name
    })
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port, () => {
    console.log('port connected');
})