const db = require('../connect/connect')

const data = require('./data')

// Create a table if it doesn't exist
function entry () {
	// Insert each JSON object into the table as separate rows
	// Modify your INSERT statement to omit the ID column if it's auto-incremented
  const stmt = db.prepare(
		`INSERT INTO api (base_unit, quote_unit, low, high, last, type, open, volume, sell, buy, at, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	)
  for (const item of data) {
    stmt.run(
			item.base_unit,
			item.quote_unit,
			parseFloat(item.low),
			parseFloat(item.high),
			parseFloat(item.last),
			item.type,
			parseInt(item.open),
			parseFloat(item.volume),
			parseFloat(item.sell),
			parseFloat(item.buy),
			parseInt(item.at),
			item.name
		)
  }
  stmt.finalize()

  console.log('Data inserted into the table.')

	// Close the database connection
  db.close()
}

module.exports = entry
