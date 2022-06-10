import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import {reqWeather} from "./api";
export default class App extends Component {
    componentDidMount() {
        reqWeather('北京');
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>{/*只匹配其中一个*/}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                    <Redirect to='/login' />
                </Switch>
            </BrowserRouter>
        )

    }
}
