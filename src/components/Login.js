import React from "react";
import { withRouter } from 'react-router-dom';
class Login extends React.Component {
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
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        if (!username || !password) {
            return;
        }
        this.setState({ username: '', password: '' }, () => {
            this.props.handleLogin(username, password);
        })
    }
    render() {
        return (
            <div className="login">
                <h2 className="login__welcome">Вход</h2>
                <form className="login__form" onSubmit={this.handleSubmit}>
                    <input required className="login__input" name="username" placeholder="Email" type="text" onChange={this.handleChange} value={this.state.username} />
                    <input required className="login__input" name="password" placeholder="Пароль" type="password" onChange={this.handleChange} value={this.state.password} />
                    <button type="submit" className="login__btn">Войти</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);