import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      display_name: '',
      lat: '',
      lon: '',
      error: 'sorry somthing ment wrong!',
      errFlag: false,
      mapFlag: false
    }
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.city.value;

    const key = 'pk.87fc63a6655f6e244607f17c7ee42a77';
    const URL = `  https://us1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`;
    try {
      let results = await axios.get(URL);
      this.setState({
        display_name: results.data[0].display_name,
        lat: results.data[0].lat,
        lon: results.data[0].lon,
        mapFlag: true,
      })
    }
    catch {
      this.setState({
        errFlag: true,

      })
    }


  }
  render() {
    return (
      <div>
        <hi> Location App</hi>
        <form onSubmit={this.getLocationData}>

          <input type="text" name="city" placeholder="Enter acity" />
          <button type="submi">Submit</button>
        </form>
        <h3>display name : {this.state.display_name}</h3>
        <p>Lat : {this.state.lat}</p>
        <p>Lon : {this.state.lon}</p>
        {this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.87fc63a6655f6e244607f17c7ee42a77&center=${this.state.lat},${this.state.lon}`}></img>}
        {this.state.errFlag && <h4>Error : {this.state.error}</h4>}
      </div>
    )


  }

}



export default App;
