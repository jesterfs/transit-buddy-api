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
      const strikeCount = '(SELECT COUNT(*) FROM report_strikes WHERE report_id = reports.id)'
      const today = new Date().getTime() / 1000
      const threeDays = today - (72 * 60 * 60)
      const stationReportCount = `
        (SELECT COUNT(*) FROM reports
          WHERE (SELECT COUNT(*) FROM report_strikes WHERE report_id = reports.id) < 3
            AND reports.date >= now() - interval '3 days'
            AND reports.station = stations.id)`;

      const stationsTable = db.select({
        id: 'stations.id',
        name: 'stations.name',
        line: 'stations.line',
        reportCount: db.raw(stationReportCount)
      }).from('stations').as('stations');

      return db('lines').select({
        id: 'lines.id',
        name: 'lines.name',
        color: 'lines.color',
        
        stationId: 'stations.id',
        stationName: 'stations.name',
        stationReportCount: 'stations.reportCount'

        // reportId: 'reports.id',
        // reportName: 'reports.name',
        // reportDate: 'reports.date',
        // reportStrikes: db.raw(strikeCount)

      })
        .leftJoin(stationsTable, 'stations.line', 'lines.id')
        // .leftJoin('reports', function() {
        //   this.on('reports.station' , '=' , 'stations.id')
        //     .andOn(db.raw(strikeCount) , '<' , 3)
        //     .andOn(db.raw("reports.date >= now() - interval '3 days'"))
        // })
        
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
            const {  stationId, stationName, stationReportCount} = l
            
            if (stationId && !sIds.has(stationId)) {
              const station = {
                  id: stationId,
                  name: stationName,
                  reports: Number(stationReportCount)
                }
                line.stations.push(station)
                sIds.add(stationId)
              }
              // const rIds = new Set()

              // for(const r of results) {
              //   const { reportId, reportName, reportDate, reportStrikes } = r
                
              //   if(reportId && !rIds.has(reportId) && new Date(reportDate).getTime() / 1000 >= threeDays) {
              //     const report = {
              //       id: reportId,
              //       name: reportName,
              //       date: reportDate,
              //       strikes: reportStrikes 
              //     }
              //     line.station.reports.push(report)
              //     rIds.add(reportId)
              //   }
              // }

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