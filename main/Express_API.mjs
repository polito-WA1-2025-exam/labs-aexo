const express = require('express');
const app = express();
const morgan = require('morgan');
// =================================
// app.use(logging);
app.use(morgan('dev')); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies
// =================================
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    const lang = req.query.lang;
    if (lang && lang === 'it') {
        res.send('Italian language selected');
    }
    else {
        res.send('English language selected');
    }
    res.send('Youre on home page now');
});

app.post('/add',(req, res) => {
    console.log(req.body.id);
    console.log(req.body.name);
});

app.get('/info', (req, res) => {
    const info = {"name":"Peak","Height": 180,"Measurement":"cm"};
    res.json(info);
})