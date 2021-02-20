import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  FormText,
  Media,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BaseUrl from "../../../BaseUrl/BaseUrl";
import Moment from "react-moment";
import moment from "moment";
// import {Noimg} from '../../../../../public/Images/No-img.png'
const productCondition = [
  { lable: "New", value: 1 },
  { lable: "Used", value: 2 },
];

const defaultImg = "/Images/No-img.png";

const AddProduct = () => {
  const [location, setLocation] = useState([]);
  const [brand, setBrand] = useState([]);

  const [postingPurpose, setPostingPurpose] = useState("");
  const [postdate, setpostDate] = useState(new Date());
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [condition, setCondition] = useState(1);
  const [locationVal, setLocationVal] = useState(1);
  const [brandVal, setBrandVal] = useState(1);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [imgPreview, setImgPreview] = useState(null);
  const [image1File, setImage1File] = useState(null);
  const [image1Name, setImage1Name] = useState("");
  const [error, setError] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(defaultImg);

  //------------------------------dropdown API-------------------------------
  const getAllLocation = async () => {
    await axios
      .get(`${BaseUrl.base}/api/OurLocations`)
      .then((res) => {
        setLocation(res.data);
        console.log("data", res.data);
      })
      .catch((err) => console.error(err));
  };

  const getAllBrand = async () => {
    let productBrand = await axios.get(`${BaseUrl.base}/api/ProductBrand`);
    setBrand(productBrand.data);
    console.log("Brands", productBrand.data);
  };
  //--------------------------------------------------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    let date = moment(postdate).format("YYYY-MM-DD HH:mm:ss");
    const formdata = new FormData();
    formdata.append("name", fullname);
    formdata.append("gender", gender);
    formdata.append("number", number);
    formdata.append("email", email);
    formdata.append("productName", productName);
    formdata.append("condition", condition);
    formdata.append("postingPurpose", postingPurpose);
    formdata.append("price", price);
    formdata.append("address", address);
    formdata.append("postDate", date);
    formdata.append("description", description);
    formdata.append("imageFile", imageFile);
    formdata.append("productBrandID", brandVal);
    formdata.append("ourLocationID", locationVal);

    console.log("data", formdata);
    try {
      await axios.post(`${BaseUrl.base}/api/Products`, formdata);

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
  // const handleImageChange = (e) => {

  //   const selected = e.target.files[0];
  //   console.log("selected",selected);
  //   console.log("selecteddata",selected.name);
  //   setImage1Name(selected.name)
  //   const allowTypes = ["image/png", "image/jpg", "image/jpeg"];
  //   if (selected && allowTypes.includes(selected.type)) {
  //     console.log("Selected");
  //     let reader = new FileReader();
  //     reader.onloadend = () => {
  //       // setImage1File(reader.result);
  //       setImage1File(selected);
  //       console.log("reader.result",reader.result);
  //     };
  //     reader.readAsDataURL(selected);
  //   } else {
  //     setError(true);
  //     setImage1File(null)
  //     console.log("File not supported");
  //   }
  // };
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("aaaaaa");
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        console.log("x", x);
        setImageFile(imageFile);
        setPreview(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageFile(null);
      setPreview(defaultImg);
    }
  };
  useEffect(() => {
    getAllLocation();
    getAllBrand();
  }, []);
  return (
    <>
      <Container>
        <h4 className="theme-title">Product Form</h4>
        <Form>
          <div className="border-muted p-3">
            <h6 className="text-muted text-center">
              <u>Personal Info</u>
            </h6>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Full Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <Label for="">Gender</Label>
                <FormGroup>
                  <Row className="ml-2">
                    <Col md={6}>
                      <Label check>
                        <Input
                          type="radio"
                          name="male"
                          checked={gender === "Male"}
                          value="Male"
                          onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        Male
                      </Label>
                    </Col>
                    <Col md={6}>
                      <Label check>
                        <Input
                          type="radio"
                          name="female"
                          checked={gender === "Female"}
                          value="Female"
                          onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        Female
                      </Label>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="number">Number</Label>
                  <Input
                    type="number"
                    name="number"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="location">Location</Label>
                  <Input
                    type="select"
                    name="location"
                    id="location"
                    // defaultValue={locationVal}
                    value={locationVal}
                    onChange={(e) => setLocationVal(e.target.value)}
                  >
                    {location.map((item) => (
                      <option value={item.ourLocationID}>
                        {item.locationName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="border-muted p-3">
            <h6 className="text-muted text-center">
              <u>Product Info</u>
            </h6>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="productName">Product Name</Label>
                  <Input
                    type="text"
                    name="productName"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="brand">Brand</Label>
                  <Input
                    type="select"
                    name="brand"
                    id="brand"
                    // defaultValue={locationVal}
                    value={brandVal}
                    onChange={(e) => setBrandVal(e.target.value)}
                  >
                    {brand.map((item) => (
                      <option value={item.productBrandID}>
                        {item.brandName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="condition">Condition</Label>
                  <Input
                    type="select"
                    name="condition"
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    {productCondition.map((item) => (
                      <option value={item.value}>{item.lable}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <Label for="">Posting Purpose</Label>
                <FormGroup>
                  <Row className="ml-2">
                    <Col md={4}>
                      <Label check>
                        <Input
                          type="radio"
                          name="sell"
                          checked={postingPurpose === "Sell"}
                          value="Sell"
                          onChange={(e) => setPostingPurpose(e.target.value)}
                        />{" "}
                        Sell
                      </Label>
                    </Col>
                    <Col md={8}>
                      <Label check>
                        <Input
                          type="radio"
                          name="sellAndExchange"
                          checked={postingPurpose === "Sell & Exchange"}
                          value="Sell & Exchange"
                          onChange={(e) => setPostingPurpose(e.target.value)}
                        />{" "}
                        Sell & Exchange
                      </Label>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            {/* <Row form>
              <Col sm="12" md={{ size: 6, offset: 4 }}>
                <FormGroup>
                  {error && <p>File not supported</p>}
                  <div
                    className="image"
                    style={{
                      background: image1File
                        ? `url("${image1File}") no-repeat center/cover`
                        : "#F8F8FF",
                    }}
                  ></div>
                  {!image1File && <></>}
                  <Label for="exampleFile" className="uploadBtn">
                    Upload Image
                  </Label>
                  <Input
                    type="file"
                    name="file"
                    id="exampleFile"
                    // hidden
                    onChange={handleImageChange}
                  />
                  <FormText color="muted">
                    Please Upload Only png , jpg or jpeg
                  </FormText>
                </FormGroup>
              </Col>
            </Row> */}
            <Row form>
              <Col sm="12" md={{ size: 4, offset: 4 }}>
                <FormGroup>
                  {error && <p>File not supported</p>}
                  <img src={preview} className="image" />

                  <Input
                    type="file"
                    name="file"
                    id="exampleFile"
                    hidden
                    accept="image/*"
                    onChange={showPreview}
                  />
                  <Label for="exampleFile" className="uploadBtn">
                    Upload Image
                  </Label>
                  <FormText color="muted">
                    Please Upload Only png , jpg or jpeg
                  </FormText>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Button color="primary" onClick={onSubmit}>
                Submit
              </Button>{" "}
              <Link className="ml-2 theme-title" to="/">
                Back to home page
              </Link>
            </FormGroup>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddProduct;
