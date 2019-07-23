import React from 'react';
import logo from './logo.svg';
import './App.css';
import SelectButtons from './components/selectButtons/selectButtons.js'
import ControlButtons from './components/controlButtons/controlButtons.js'

/* the parent component having the minuteszero state which render when minutes < 10, secondzero renders
  when seconds is zero, type wich switches the countdown from session to break, switch that shows if code
  is already rendering per seconds, pause which shows if the rendering is paused, minutes and seconds are
  used for countdown, buttonMinutes is used for button display as well aa break  */
class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      minutesZero: '',
      minutes: 25,
      buttonMinutes: 25,

      secondsZero: 0,
      seconds: 0,

      break : 5,

      type: 'SESSION',
      switch: false,
      pause: false
    }

  this.startClick = this.startClick.bind(this);
  this.updateFunc = this.updateFunc.bind(this);
  this.increaseFunc = this.increaseFunc.bind(this);
  this.decreaseFunc = this.decreaseFunc.bind(this);
  this.breakInc = this.breakInc.bind(this);
  this.breakDec = this.breakDec.bind(this);
  this.resetFunc = this.resetFunc.bind(this);
  this.pauseFunc = this.pauseFunc.bind(this);
  }

/*  break button increase if switch is false(off) */
  breakInc(){
    if (!this.state.switch){
      if(this.state.break < 60){
        this.setState({break: this.state.break + 1});
      }
    }
  }

/*  break button decrease if switch is false(off)  */
  breakDec(){
    if(!this.state.switch){
      if(this.state.break > 1){
        this.setState({break: this.state.break - 1});
      }
    }
  }
  /* function that renders every second through the setInterval in start button  */
  updateFunc(){
    this.setState({seconds : this.state.seconds - 1});

    if(this.state.seconds < 0){
      this.setState({
        secondsZero: '',
        seconds: 59,
        minutes: this.state.minutes - 1
      });
    }

    if (this.state.seconds < 10){
      this.setState({
        secondsZero: 0
      });
    }

    if (this.state.minutes < 10 ){
      this.setState({
        minutesZero: 0
      });
    }

    /* if statement that switches to break when session has finished its countdown*/
    if(this.state.minutes == 0 && this.state.seconds == 0 && this.state.type == 'SESSION'){
      this.setState({
        minutes : this.state.break,
        type: 'BREAK'
      });
      document.getElementById('audio').play();
    }

    /* if statement that switches to session when break has finished its countdown*/
    if(this.state.minutes == 0 && this.state.seconds == 0 && this.state.type == 'BREAK'){
      this.setState({
        minutes: this.state.buttonMinutes,
        type: 'SESSION'
      });
    }

  }

  /* start button function, its rendered when switch is only false*/
  startClick(){
    if (!this.state.switch){
      this.setState({
        secondsZero: '',
        seconds: 59,
        minutes: this.state.minutes - 1,
        switch: true
      });

      this.interval = setInterval(() => {
        this.updateFunc()
      }, 1000);

    }
  }

  /* session's increase button functio */
  increaseFunc(){
    if(!this.state.switch){
      if(this.state.buttonMinutes < 60){
        this.setState({
          minutes: this.state.minutes + 1,
          buttonMinutes: this.state.buttonMinutes + 1
        });
      }

      /*
      an if statement that adds 0 state's minutes when lesser than 10 when the increase button is clicked.
      if 10 is used, it also adds at 10 so 9 is used.
     */
      if (this.state.minutes < 9){
        this.setState({
          minutesZero: 0
        });
      }else{
        this.setState({
         minutesZero: ''
        })
      }
    }

  }

  /* session's decrease button function */
  decreaseFunc(){
    if(!this.state.switch){
        if(this.state.buttonMinutes > 1){
        this.setState({
          minutes: this.state.minutes - 1,
          buttonMinutes: this.state.buttonMinutes - 1
        });
      }
      
      /*
        an if statement that adds 0 to the state's minutes when lesser than 10 when the decrease button is
        clicked. if 9/10 is used, it adds at 7/8 so 11 is used.
      */
      if(this.state.minutes < 11){
        if(this.minutesZero == 0){
          this.setState({
            minutesZero: ''
          });
        }else{
          this.setState({
            minutesZero: 0
          });
        }
      }
    }
  }

  /* reset button function where all intervals are cleared and all state are set to default */
  resetFunc(){
    clearInterval(this.interval);
    clearInterval(this.pauseInterval);
    
    this.setState({
      minutesZero: '',
      minutes: 25,
      buttonMinutes: 25,

      secondsZero: 0,
      seconds: 0,

      break : 5,

      type: 'SESSION',
      switch: false
    });
  }

  /* pause function button where intervals are clared when switched is on and pause if false but will
    also set the pause true, but if switch is on and pause is true, interval is set with the same as 
    the start button */
  pauseFunc(){
    if(this.state.switch){
      if(!this.state.pause){
        clearInterval(this.interval);
        clearInterval(this.pauseInterval);
        this.setState({pause: true});
      }

      if(this.state.pause){
        this.pauseInterval = setInterval(() => {
          this.updateFunc()
        }, 1000);
        this.setState({pause: false});
      }
    }
  }

  render(){
    return (
      <div className="home-container">

        <h1><img src={logo} className="App-logo" alt="logo" />Pomodoro Clock</h1>

        <audio id="audio"> <source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" type="audio/mp3" /> </audio>

        <SelectButtons 
        break={this.state.break} 
        buttonMinutes={this.state.buttonMinutes} 
        increaseFunc={this.increaseFunc}
        decreaseFunc={this.decreaseFunc}
        breakInc={this.breakInc}
        breakDec={this.breakDec}
        />
        
        {/*the timer display div */}
        <div className="timer-container">
          <h1>{this.state.type}</h1>
          <h1> 
          {this.state.minutesZero}{this.state.minutes} : {this.state.secondsZero}{this.state.seconds} 
          </h1>
        </div>

        <ControlButtons 
        startClick={this.startClick} 
        resetFunc={this.resetFunc}
        pauseFunc={this.pauseFunc}
        />

      </div>
    );
  }
}

export default Home;
