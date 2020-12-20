
const path = require('path')
const express = require('express')
// const xss = require('xss')
const LinesService = require('./linesservice')
// const { requireAuth } = require('../middleware/basic-auth')


const LinesRouter = express.Router()
const jsonParser = express.json()

const serializeLine = line => ({
    id: line.id,
    name: line.name,
    color: line.color,
  })
  


    LinesRouter
        .route('/')
        // .all(requireAuth)
        .get( (req, res, next) => {
          LinesService.getAllLines(req.app.get('db'))
          .then(lines => {
            res.json(lines)
          })
          .catch(next)
        })


    LinesRouter
        .route('/:id')
        .all(
        //   requireAuth, 
          (req, res, next) => {
          if(isNaN(parseInt(req.params.id))) {
            return res.status(404).json({
              error: {message: 'Invalid Id'}
            })
          }
          LinesService.getStationsByLineId(
            req.app.get('db'),
            req.params.id
          )
            .then(line => {
              if(!line) {
                return res.status(404).json({
                  error: { message: 'Line does not exist'}
                })
              }
              res.line= line
              next()
            })
            .catch(next)
          })

        .get((req, res, next) => {
         
          res.json(res.line)
        })


module.exports = LinesRouter