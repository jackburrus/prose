import React from 'react'
import { Field, Form, Formik } from 'formik'
import { FormControl, Input } from '@chakra-ui/react'

interface Props {}

const SongTitleInput = (props: Props) => {
  const handleSubmit = () => {
    console.log('Submitted title')
  }
  return (
    <Formik
      initialValues={{ title: 'Enter Title Here' }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form
          style={{
            // border: '2px solid orange',
            // padding: '10px',
            borderRadius: '5px',
            display: 'flex',

            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
            opacity: '40%',
            marginRight: '100px',
            marginLeft: '100px',
          }}
        >
          <Field name="title">
            {({ field, form }) => {
              return (
                <FormControl
                  style={{
                    border: '2px solid red',
                    padding: '10px',
                    margin: '10px',
                    height: '100px',
                  }}
                >
                  <Input
                    {...field}
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
