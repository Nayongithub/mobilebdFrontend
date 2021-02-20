import React, { useState } from "react";
import { Button, FormGroup, Label, Input, Container, Form } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BaseUrl from "../../../BaseUrl/BaseUrl";
const AddUser = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
    status: false,
  });
  let history = useHistory();

  const { userName, password } = data;
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BaseUrl.base}/api/users`, data);

      setData({ userName: "", password: "" });
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Saved Successfully",
        showConfirmButton: true,
        timer: 2000,
      });
      // history.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={(e) => onSubmit(e)}>
          <FormGroup>
            <Label for="name">User Name</Label>
            <Input
              type="text"
              name="userName"
              id="name"
              placeholder="user name"
              value={userName}
              onChange={(e) => onInputChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>{" "}
            <Link className="ml-2" style={{ color: "#FDA66D" }} to="/">
              Back to home page
            </Link>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default AddUser;
