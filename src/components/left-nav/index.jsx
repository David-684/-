import React, {Component} from 'react';
import {Link,withRouter} from "react-router-dom";
import './index.less';
import logo from '../../assets/images/logo.png';
import { Menu, Icon } from 'antd';
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
class LeftNav extends Component {
    componentWillMount() {
        this.menuNodes=this.getMenuNodes(menuList);
    }

    /*getMenuNodes=(menuList)=>{
        const path=this.props.location.pathname;
        return menuList.map(item=>{
            if(item.children){
                const c=item.children.find(cItem=>cItem.key===path)
                if (c) this.openKey=c.key;
                return (
                    <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }else {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} /><span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }


        })
    }*/
    getMenuNodes=(menuList)=>{
        const path=this.props.location.pathname;
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else {
                const c=item.children.find(cItem=>path.indexOf(cItem.key)===0)
                if (c) {
                    this.openKey=item.key;
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre;
        },[])
    }
    render() {
        const path=this.props.location.pathname;
        const openKey=this.openKey;
        console.log(openKey)
        return (
            <div  className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>

        );
    }
}

export default withRouter(LeftNav);
