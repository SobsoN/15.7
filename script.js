class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
        	running: false,
        	minutes: 0,
			seconds: 0,
        	miliseconds: 0
        }
    }

    reset() {
    	this.setState ({
    		minutes: 0,
    		seconds: 0,
    		miliseconds:0
    	});
    }


    format() {
        return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
	}

	start() {
	    if (!this.state.running) {
	        this.state.running = true;
	        this.watch = setInterval(() => this.step(), 10);
	    }
	}

	step() {
	    if (!this.state.running) return;
	    this.calculate();
	}

	calculate() {

		let miliseconds = this.state.miliseconds,
		      seconds = this.state.seconds,
		      minutes = this.state.minutes;
	    miliseconds +=1;

        if (miliseconds >= 100) {
            seconds +=1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes +=1;
            seconds = 0;
        }
        this.setState ({
        	miliseconds: miliseconds,
        	seconds: seconds,
        	minutes: minutes
        });
	}

	stop() {
	    this.state.running = false;
	    clearInterval(this.watch);
	}

	render() {
		return (
			<div>
				<a href="#" onClick={this.start.bind(this)}>Start </a>
				<a href="#" onClick={this.stop.bind(this)}>Stop</a>
				<div>{this.format()}</div>
			</div>
		)
	}

}

const pad0 = (value) => {
		let result = value.toString();
	    if (result.length < 2) {
	        result = '0' + result;
	    }
	    return result;
}

var element = <Stopwatch />;
ReactDOM.render(element,document.querySelector('#stoper'));