import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css'

function App() {

  const [data,setData] = useState([])
  const [nameSearch, setNameSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);

useEffect(() => {
  fetchData();
}, []); // Fetch data on component mount

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/");
    setData(response?.data)
    console.log('got',response)
    // setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


const filteredData = data?.filter(
  (item) =>
    item.customer_name.toLowerCase().includes(nameSearch.toLowerCase()) &&
    item.location.toLowerCase().includes(locationSearch.toLowerCase())
);



const sortedData = filteredData.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  
  if (sortType === "date") {
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  } else {
    return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  }
});
// Pagination Logic
const pageSize = 20;
const pageCount = Math.ceil(sortedData.length / pageSize);

const handlePageClick = (index) => {
  setCurrentPage(index);
};

const displayData = sortedData.slice(
  currentPage * pageSize,
  (currentPage + 1) * pageSize
);


  return (
    <div className="App">
    {/* <Vikrsm  /> */}
    <h1>Customer Table</h1>

    <div className="search-filters s">
        <input
          type="text"
          placeholder="Search by Name"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Location"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
        />
        <select  value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="time">Sort by Time</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

<table >
  <tr>
    <th>s_no</th>
    <th>customer_Name</th>
    <th>Age</th>
    <th>Phone</th>
    <th>Location</th>
    <th>date</th>
    <th>time</th>
    
  </tr>
  {displayData?.map((data => (
      <tr>
      <td>{data?.sno}</td>
      <td>{data?.customer_name}</td>
      <td>{data?.age}</td>
      <td>{data?.phone}</td>
      <td>{data?.location}</td>
      <td>{data?.date.split('T')[0]}</td>
      <td>{data?.time.split(/[+:]/).slice(0, 2).join(':')}</td>
     
    </tr>
  )))}

  
</table>
<div className="pagination" style={{display : 'flex', justifyContent : 'center'}}>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
             style={{borderRadius : '100px'}}
            key={index}
            className={currentPage === index ? "active" : ""}
            onClick={() => handlePageClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;