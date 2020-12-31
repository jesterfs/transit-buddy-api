const ReportsService = require('../src/reports/reportsservice.js')
const knex = require('knex')

describe('reports service object', function() {
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

    let testStations = [
        {
            id: 1,
            name: 'station1',
            line: 1,
        },
        {
            id: 2,
            name: 'station2',
            line: 2,
        },
        {
            id: 3,
            name: 'station3',
            line: 3,
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

    let testReports = [
        {
            id: 1,
            name: 'report1',
            date: new Date ('2020-10-02T17:00:00.000Z'),
            station: 1,
            strikes: 0
        },
        {
            id: 2,
            name: 'report2',
            date: new Date ('2020-10-02T17:00:00.000Z'),
            station: 2,
            strikes: 0
        },
        {
            
            id: 3,
            name: 'report3',
            date: new Date ('2020-10-02T17:00:00.000Z'),
            station: 3,
            strikes: 0
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



   context('Given reports has data', () => {

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

        beforeEach(() => {
            return db
                .into('stations')
                .insert(testStations)
        })

        beforeEach(() => {
            return db
                .into('reports')
                .insert(testReports)
        })



        it(` getAllReports() resolves all reports from 'reports' table`, () => {
             return ReportsService.getAllReports(db)
                .then(actual => {
                    expect(actual).to.eql(testReports)
                })
        } )

        

        it('getById() resolves a report by id', () => {
            const reportId = 3
            const reportIndex = reportId - 1
            return ReportsService.getById(db, reportId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: testReports[reportIndex].id,
                        name: testReports[reportIndex].name,
                        date: testReports[reportIndex].date,
                        station: testReports[reportIndex].station,
                        strikes: testReports[reportIndex].strikes
                        
                    })
                })
        })

        it('deleteReport() removes a report by id from reports', () => {
            const reportId = 3
            return ReportsService.deleteReport(db, reportId)
                .then(() => ReportsService.getAllReports(db))
                .then(allReports => {
                    const expected = testReports.filter(report => report.id !== reportId)
                    expect(allReports).to.eql(expected)
                })
        })

        it('updateReport() updates a report from reports', () => {
            const idOfReportToUpdate = 3
            const newReportData = {
                name: 'updated report',
                strikes: 1,
                date: new Date ('2020-10-02T17:00:00.000Z'),
                station: 1
            }
            return ReportsService.updateReport(db, idOfReportToUpdate, newReportData)
                .then(() => ReportsService.getById(db, idOfReportToUpdate))
                .then(report => {
                    expect(report).to.eql({
                        id: idOfReportToUpdate,
                        ...newReportData,
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

        beforeEach(() => {
            return db
                .into('stations')
                .insert(testStations)
        })


        it('getAllReports() resolves an empty array', () => {
            return ReportsService.getAllReports(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it('insertReport() inserts a new report and resolves the new report with an id and zero strikes', () => {
            const newReport = {
                name: 'Test new report',
                date: new Date ('2020-10-02T17:00:00.000Z'),
                station: 1
            }
            
            return ReportsService.insertReport(db, newReport)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newReport.name,
                        date: newReport.date,
                        station: newReport.station,
                        strikes: 0
                    })
                })
        })

    
    })
        
    })
