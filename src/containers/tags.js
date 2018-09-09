import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  Dropdown,
  Header,
  Icon,
  Input,
  Label,
  Segment,
  Transition
} from 'semantic-ui-react';
import { WideColumnWorkspace } from '../components/workspaces'
import { getTerrainTags, getTerritoryTags, getOtherTags, TagsSegment } from '../components/tags'

import { addOtherTag, deleteOtherTag } from '../actions/tags'

import './containers.css';

const mapStateToProps = state => ({
  tags: state.entities.tags
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addOtherTag,
  deleteOtherTag
}, dispatch)

class TagsWorkspace extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitOtherTag = this.handleSubmitOtherTag.bind(this)
    this.handleRemoveOtherTag = this.handleRemoveOtherTag.bind(this)
  };

  handleSubmitOtherTag(tagText) {
    const tagRegEx = /^[a-z]+$/
    if ( tagText.match(tagRegEx) ) {
      this.props.addOtherTag(tagText)
    }
  }

  handleRemoveOtherTag(tagText) {
    console.log(`tagText ${tagText}`)
    this.props.deleteOtherTag(this.props.tags.byId[tagText])
  }

  render() {
    const terrainTags = getTerrainTags(this.props.tags)
    const territoryTags = getTerritoryTags(this.props.tags)
    const otherTags = getOtherTags(this.props.tags)
    console.log(`terrainTags: ${terrainTags}`)
    console.log(`territoryTags: ${territoryTags}`)
    console.log(`otherTags: ${otherTags}`)

    return (
      <div id='TagsWorkspace'>
        <WideColumnWorkspace>

        <TagsSegment
          header='Terrain Tags' 
          subheader='Automatically generated and tagged by the hex map. Type of terrain in a given hex. Typically used by random encounter tables.'
          color='olive'
          tags={terrainTags}
        />

        <TagsSegment
          header='Territory Tags' 
          subheader='Automatically generated and tagged by the hex map. Group that holds influence in a given hex. Typically used by adventure hook and theme tables.'
          color='orange'
          tags={territoryTags}
        />

        <TagsSegment
          header='Other Tags' 
          subheader='Any other user-defined tags that table rolls may by filtered by.'
          color='teal'
          tags={otherTags}
          onSubmit={this.handleSubmitOtherTag}
          placeholder='enter new tag...'
          onRemove={this.handleRemoveOtherTag}
          dropdown={<Dropdown icon={<Icon name='ellipsis vertical' color='grey' />} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <Dropdown.Menu direction='left'>
                <Dropdown.Item text='Import tag[s] ...' />
                <Dropdown.Item text='Export tags ...' />
                <Dropdown.Item text='Delete all tags' />
              </Dropdown.Menu>
            </Dropdown>}
        />

        </WideColumnWorkspace>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsWorkspace)
