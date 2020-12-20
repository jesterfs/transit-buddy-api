const ReportsService = {
    getAllReports(knex) {
      return knex.select('*').from('reports')
    },

    getById(knex, id) {
        return knex.from('reports').select('*').where('id', id).first()
      },

    insertReport(knex, newReport) {
    return knex
        .insert(newReport)
        .into('reports')
        .returning('*')
        .then(rows => {
        return rows[0]
        })
    },


    deleteReport(knex, id) {
      return knex('reports')
        .where({id})
        .delete()
    },

    updateReport(knex, id, newReportFields) {
      return knex('reports')
        .where({id})
        .update(newReportFields)
    },
}
  module.exports = ReportsService 