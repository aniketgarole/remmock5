const express = require("express")
const { EmployeeModel } = require("../models/employee.model")

const employeeRouter = express.Router()


employeeRouter.get("/", async(req, res)=> {
    // res.send('hi')
    try {
        let {department, sort, count, page, order} = req.query
        // console.log(req)
        count ? count = count : count = 5
        page ? page = page : page = 1
        let sortBy;
        order == "asc" ? sortBy = 1 : sortBy= -1

        if (department && sort) {
            const employees = await EmployeeModel.find({department}).sort({[sort]: sortBy}).skip(count*(page-1)).limit(count)
            res.status(200).json({"employess": employees})
        } else if(department) {
            const employees = await EmployeeModel.find({department}).skip(count*(page-1)).limit(count)
            res.status(200).json({"employess": employees})
        } else if(sort) {
            const employees = await EmployeeModel.find().sort({[sort]: sortBy}).skip(count*(page-1)).limit(count)
            res.status(200).json({"employess": employees})
        } else {
            const employees = await EmployeeModel.find().skip(count*(page-1)).limit(count)
            res.status(200).json({"employess": employees})
        }
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})


employeeRouter.post("/add", async(req, res)=> {
    try {
        const employee = new EmployeeModel({...req.body})
        await employee.save()
        res.status(200).json({"msg": "new employee has been added"})
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})


employeeRouter.patch("/update/:id", async(req, res)=> {
    try {
        let {id} = req.params
        await EmployeeModel.findByIdAndUpdate({_id: id, update})
        res.status(200).json({"msg": "employee has been updated"})
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})


employeeRouter.delete("/delete/:id", async(req, res)=> {
    try {
        let {id} = req.params
        await EmployeeModel.findByIdAndDelete({_id: id})
        res.status(200).json({"msg": "employee has been updated"})
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})








module.exports = {employeeRouter}