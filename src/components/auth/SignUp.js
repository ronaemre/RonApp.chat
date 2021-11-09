import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import { Form, Segment, Button, Grid, Message } from 'semantic-ui-react'
import styles from "./signUp.module.css"
import { useForm } from "react-hook-form";


const SignUp = () => {
    const firebase = useFirebase();
    const { register, errors, handleSubmit, setValue } = useForm();

    const [fbErrors, setFbErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        register({ name: "username" }, { required: true });
        register({ name: "email" }, { required: true });
        register({ name: "password" }, { required: true, minLength: 6 });

    }, []);

    const onSubmit = ({ username, email, password }, e) => {
        setSubmitting(true);
        setFbErrors([]);

        const [first, last] = username.split(" ");

        firebase
            .createUser(
                {
                    email,
                    password,
                },
                {
                    name: username,
                    avatar: `https://ui-avatars.com/api/?name=${first}+${last}&background=random&color=fff`,
                }
            )
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                setFbErrors([{ message: error.message }]);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

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
                            icon="user"
                            iconPosition="left"
                            onChange={(event, { name, value }) => {
                                setValue(name, value);
                            }}
                            name="username"
                            placeholder="Kullanıcı Adı"
                            type="text"
                            error={errors.username ? true : false}
                        />
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
                            Kayıt Ol
                        </Button>
                    </Segment>
                </Form>
                {fbErrors.length > 0 && <Message error> {displayErrors()}</Message>}
                <Message >
                    Zaten bir hesabın var mı? <Link to="/login">Giriş Yap</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default SignUp
