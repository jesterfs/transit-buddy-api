const MembersService = {
    getAllMembers(knex) {
      return knex.select('*').from('members')
    },

    getById(knex, id) {
        return knex.from('members').select('*').where('id', id).first()
      },

    insertMember(knex, newMember) {
    return knex
        .insert(newMember)
        .into('members')
        .returning('*')
        .then(rows => {
        return rows[0]
        })
    },


    deleteMember(knex, id) {
      return knex('members')
        .where({id})
        .delete()
    },

    updateMember(knex, id, newMemberFields) {
      return knex('members')
        .where({id})
        .update(newMemberFields)
    },

    getByEmail(knex, email) {
      return knex.from('members').select('*').where('email', email).first()
    },
}
  module.exports = MembersService 