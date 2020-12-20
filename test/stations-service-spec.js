const StationsService = require('../src/stations/stationsservice.js')
const knex = require('knex')

describe('station service object', function() {
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



   context('Given stations has data', () => {

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


        it(` getAllStations() resolves all stations from 'stations' table`, () => {
             return StationsService.getAllStations(db)
                .then(actual => {
                    expect(actual).to.eql(testStations)
                })
        } )

        

        it('getReportsByStationId() resolves a station with reports', () => {
            const stationId = 1
            return StationsService.getReportsByStationId(db, stationId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: testStations[0].id,
                        name: testStations[0].name,
                        line: testStations[0].line,
                        reports: [{
                            id: testReports[0].id,
                            name: testReports[0].name,
                            date: testReports[0].date,
                            strikes: testReports[0].strikes
                        }]
                    })
                })
        })

        it('deleteStation() removes a station by id from stations', () => {
            const stationId = 3
            return StationsService.deleteStation(db, stationId)
                .then(() => StationsService.getAllStations(db))
                .then(allStations => {
                    const expected = testStations.filter(station => station.id !== stationId)
                    expect(allStations).to.eql(expected)
                })
        })

        it('updateStation() updates a station from stations', () => {
            const idOfStationToUpdate = 3
            const newStationData = {
                name: 'updated station',
                line: 2
            }
            return StationsService.updateStation(db, idOfStationToUpdate, newStationData)
                .then(() => StationsService.getById(db, idOfStationToUpdate))
                .then(station => {
                    expect(station).to.eql({
                        id: idOfStationToUpdate,
                        ...newStationData,
                    })
                })
        })
    })

    context('Given Stations has no data', () => {

        beforeEach(() => {
            return db
                .into('lines')
                .insert(testLines)
        })

        it('getAllStations() resolves an empty array', () => {
            return StationsService.getAllStations(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it('insertStation() inserts a new station and respolves the new station with an id', () => {
            const newStation = {
                name: 'Test new station',
                line: 1
            }
            
            return StationsService.insertStation(db, newStation)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newStation.name,
                        line: newStation.line,
                    })
                })
        })

    })

        
    })
