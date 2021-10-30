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
        mestoAuth.register(username, password).then((res) => {
            if (res && res.status !== 400) {
                this.setState({
                    message: 'Вы успешно зарегистрировались!'
                }, () => {
                    this.props.handleRegister({ message: this.state.message, status: 'true' });
                    this.props.history.push('/sign-in');
                })
            } else {
                this.setState({
                    message: 'Что-то пошло не так'
                }, () => { this.props.handleRegister({ message: this.state.message, status: 'false' }); })
            }
        })
            .catch(err => console.log(err));
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