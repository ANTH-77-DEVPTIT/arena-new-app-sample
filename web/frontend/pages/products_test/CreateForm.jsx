import PropTypes from 'prop-types'
import { Button, Card, Checkbox, DisplayText, Stack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import FormValidate from '../../helpers/formValidate'
import FormControl from '../../components/FormControl'
import OptionForm from './OptionForm'

CreateForm.propTypes = {
  created: PropTypes.object,
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
}

CreateForm.defaultProps = {
  created: {},
  onDiscard: () => null,
  onSubmit: () => null,
}

const initialFormData = {
  title: {
    type: 'text',
    label: 'Title',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
    autoFocus: true,
  },
  body_html: {
    type: 'text',
    label: 'Description',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
    },
    multiline: 6,
  },
  status: {
    type: 'select',
    label: 'Status',
    value: 'active',
    error: '',
    validate: {},
    options: [
      {
        label: 'ACTIVE',
        value: 'active',
      },
      {
        label: 'DRAFT',
        value: 'draft',
      },
      {
        label: 'ARCHIVED',
        value: 'archived',
      },
    ],
  },
  product_type: {
    type: 'text',
    label: 'Product_type',
    value: '',
    error: '',
  },
  tags: {
    type: 'text',
    label: 'Tags',
    value: '',
    error: '',
    validate: {
      minlength: [2, 'Too short!'],
      maxlength: [255, 'Too long!'],
    },
  },
  images: {
    type: 'file',
    label: 'Images',
    value: [],
    originValue: [],
    error: '',
    validate: {},
    allowMultiple: true,
  },
  imagesURL: {
    type: 'text',
    label: 'Image, YouTube, or Video URL',
    value: '',
    originValue: [],
    error: '',
    validate: {},
  },
}

//option no cung la cai form thoi
const optionFormData = {
  name: {
    type: 'text',
    label: 'Option name',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
  values: {
    type: 'text',
    label: 'Option values',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [1, 'Too short!'],
      maxlength: [100, 'Too long!'],
    },
  },
}

let initOptionFormData = Array.from([
  // { name: 'Size', values: 's,m,l' },
  // { name: 'Color', values: 'red,black,yellow' },
  // { name: 'Material', values: 'gold,sliver' },
  { name: '', values: '' },
]).map((item) => ({
  name: { ...optionFormData.name, value: item.name },
  values: { ...optionFormData.values, value: item.values },
}))

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit } = props

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    console.log('formData change:>> ', formData)
  }, [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(initialFormData))

    /**
     * test nha
     */
    _formData.title.value = `Sample product`
    _formData.body_html.value = `Sample product`
    _formData.product_type.value = `Sample product`
    _formData.tags.value = `Sample product`

    if (created.id) {
      Array.from(['title', 'body_html', 'tags', 'product_type', 'status']).map(
        (key) => (_formData[key] = { ..._formData[key], value: created[key] || '' }),
      )
      Array.from(['images']).map(
        (key) => (_formData[key] = { ..._formData[key], originValue: created[key] || [] }),
      )
    }

    setFormData(_formData)
  }, [])

  console.log('created', created)

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    Array.from(['images']).forEach((key) => (_formData[key] = formData[key]))
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      const { valid, data } = FormValidate.validateForm(formData)

      if (valid) {
        data['images'].value = formData['images'].value
        onSubmit(data)
      } else {
        setFormData(data)

        throw new Error('Invalid form data')
      }
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    }
  }

  return (
    <Stack vertical alignment="fill">
      <Stack.Item>
        <AppHeader
          {...props}
          title={created.id ? 'Update product' : 'Add product'}
          onBack={onDiscard}
        />
      </Stack.Item>

      <Stack.Item>
        <Card sectioned>
          <Stack vertical alignment="fill">
            <Stack>
              <Stack.Item fill>
                <FormControl
                  {...formData.title}
                  placeholder="Ao thun ngan tay"
                  onChange={(value) => handleChange('title', value)}
                />
              </Stack.Item>
              <Stack.Item fill>
                <FormControl
                  {...formData['product_type']}
                  onChange={(value) => handleChange('product_type', value)}
                />
              </Stack.Item>
            </Stack>
            <Stack.Item fill>
              <FormControl
                {...formData.body_html}
                onChange={(value) => handleChange('body_html', value)}
              />
            </Stack.Item>
            <Stack>
              <Stack.Item fill>
                <FormControl
                  {...formData['status']}
                  onChange={(value) => handleChange('status', value)}
                />
              </Stack.Item>
              <Stack.Item fill>
                <FormControl
                  {...formData['tags']}
                  onChange={(value) => handleChange('tags', value)}
                />
              </Stack.Item>
            </Stack>
          </Stack>
        </Card>
        <Card sectioned>
          <Stack vertical>
            <Stack.Item>
              {created?.id &&
                created.images.map((image, index) => (
                  <img
                    key={index}
                    style={{ width: '150px', height: 'auto', margin: '10px' }}
                    src={image.src}
                    alt="HIHI"
                  />
                ))}
            </Stack.Item>
            <Stack>
              <Stack.Item fill>
                <FormControl
                  {...formData['images']}
                  onChange={(value) => handleChange('images', value)}
                />
              </Stack.Item>
              <Stack.Item fill>
                <FormControl
                  {...formData['imagesURL']}
                  placeholder="Enter your URL..."
                  onChange={(value) => handleChange('imagesURL', value)}
                />
              </Stack.Item>
            </Stack>
          </Stack>
        </Card>
      </Stack.Item>

      <Stack.Item>
        <Card>
          <Card.Section>
            <Stack vertical>
              <DisplayText size="small">Options</DisplayText>
              <Checkbox
                label="This product has options, like size or color"
                checked={Boolean(formData['options'])}
                onChange={() => {
                  let _formData = JSON.parse(JSON.stringify(formData))
                  if (formData['options']) {
                    _formData['options'] = null
                  } else {
                    _formData['options'] = initOptionFormData
                  }
                  setFormData(_formData)
                }}
              />
            </Stack>
          </Card.Section>
          {formData['options'] &&
            formData['options'].map((item, index) => (
              <Card.Section key={index}>
                <OptionForm
                  formData={item}
                  onChange={(value) => {
                    let _formData = JSON.parse(JSON.stringify(formData))
                    _formData['options'][index] = value

                    console.log('_formData :>> ', _formData)

                    // check has empty option> khúc này kiểm tra nếu _formData['options'] mà không có giá trị thì lấy giá trị mặc định bên trên cho nó
                    if (!_formData['options'].filter((item) => item['name'].value === '').length) {
                      _formData['options'].push({ ...optionFormData })
                    }

                    console.log('_formData ben dưới :>> ', _formData)

                    setFormData(_formData)
                  }}
                />
              </Card.Section>
            ))}
        </Card>
      </Stack.Item>

      <Stack.Item>
        <Stack distribution="trailing">
          <Button onClick={onDiscard}>Discard</Button>
          <Button primary onClick={handleSubmit}>
            {created.id ? 'Save' : 'Add'}
          </Button>
        </Stack>
      </Stack.Item>
    </Stack>
  )
}

export default CreateForm
