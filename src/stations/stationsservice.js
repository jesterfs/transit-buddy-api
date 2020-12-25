const StationsService = {
    getAllStations(knex) {
      return knex.select('*').from('stations')
    },

    getById(knex, id) {
        return knex.from('stations').select('*').where('id', id).first()
      },

    insertStation(knex, newStation) {
    return knex
        .insert(newStation)
        .into('stations')
        .returning('*')
        .then(rows => {
        return rows[0]
        })
    },

    getReportsByStationId(db, stationId) {
      return db('stations').select({
        id: 'stations.id',
        name: 'stations.name',
        line: 'stations.line',
        
        reportId: 'reports.id',
        reportName: 'reports.name',
        reportDate: 'reports.date',
        reportStrikes: db.raw('(SELECT COUNT(*) FROM report_strikes WHERE report_id = reports.id)')
      })
        .leftJoin('reports', 'reports.station', 'stations.id')
        
        .where({ 'stations.id': stationId })
        .then((results) => {
          const first = results[0];
          if (!first)
            return null;
    
          const { id, name, line} = first;
          const station = {
            id, name, line, reports: []
          };

          const rIds = new Set();

          

          for (const line of results) {
            const {  reportId, reportName, reportDate, reportStrikes } = line;
            
            if (reportId && !rIds.has(reportId)) {
              const report = {
                  id: reportId,
                  name: reportName,
                  date: reportDate,
                  strikes: reportStrikes 
                };
              
                station.reports.push(report);
                rIds.add(reportId)
              }
            }


          return station;
        });
    },

    deleteStation(knex, id) {
      return knex('stations')
        .where({id})
        .delete()
    },

    updateStation(knex, id, newStationFields) {
      return knex('stations')
        .where({id})
        .update(newStationFields)
    },
}
  module.exports = StationsService 