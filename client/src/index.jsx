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
  
  handleNext(e){
    var newPhotos = this.state.gallery.slice(3,9);
    console.log('arr: ', newPhotos);
    this.setState({
      display: {
        main: [],
        group: newPhotos
      },
      mainPage: false
    })
  }

  handleBack(e){

  }

  componentDidMount(){
    var state = this;
    var house = 1;
    $.ajax({
      method: 'GET',
      url: `http://localhost:3002/gallery/${house}`,
      success: function(data){
        //depending on the length of the list, populate display
        if(data.length >= 2 && state.state.mainPage){
          var result = getMainPhotos(data);
        } else if(data.length >= 2 && !state.state.mainPage){
          var result = {
            main: [],
            group: data.slice(0,8)
          };
        }
         else {
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
 

ReactDOM.render(<Zillow />, document.getElementById('app'))

