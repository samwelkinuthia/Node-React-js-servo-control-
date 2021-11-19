import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Modal, Container, Row} from 'react-boostrap';
import {Button, Modal, ModalBody, ModalFooter, ModalTitle} from 'react-bootstrap';
import ModalHeader from "react-bootstrap/ModalHeader";
import DateTimePicker from "react-datetime-picker";
export default class Feeder extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.handleShowFeed = this.handleShowFeed.bind(this);
    this.handleCloseFeed = this.handleCloseFeed.bind(this);
    this.handleShowSchedule = this.handleShowSchedule.bind(this);
    this.handleCloseSchedule = this.handleCloseSchedule.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      feedback: "",
      time: "",
      isShowingFeed: false,
      isShowingSchedule: false,
      date: new Date(),
    };
  }

  handleShowFeed = () => {
    //start of current time 'obtainer'. very optional.
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let currentTime = hours + ':' + minutes + ' ' + ampm;
    //end
    axios.get('http:Your raspberry pi IP address:5000/feed').then(response => this.setState({
      feedback: response.data,
      isShowingFeed: true,
      time: currentTime
    }));
  }

  handleCloseFeed = () => {
    this.setState({
      isShowingFeed: false
    })
  }
  handleShowSchedule = () => {
    this.setState({
      isShowingSchedule: true
    })
  }
  handleCloseSchedule = () => {
    this.setState({
      isShowingSchedule: false
    })
  }
  changeDate = date => {
    this.setState({
      date
    })
  }

  setSchedule = () => {
    axios.post('http://Your raspberry pi IP address:5000/schedule', {time: this.state.date}).then (
      response => {
        this.handleCloseSchedule();
        this.setState({
          feedback: response.data,
          isShowingFeed:true
        })
      }
    )
  }

  render() {
    return (
      <div>
        <br/><br/>
      <button onClick={this.handleShowFeed}>Feed</button>
        <br/><br/>
      <button onClick={this.handleShowSchedule}>Schedule</button>
        <div>
          <Modal show={this.state.isShowingFeed} onHide={this.handleCloseFeed}>
            <ModalHeader closeButton>
              <ModalTitle>
                Congratulations
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              {this.state.feedback + " at " + this.state.time}
            </ModalBody>
            <ModalFooter>
              <Button variant={"secondary"} onClick={this.handleCloseFeed}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <Modal show={this.state.isShowingSchedule} onHide={this.handleCloseSchedule}>
          <ModalHeader closeButton>
            <ModalTitle>Schedule feeding time</ModalTitle>
          </ModalHeader>
            <ModalBody>
              <DateTimePicker onChange={this.changeDate} value={this.state.date}>
              </DateTimePicker>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleCloseSchedule}>Close</Button>
              <Button onClick={this.setSchedule}>Save</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
