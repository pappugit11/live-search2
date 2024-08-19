import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [fetchApi, setFetchApi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((response) => {
      setFetchApi(response.data.data.memes);
    }, []);
  });

  const searchData = (value) => {
    setSearchTerm(value);
    console.log(value);
    if (searchTerm !== "") {
      const filterData = fetchApi.filter((item) => {
        return Object.values(item)
          .join("")
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
      setSearchResult(filterData);
    } else {
      setSearchResult(fetchApi);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="content_wrapper">
            <div className="inp_group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => searchData(e.target.value)}
                className="form-control"
              />
            </div>

            {searchTerm.length > 0 ? (
              <ul className="item_list">
                {searchResult.map((item, ind) => {
                  return (
                    <li key={ind}>
                      <img src={item.url} height={100} width={100} alt="" />{" "}
                      <span>{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="item_list">
                {fetchApi.map((item, ind) => {
                  console.log(item);
                  return (
                    <li key={ind}>
                      <img src={item.url} height={100} width={100} alt="" />
                      <span>{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
