const express = require('express');
const router  = express.Router();

const students = 
    [
        {
            name:"Shyam Vetwal",
            Address:"Kajannintie 30 90120 Oulu",
            Class:"Java",
            Id: 1
        },
        {
            name:"Suman Pandey",
            Address:"Hanhitie 17 90150 Oulu",
            Class:"Android Application",
            Id: 2
        },
        {
            name:"Veikko Lahm",
            Address:"Kasarmitie 10 90140 Oulu",
            Class:"AngularJS",
            Id: 3
        },
        {
            Name:"Samila karjalaininn",
            Address:"Jasmintie 18 10350 Oulu",
            Class:"Frontend Application",
            Id: 4
        }
    ]

router.get('/', (req, res) => res.json(students));

router.post("/", (req, res) => {

    const {Name, Address, Class} = req.body
    const Id = students.length + 1 ;

    students.push({Name, Address, Class, Id});
    res.status(201).json(students);
});


router.get("/:students_id", (req, res) => {
    let selectedStudentId = parseInt(req.params.students_id);

    const selectedStudent = students.filter( s => {
        if(s.Id === selectedStudentId){
            return s;
        } 
    })

    res.json(selectedStudent);
})

router.put("/:students_id", (req, res) => {
    let Id = parseInt(req.params.students_id);
    const { Name, Address, Class } = req.body;

    const updateStudentIndex = students.map( s => s.Id).indexOf(Id);
    students[updateStudentIndex] = { Name, Address, Class, Id }

    res.status(202).json(students);
})

router.delete("/:students_id", (req, res) => {
    let removeStudentId = parseInt(req.params.students_id);

    const removeStudentIndex = students.map( s => s.Id).indexOf(removeStudentId);
    students.splice(removeStudentIndex, 1);

    res.json(students);
})

module.exports = router;