import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {WideColumnWorkspace} from '../components/workspaces'
import {FloatingActionButton} from '../components/floatingcontrols'
import {TextAreaInputModal} from '../components/modals'
import {TableDetailsSegment} from '../components/tabledetails'
import {TableEntriesSegment} from '../components/tableentries'
import {TableEntryEditModal} from '../components/tableentry'
import {updateTable} from '../actions/tables'
import {addTableEntry, updateTableEntry} from '../actions/tableentries'
import {getByCodeTables, getFullTableById} from '../selectors/tables'
import {getTableIdFromRoute} from '../selectors/tabledetails'
import {getFullTableEntriesLookup} from '../selectors/tableentries'
import {getByTagColors, getAllTagIds} from '../selectors/tags'
import {REGEX} from '../constants/regex'
import './containers.css';

const mapStateToProps = state => ({
  tablesByCode: getByCodeTables(state),
  tableId: getTableIdFromRoute(state.router),
  table: getFullTableById(state, getTableIdFromRoute(state.router)),
  tableEntriesById: getFullTableEntriesLookup(state),
  allTagIds: getAllTagIds(state),
  colorsByTag: getByTagColors(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addTableEntry,
  updateTableEntry,
  updateTable
}, dispatch)

class TableDetailsWorkspace extends Component {
  state = {
      openTableEntriesInputModal: false,
      openTableEntryEditModal: false,
      editingTableEntryId: null
  }

 handleSubmitEditDetails = (newTable) => {
    this.props.updateTable(newTable, this.props.table)
  }

  handleSubmitAddEntry = (value) => {
    if (value.match(REGEX.TABLE_ENTRY)) {
      const entry = value.split(',')
      const weight = entry[0]
      const text = entry.slice(1).join(',')
      this.props.addTableEntry(this.props.table, weight, text)
    }
  }

  handleCloseTableEntriesInputModal = () => {
    this.setState({openTableEntriesInputModal: false})
  }

  handleSubmitTableEntriesInputModal = (value) => {
    this.setState({openTableEntriesInputModal: false})
    const lines = value.split('\n')
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(REGEX.TABLE_ENTRY)) {
        const entry = lines[i].split(',')
        const weight = entry[0]
        const text = entry.slice(1).join(',')
        this.props.addTableEntry(this.props.table, weight, text)
      }
    }
  }

  handleClickAddTableEntriesButton = () => {
    this.setState({openTableEntriesInputModal: true})
  }

  handleClickTableEntry = (id) => {
    /*
    An entry was clicked in the table. Let's open the tableEntry edit modal
    id: The tableEntry id
    */
    this.setState({
      openTableEntryEditModal: true,
      editingTableEntryId: id,
    })
  }

  handleCloseTableEntryEditModal = () => {
    this.setState({
      openTableEntryEditModal: false,
    })
  }

  handleSubmitTableEntryEditModal = (tableEntry) => {
    /*
    Close the modal
    Receive the updated tableEntry from the modal
    Pull the non-updated tableEntry from state
    Dispatch both to the action creator
    */
    this.setState({openTableEntryEditModal: false})
    const prevTableEntry = this.props.tableEntriesById[tableEntry.id]
    this.props.updateTableEntry(tableEntry, prevTableEntry)
  }
    
  render() {
    return (
      <div id='TableDetailsWorkspace'>
        <WideColumnWorkspace>
          <TableDetailsSegment
            table={this.props.table}
            tablesByCode={this.props.tablesByCode}
            onSubmit={this.handleSubmitEditDetails}
          />
          <TableEntriesSegment 
            table={this.props.table} 
            colorsByTag={this.props.colorsByTag}
            onSubmitAddEntry={this.handleSubmitAddEntry}
            onClickEntry={this.handleClickTableEntry}
          />
          <TextAreaInputModal
            header='Add Entries to Table'
            subheader='One entry per line' 
            placeholder='Weight,Result text'
            open={this.state.openTableEntriesInputModal}
            onClose={this.handleCloseTableEntriesInputModal}
            onSubmit={this.handleSubmitTableEntriesInputModal}
          />
          <TableEntryEditModal
            key={this.state.editingTableEntryId} //This is IMPORTANT! https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
            header={this.props.table.name + ' > Edit Entry'}
            tableEntry={this.props.tableEntriesById[this.state.editingTableEntryId]}
            allTagIds={this.props.allTagIds}
            colorsByTag={this.props.colorsByTag}
            open={this.state.openTableEntryEditModal}
            onClose={this.handleCloseTableEntryEditModal}
            onSubmit={this.handleSubmitTableEntryEditModal}
          />
        </WideColumnWorkspace>
        <FloatingActionButton icon='plus' color='google plus' onClick={this.handleClickAddTableEntriesButton} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDetailsWorkspace)