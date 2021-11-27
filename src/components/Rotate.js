import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Modal, Container, Row} from 'react-boostrap';
import {Button, Modal, ModalBody, ModalFooter, ModalTitle} from 'react-bootstrap';
import ModalHeader from "react-bootstrap/ModalHeader";
import DateTimePicker from "react-datetime-picker";
export default class Rotate extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.handleShowRotate = this.handleShowRotate.bind(this);
    this.handleCloseRotate = this.handleCloseRotate.bind(this);
    this.handleShowSchedule = this.handleShowSchedule.bind(this);
    this.handleCloseSchedule = this.handleCloseSchedule.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      feedback: "",
      time: "",
      isShowingRotate: false,
      isShowingSchedule: false,
      date: new Date(),
    };
  }

  handleShowRotate = () => {
    axios.get('http:Your raspberry pi IP address:5000/rotate').then(response => this.setState({
      feedback: response.data,
      isShowingRotate: true,
    }));
  }

  handleCloseRotate = () => {
    this.setState({
      isShowingRotate: false
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
          isShowingRotate:true
        })
      }
    )
  }

  render() {
    return (
      <div>
        <br/><br/>
      <button onClick={this.handleShowRotate}>Rotate</button>
        <br/><br/>
      <button onClick={this.handleShowSchedule}>Schedule</button>
        <div>
          <Modal show={this.state.isShowingRotate} onHide={this.handleCloseRotate}>
            <ModalHeader closeButton>
              <ModalTitle>
                Congratulations
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              {this.state.feedback + " at " + this.state.time}
            </ModalBody>
            <ModalFooter>
              <Button variant={"secondary"} onClick={this.handleCloseRotate}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <Modal show={this.state.isShowingSchedule} onHide={this.handleCloseSchedule}>
          <ModalHeader closeButton>
            <ModalTitle>Schedule Rotation</ModalTitle>
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
