import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Table,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import BaseUrl from "../../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt, FaSearch } from "react-icons/fa";

const ProductList = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        await axios
          .get(`${BaseUrl.base}/api/Products`)
          .then((res) => {
            setProducts(res.data);
            console.log("products",res.data);
          })
          .catch((err) => console.error(err));
      };
      useEffect(() => {
        getAllProducts();
      }, [])
    return (
        <>
            <Container>
      <h4 className="theme-title">Products List</h4>
        <InputGroup>
          <Input />
          <InputGroupAddon addonType="append">
            <Button color="secondary">
              <FaSearch />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <br />
        <Table bordered hover>
          <thead>
            <tr>
              <th>SL. No</th>
              <th>Product Name</th>
              <th>Condition</th>
              <th>Price</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.condition}</td>
                <td>{item.price}</td>
                <td><img src={item.preview}/></td>
                <td>
                  <Link to={`/editUser/${item.userID}`}>
                    <FaRegEdit size="1.5em" color="DarkGray" />
                  </Link>{" "}
                  <Button
                    outline
                    color="danger"
                    // onClick={() => {
                    //   handleDelete(item.userID);
                    // }}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
        </>
    )
}

export default ProductList
