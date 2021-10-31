import React from "react";
import { Link, withRouter } from 'react-router-dom';
import * as mestoAuth from '../utils/mestoAuth.js'
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.handleRegister(username, password);
    }

    render() {
        return (
            <div className="login" >
                <h2 className="login__welcome">Регистрация</h2>
                <form className="login__form" onSubmit={this.handleSubmit}>
                    <input required className="login__input" name="username" placeholder="Email" type="text" onChange={this.handleChange} value={this.state.username} />
                    <input required className="login__input" name="password" placeholder="Пароль" type="password" onChange={this.handleChange} value={this.state.password} />
                    <button type="submit" className="login__btn">Зарегистрироваться</button>
                </form>
                <div className="login__signup">
                    <p className="login__caption">Уже зарегистрированы? </p>
                    <Link to="/sign-in" className="login__link"> Войти</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Register);