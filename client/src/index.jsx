var React = require('react');
var ReactDOM = require('react-dom');
 
function GridTemplate(props) {
 return (
 <div className="grid-container">
 {
   props.gallery.map((img, index) => {
    return <div className="grid-item" key={index}>
    <img src={img.img_url} alt={img.img_url} height="500" width="600"></img>
    </div>
   })
 }
  </div>
 )
}

function getIndex(arr){
  var index = {};
  index['start'] = arr[0].img_order;
  index['end'] = arr[arr.length - 1].img_order;
  return index;
}


class Zillow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      houseId: 0,
      gallery: [],
      display: [],
      index: {}
    };
  }
  
  handleClick(e){

  }

  shiftImg(e){

  }

  componentDidMount(){
    var state = this;
    var house = 1;
    $.ajax({
      method: 'GET',
      url: `http://localhost:3002/gallery/${house}`,
      success: function(data){
        //depending on the length of the list, populate display
        if(data.length <= 5){
          var displayData = data;
        } else {
          var displayData = data.slice(0, 5);
        }
        state.setState({
          houseId: house, 
          gallery: data, 
          display: displayData,
          index: getIndex(displayData)
        });
      } 
    });
  }

  render() {
    return <GridTemplate gallery={this.state.display}/>
  }
}
 
function tick(){
  ReactDOM.render(<Zillow />, document.getElementById('app'));
}

setInterval(tick, 2000);