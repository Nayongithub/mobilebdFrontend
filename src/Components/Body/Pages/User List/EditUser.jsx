import React, { useState, useEffect } from "react";
import { Button, FormGroup, Label, Input, Container, Form } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BaseUrl from "../../../BaseUrl/BaseUrl";

const EditUser = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
    status: false,
  });
  const { userName, password } = data;
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let history = useHistory();
  let { id } = useParams();

  const loadUser = async () => {
    const result = await axios.get(`${BaseUrl.base}/api/users/${id}`);
    setData(result.data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let url = `${BaseUrl.base}/api/users/${id}`;
    console.log("url", url);
    try {
      await axios.put(`${BaseUrl.base}/api/users/${id}`, data);
      setData({ userName: "", password: "" });
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Update Successfully",
        showConfirmButton: true,
        timer: 2000,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <Container>
        <Form onSubmit={(e) => handleUpdate(e)}>
          <FormGroup>
            <Label for="userName">User Name</Label>
            <Input
              type="text"
              name="userName"
              id="userName"
              value={userName}
              onChange={(e) => onInputChange(e)}
              placeholder="user name"
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => onInputChange(e)}
              placeholder="password"
            />
          </FormGroup>
          <FormGroup>
            <Button color="success" type="submit">
              Update
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

export default EditUser;
