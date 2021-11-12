import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'

const LyricInput = () => {
  const [localLyrics, setLocalLyrics] = useState([])

  function validateLyrics(value) {
    let error
    if (!value) {
      error = 'Some Lyrics are required'
      console.log(error)
    }
    return error
  }

  return (
    <Formik
      initialValues={{ name: 'Enter Lyrics Here' }}
      onSubmit={(values, actions) => {
        setLocalLyrics((oldLyrics) => [...oldLyrics, values.name])
      }}
    >
      {(props) => (
        <Form
          //   onSubmit={(d) => console.log(d)}
          style={{
            // border: '2px solid orange',
            borderRadius: '5px',
            display: 'flex',

            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'teal',
            opacity: '40%',
            marginRight: '100px',
            marginLeft: '100px',
          }}
        >
          <Field
            style={{ border: '3px solid red' }}
            name="name"
            validate={validateLyrics}
          >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                {/* <FormLabel htmlFor="name">First name</FormLabel> */}
                <Input
                  //   bg="teal.300"
                  opacity="40%"
                  flexGrow={2}
                  height="60px"
                  //   py="8"
                  {...field}
                  id="name"
                  placeholder="name"
                  border={'4px solid red'}
                  borderStyle={'none'}
                  focusBorderColor="none"
                  borderColor="orange"
                  boxShadow={'none'}
                />

                {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            // isLoading={props.isSubmitting}
            type="submit"
            mb={'12px'}
            mr={'12px'}
          >
            Enter
          </Button>
          {localLyrics.map((lyric, index) => (
            <p key={index}>{lyric}</p>
          ))}
        </Form>
      )}
    </Formik>
  )
}

export default LyricInput
