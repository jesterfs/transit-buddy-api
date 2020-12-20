const LinesService = require('../src/lines/linesservice.js')
const knex = require('knex')

describe('lines service object', function() {
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



   context('Given lines has data', () => {

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


        it(` getAllLines() resolves all lines from 'lines' table`, () => {
             //test that LinesService.getAllLines gets all lines
             return LinesService.getAllLines(db)
                .then(actual => {
                    expect(actual).to.eql(testLines)
                })
        } )

        

        it('getById() resolves a line with stations by id', () => {
            const lineId = 1
            return LinesService.getStationsByLineId(db, lineId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: testLines[0].id,
                        name: testLines[0].name,
                        color: testLines[0].color,
                        stations: [{
                            id: testStations[0].id,
                            name: testStations[0].name
                        }]
                    })
                })
        })

        it('deleteLine() removes a line by id from lines', () => {
            const lineId = 3
            return LinesService.deleteLine(db, lineId)
                .then(() => LinesService.getAllLines(db))
                .then(allLines => {
                    const expected = testLines.filter(line => line.id !== lineId)
                    expect(allLines).to.eql(expected)
                })
        })

        it('updateLine() updates an line from lines', () => {
            const idOfLineToUpdate = 3
            const newLineData = {
                name: 'updated line',
                color: 'new color'
            }
            return LinesService.updateLine(db, idOfLineToUpdate, newLineData)
                .then(() => LinesService.getById(db, idOfLineToUpdate))
                .then(line => {
                    expect(line).to.eql({
                        id: idOfLineToUpdate,
                        ...newLineData,
                    })
                })
        })
    })

    context('Given Lines has no data', () => {


        it('getAllLines() resolves an empty array', () => {
            return LinesService.getAllLines(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it('insertLine() inserts a new line and respolves the new line with an id', () => {
            const newLine = {
                name: 'Test new Line',
                color: 'magenta'
            }
            
            return LinesService.insertLine(db, newLine)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newLine.name,
                        color: newLine.color,
                    })
                })
        })

    })

        
    })
