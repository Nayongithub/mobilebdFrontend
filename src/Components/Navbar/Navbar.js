import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  ButtonToggle,
  Row,
  Col,
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../../src/custom.css";
import Home from "../Body/Pages/Home/Home";
import Contact from "../Body/Pages/Contact/Contact";
import Store from "../Body/Pages/Store/Store";
import ProductList from "../Body/Pages/Product/ProductList";
import AddProduct from "../Body/Pages/Product/AddProduct";
import CustomerForm from "../Body/Pages/Forms/CustomerForm";
import CustomerList from "../Body/Pages/Customer List/CustomerList";
import UserList from "../Body/Pages/User List/UserList";
import LoginForm from "../Body/Pages/Forms/LoginForm";
import AddUser from "../Body/Pages/User List/AddUser";
import EditUser from "../Body/Pages/User List/EditUser";
import Location from "../Sidebar/Location";
import NotFound from "../Body/Pages/NotFound";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Router>
        <div>
          <Navbar className="theme-bg" light expand="md">
            <Container>
              <NavbarBrand>
                <Link className="nav-link" style={{ color: "#FDA66D" }} to="/">
                  Mobile BD
                </Link>
              </NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink>
                      <Link
                        className="nav-link"
                        style={{ color: "white" }}
                        to="/"
                      >
                        Home
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>
                      <Link
                        className="nav-link"
                        style={{ color: "white" }}
                        to="/contact"
                      >
                        Contact
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>
                      <Link
                        className="nav-link"
                        style={{ color: "white" }}
                        to="/store"
                      >
                        Stores
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>
                      <Link
                        className="nav-link"
                        style={{ color: "white" }}
                        to="/productList"
                      >
                        Product List
                      </Link>
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle
                      nav
                      caret
                      style={{ color: "white", marginTop: 7 }}
                    >
                      Dashborad
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link
                          className="nav-link"
                          style={{ color: "#001131" }}
                          to="/customerForm"
                        >
                          Customer Form
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          className="nav-link"
                          style={{ color: "#001131" }}
                          to="/customerList"
                        >
                          Customer List
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          className="nav-link"
                          style={{ color: "#001131" }}
                          to="/userList"
                        >
                          User List
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink>
                      <Link
                        className="nav-link"
                        style={{ color: "white" }}
                        to="/loginForm"
                      >
                        Login
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>
                      <Link
                        className="nav-link"
                        style={{ color: "white" }}
                        to="/addUser"
                      >
                        SignUp
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                  <Link to="/addProduct">
                    <ButtonToggle
                      color="success"
                      style={{ marginTop: 7 }}
                      
                    >
                       Post Your Add
                     
                    </ButtonToggle></Link>{" "}
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <br />
          <Container>
            <Row>
              <Col md="3">
                <Location />
              </Col>
              <Col md="9">
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/contact">
                    <Contact />
                  </Route>
                  <Route path="/store">
                    <Store />
                  </Route>
                  <Route path="/productList">
                    <ProductList />
                  </Route>
                  <Route path="/addProduct">
                    <AddProduct />
                  </Route>
                  <Route path="/customerForm">
                    <CustomerForm />
                  </Route>
                  <Route path="/customerList">
                    <CustomerList />
                  </Route>

                  <Route path="/userList">
                    <UserList />
                  </Route>
                  <Route path="/loginForm">
                    <LoginForm />
                  </Route>
                  <Route path="/addUser">
                    <AddUser />
                  </Route>
                  <Route path="/editUser/:id">
                    <EditUser />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    </>
  );
};

export default Example;
