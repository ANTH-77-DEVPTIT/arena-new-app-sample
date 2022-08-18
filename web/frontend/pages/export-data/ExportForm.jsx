import { Button, Card, DisplayText, Stack, TextField } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import FormValidate from '../../helpers/formValidate'
import FormControl from '../../components/FormControl'
import ResourceItem from './ResourceItem'

const Resources = [
  'product',
  'custom_collection',
  'smart_collection',
  // 'page',
  // 'blog',
  // 'shop',
  // 'file',
  // 'customer',
  // 'discount_code',
  // 'draft_order',
  // 'order',
  // 'redirect',
]

const ResourceFormData = {
  type: { value: '' },
  count: {
    type: 'select',
    label: 'Count',
    placeholder: '',
    value: '10',
    error: '',
    required: true,
    validate: {},
    options: [
      { label: '10 (test)', value: '10' },
      { label: '100', value: '100' },
      { label: '1000', value: '1000' },
      { label: 'All', value: 'all' },
    ],
  },
  columns: { value: null },
  filter: { value: null },
}

const ResourceListFormData = Resources.map((item) => ({
  ...ResourceFormData,
  type: { value: item },
}))

const initFormData = {
  name: {
    type: 'text',
    label: 'Package name',
    placeholder: 'name',
    value: 'Package - ' + new Date().toISOString(),
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [1, 'Too short!'],
      maxlength: [100, 'Too long!'],
    },
    focused: true,
  },
  description: {
    type: 'text',
    label: 'Package description',
    placeholder: 'description',
    value: 'Package description',
    error: '',
    required: true,
    multiline: 4,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [1, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
  resourceTypes: {
    type: 'multiple-select',
    label: 'Select resources',
    placeholder: '',
    value: [],
    error: '',
    required: false,
    validate: {},
    options: Resources.map((item) => ({
      label: item[0].toUpperCase() + item.slice(1).replace(/_/g, ' ').toLowerCase() + 's',
      value: item,
    })),
  },
  resources: [],
  schedule: {
    type: 'select',
    label: 'Schedule',
    placeholder: '',
    value: 'one-time',
    error: '',
    required: true,
    validate: {},
    options: [
      { label: 'One time', value: 'one-time' },
      { label: 'Every 6 hours', value: 'every-6-hours' },
      { label: 'Every 12 hours', value: 'every-12-hours' },
      { label: 'Every day', value: 'every-day' },
      { label: 'Every week', value: 'every-week' },
      { label: 'Every month', value: 'every-month' },
    ],
    disabled: true,
  },
}

function ExportForm(props) {
  const { actions, onSubmit } = props

  const [formData, setFormData] = useState(initFormData)

  useEffect(() => {
    console.log(`-----------------------------`)
    console.log('formData :>> ', formData)
    Object.keys(formData)
      .filter((key) => !['resources'].includes(key))
      .forEach((key) => console.log(`| ${key}: ${formData[key]?.value}`))

    if (formData.resources) {
      console.log(`| resources:`)
      formData.resources.forEach((item) => {
        console.log(`\t| ${item.type.value}`)
        Object.keys(item).forEach((key) => console.log(`\t\t| ${key}: ${item[key]?.value}`))
      })
    }
  }, [formData])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    _formData[name] = { ..._formData[name], value, error: '' }

    if (name === 'resourceTypes') {
      _formData['resources'] = value.map((item) => ({
        ...ResourceFormData,
        type: { value: item },
      }))
    }

    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      let data = {
        name: formData['name'].value,
        description: formData['description'].value,
        resources: formData['resources'].map((item) => {
          let obj = {}
          Object.keys(item).forEach((key) =>
            item[key].value ? (obj[key] = item[key].value) : null,
          )
          return obj
        }),
      }

      onSubmit(data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    }
  }

  return (
    <Stack vertical>
      <Card sectioned>
        <Stack vertical alignment="fill">
          <FormControl {...formData['name']} onChange={(value) => handleChange('name', value)} />
          <FormControl
            {...formData['description']}
            onChange={(value) => handleChange('description', value)}
          />
        </Stack>
      </Card>

      <Card sectioned title={formData['resourceTypes'].label}>
        <FormControl
          {...formData['resourceTypes']}
          onChange={(value) => handleChange('resourceTypes', value)}
        />
      </Card>

      {formData['resources'].length > 0 && (
        <Card title="Customize resources">
          <Card.Section subdued>
            <Stack vertical alignment="fill">
              {formData.resources.map((item, index) => (
                <ResourceItem
                  key={index}
                  formData={item}
                  onChange={(value) => {
                    let _formData = JSON.parse(JSON.stringify(formData))
                    let _value = JSON.parse(JSON.stringify(value))
                    _formData.resources[index] = _value
                    setFormData(_formData)
                  }}
                />
              ))}
            </Stack>
          </Card.Section>
        </Card>
      )}

      <Card title="Optional">
        <Card.Section>
          <Stack distribution="fillEvenly">
            <Stack.Item fill>
              <FormControl
                {...formData['schedule']}
                onChange={(value) => handleChange('schedule', value)}
              />
            </Stack.Item>
            <Stack.Item fill></Stack.Item>
          </Stack>
        </Card.Section>
      </Card>

      <Stack distribution="trailing">
        <Button
          disabled={!Boolean(formData['resources'].length > 0)}
          primary={Boolean(formData['resources'].length > 0)}
          onClick={handleSubmit}
        >
          Export now
        </Button>
      </Stack>
    </Stack>
  )
}

export default ExportForm
