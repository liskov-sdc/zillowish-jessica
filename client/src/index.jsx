var React = require('react');
var ReactDOM = require('react-dom');
 
function RenderMainPage(props) {
  return (
    <div className='mainPage'>
    <button onClick={props.onClick} className='arrow'> </button>
      <div className='mainPhoto'> <img src={props.mainPhoto.img_url} alt='' width="500" height="405"/> </div>
        <div className='photos'> 
        {
          props.gallery.map((img, index) => {
            return <div key={index}> <img src={img.img_url} alt='' className='photoSize'/> </div>
          })
        } 
        </div>
    </div>
  )
}

function RenderGroupPage(props){
}


function getIndex(arr){
  var index = {};
  index['start'] = arr[0].img_order;
  index['end'] = arr[arr.length - 1].img_order;
  return index;
}

function getMainPhotos (arr) {
  var result = {};
  result['main'] = arr[0];
  result['group'] = arr.slice(1, 5);
  return result;
}


class Zillow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      houseId: 0,
      gallery: [],
      display: {
        main: [],
        group: []
      },
      mainPage: true,
      index: {}
    };
  }
  
  handleClick(e){
    console.log('yeeesss');
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
        if(data.length >= 2){
          var result = getMainPhotos(data);
        } else {
          var result = {};
          result['main'] = data[0];
          result['group'] = [];
        }
        state.setState({
          houseId: house, 
          gallery: data, 
          display: result,
          index: getIndex(data) //why do i need this?
        });
      } 
    });
  }

  render() {
    return <RenderMainPage gallery={this.state.display.group} 
    mainPg={this.state.mainPage} mainPhoto={this.state.display.main}
    onClick={this.handleClick.bind(this)}
    />
  }
}
 

ReactDOM.render(<Zillow />, document.getElementById('app'))

