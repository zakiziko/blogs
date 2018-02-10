import React, { Component } from 'react';
import authService from '../service/authService';

class Register extends Component {
    signup(){
        let user = {
            username : this.refs.username.value,
            email : this.refs.email.value,
            password : this.refs.password.value
        }
        authService.register(user).then(data=>{
           if(data.state){
               this.props.history.push('/');
           }else{
               alert(data.msg);
           }
            })
    }
  render() {
    return (
      <div>
       <form>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="text" className="form-control" ref="username" placeholder="User Name"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="email" className="form-control" ref="email" placeholder="Email"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="password" className="form-control" ref="password" placeholder="Password"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="button" value="register" className="btn btn-primary" onClick={(e)=>this.signup(e)}/>
                </div>
            </div>
         </form>
      </div>
    );
  }
}

export default Register;