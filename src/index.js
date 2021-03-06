import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function WeatherTypeIcon(props) {
    return (
        <div> <i > </i> </div>
    )
}

class WeatherLogic extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    render() {
        return (<div>
            <div> Temperature {this.props.temperature} </div>
            <WeatherTypeIcon />
        </div>)
    }
}

class WeatherRepo extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {}
        console.log('-----------')
        console.log(props.cityName)
    }

    componentDidMount() {
        getData(this.props.cityName).then((data) => {
            console.log(data)
            if (data.cod === 200)
                this.setState({ temperature: data.main.temp })
            else
                this.setState({ temperature: 'Nu a fost gasit orasul' })
        }).catch(resp => console.log(resp))
    }

    render() {
        return (
            <WeatherLogic temperature={this.state.temperature} />
        )
    }
}

class UI extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: [
                null
            ]
        }
    }

    handleClick() {
        const cityName = document.getElementById('cityName').value;
        const prevWeatherStates = this.state.weather.slice(0)
        prevWeatherStates.push(<WeatherRepo cityName={cityName} />)
        this.setState({ weather: prevWeatherStates })
    }

    convertToFarenheit(idx) {
        const copyWeatherHistory = this.state.weather.slice(0)
        console.log(copyWeatherHistory[idx].)
        copyWeatherHistory[idx] *= 9/5
        copyWeatherHistory[idx] += 32
        this.setState({weather: copyWeatherHistory})
        console.log(this.state.weather)
    }

    render() {
        return (
            <div>
                <input type='text' placeholder='City/Town name' id='cityName' />
                <button onClick={() => this.handleClick()}> Get Weather Info !</button>
                <div> {this.state.weather.map((el, idx) => { return (<li key={idx}> {el} <button onClick={() => this.convertToFarenheit(idx)}> Farenheit </button></li>)} )} </div>
            </div >
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UI />);

async function getData(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=816d82dcc5837b60d62af9ee58604338&units=metric`).then((resp) => {
        return resp.json()
    }).then(result => result).catch(err => err.message).catch(err => err.message)
}



// getData().then( (res) => console.log(res))