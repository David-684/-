import ajax from "./ajax";
import jsonp from 'jsonp'
import {message} from "antd";

export const reqLogin = (user) => ajax('/login', user, 'POST');
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url, {}, (err, data) => {
        console.log('1',err, data);
        if (!ee && data.status === 'success') {
            const {dayPictureUrl, weather} = data.results[0].weather_data[0];
            resolve({dayPictureUrl, weather});
        }else {
            message.error('获取天气失败')
        }
    })
}

