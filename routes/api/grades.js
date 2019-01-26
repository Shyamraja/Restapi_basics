const express = require('express');
const router  = express.Router({mergeParams: true});

const students = require('../../models/students');

function getCoursesByStudentId(id) {
    let selectedStudentId = parseInt(id);

    const selectedStudent = students.filter( s => {
        if(s.Id === selectedStudentId){
            return s;
        } 
    })

    return selectedStudent[0].Courses;
}

function getCourseById(id, Courses) {
    let selectedCourseId = parseInt(id);

    const selectedCourse = Courses.filter( s => {
        if(s.id === selectedCourseId){
            return s;
        } 
    })

    return selectedCourse;
}

function addCoursesByStudentId(id, Course) {
    let selectedStudentId = parseInt(id);

    const selectedStudent = students.filter( s => {
        if(s.Id === selectedStudentId){
            return s;
        } 
    })

    let newId = selectedStudent[0].Courses.length + 1;    
    Course.id = newId;

    return selectedStudent[0].Courses.push(Course);
}

router.get('/', (req, res) => {
    const Course = getCoursesByStudentId(req.params.student_id);
    res.json(Course);
})

router.get('/:id_course', (req, res) => {
    const Courses = getCoursesByStudentId(req.params.student_id);
    const selectedCourse = getCourseById(req.params.id_course, Courses);
    
    res.json(selectedCourse);
});

router.post('/', (req, res) => {
    res.json(addCoursesByStudentId(req.params.student_id, req.body));
})

router.put('/:id_course', (req, res) => {
    const { grade, name } = req.body;

    const id  = parseInt(req.params.id_course);
    const Courses = getCoursesByStudentId(req.params.student_id);

    const removedGradeIndex = Courses.map( c => c.id).indexOf(parseInt(id));
    Courses[removedGradeIndex] = { id, grade, name };
    
    res.json(Courses);
});

router.delete('/:id_course', (req, res) => {
    const Courses = getCoursesByStudentId(req.params.student_id);
    const removedGradeIndex = Courses.map( c => c.id).indexOf(parseInt(req.params.id_course));

    Courses.splice(removedGradeIndex, 1);

    res.json(Courses);
})



module.exports = router;