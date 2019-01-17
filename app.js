const express    = require('express');
const bodyParser = require('body-parser');

const students = require("./routes/api/students");
const courses  = require("./routes/api/courses");

const app      = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res) => res.json({msg:"It is working"}))

app.use('/api/students', students);
app.use('/api/courses', courses);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
