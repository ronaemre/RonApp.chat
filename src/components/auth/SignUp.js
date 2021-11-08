import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Segment, Button, Grid, Message } from 'semantic-ui-react'
import styles from "./signUp.module.css"


const SignUp = () => {
    const handleSubmit = event => {  //bir formu submit ettiğimiz zaman yapacağı ilk şey sayfasyı yenilemek olduğundan bunu engellemek için bunu kullanıyoruz.
        event.preventDefault();
    }

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
                    onSubmit={handleSubmit}
                >
                    <Segment>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            name="username"
                            placeholder="Kullanıcı Adı"
                            type="text"
                        />
                        <Form.Input
                            fluid
                            icon="mail"
                            iconPosition="left"
                            name="email"
                            placeholder="Email Adresi"
                            type="email"
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            placeholder="Şifre"
                            type="password"
                        />
                        <Button
                            color="green"
                            size="large"
                        >
                            Kayıt Ol
                        </Button>
                    </Segment>
                </Form>
                <Message >
                    Zaten bir hesabın var mı? <Link to="/login">Giriş Yap</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default SignUp
