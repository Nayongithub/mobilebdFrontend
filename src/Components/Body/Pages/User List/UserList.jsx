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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import BaseUrl from "../../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import { LoggerFactory } from "ag-grid-community";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  //------------------------- Pagination-------------------------------
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const pagingItem = () => {
    // e.preventDefault();

    let total = users.length;
    console.log("total", total);

    let TotalPage = Math.ceil(total / 5);
    console.log("TotalPage", TotalPage);
    setTotalPage(TotalPage);

    let PageNumber = pageNumber;
    console.log("PageNumber", PageNumber);
  };

  const getAllUser = async () => {
    await axios
      .get(`${BaseUrl.base}/api/users/pn/${pageNumber}`)
      .then((res) => {
        setUsers(res.data);
        console.log("res.data",res.data.length);
      })
      .catch((err) => console.error(err));

  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
        axios
          .delete(`${BaseUrl.base}/api/users/${id}`)
          .catch((err) => console.error(err));
        let otherUsers = users.filter((res) => res.userID !== id);
        setUsers(otherUsers);
      }
    });
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchText !== "") {
      let searchResult = await axios.get(
        `${BaseUrl.base}/api/SearchPaginationOthers/srch/${searchText}/pn/${pageNumber}`
      );
      setUsers(searchResult.data);
      console.log("searchResult", searchResult.data);
      setSearchText("");
    } else {
      console.log("else");
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <>
      <Container>
        <button onClick={pagingItem}>Test</button>
        <h4 className="theme-title">Users List</h4>
        <InputGroup>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button color="secondary" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <br />
        <Table bordered hover>
          <thead>
            <tr>
              <th>SL. No</th>
              <th>User Name</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.userName}</td>
                <td>{item.password}</td>
                <td>{item.roleID}</td>
                <td>
                  <Link to={`/editUser/${item.userID}`}>
                    <FaRegEdit size="1.5em" color="DarkGray" />
                  </Link>{" "}
                  <Button
                    outline
                    color="danger"
                    onClick={() => {
                      handleDelete(item.userID);
                    }}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink first onClick={() => setPageNumber(1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            previous
            onClick={() => setPageNumber(pageNumber - 1)}
          />
        </PaginationItem>
        {new Array(totalPage).fill("").map((el, index) => (
          <PaginationItem
            class={`page-item ${index + 1 === pageNumber ? "active" : null}`}
          >
            <PaginationLink
              class="page-link"
              // href="!#"
              onClick={() => setPageNumber(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink next onClick={() => setPageNumber(pageNumber + 1)} />
        </PaginationItem>
        <PaginationItem onClick={() => setPageNumber(totalPage)}>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default UserList;
