import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      zip: '',
      state: 'tx',
      username: '',
      password: '',
      data: [ { name: 'John Cornyn',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(202) 224-2934' ],
          urls: [ 'http://www.cornyn.senate.gov/public/' ],
          photoUrl: 'http://bioguide.congress.gov/bioguide/photo/C/C001056.jpg',
          channels: [ [Object], [Object], [Object] ],
          title: 'United States Senate' },
        { name: 'Ted Cruz',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(202) 224-5922' ],
          urls: [ 'http://www.cruz.senate.gov/' ],
          photoUrl: 'http://www.cruz.senate.gov/files/images/OfficialPortrait.jpg',
          channels: [ [Object], [Object], [Object], [Object] ],
          title: 'United States Senate' },
        { name: 'Greg Abbott',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-2000' ],
          urls: [ 'http://www.governor.state.tx.us/' ],
          channels: [ [Object], [Object], [Object], [Object] ],
          title: 'Governor' },
        { name: 'Dan Patrick',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-0001' ],
          urls: [ 'http://www.ltgov.state.tx.us/' ],
          photoUrl: 'https://www.ltgov.state.tx.us/wp-content/uploads/2015/02/dan_patrick.jpg',
          emails: [ 'LTGConstituent.Affairs@ltgov.texas.gov' ],
          channels: [ [Object], [Object] ],
          title: 'Lieutenant Governor' },
        { name: 'Ken Paxton',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-2100' ],
          urls: [ 'https://www.oag.state.tx.us/' ],
          channels: [ [Object] ],
          title: 'Attorney General' },
        { name: 'Sid Miller',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-1408' ],
          urls: [ 'http://www.texasagriculture.gov/Home.aspx' ],
          channels: [ [Object], [Object] ],
          title: 'Commissioner of Agriculture' },
        { name: 'Glenn Hegar',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-4444' ],
          urls: [ 'http://www.window.state.tx.us/' ],
          channels: [ [Object], [Object] ],
          title: 'Comptroller of Public Accounts' },
        { name: 'Wayne Christian',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-7133' ],
          title: 'Commissioner, Railroad Commission' },
        { name: 'Christi Craddick',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-7140' ],
          emails: [ 'christi.craddick@rrc.state.tx.us' ],
          title: 'Commissioner, Railroad Commission' },
        { name: 'Ryan Sitton',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-7144' ],
          title: 'Commissioner, Railroad Commission' },
        { name: 'George P. Bush',
          address: [ [Object] ],
          party: 'Republican',
          phones: [ '(512) 463-5256' ],
          urls: [ 'http://www.glo.texas.gov/' ],
          title: 'Commissioner of General Land Office' } ]
    }
  }

  componentWillMount(){
    axios.get('/checkuser')
    .then(function (response) {
      console.log(response);
    })
  }


  changeView(option) {
    this.setState({
      view: option,
    });
  }

  renderView() {
    const {view} = this.state;
    if (view === 'home') {
      return <Home state={this.state}/>
    } else if (view === 'dashboard'){
      return <Dashboard state={this.state}/>
    }
  }

  render () {
    var division = ("ocd-division/country:us/state:" + this.state.state);
    return (
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="#" onClick={() => this.changeView('home')}>APP V1</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Townhall</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={() => this.changeView('dashboard')}>Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="auth/google">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
        {this.renderView()}
      </div>
    )
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render (){
    return(
      <div>
        <div class="col">
          <div class="card mt-md-5 mt-sm-1">
            <div class="card-body">
              <h5 class="card-title">User Dashboard</h5>
              <form class="form-horizontal">
                <div class="row form-group-lg form-group">
                  <label class="col-sm-4 col-md-3 control-label">Zip Code
                  </label>
                  <div class="col">
                    <p class="mb-0">RETURN_ZIP_FROM_DB</p>
                  </div>
                </div>
                <div class="row form-group-lg form-group">
                  <label class="col-sm-4 col-md-3 control-label">Update Zip
                  </label>
                  <div class="col">
                    <input type="text" name="last_name" value="" placeholder="enter new zip" id="zip" class="input-lg form-control">
                    </input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }


  handleSubmit(event) {
    console.log('current state:', this.state.zip);

    event.preventDefault();

    axios.post('/saveUser', {
      zip: this.state.zip
    })
    .then(function (response) {
      if (typeof(response.data) === 'String') {
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    })
  }

  setUsername (event) {
    this.setState({
      username: event.target.value
    })
  }

  setPassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  handleLogin (event) {
    console.log('hello')
    console.log(this.state.username, this.state.password)
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
      })
    .then(function (response) {
      console.log(response);
    })
  }

  handleChange(event) {
    this.setState({zip: event.target.value});
    //console.log('Zip Value: ', this.state.zip);
  }

  render () {
    return (
    <div>
      <div class="jumbotron">
        <h1 class="display-4">Find your representatives</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        <p class="lead">
          <form onSubmit={this.handleSubmit}>
            <label>
              ZipCode:
              <input type="text" onChange={this.handleChange} ref={el => this.element = el} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </p>
      </div>
        <input value={this.state.username} type="text" onChange={this.setUsername}></input>
          <br></br>
        <input value={this.state.password} type="text" onChange={this.setPassword}></input>
          <br></br>
        <button onClick={this.handleLogin}>login</button>
        <p>{this.state.zip}</p>
      <div class="row">
        <ListView data={this.state.data} state={this.state.state}/>
      </div>
    </div>
    )
  }
}

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    var listOfReps = [];
    for (var i = 0; i < this.props.data.length; i++){
      listOfReps.push(
        <div class="col-sm-12 col-md-3 my-4">
            <div class="card">
                <div class="card-body text-center">
                    <h5 class="card-title">{this.props.data[i].name}</h5>
                    <p class="lead">{this.props.data[i].title}</p>
                    <p class="card-text">{this.props.data[i].party}</p>
                    <a href="#" class="card-link">link</a>
                </div>
            </div>
        </div>
      )
    }
    return listOfReps;
  }
}



ReactDOM.render(<App/>, document.getElementById('app'));
