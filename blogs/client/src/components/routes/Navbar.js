import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isActive:false,
            username : ""
        }
    }
    componentWillMount(){
        var token = localStorage.getItem('ds');
        if(token === "" || token === undefined || token === null){
            
        }else{
            this.setState({isActive:true});
            axios.get('http://localhost:5000/profile/'+token).then(res=>{
                if(res.data.state){
                    this.setState({username : res.data.user.user.username})
                }else{
                    alert('auth prob')
                }
            })
        }
    }
    logout(e){
        localStorage.clear();
       window.location.reload();
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <NavLink to="/" className="navbar-brand">Blogs</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                       <NavLink to="/" className="nav-link">Blogs <span className="sr-only">(current)</span></NavLink>
                        </li> 
                    </ul>
                    {!this.state.isActive ? 
                    <ul className="navbar-nav">
                   
                        <li className="nav-item active">
                       <NavLink to="/register" className="nav-link">Register <span className="sr-only">(current)</span></NavLink>
                        
                        </li> 
                        <li className="nav-item">
                            <NavLink to ="/login" className="btn btn-primary"><i className="fa fa-sign-in">login</i></NavLink>
                        </li>
                      
                    </ul>
                      : 
                      <ul className="navbar-nav">
                       <li className="nav-item">
                            <label htmlFor="username" className="btn btn-secondary">
                            <i className="fa fa-registered"></i> {this.state.username}
                            </label>
                        </li>
                      <li className="nav-item">
                          <a onClick={(e)=>this.logout(e)} className="btn btn-success">
                           <i className="fa fa-sign-out">logOut</i>
                          </a>
                      </li>
                    
                  </ul>
                      }
                </div>
            </nav>
        )
    }
}
export default Navbar;