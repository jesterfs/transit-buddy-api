
const path = require('path')
const express = require('express')
// const xss = require('xss')
const StationsService = require('./stationsservice')
const { requireAuth } = require('../middleware/basic-auth')


const stationsRouter = express.Router()
const jsonParser = express.json()

const serializeStation = station => ({
    id: station.id,
    name: station.name,
    line: station.line
  })
  


    stationsRouter
        .route('/')
        .all(requireAuth)
        .get( (req, res, next) => {
          StationsService.getAllStations(req.app.get('db'))
          .then(stations => {
            res.json(stations)
          })
          .catch(next)
        })


    stationsRouter
        .route('/:id')
        .all(
          requireAuth, 
          (req, res, next) => {
          if(isNaN(parseInt(req.params.id))) {
            return res.status(404).json({
              error: {message: 'Invalid Id'}
            })
          }
          StationsService.getReportsByStationId(
            req.app.get('db'),
            req.params.id
          )
            .then(station => {
              if(!station) {
                return res.status(404).json({
                  error: { message: 'Station does not exist'}
                })
              }
    
              res.station= station
              next()
            })
            .catch(next)
          })

        .get((req, res, next) => {
         
          res.json(res.station)
        })


module.exports = stationsRouter