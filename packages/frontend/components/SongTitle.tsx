import React from 'react'
import { Field, Form, Formik } from 'formik'
import { FormControl, Input } from '@chakra-ui/react'
import { css } from '@emotion/react'

interface Props {
  setTitle: (v) => void
}

const SongTitleInput = (props: Props) => {
  const { setTitle } = props
  const handleSubmit = (values, actions) => {
    console.log('Submitted title')
    console.log(values.title)
    setTitle(values.title)
  }

  return (
    <Formik initialValues={{ title: 'Title' }} onSubmit={handleSubmit}>
      {(props) => (
        <Form
          onFocus={(e) => {
            props.setFieldValue('title', '')
          }}
          autoComplete="off"
          style={{
            // border: '2px solid orange',
            // padding: '10px',
            borderRadius: '5px',
            display: 'flex',

            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
            // opacity: '40%',
            marginRight: '100px',
            marginLeft: '100px',
          }}
        >
          <Field name="title">
            {({ field, form }) => {
              return (
                <FormControl
                  //   borderBottomColor={'orange'}
                  css={css`
                    *:focus {
                      border: 0px;
                      outline: none;
                      box-shadow: none !important;
                    }
                  `}
                  style={{
                    // border: '2px solid green',
                    padding: '10px',
                    margin: '10px',
                    height: '100px',
                  }}
                >
                  <Input
                    {...field}
                    onChange={(e) => {
                      props.setFieldValue('title', e.target.value)
                    }}
                    id="title"
                    placeholder="Title"
                    placeholderColor="black"
                    textAlign="center"
                    fontSize="5xl"
                    fontFamily="Raleway, sans-serif"
                    fontWeight="600"
                    color={'#66656D'}
                    padding="10px"
                    height={'75px'}
                  />
                </FormControl>
              )
            }}
          </Field>
        </Form>
      )}
    </Formik>
  )
}

export default SongTitleInput
