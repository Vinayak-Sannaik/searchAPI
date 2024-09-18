import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState({ name: "asc", email: "asc", zipcode: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  const handleSortByName = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder.name === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setData(sortedData);
    setSortOrder({ ...sortOrder, name: sortOrder.name === "asc" ? "desc" : "asc" });
  };

  const handleSortByEmail = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder.email === "asc") {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });
    setData(sortedData);
    setSortOrder({ ...sortOrder, email: sortOrder.email === "asc" ? "desc" : "asc" });
  };

  const handleSortByZipcode = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder.zipcode === "asc") {
        return a.address.zipcode.localeCompare(b.address.zipcode);
      } else {
        return b.address.zipcode.localeCompare(a.address.zipcode);
      }
    });
    setData(sortedData);
    setSortOrder({ ...sortOrder, zipcode: sortOrder.zipcode === "asc" ? "desc" : "asc" });
  };

  const filteredItems = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={handleSortByName}>User Name</th>
            <th onClick={handleSortByEmail}>User Email</th>
            <th onClick={handleSortByZipcode}>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.zipcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
