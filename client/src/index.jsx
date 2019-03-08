var React = require('react');
var ReactDOM = require('react-dom');
 
function RenderMainPage(props) {
  return (
    <div className='mainPage'>
      <button onClick={props.onClick} className='arrow'> </button>
        <div className='mainPhoto'> <img id={props.mainPhoto.img_order} onClick={props.imgClick} src={props.mainPhoto.img_url} alt='' width="500" height="405"/> </div>
        <div className='photos'> 
        {
          props.gallery.map((img, index) => {
            return <div key={index}> <img id={img.img_order} onClick={props.imgClick} src={img.img_url} alt='' className='photoSize'/> </div>
          })
        } 
        </div>
        {/* creates template for when img is selected */}
        <div id='photoModal' className='photoModal'> 
          <div className='photoSelectGrid'> 
            <button onClick={props.goBack} className='arrowBack'> </button> 
            <div className='photoContent'>
                <img id='imgSelected' src='' alt='' width="800" height="700"/>
                {/* <button className='reArrange' onClick={props.reArrange}>Rearrange photos</button> */}
                <div className='photoCount'> {props.selected + 1} of {props.length} </div>
              <span onClick={props.closeModal} className="close">&times;</span>
            </div>
            <button onClick={props.onClick} className='arrow'> </button>
          </div>
        </div>
        {/* creates form when rearrange is selected */}
        <div id="showForm" className="showForm"> 
          <form onSubmit={props.handleSubmit}>
            <label>
              Name:
              <input type="text" />
            </label>
            <input type="submit" value="Submit" />
          </form>
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
          return <div key={index}> <img id={img.img_order} onClick={props.imgClick} src={img.img_url} alt='' className='photoSize'/> </div>
        })
      } 
      </div>
      <button onClick={props.onClick} className='arrow'> </button>
      {/* creates template for when img is selected */}
      <div id='photoModal' className='photoModal'> 
          <div className='photoSelectGrid'> 
            <button onClick={props.goBack} className='arrowBack'> </button> 
            <div className='photoContent'>
              <span onClick={props.closeModal} className="close">&times;</span>
              <div id='photoCount' className='photoCount'> {props.selected + 1} of {props.length} </div>
              <img id='imgSelected' src='' alt='' width="800" height="700"/>
            </div>
            <button onClick={props.onClick} className='arrow'> </button>
          </div>
        </div>
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
      photoSelected: null,
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
    if(this.state.photoSelected === null) {
      var newPhotos = this.state.gallery.slice(3,10);
      this.setState({
        display: {
          main: [],
          group: newPhotos
        },
        mainPage: false
      })
    } else {
      var nextPhoto = this.state.photoSelected + 1;
      if(nextPhoto < this.state.gallery.length) {
        var img = document.getElementById('imgSelected');
        img.src = this.state.gallery[nextPhoto].img_url;
        this.setState({photoSelected: nextPhoto});
      }
    }
  }

  handleBack(e){
    if(this.state.photoSelected === null) {
      var result = {
        main: this.state.gallery[0],
        group: this.state.gallery.slice(1, 5)
      };
      this.setState({
        display: result,
        mainPage: true
      })
    } else {
      var nextPhoto = this.state.photoSelected - 1;
      if(nextPhoto >= 0) {
        var img = document.getElementById('imgSelected');
        img.src = this.state.gallery[nextPhoto].img_url;
        this.setState({photoSelected: nextPhoto});
      }
    }
  }

  imgClick(e){
    var modal = document.getElementById('photoModal');
    modal.style.display = "block";
    var img = document.getElementById('imgSelected');
    img.src = e.target.src;
    this.setState({photoSelected: Number(e.target.id)});
  }

  closePhotoModal(e){
    var modal = document.getElementById('photoModal');
    modal.style.display = "none";
    var img = document.getElementById('imgSelected');
    img.src = '';
    this.setState({photoSelected: null});
  }

  reArrange(){
    var modal = document.getElementById('photoModal');
    modal.style.display = "none";
    var img = document.getElementById('imgSelected');
    img.src = '';
    var form = document.getElementById('showForm');
    form.style.display = "block";
    this.setState({photoSelected: null});
  }

  submitForm(e){
    console.log(e);
  }

  componentDidMount(){
    var state = this;
    var path = window.location.pathname.split('/');
    var house = path[1];
    $.ajax({
      method: 'GET',
      url: `http://ec2-54-188-46-106.us-west-2.compute.amazonaws.com:3002/gallery/${house}`,
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
    onClick={this.handleNext.bind(this) } goBack={this.handleBack.bind(this)}
      imgClick={this.imgClick.bind(this)} closeModal={this.closePhotoModal.bind(this)}
      selected={this.state.photoSelected} length={this.state.gallery.length} 
      reArrange={this.reArrange.bind(this)} handleSubmit={this.submitForm.bind(this)}
    />
    : <RenderGroupPage gallery={this.state.display.group} 
      onClick={this.handleNext.bind(this) } goBack={this.handleBack.bind(this)}
      imgClick={this.imgClick.bind(this)} closeModal={this.closePhotoModal.bind(this)}
      selected={this.state.photoSelected} length={this.state.gallery.length}
    />)
  }
}
 

ReactDOM.render(<Zillow />, document.getElementById('gallery'))

