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
import { useRecoilState } from 'recoil'
import { Lyrics } from '../recoil/atoms/lyrics'
const LyricInput = (props) => {
  const { isSubmitting } = props
  const [localLyrics, setLocalLyrics] = useState([])
  const [activeLyrics, setActiveLyrics] = useRecoilState(Lyrics)

  function validateLyrics(value) {
    let error
    if (!value) {
      error = 'Some Lyrics are required'
      console.log(error)
    }
    return error
  }

  const handleSubmit = (values, actions) => {
    isSubmitting(true)
    setActiveLyrics((oldLyrics) => [...oldLyrics, values.lyric])
    actions.setFieldValue('lyric', '')
    // isSubmitting(false)

    // setTimeout(() => {
    //   isSubmitting(false)
    // }, 500)
  }

  return (
    <Formik
      initialValues={{ lyric: '' }}
      initial={{ color: 'grey' }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form
          // onSubmit={(d) => props.setFieldValue('lyric', '')}
          onFocus={(e) => {
            props.setFieldValue('lyric', '')
          }}
          autoComplete="off"
          style={{
            // border: '2px solid orange',
            borderRadius: '5px',
            display: 'flex',

            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(145, 218, 215, 0.4)',
            // opacity: 0.4,
            border: '1px solid #47c2bc99',
            marginRight: '100px',
            marginLeft: '100px',
            padding: '10px',
          }}
        >
          <Field
            // style={{ border: '3px solid red' }}
            name="lyric"
            // validate={validateLyrics}
          >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.lyric && form.touched.lyric}>
                {/* <FormLabel htmlFor="name">First name</FormLabel> */}
                <Input
                  //   bg="teal.300"
                  // opacity="40%"
                  flexGrow={2}
                  height="60px"
                  //   py="8"
                  {...field}
                  id="lyric"
                  placeholder=""
                  color={'#403f44'}
                  fontFamily="Raleway"
                  fontSize="3xl"
                  fontWeight="500"
                  css={css`
                    ::placeholder {
                      color: '#403f44';
                    }
                  `}
                  borderStyle={'none'}
                  focusBorderColor="none"
                  // borderColor="orange"
                  boxShadow={'none'}
                />

                {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
              </FormControl>
            )}
          </Field>
          {/* <Button
            mt={4}
            colorScheme="teal"
            // isLoading={props.isSubmitting}
            // onClick={() => handleSubmit(props.values, props)}
            type="submit"
            mb={'12px'}
            mr={'12px'}
          >
            Enter
          </Button> */}
        </Form>
      )}
    </Formik>
  )
}

export default LyricInput
