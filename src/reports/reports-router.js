
const path = require('path')
const express = require('express')
const ReportsService = require('./reportsservice')
const { requireAuth } = require('../middleware/basic-auth')
const reportsRouter = express.Router()
const jsonParser = express.json()


const serializeReport = report => ({
    id: report.id,
    name: report.name,
    station: report.station,
    date: report.station,
    strikes: report.strikes
  })



      
      

reportsRouter
    .route('/')
    .all(requireAuth)    
    .get( (req, res, next) => {
      ReportsService.getAllReports(req.app.get('db'))
      .then(reports => {
        res.json(reports)
      })
      .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const {name, station, date} = req.body
        const newReport = {name, station, date}
        ReportsService.insertReport(req.app.get('db'), newReport)
          .then(report => {
            res
              .status(201)
              .location(`/api/reports/${report.id}`)
              .json(report)
          })
          .catch(next)
      })




  
reportsRouter
    .route('/:id')
    .all(requireAuth)
    .all( (req,res,next) => {
        if(isNaN(parseInt(req.params.id))) {
          return res.status(404).json({
            error: {message: 'Invalid id'}
          })
        }
        ReportsService.getById(
          req.app.get('db'),
          req.params.id
        )
          .then(report => {
            if(!report) {
              return res.status(404).json({
                error: { message: 'Report does not exist'}
              })
            }
            res.report= report
            next()
          })
          .catch(next)
      })
  
    .get((req, res, next) => {
    res.json(res.report)
    })

    .delete((req, res, next) => {
    ReportsService.deleteReport(
        req.app.get('db'),
        req.params.id
    )
        .then(numRowsAffected => {
        res.status(204).end()
        })
        .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
      const {name, date, station, strikes} = req.body
      const reportToUpdate = { name, date, station, strikes }

      const numberOfValues = Object.values(reportToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
          return res.status(400).json({
          error: { message: 'Request body must contain either "name", "date", "station", or "strikes" '}
          })

      ReportsService.updateReport(
          req.app.get('db'),
          req.params.id,
          reportToUpdate
      )
          .then(updatedReport => {
              
          res.status(200).json(serializeReport(updatedReport))
          
          })
      .catch(next)
    })

    module.exports = reportsRouter