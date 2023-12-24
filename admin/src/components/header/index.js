import React from "react";
import { Box, MultiSelect, MultiSelectOption, SingleSelect, SingleSelectOption, Button } from "@strapi/design-system";
import "./main.css";
import { useIntl } from 'react-intl';
import getTrad from "../../utils/getTrad";
export default function Header({ options, toggleOption, models }) {
  // options.onChange

  const { formatMessage, formatDate } = useIntl();
  const fields = [
    {
      name: 'edgesType',
      type: 'singleSelect',
      values: [
        {
          name: 'straight',
        },
        {
          name: 'step',
        },
        {
          name: 'smoothstep',
        },
        {
          name: 'bezier',
        }
      ]
    },
    {
      name: 'layout',
      type: 'singleSelect',
      values: [
        {
          name: 'elk',
        },
        {
          name: 'dagre',
          disabled: true,
        },
        {
          name: 'horizontal',
          disabled: true,
        }
      ]
    },
    {
      name: 'models',
      type: 'multiSelect',
      values: models.map((model) => ({ name: model.uid }))
    }
  ]
  const elements = [];
  fields.map((field) => {
    if (field.type === 'singleSelect') {
      elements.push(
        <SingleSelect
          key={field.name}
          label={formatMessage({ id: getTrad('options_' + field.name), defaultMessage: field.name })}
          name={field.name}
          onChange={(type) => toggleOption(field.name, type)}
          value={options[field.name]}
        >
          {field.values.map((value) => (
            <SingleSelectOption key={value.name} value={value.name} disabled={value.disabled}>
              {value.name}
            </SingleSelectOption>
          ))}
        </SingleSelect>
      )
    } else {
      elements.push(
        <MultiSelect
          key={field.name}
          label={formatMessage({ id: getTrad('options_' + field.name), defaultMessage: field.name })}
          name={field.name}
          onChange={(type) => toggleOption(field.name, type)}
          value={options[field.name]  }
        >
          {field.values.map((value) => (
            <MultiSelectOption key={value.name} value={value.name} disabled={value.disabled}>
              {value.name}
            </MultiSelectOption>
          ))}
        </MultiSelect>
      )
    }
  })
  return (
    <Box id="header">
      {elements}
    </Box>
  );
}
