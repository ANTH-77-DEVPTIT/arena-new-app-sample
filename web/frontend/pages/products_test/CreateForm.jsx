import PropTypes from 'prop-types'
import {
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  DisplayText,
  Stack,
  TextField,
} from '@shopify/polaris'
import { useEffect, useState, useRef } from 'react'
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
    placeholder: 'Ao thun ngan tay',
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
    placeholder: 'Enter your URL...',
    valueShow: [],
    originValue: [],
    error: '',
    validate: {},
    focused: false,
  },
  metafields_global_title_tag: {
    type: 'text',
    label: 'Title SEO',
    value: '',
    error: '',
  },
  metafields_global_description_tag: {
    type: 'text',
    label: 'Description SEO',
    value: '',
    error: '',
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
  { name: 'Size', values: 's,m,l' },
  // { name: 'Color', values: 'red,black,yellow' },
  // { name: 'Material', values: 'gold,sliver' },
  // { name: '', values: '' },
]).map((item) => ({
  name: { ...optionFormData.name, value: item.name },
  values: { ...optionFormData.values, value: item.values },
}))

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit } = props

  const [formData, setFormData] = useState(initialFormData)
  const [showImageURL, setShowImageURL] = useState(false)

  useEffect(() => {
    console.log('111: formData change:>> ', formData)
  }, [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(initialFormData))

    /**
     * test nha
     **/
    _formData.title.value = `Sample product - ${new Date().toString()}`
    _formData.body_html.value = `Sample product`
    _formData.product_type.value = `Sample product`
    _formData.tags.value = `Sample product`
    _formData.imagesURL.value =
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
    _formData.metafields_global_title_tag.value = 'Title SEO'
    _formData.metafields_global_description_tag.value = 'Description SEO nhe'

    if (created.id) {
      Array.from([
        'title',
        'body_html',
        'tags',
        'product_type',
        'status',
        'metafields_global_title_tag',
        'metafields_global_description_tag',
      ]).map((key) => (_formData[key] = { ..._formData[key], value: created[key] || '' }))
      Array.from(['images']).map(
        (key) => (_formData[key] = { ..._formData[key], originValue: created[key] || [] }),
      )
    }

    setFormData(_formData)
  }, [])

  const handleImageURL = () => {
    setFormData({
      ...formData,
      imagesURL: {
        ...formData['imagesURL'],
        originValue: [...formData['imagesURL'].originValue, { src: formData['imagesURL'].value }],
        valueShow: [...formData['imagesURL'].valueShow, formData['imagesURL'].value],
        value: '',
        focused: true,
      },
    })
    setShowImageURL(true)
  }

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    Array.from(['images']).forEach((key) => (_formData[key] = formData[key]))

    if (name === 'imagesURL') {
      _formData['imagesURL'] = {
        ..._formData['imagesURL'],
        value,
        error: '',
      }
    } else {
      _formData[name] = { ..._formData[name], value, error: '' }
    }

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
                  {...formData['title']}
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
                    style={{ width: '150px', height: 'auto', margin: '10px', borderRadius: '5px' }}
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
                <Stack vertical alignment="fill">
                  <Stack.Item fill>
                    <ButtonGroup segmented>
                      <FormControl
                        {...formData['imagesURL']}
                        onChange={(value) => handleChange('imagesURL', value)}
                      />
                      <div style={{ marginTop: '23px', marginLeft: '20px' }}>
                        <Button plain onClick={handleImageURL}>
                          Show hàng!
                        </Button>
                      </div>
                    </ButtonGroup>
                  </Stack.Item>
                  {formData['imagesURL'].valueShow && showImageURL && (
                    <Stack.Item>
                      {formData['imagesURL'].valueShow.map((image, index) => (
                        <img
                          key={index}
                          style={{
                            width: '80px',
                            height: 'auto',
                            borderRadius: '5px',
                            marginRight: '10px',
                          }}
                          src={image}
                          alt="HIHI"
                        />
                      ))}
                    </Stack.Item>
                  )}
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack>
        </Card>
      </Stack.Item>

      <Stack.Item>
        <Card>
          <Card.Section>
            <DisplayText size="small">Seo</DisplayText>
            <Stack>
              <Stack.Item fill>
                <FormControl
                  {...formData['metafields_global_title_tag']}
                  onChange={(value) => handleChange('metafields_global_title_tag', value)}
                />
              </Stack.Item>
              <Stack.Item fill>
                <FormControl
                  {...formData['metafields_global_description_tag']}
                  onChange={(value) => handleChange('metafields_global_description_tag', value)}
                />
              </Stack.Item>
            </Stack>
          </Card.Section>
        </Card>
      </Stack.Item>

      <Stack.Item>
        <Card>
          <Card.Section>
            <Stack vertical>
              <DisplayText size="small">Options</DisplayText>
              <Checkbox
                label="This product has options, like size or color"
                checked={Boolean(formData['options'])} //empty
                onChange={() => {
                  // if (!formData['options']) {
                  //   //options ban dau laf null => falsy =>!falsy =>  truthy
                  //   setFormData((prevState) => ({
                  //     ...prevState,
                  //     options: initOptionFormData,
                  //   }))
                  // }
                  let _formData = JSON.parse(JSON.stringify(formData))
                  Array.from(['images']).forEach((key) => (_formData[key] = formData[key]))
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
                    // let _formData = JSON.parse(JSON.stringify(formData))
                    // _formData['options'][index] = value
                    // // check has empty option> khúc này kiểm tra nếu _formData['options'] mà không có giá trị thì lấy giá trị mặc định bên trên cho nó
                    // if (!_formData['options'].filter((item) => item['name'].value === '').length) {
                    //   _formData['options'].push({ ...optionFormData })
                    // }
                    // setFormData((prevState) => ({
                    //   ...prevState,
                    //   options: initOptionFormData,
                    // }))

                    let _formData = JSON.parse(JSON.stringify(formData))
                    Array.from(['images']).forEach((key) => (_formData[key] = formData[key]))
                    _formData['options'][index] = value

                    // check has empty option
                    if (!_formData['options'].filter((item) => item['name'].value === '').length) {
                      _formData['options'].push({ ...optionFormData }) //nếu chưa có options nào thì đưa optionsFormData mặc định vào options trong _formData
                    }

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
