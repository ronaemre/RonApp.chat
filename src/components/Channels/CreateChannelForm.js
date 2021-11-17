import React, { useEffect } from 'react'
import { Modal, Form, Button } from "semantic-ui-react"
import { useForm } from "react-hook-form"
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from "react-redux"


const CreateChannelForm = ({ open, onOpen, onClose }) => {
    const firebase = useFirebase();
    const profile = useSelector((state) => state.firebase.profile);
    const { register, errors, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register({ name: "name" }, { required: true });
        register({ name: "description" }, { required: true, minLength: 10 });
    }, []);

    const onSubmit = ({ name, description }) => {
        firebase.push("channels", {
            name,
            description,
            createdBy: {
                name: profile.name,
                avatar: profile.avatar,
            },
        });

        onClose();
    };


    return (
        <Modal open={open} onOpen={onOpen} onClose={onClose}>
            <Modal.Header>Yeni Kanal Oluştur</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Input
                        fluid
                        icon="hashtag"
                        iconPosition="left"
                        name="name"
                        placeholder="#Genel"
                        onChange={(e, { name, value }) => {
                            setValue(name, value);
                        }}
                        error={errors.name ? true : false}
                    />
                    <Form.Input
                        fluid
                        icon="hashtag"
                        iconPosition="left"
                        name="description"
                        placeholder="#Genel her türlü konunun koşulacağı kanal"
                        onChange={(e, { name, value }) => {
                            setValue(name, value);
                        }}
                        error={errors.description ? true : false}
                    />
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button color="black" onClick={() => onClose()} >
                    Vazgeç
                </Button>

                <Button icon="checkmark" content="Oluştur" positive onClick={() => handleSubmit(onSubmit)()} />

            </Modal.Actions>

        </Modal>
    );
};

export default CreateChannelForm
