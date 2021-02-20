import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Table } from "reactstrap";
import BaseUrl from "../../Components/BaseUrl/BaseUrl";
import "../../../src/custom.css";

const Location = () => {
  const [location, setLocation] = useState([]);
  const getAllLocation = async () => {
    await axios
      .get(`${BaseUrl.base}/api/OurLocations`)
      .then((res) => {
        setLocation(res.data);
        console.log("data", res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getAllLocation();
  }, []);
  return (
    <>
      <Table bordered hover>
        <thead className="theme-bg">
          <tr>
            <th className="text-center theme-title">Locations</th>
          </tr>
        </thead>
        <tbody>
          {location.map((item, index) => (
            <tr key={index}>
              <td>
                <span className="text-muted">{item.locationName}</span>
                <span style={{ float: "right" }} className="theme-title">
                  {/* {item.products.count()} */}0
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Location;
