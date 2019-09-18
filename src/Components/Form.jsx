import React from "react";

import { LocalForm, Control, Errors } from "react-redux-form";
import { Container, Row, FormGroup, Label, Spinner, Alert } from "reactstrap";

const requiredValidator = val => val && val.length;



class Form extends React.Component {
    constructor(params) {
      super(params);
  
      this.state = {
        isLoading: false,
        errMess: null
      };
    }
  
    //   handleChange(values) {
    //     //console.log("CHANGE", values);
    //   }
    //   handleUpdate(form) {
    //     //console.log("UPDATE", form);
    //   }
    handleSubmit = async values => {
       this.setState({
        isLoading: true
      });
   
      try {
        var response = await fetch(
          "http://localhost:3000/participants",
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (response.ok) {
          //reset the form
          this.setState({
            errMess: null,
            isLoading: false
          });
        } else {
          var error = await response.json();
          this.setState({
            errMess: error.message,
            isLoading: false
          });
        }
      } catch (ex) {
        console.log(ex);
        this.setState({
          errMess: ex.message,
          isLoading: false
        });
      }
    };

    render() {
      if (!this.state.errMess) {
        this.state.errMess = true;
      }
      if (!this.state.errMess.length) {
        this.state.errMess = true;
      } else {
        return (
          <Alert color="danger">
            {" "}
            We encountered a problem while processing your request:{" "}
            {this.state.errMess}
          </Alert>
        );
      }
  
      return (
        <Container>
          <h3>Send details</h3>
          <LocalForm
          
            onSubmit={values => this.handleSubmit(values)}
          >
            <Row>
              <FormGroup className="col-md-6">
                <Label for="name">Name</Label>
  
                <Control.text
                  id="name"
                  model=".name"
                  className="form-control"
                  placeholder="Your name"
                  validators={{
                    requiredValidator
                  }}
                />
  
                <Errors
                  model=".name"
                  show="touched"
                  className="form-error-message"
                  messages={{
                    requiredValidator: "The name field is required",
                  }}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="surname">Surname</Label>
                <Control.text
                  id="surname"
                  model=".surname"
                  className="form-control"
                  placeholder="Your surname"
                  validators={{
                    requiredValidator
                  }}
                />
  
                <Errors
                  model=".surname"
                  show="touched"
                  className="form-error-message"
                  messages={{
                    requiredValidator: "The surname field is required",
                  }}
                />
              </FormGroup>
            </Row>
  
            <Row>
            <FormGroup className="col-md-6">
                <Label for="email">Email</Label>
                <Control.text
                  id="email"
                  model=".email"
                  className="form-control"
                  placeholder="Your email"
                  validators={{
                    requiredValidator
                  }}
                />
  
                <Errors
                  model=".email"
                  show="touched"
                  className="form-error-message"
                  messages={{
                    requiredValidator: "your email is required",
                  }}
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup className="col-md-6">
                <Label for="time">Time</Label>
                <Control.text
                  id="time"
                  className="form-control"
                  placeholder="time of arrival"
                  model=".time"
                  validators={{
                    requiredValidator
                  }}
                />
                <Errors
                  model=".time"
                  show="touched"
                  className="form-error-message"
                  messages={{
                    requiredValidator: "The date time is required"
                  }}
                />
              </FormGroup>
            </Row>
  
            <Control.button
              className="btn btn-secondary"
              model="local"
              disabled={{ valid: false }}
            >
              Submit!
            </Control.button>
          </LocalForm>
          {this.state.isLoading && (
            <div className="container d-flex justify-content-center my-5">
              Sending your details, please wait
              <div>
                <Spinner color="success" />
              </div>
            </div>
          )}
        </Container>
      );
    }
  }
  
  export default Form;