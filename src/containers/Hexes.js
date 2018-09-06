import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addHexDetail, deleteHexDetail, addHex } from '../actions/hexes'
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Header,
  Icon,
  Input,
  Label,
  List,
  Modal,
  Segment,
  Table,
  Transition,
} from 'semantic-ui-react';
import { WideColumnWorkspace } from '../components/workspaces'
import { SingleLineAdder } from '../components/forms'
import { FloatingActionButton } from '../components/floatingcontrols'
import { TextAreaInputModal } from '../components/modals'
import { ListWithDeletableItems } from '../components/lists'
import { DirectInputTableCell } from '../components/tables'

import './containers.css';

function mapStateToProps(state) {
  return({
    tables: state.entities.tables,
    entryDetails: state.entities.entryDetails,
    tableEntries: state.entities.tableEntries,
    tags: state.entities.tags,
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addHexDetail,
  deleteHexDetail,
  addHex
}, dispatch)

class HexesWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueHexDetailInput: '',
      openHexMapInputModal: false,
    };

    this.handleSubmitHexDetailInput = this.handleSubmitHexDetailInput.bind(this)
    this.handleCloseHexMapInputModal = this.handleCloseHexMapInputModal.bind(this)
    this.handleCancelClickHexMapInputModal = this.handleCancelClickHexMapInputModal.bind(this)
    this.handleSaveClickHexMapInputModal = this.handleSaveClickHexMapInputModal.bind(this)
    this.handleClickAddToHexMapButton = this.handleClickAddToHexMapButton.bind(this)
    this.handleClickDeleteHexDetail = this.handleClickDeleteHexDetail.bind(this)
    this.handleSubmitHexInput = this.handleSubmitHexInput.bind(this)
  };

  handleSubmitHexDetailInput(value) {
    this.props.addHexDetail(value)
  }

  handleClickDeleteHexDetail(id) {
    this.props.deleteHexDetail(id)
  }

  handleSubmitHexInput(value) {
    //split into coordinate,terrain,territory
    const [coordinates, terrain, territory] = value.split(',')
    this.props.addHex(coordinates, terrain, territory)
  }

  handleCloseHexMapInputModal() {
    this.setState({openHexMapInputModal: false})
  };

  handleCancelClickHexMapInputModal() {
    this.setState({openHexMapInputModal: false})
  };

  handleSaveClickHexMapInputModal() {
    this.setState({openHexMapInputModal: false})
  };

  handleClickAddToHexMapButton() {
    this.setState({openHexMapInputModal: true})
  };

  render() {
    return (
      <div id='HexesWorkspace'>
        <WideColumnWorkspace>


          <Transition transitionOnMount='true' animation='fade up'>
          <Segment.Group>
            <Segment>
              <Header content='Hex Definition' subheader='What details should be randomly generated for each hex.' />
            </Segment>
            <Segment>
              {/*}
              <List bulleted size='large'>
                <List.Item>Lorem ipsum [[DOLLAR]] sit amet, consectetur <Icon link name='minus circle' color='grey' /></List.Item>
                <List.Item>[[CONSECTETUR]] adipiscing elit <Icon link name='minus circle' color='grey' /></List.Item>
                <List.Item>sed do eiusmod [[TEMPOR]] incididunt <Icon link name='minus circle' color='grey' /></List.Item>
              </List>
              */}
              {/*
              <Transition.Group as={List} bulleted size='large'>
                { this.props.entryDetails.allIds.map((id) => <List.Item key={id}>{ this.props.entryDetails.byId[id].text } <Icon onClick={() => this.handleClickDeleteHexDetail(id)} link name='minus circle' color='grey' /></List.Item>) }
              </Transition.Group>
              */}
              <ListWithDeletableItems bulleted='true' items={ this.props.entryDetails.allIds.map((id) => ({key: id, content: this.props.entryDetails.byId[id].text, onClick: () => this.handleClickDeleteHexDetail(id) })) } />
              <SingleLineAdder
                onSubmit={this.handleSubmitHexDetailInput}
                name='hex_definition'
                placeholder='Enter [[NEW]] hex detail...'
              />
            </Segment>
            <Segment>
              <Label color='grey'>[[]]<Label.Detail>HEX</Label.Detail></Label>
            </Segment>
            <Dropdown icon={<Icon name='ellipsis vertical' color='grey' />} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <Dropdown.Menu direction='left'>
                <Dropdown.Item text='Import definition ...' />
                <Dropdown.Item text='Export definition ...' />
              </Dropdown.Menu>
            </Dropdown>
          </Segment.Group>
          </Transition>

          <Transition transitionOnMount='true' animation='fade up'>
          <Segment>
            <Header content='Hex Map' subheader='Mapping of hex coordinates to terrain and territory' />
            <Table selectable compact='very' striped fixed singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '3rem' }}><Checkbox /></Table.HeaderCell>
                  <Table.HeaderCell>Coordinates</Table.HeaderCell>
                  <Table.HeaderCell>Terrain</Table.HeaderCell>
                  <Table.HeaderCell>Territory</Table.HeaderCell>
                  <Table.HeaderCell>Definition Override</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Checkbox /></Table.Cell>
                  <Table.Cell>0101</Table.Cell>
                  <DirectInputTableCell content='forest' />
                  <Table.Cell>hearts</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Checkbox /></Table.Cell>
                  <Table.Cell>0102</Table.Cell>
                  <Table.Cell>forest</Table.Cell>
                  <Table.Cell>hearts</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Checkbox /></Table.Cell>
                  <Table.Cell>0103</Table.Cell>
                  <Table.Cell>forest</Table.Cell>
                  <Table.Cell>hearts</Table.Cell>
                  <Table.Cell><Icon color='yellow' name='flag' /> sed do eiusmod [[TEMPOR]] incididunt</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '3rem' }}><Checkbox /></Table.HeaderCell>
                  <Table.HeaderCell>Coordinates</Table.HeaderCell>
                  <Table.HeaderCell>Terrain</Table.HeaderCell>
                  <Table.HeaderCell>Territory</Table.HeaderCell>
                  <Table.HeaderCell>Definition Override</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              { this.props.tables.byId['HEX'].entries.map((tableEntryId) => 
                <Table.Row>
                  <Table.Cell><Checkbox /></Table.Cell>
                  <Table.Cell>{tableEntryId}</Table.Cell>
                  <Table.Cell>{ this.props.tags.byId[this.props.tableEntries.byId[tableEntryId].addTags[0]].text }</Table.Cell>
                  <Table.Cell>{ this.props.tags.byId[this.props.tableEntries.byId[tableEntryId].addTags[1]].text }</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                )
              }
            </Table>
            <Dropdown icon={<Icon name='ellipsis vertical' color='grey' />} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <Dropdown.Menu direction='left'>
                <Dropdown.Item text='Import hex[es] ...' />
                <Dropdown.Item text='Export hexes ...' />
                <Dropdown.Item text='Edit selected hex[es] ...' />
                <Dropdown.Item text='Delete selected hex[es]' />
              </Dropdown.Menu>
            </Dropdown>
            <SingleLineAdder
              name='hex'
              placeholder='coordinate,terrain,territory'
              onSubmit={this.handleSubmitHexInput}
            />
          </Segment>
          </Transition>

          <TextAreaInputModal
            header='Add to Hex Map'
            subheader='One hex per line, no spaces, all lowercase' 
            placeholder='coordinate,terrain,territory'
            open={this.state.openHexMapInputModal}
            onClose={this.handleCloseHexMapInputModal}
            onCancelClick={this.handleCancelClickHexMapInputModal}
            onSaveClick={this.handleSaveClickHexMapInputModal}
          />

        </WideColumnWorkspace>

        <FloatingActionButton icon='plus' color='google plus' onClick={this.handleClickAddToHexMapButton} />
        
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HexesWorkspace)
