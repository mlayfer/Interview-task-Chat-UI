//This is your top level React component, you may change everything

import React from 'react'
import logo from '../assets/spotim-logo.jpg'
import {Container, Image} from 'semantic-ui-react'
import styled from 'styled-components';
import "../index.scss";

const Logo = styled.div`
      img{
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;      
      }
`;


class App extends React.PureComponent {
  render() {
    return <Container className={'spotim-chat'}>

              <div className={'spotim-header'}>
                <div className={'spotim-title'}>
                  Welcome to the Spot.IM Chat app <span id={'spotim-title-name'}></span>
                </div>
                <div>Enter your Name: <input type={"text"} id={"usernameInput"}/><input type={"button"} value={"Save"} id={"changeNameBtn"}/></div>
                <div>
                  <Logo>
                    <Image size={'tiny'} src={logo}/>
                  </Logo>
                </div>
              </div>

              <div className={'chat-message-list-area'} id={'messagesArea'}>
              </div>

              <div className={'chat-footer'}>
                <div className={'input-group chat-message-box'}>
                    <textarea name="" className="form-control type_msg" placeholder="Type your message..." id={"msgInput"} disabled={true}></textarea>
                    <div className="input-group-append">
                      <span className="input-group-text send_btn" id={"addMessageBtn"}><i className="fas fa-location-arrow"></i></span>
                  </div>
                </div>
              </div>

          </Container>
  }
}

export default App;
