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
  return (
    <div className='gridPage'>
      <button onClick={props.goBack} className='arrowBack'> </button>
      <div className='group'>       
      {
        props.gallery.map((img, index) => {
          return <div key={index}> <img src={img.img_url} alt='' className='photoSize'/> </div>
        })
      } 
      </div>
    <button onClick={props.onClick} className='arrow'> </button>
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
      display: {
        main: [],
        group: []
      },
      mainPage: true,
      index: {}
    };
  }
  
  handleNext(e){
    var newPhotos = this.state.gallery.slice(3,9);
    this.setState({
      display: {
        main: [],
        group: newPhotos
      },
      mainPage: false
    })
  }

  handleBack(e){
    var result = {
      main: this.state.gallery[0],
      group: this.state.gallery.slice(1, 5)
    };
    this.setState({
      display: result,
      mainPage: true
    })

  }

  componentDidMount(){
    var state = this;
    var house = 1;
    $.ajax({
      method: 'GET',
      url: `http://localhost:3002/gallery/${house}`,
      success: function(data){
        var result = {
          main: data[0],
          group: data.slice(1, 5)
        };
        state.setState({
          houseId: house, 
          gallery: data, 
          display: result
        });
      } 
    });
  }

  render() {
    return ( (this.state.mainPage)
    ? <RenderMainPage gallery={this.state.display.group} 
    mainPg={this.state.mainPage} mainPhoto={this.state.display.main}
    onClick={this.handleNext.bind(this)}
    />
    : <RenderGroupPage gallery={this.state.display.group} 
      onClick={this.handleNext.bind(this) } goBack={this.handleBack.bind(this)}
    />)
  }
}
 

ReactDOM.render(<Zillow />, document.getElementById('gallery'))

