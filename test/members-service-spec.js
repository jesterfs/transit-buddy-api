const MembersService = require('../src/members/membersservice.js')
const knex = require('knex')

describe('members service object', function() {
    let db 

    let testLines = [
        {
            id: 1,
            name: 'line1',
            color: 'color1'
        },
        {
            id: 2,
            name: 'line2',
            color: 'color2'
        },
        {
            id: 3,
            name: 'line3',
            color: 'color3'
        }
    ] 


    let testMembers = [
        {
            id: 1,
            name: 'member1',
            email: 'email1',
            password: 'password1',
            line: 1
        },
        {
            id: 2,
            name: 'member2',
            email: 'email2',
            password: 'password2',
            line: 2
        },
        {
            id: 3,
            name: 'member3',
            email: 'email3',
            password: 'password3',
            line: 3
        }
    ]

    


    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
    })

    const cleanUp = () => db.raw('TRUNCATE TABLE lines, members, stations, reports RESTART IDENTITY CASCADE');

    before(cleanUp)

    afterEach(cleanUp)

    after(() => db.destroy())



   context('Given members has data', () => {

        beforeEach(() => {
            return db
                .into('lines')
                .insert(testLines)
        })

        beforeEach(() => {
            return db
                .into('members')
                .insert(testMembers)
        })



        it(` getAllMembers() resolves all members from 'members' table`, () => {
             return MembersService.getAllMembers(db)
                .then(actual => {
                    expect(actual).to.eql(testMembers)
                })
        } )

        

        it('getById() resolves a member by id', () => {
            const memberId = 3
            const memberIndex = memberId - 1
            return MembersService.getById(db, memberId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: testMembers[memberIndex].id,
                        name: testMembers[memberIndex].name,
                        email: testMembers[memberIndex].email,
                        password: testMembers[memberIndex].password,
                        line: testMembers[memberIndex].line
                        
                    })
                })
        })

        it('deleteMember() removes a member by id from member', () => {
            const memberId = 3
            return MembersService.deleteMember(db, memberId)
                .then(() => MembersService.getAllMembers(db))
                .then(allMembers => {
                    const expected = testMembers.filter(member => member.id !== memberId)
                    expect(allMembers).to.eql(expected)
                })
        })

        it('updateMember() updates a member from members', () => {
            const idOfMemberToUpdate = 3
            const newMemberData = {
                name: 'updated member',
                email: 'new email',
                password:'new password',
                line: 2
            }
            return MembersService.updateMember(db, idOfMemberToUpdate, newMemberData)
                .then(() => MembersService.getById(db, idOfMemberToUpdate))
                .then(member => {
                    expect(member).to.eql({
                        id: idOfMemberToUpdate,
                        ...newMemberData,
                    })
                })
        })
    })

    context('Given Members has no data', () => {

        beforeEach(() => {
            return db
                .into('lines')
                .insert(testLines)
        })

        it('getAllMembers() resolves an empty array', () => {
            return MembersService.getAllMembers(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it('insertMember() inserts a new member and respolves the new member with an id', () => {
            const newMember = {
                name: 'Test new Member',
                email: 'email',
                password: 'password',
                line: 1
            }
            
            return MembersService.insertMember(db, newMember)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newMember.name,
                        email: newMember.email,
                        password: newMember.password,
                        line: newMember.line
                    })
                })
        })

    
    })
        
    })
