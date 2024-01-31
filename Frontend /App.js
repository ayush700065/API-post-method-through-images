import React, { Component } from 'react';
import axios from 'axios';
import Food from './Food';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };
  }

  componentDidMount() {
    this.fetchMenuItems();
  }

  fetchMenuItems = () => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        this.setState({
          menuItems: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addNewItem = () => {
    axios.post("http://localhost:5000/api/products")
    .then((response) => {
      console.log("Item added:", response.data);
      // Update the state to include the new item
      this.setState(prevState => ({
        menuItems: [...prevState.menuItems, response.data],
      }));
    })
    .catch((error) => {
      console.error("Error adding new item:", error);
    });
  };

  render() {
    return (
      <div className='ui list'>
        <h1>Ayush Menu</h1>
        {this.state.menuItems.map((item) => (
          <Food
            key={item.id}
            picture={item.picture}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    );
  }
}

export default App;
