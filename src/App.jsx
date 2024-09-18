import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  // Filter users based on the search query matching name or email
  const filteredItems = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {query === "" ? (
        <p>Please enter a search query to filter the users</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Zip code</th>
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
      )}
    </div>
  );
}
