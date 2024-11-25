import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      console.log("API Response:", response.data) // Debug log
      if(response.data.success) {
        setList(response.data.data)
      } else {
        toast.error(response.data.message || "Error fetching data")
      }
    } catch (error) {
      console.error("Fetch Error:", error) // Debug log
      toast.error("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const removeFood = async(foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Item deleted successfully");
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete item");
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  // Debug log
  console.log("Current list state:", list)
  console.log("Loading state:", loading)

  return (
    <div className='list add flex-col'>
      <p>All Bakery List</p>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list && list.length > 0 ? (
            list.map((item, index) => (
              <div key={item._id || index} className='list-table-format'>
                <img 
                  src={`${url}/images/${item.image}`} 
                  alt={item.name || "Product"} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "placeholder-image-url";
                  }}
                />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <button 
                  className="delete-btn" 
                  onClick={() => removeFood(item._id)}
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <div className="list-table-format">No items found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default List
