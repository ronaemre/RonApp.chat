import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import { Form, Segment, Button, Grid, Message } from 'semantic-ui-react'
import styles from "./login.module.css"
import { useForm } from "react-hook-form";


const Login = () => {
    const firebase = useFirebase();
    const { register, errors, handleSubmit, setValue } = useForm();

    const [fbErrors, setFbErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        register({ name: "email" }, { required: true });
        register({ name: "password" }, { required: true, minLength: 6 });

    }, []);


    const onSubmit = ({ email, password }, e) => {
        setSubmitting(true);
        setFbErrors([]);

        firebase.login({
            email, password
        })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                setFbErrors([{ message: error.message }])
            })
            .finally(() => {
                setSubmitting(false);
            })
    }

    const displayErrors = () =>
        fbErrors.map((error, index) => <p key={index}>{error.message}</p>);


    return (
        <Grid
            textAlign="left"
            verticalAlign="middle"
            className={styles.container}
            style={{ paddingLeft: 300 }}
        >
            <Grid.Column style={{ maxWidth: 450 }} >
                <h1 className={styles.formHeader} >
                    RonApp
                    <span>.chat</span>
                </h1>


                <Form
                    size="large"
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Segment>
                        <Form.Input
                            fluid
                            icon="mail"
                            iconPosition="left"
                            onChange={(event, { name, value }) => {
                                setValue(name, value);
                            }}
                            name="email"
                            placeholder="Email Adresi"
                            type="email"
                            error={errors.email ? true : false}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            onChange={(event, { name, value }) => {
                                setValue(name, value);
                            }}
                            name="password"
                            placeholder="Şifre"
                            type="password"
                            error={errors.password ? true : false}
                        />
                        <Button
                            color="green"
                            size="large"
                            disabled={submitting}
                        >
                            Giriş Yap
                        </Button>
                    </Segment>
                </Form>
                {fbErrors.length > 0 && <Message error> {displayErrors()}</Message>}
                <Message >
                    Üye değil misin? <Link to="/signUp">Üye ol</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login
