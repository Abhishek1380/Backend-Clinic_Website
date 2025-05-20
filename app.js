const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { dbConnect, getData } = require('./controllers/dbController');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello from Clinic Website");
});

app.get('/treatments', async (req, res) => {
    let query = {};
    const colName = "treatments";
    let output = await getData(colName, query);
    res.send(output);
})

app.get('/blogs', async (req, res) => {
    let query = {};
    const colName = "blogs";
    let output = await getData(colName, query);
    res.send(output);
})

app.get('/blog', async (req, res) => {
    let query = {};
    const colName = "blog";
    let output = await getData(colName, query);
    res.send(output);
})
app.get('/reviews', async (req, res) => {
    let query = {};
    const colName = "reviews";
    let output = await getData(colName, query);
    res.send(output);
})

app.get('/FAQ1', async (req, res) => {
    let query = {};
    const colName = "FAQ1";
    let output = await getData(colName, query);
    res.send(output);
})


app.get('/treatments/:id', async (req, res) => {
    let treatmentId = Number(req.params.id);
    let query = { t_id: treatmentId };
    let collection = "treatments";
    let output = await getData(collection, query);
    res.send(output);
    console.log(output);
});

app.get('/blog/:slug', async (req, res) => {
    const slug = req.params.slug;
    try {
        const blog = await Blog.findOne({ slug: slug }); 
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


app.get('/blog/:id', async (req, res) => {
    let treatmentId = Number(req.params.id);
    let query = { t_id: treatmentId };
    let collection = "treatments";
    let output = await getData(collection, query);
    res.send(output);
    console.log(output);
});

app.get('/blog', async (req, res) => {
    let query = {};
    const colName = "sample";
    let output = await getData(colName, query);
    res.send(output);
})

app.get('/blogs/:id', async (req, res) => {
    let blogsId = Number(req.params.id);
    let query = { treatment_box: blogsId };
    let collection = "sample";
    let output = await getData(collection, query);
    res.send(output);

});


// Alternative route for above route

// app.get('/treatment/:id', async (req, res) => {
//     const treatmentId = Number(req.params.id); 
//     const query = { treatmentId: treatmentId }; 
//     const collection = "treatments"; 
//     try {
//         const treatmentDetails = await getData(collection, query); 
//         res.send(treatmentDetails); 
//     } catch (error) {
//         res.status(500).send({ message: "Error fetching treatment details", error });
//     }
// });


app.listen(port, async () => {
    try {
        await dbConnect();
        console.log(`Server is running on port ${port}`);
    } catch (err) {
        console.error('Failed to connect to the database:', err.message);
    }
});
