"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch() {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

		_this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
		return _this;
	}

	_createClass(Stopwatch, [{
		key: "reset",
		value: function reset() {
			this.setState({
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			});
		}
	}, {
		key: "format",
		value: function format() {
			return pad0(this.state.minutes) + ":" + pad0(this.state.seconds) + ":" + pad0(Math.floor(this.state.miliseconds));
		}
	}, {
		key: "start",
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.state.running = true;
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: "step",
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
		}
	}, {
		key: "calculate",
		value: function calculate() {

			var miliseconds = this.state.miliseconds,
			    seconds = this.state.seconds,
			    minutes = this.state.minutes;
			miliseconds += 1;

			if (miliseconds >= 100) {
				seconds += 1;
				miliseconds = 0;
			}
			if (seconds >= 60) {
				minutes += 1;
				seconds = 0;
			}
			this.setState({
				miliseconds: miliseconds,
				seconds: seconds,
				minutes: minutes
			});
		}
	}, {
		key: "stop",
		value: function stop() {
			this.state.running = false;
			clearInterval(this.watch);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"a",
					{ href: "#", onClick: this.start.bind(this) },
					"Start "
				),
				React.createElement(
					"a",
					{ href: "#", onClick: this.stop.bind(this) },
					"Stop"
				),
				React.createElement(
					"div",
					null,
					this.format()
				)
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

var pad0 = function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
};

var element = React.createElement(Stopwatch, null);
ReactDOM.render(element, document.querySelector('#stoper'));
