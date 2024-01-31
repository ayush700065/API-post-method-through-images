import React from "react";
import axios from "axios";
import "./App.css";

const Food = (props) => {
  const addNewItem = () => {
    const newItem = {
      name: "Khicdi",
      price: "$15",
      picture: "https://media.istockphoto.com/id/468913759/photo/magni-dalni-khichdi-a-vegetarian-rice-dish-gujarat.jpg?s=1024x1024&w=is&k=20&c=lqm3K-Y_joj5l_sCWb6ieD-vSj72KR1N_mFJs7azDcs="
    };

    axios.post("http://localhost:5000/api/products", newItem)
      .then((response) => {
        // Call the create function passed from the parent component (App.js)
        props.create(response.data);
      })
      .catch((error) => {
        console.error("Error adding new item:", error);
      });
  };

  return (
    <div className="item">
      <img className="roundedimage" src={props.picture} alt={props.name} />
      <div className="content">
        <h1>
          <a className="header">{props.name}</a>
        </h1>
        <div className="description">
          <h3> $ {props.price} </h3>
        </div>
      </div>
      <button onClick={addNewItem}>Add Item</button> 
    </div>
  );
}
export default Food;


