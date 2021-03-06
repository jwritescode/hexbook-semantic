import React from 'react';
import {
  Icon,
  Label,
} from 'semantic-ui-react';
import './components.css';

function TagLabel(props) {
  return <Label 
    key={props.tag}
    content={props.tag}
    onRemove={ (props.onRemove) ? () => props.onRemove(props.tag) : undefined }
    color={props.color}
  />
}

function TableCodeLabel(props) {
  return <Label color='grey'><Icon name='list' />{props.code}</Label>
}

function TableEntriesCountLabel(props) {
  return <Label circular>{props.count}</Label>
}

function TemplateLabel(props) {
  return <Label color={props.template.plugin.color}><Icon name='puzzle' />{props.template.name}</Label>
}

function TemplatePluginLabel(props) {
  return <Label color={props.plugin.color}>{props.plugin.name}</Label>
}

function TemplatePropertyLabel(props) {
  return <Label color='teal'>{props.property}<Label.Detail>{props.value}</Label.Detail></Label>
}

function TagWeightLabel(props) {
  return (
    <Label 
      key={props.id} 
      color={props.color}
      onRemove={props.onRemove}
      content={props.text}
      detail={props.weight}
    />
  )
}

export {TagLabel, TableCodeLabel, TableEntriesCountLabel, TemplateLabel, TemplatePluginLabel, TemplatePropertyLabel, TagWeightLabel}