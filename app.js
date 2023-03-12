const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');

const Employ = require('./employ');
const Task = require('./task');

sequelize.sync().then(() => console.log('DB is created'));

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.send("<h1>Hello and Welcome to the API for managing Employees and Tasks of your company.</h1>");
});

// **************************** CRUD Operation for Employees ************************* //

// Create a new Employee
app.post("/add-employee", async (req, res) =>{
    
    try{
        await Employ.create(req.body);
    } catch(error){
        return res.status(400).json("{Error: { Bad Request } }");
    };
    return res.status(200).json("{ Succcess: { Employee created Successfully } }");

});

// GET employee details
app.get("/get-employees", async (req,res) => {
    try{
        const employ = await Employ.findAll();
        return res.status(200).json(employ);
    } catch(error) {
        return res.status(400).json("{Error: { Bad Request } }");
    }
});

// Update employee position
app.put("/update-employee-position/:id", async (req,res) =>{
    const reqId = req.params.id;
    try{
        const employ = await Employ.findOne({where: {id: reqId}});
        employ.position = req.body.position;
        await employ.save();
    } catch(error) {
        return res.status(400).json("{Error: { Bad Request } }");
    }
    return res.status(200).json("{ Succcess: { Employee updated Successfully } }");
});

// Delete employee
app.delete("/delete-employee/:id", async (req,res) =>{
    const reqId = req.params.id;
    try{
        await Employ.destroy({where: {id: reqId}});
    } catch (error) {
        return res.status(400).json("{Error: { Bad Request } }");
    }
    return res.status(200).json("{ Succcess: { Employee deleted Successfully } }");
});

// ************************************* END ****************************************** //


// ******************************* CRUD Operations for Tasks ************************* //

// Create a new task
app.post("/create-task", async (req,res) => {

    try {
        const task = await Task.create(req.body);
    } catch(error){
        return res.status(400).json("{Error: { Bad Request } }");
    };
    return res.status(200).json("{ Succcess: { Task created Successfully } }");

});

// View all tasks
app.get("/view-tasks", async (req, res) => {
    try{
        const task = await Task.findAll();
        return res.status(200).json(task);
    } catch(error) {
        return res.status(400).json("{Error: { Bad Request } }");
    }
});


// Update employee task
app.put("/update-employee-task/:id", async (req,res) => {
    const reqId = req.params.id;
    try{
        const task = await Task.findOne({where: {id: reqId}});
        task.employeeId = req.body.employeeId;
        await task.save();
    } catch(error) {
        return res.status(400).json("{Error: { Bad Request } }");
    }
    return res.status(200).json("{ Succcess: { Employee Task updated Successfully } }");    
})

// Delete Task
app.delete("/delete-task/:id", async (req,res) => {
    const reqId = req.params.id;
    try{
        await Task.destroy({where: {id: reqId}});
    } catch (error) {
        return res.status(400).json("{Error: { Bad Request } }");
    }
    return res.status(200).json("{ Succcess: { Task deleted Successfully } }");
})

// ************************************** END ********************************************* //

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
