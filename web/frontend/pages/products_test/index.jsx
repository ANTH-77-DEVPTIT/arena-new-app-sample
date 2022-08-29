import { Card, Pagination, Stack } from '@shopify/polaris'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import Table from './Table'
import ConfirmDelete from './ConfirmDelete'
import CreateForm from './CreateForm'
import ProductApi from '../../apis/product_test'
import ProductImageApi from '../../apis/product_test_images'
import { generateVariantsFromOptions } from './actions.js'

function ProductsPage(props) {
  const { actions, location, navigate } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState(null)
  const [count, setCount] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)

  const getProducts = async (query) => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.find(query)
      if (!res.success) {
        throw res.error
      }

      setProducts(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getProducts(location.search)
  }, [location.search])

  const getProductsCount = async () => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.count()
      if (!res.success) {
        throw res.error
      }

      setCount(res.data.count)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getProductsCount()
  }, [])

  const handleSubmit = async (formData) => {
    try {
      actions.showAppLoading()

      let data = {
        title: formData.title.value,
        body_html: formData.body_html.value,
        status: formData.status.value,
        tags: formData.tags.value,
        product_type: formData.product_type.value,
        metafields_global_title_tag: formData.metafields_global_title_tag.value,
        metafields_global_description_tag: formData.metafields_global_description_tag.value,
      }

      //handleUploadImage when create/update product
      if (formData['images'].value.length) {
        let imagesBase64 = await ProductImageApi.create(formData['images'].value)
        if (!imagesBase64.success) {
          actions.showNotify({ error: true, message: imagesBase64.error.message })
        }
        formData['images'].value = [...imagesBase64.data, ...formData['images'].originValue]
      } else if (formData['images'].originValue.length) {
        formData['images'].value = formData['images'].originValue
      }
      if (formData['images'].value.length) {
        data.images = formData['images'].value
      } else {
        data.images = []
      }

      //handle create imageURL
      if (formData['imagesURL'].valueUpload) {
        data.images = [...data.images, ...formData['imagesURL'].valueUpload]
      }
      if (formData['imagesURL'].value) {
        data.images = [...data.images, { src: formData['imagesURL'].value }]
      }

      //handle options for products
      let options = [...formData['options']]
      options = options
        .filter((item) => item.name.value && item.values.value)
        .map((item) => ({
          name: item.name.value,
          values: item['values'].value.split(',').filter((item) => item),
        }))

      if (options.length) {
        data.options = options
        data.variants = generateVariantsFromOptions(options)
      }

      let res = null

      if (created?.id) {
        //update
        res = await ProductApi.update(created.id, data)
      } else {
        //create
        res = await ProductApi.create(data)
      }

      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: created?.id ? 'Saved' : 'Created' })

      setCreated(null)
      getProducts(location.search)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleDelete = async () => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.delete(deleted.id)
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: 'Deleted' })

      getProducts(location.search)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (created) {
    return (
      <CreateForm
        {...props}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={(formData) => handleSubmit(formData)}
      />
    )
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        {...props}
        title="Products Page"
        primaryActions={[
          {
            label: 'Add product',
            primary: true,
            onClick: () => setCreated({}),
          },
        ]}
        onBack={() => navigate('/')}
      />

      <Card>
        <Card.Section>
          <div>Total items: {count || 'loading...'}</div>
        </Card.Section>
        <Table
          {...props}
          items={products?.products}
          onEdit={(item) => setCreated(item)}
          onDelete={(item) => setDeleted(item)}
        />
        {products?.products?.length > 0 && (
          <Card.Section>
            <Stack distribution="center">
              <Stack.Item>
                <Pagination
                  hasPrevious={products.pageInfo.hasPrevious}
                  onPrevious={() =>
                    setSearchParams({ pageInfo: products.pageInfo.previousPageInfo })
                  }
                  hasNext={products.pageInfo.hasNext}
                  onNext={() => setSearchParams({ pageInfo: products.pageInfo.nextPageInfo })}
                />
              </Stack.Item>
            </Stack>
          </Card.Section>
        )}
      </Card>

      {deleted && (
        <ConfirmDelete
          onDiscard={() => setDeleted(null)}
          onSubmit={() => {
            handleDelete(deleted)
            setDeleted(null)
          }}
        />
      )}
    </Stack>
  )
}

export default ProductsPage
