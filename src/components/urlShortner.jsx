import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const URLShortner = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!user) {
      props.history.push("/login");
    }
    getUserDetails(username, user);
  }, []);

  const getUserDetails = (username, token) => {
    fetch("http://localhost:5000/api/user/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ username: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };
  const handleCustomChange = (e) => {
    setCustom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.includes("http")) toast("URL should include http:// or https://");
    else if (custom.includes("/")) toast("Custom URL should not have /");
    else {
      const user = localStorage.getItem("token");
      fetch("http://localhost:5000/api/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user,
        },
        body: JSON.stringify({ longUrl: url, custom }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "Invalid Url") {
            toast(data);
          } else {
            let urlDetails = userDetails && userDetails.urlDetails;
            urlDetails.push(data);
            setUserDetails({ ...userDetails, urlDetails });
            setUrl("");
            setCustom("");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    props.history.push("/login");
  };

  return (
    <div style={{ padding: "25px" }}>
      <div className="urlShortner">
        <label style={{ marginRight: "10px" }}>Enter your URL</label>
        <input
          type="text"
          name="url"
          onChange={handleChange}
          value={url}
          placeholder="Add http:// or https://"
          style={{ width: "350px", marginRight: "10px" }}
        />
        <input
          type="text"
          name="custom"
          onChange={handleCustomChange}
          value={custom}
          placeholder="Enter custom url if needed, Don't use /. Ex: myLink"
          style={{ width: "320px", marginRight: "10px" }}
        />
        <button type="submit" onClick={handleSubmit}>
          Shorten
        </button>
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      </div>
      <div>
        <h3>History of Shortened URL's</h3>
        {userDetails &&
        userDetails.urlDetails &&
        userDetails.urlDetails.length > 0 ? (
          <table id="url">
            <tr>
              <th>URL</th>
              <th>Shortened URL</th>
              <th>No of Unique Visitors</th>
              <th>Total Page Views</th>
            </tr>
            {userDetails &&
              userDetails.urlDetails &&
              userDetails.urlDetails.map((url) => {
                let ipDetails = url.ipDetails;
                let uniqueVisitors = [...new Set(ipDetails)];
                return (
                  <tr>
                    <td>{url.longUrl}</td>
                    <td>{url.shortUrl}</td>
                    <td>{uniqueVisitors.length}</td>
                    <td>{url.views || 0}</td>
                  </tr>
                );
              })}
          </table>
        ) : (
          <div>
            <p>You haven't shortened any URL yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default URLShortner;
