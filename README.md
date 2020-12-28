TRANSIT BUDDY

Live App: https://transitbuddy.netlify.app/

Front End Repo: https://github.com/jesterfs/transit-buddy-app

Summary: Transit Buddy is a tool for transit riders to see what obstacles they might encounter on their commute and report any obstacles they encounter.
These reports last for three days or until a certain number of unique users report them as resolved.

Documentation: 
Base Url: https://stormy-reef-88662.herokuapp.com/api

  URLs By Resource:
    Lines: You cannot add, delete, or update lines via the API.
      Get all lines: GET Base Url + '/lines'
      Get a line with all stations: GET Base Url + '/lines/' + line ID
      
    Stations: You cannot add, delete, or update stations via the API.
      Get all stations: GET Base Url + '/stations'
      Get a station with all reports: GET Base Url + '/stations/' + station ID
      
    Reports: You cannot delete or update reports via the API.
      Get all reports: GET Base Url + '/reports'
      Get a report by id: GET Base Url + '/reports/' + report ID
      Add a report: POST Base Url + '/reports' 
        body must include name, date(as timestampz), and a station ID.
      Add a resolution report: POST Base Url + '/reports/' + report ID + '/strike'


Technology Used:
Node,js, Express, PostgreSQL, SQL, Knex, Javascript
