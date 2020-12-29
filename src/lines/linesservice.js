const LinesService = {
    getAllLines(knex) {
      return knex.select('*').from('lines')
    },

    getById(knex, id) {
        return knex.from('lines').select('*').where('id', id).first()
      },

    insertLine(knex, newLine) {
    return knex
        .insert(newLine)
        .into('lines')
        .returning('*')
        .then(rows => {
        return rows[0]
        })
    },

    getStationsByLineId(db, lineId) {
      return db('lines').select({
        id: 'lines.id',
        name: 'lines.name',
        color: 'lines.color',
        
        stationId: 'stations.id',
        stationName: 'stations.name'
      })
        .join('stations', 'stations.line', 'lines.id')
        
        .where({ 'lines.id': lineId })
        .then((results) => {
          const first = results[0]
          if (!first)
            return null
    
          const { id, name, color} = first
          const line = {
            id, name, color, stations: []
          }

          const sIds = new Set()

          for (const l of results) {
            const {  stationId, stationName } = l
            
            if (stationId && !sIds.has(stationId)) {
              const station = {
                  id: stationId,
                  name: stationName,
                }
                line.stations.push(station)
                sIds.add(stationId)
              }
            }


          return line
        })
    },

    deleteLine(knex, id) {
      return knex('lines')
        .where({id})
        .delete()
    },

    updateLine(knex, id, newLineFields) {
      return knex('lines')
        .where({id})
        .update(newLineFields)
    },
}
  module.exports = LinesService 