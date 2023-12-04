

import {Button, Card, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import { Field, Form, Formik,  FieldArray  } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { object, string, number, boolean, array } from 'yup';
const emptyDonation = {institution: '', percentage: 0,};


export const App = () => {
    return (
        <div>
            <h1>Home</h1>
            <Card>
                <CardContent>
                    <Formik
                        initialValues={{
                            fullName: '',
                            donationsAmount: 0,
                            termsAndConditions: false,
                            donations: [emptyDonation],}}
                        validationSchema={object({
                            fullName: string().required('Required').min(2).max(10),
                            donationsAmount: number().required('Required').min(10),
                            termsAndConditions: boolean().required('Required').isTrue('Terms must be accepted.'),
                            donations: array(object({
                                institution: string()
                                    .required('Institution name is required')
                                    .min(3, 'Institution name must be ta least 3 chars.')
                                    .max(10, 'Institution name cannot be more than 10 chars'),
                                percentage: number()
                                    .required('Percentage is required')
                                    .min(1, 'Percentage must be at least 1')
                                    .max(100, 'Percentage cannot be more than 100')
                            }))
                                .min(1)
                                .max(3)

                        })}
                        onSubmit={async(values) => {
                        console.log('my values', values);
                        return new Promise(res => setTimeout(res, 2000))
                    }}>

                        {({values, errors, isSubmitting}) => (
                            <Form autoComplete="off">
                                <Grid container
                                      direction="column"
                                      spacing={2}  >
                                    <Grid item>
                                        <Field
                                               fullWidth
                                               name='fullName'
                                               type="text"
                                               component={TextField}
                                               label='Full Name'
                                            />
                                    </Grid>

                                    <Grid item>
                                        <Field
                                               fullWidth
                                               name='donationsAmount'
                                               type="number"
                                               component={TextField}
                                               label="Donations ($)"
                                        />
                                    </Grid>

                                  <FieldArray name="donations">
                                      {({ push, remove })=> (
                                          <>
                                              <Grid item>
                                                 <Typography variant="body2">
                                                     All your donations
                                                 </Typography>
                                              </Grid>

                                              {values.donations.map((_, index) => (
                                                  <Grid key={index + 'key'} container item  spacing={2}>

                                                    <Grid item xs={12} sm="auto" style={{flexGrow: 1}}>
                                                        <Field
                                                            name={`donations[${index}].institution`}
                                                            component={TextField}
                                                            label="Institution"
                                                        />
                                                    </Grid>

                                                      <Grid item xs={12} sm="auto" style={{flexGrow: 1}}>
                                                          <Field
                                                              name={`donations[${index}].percentage`}
                                                              component={TextField}
                                                              label="Percentage"
                                                              type="number"
                                                          />
                                                      </Grid>

                                                      <Grid item>
                                                         <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => remove(index)}>Delete</Button>
                                                      </Grid>

                                                  </Grid>
                                                  ))
                                              }


                                              <Grid item>
                                                  <Button
                                                      variant="contained"
                                                      onClick={() => push(emptyDonation)}>Add donation</Button>
                                              </Grid>
                                          </>
                                      )}
                                  </FieldArray>

                                    <Grid item>
                                        <Field
                                              fullWidth
                                               name='termsAndConditions'
                                               type="checkbox"
                                               component={CheckboxWithLabel}
                                               Label={{
                                                   label: 'Accept terms and conditions',
                                                  style : { color: errors.termsAndConditions ? errors : 'undefined'}
                                            }}
                                        />
                                    </Grid>

                                    <Grid item>
                                     <Button disabled={isSubmitting}
                                             type="submit"
                                             variant="contained"
                                             color="primary"
                                             startIcon={isSubmitting ? <CircularProgress size="0.9rem"/> : null}
                                                >
                                         {isSubmitting ? 'Submitting' : 'Submit'}
                                     </Button>
                                    </Grid>

                                </Grid>

                            <pre> {JSON.stringify({values, errors}, null, 4)}</pre>
                            </Form>
                        )}

                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}