function getTables(stateTables) {
  const tables = []
  for (let i = 0; i < stateTables.allIds.length; i++) {
    const tableId = stateTables.allIds[i]
    const table = stateTables.byId[tableId]
    // Don't include the 'HEX' table. We manage that separately from other tables.
    if (tableId !== 'HEX') {
      tables.push({
        id: table.id,
        name: table.name,
        code: table.code,
        description: table.description,
        entries: table.entries,
        template: table.template
      })
    }
  }
  return tables
}

function getByCodeTables(stateTables) {
  const tablesByCode = {}
  stateTables.allIds.forEach(
    id => {
      if (stateTables.byId[id]) { 
        tablesByCode[stateTables.byId[id].code] = stateTables.byId[id]
      }
    }
  )
  console.log('selectors.tables.getByCodeTables')
  console.log('tablesByCode')
  console.log(tablesByCode)
  return tablesByCode
}

export {getTables, getByCodeTables}