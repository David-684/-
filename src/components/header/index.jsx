import React, {Component} from 'react';
import './index.less';
import formateDate from '../../utils/dateUtils';
import memoryUtils from "../../utils/memoryUtils";
import {reqWeather} from "../../api";
class Header extends Component {
    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    getTime=()=>{
        this.timer=setInterval(()=>{
            const currentTime=formateDate(Date.now());
            this.setState({currentTime});
        },1000)
    }
    getWeather=async ()=>{
        // const {dayPictureUrl,weather}=await reqWeather();
        // if(dayPictureUrl&&weather) this.setState({dayPictureUrl,weather});
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    render() {
        const {currentTime,dayPictureUrl,weather}=this.state;
        const username=memoryUtils.user.username;
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <a href="javascript">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src='./images/logo.png' alt='weather' />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
