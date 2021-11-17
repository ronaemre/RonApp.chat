import React, { useState, useRef, useEffect } from 'react'
import { Segment, Header, Icon, Comment, Form, Input, Button, Search } from "semantic-ui-react"
import { isEmpty, isLoaded, useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import Message from '../ChatPanel/Message'

//2.44
const ChatPanel = ({ currentChannel }) => {
    useFirebaseConnect([
        {
            path: `/messages/${currentChannel.key}`,
            storeAs: "channelMessages"
        }
    ])
    const firebase = useFirebase();
    const profile = useSelector(state => state.firebase.profile)
    const currentUserUid = useSelector(state => state.firebase.auth.uid)
    const channelMessages = useSelector(state => state.firebase.ordered.channelMessages)
    const [searchTerm, setSearhTerm] = useState("");
    /*   const currentChannel = useSelector((state) => state.channels.currentChannel) */
    const [content, setContent] = useState("")

    const fileInputRef = useRef(null);



    const handleRefClick = () => {
        fileInputRef.current.click()
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (content !== "") {
            const message = {
                content,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    id: currentUserUid,
                    name: profile.name,
                    avatar: profile.avatar
                }
            }
            firebase.push(`messages/${currentChannel.key}`, message).then(() => {
                setContent("")
            })
        }
    }

    return (
        <>
            {/* Message Header */}
            <Segment clearing>
                <Header as="h3" floated="left">
                    <span>
                        <Icon name="hashtag" />
                        {currentChannel?.name}
                    </span>
                </Header>
                {/*Search Messages */}
                <Header as="h3" floated="right">
                    <Input
                        size="mini"
                        icon="search"
                        name="searchTerm"
                        placeholder="Mesajlarda ara..."
                        value={searchTerm}
                        onChange={event => setSearhTerm(event.target.value)}
                    />
                </Header>
            </Segment>
            {/* Messages */}

            <Segment style={{ position: "fixed", top: 55, bottom: 70, width: "81%" }}>
                <Comment.Group
                    style={{
                        height: "80vh",
                        overflowY: "auto",
                        maxWidth: "100%"
                    }}
                >
                    {channelMessages && channelMessages.map(({ key, value }) => (
                        <Message key={key} message={value} />
                    ))}
                </Comment.Group>
            </Segment>
            {/* send new message */}
            <Segment
                style={{
                    position: "fixed",
                    bottom: 0,
                    width: "85%",
                    display: "flex"
                }}
            >
                <Button icon onClick={handleRefClick}>
                    <Icon name="add" />
                    <Input type="file" name="file" ref={fileInputRef} />
                </Button>

                <Form onSubmit={handleSubmit} style={{ flex: "1" }} >
                    <Input
                        fluid
                        name="message"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        labelPosition="left"
                        placeholder={`#${currentChannel?.name} kanalına mesaj gönder`} />
                </Form>
            </Segment>
        </>
    )
}

export default ChatPanel
