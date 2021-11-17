import React from 'react'
import { Grid } from 'semantic-ui-react'
import SidePanel from './components/SidePanel/SidePanel'
import ChatPanel from './components/ChatPanel/ChatPanel';
import { useSelector } from 'react-redux'


function App() {
  const currentChannel = useSelector((state) => state.channels.currentChannel)
  return (
    <Grid columns="2" style={{ background: "#eee", height: "110vh" }}>
      <Grid.Column width="3">
        {/* Sidebar */}
        <SidePanel />
      </Grid.Column>

      <Grid.Column width="13" style={{ background: "#fff" }}>
        {currentChannel && <ChatPanel currentChannel={currentChannel} />}
      </Grid.Column>

    </Grid>
  );
}

export default App;
