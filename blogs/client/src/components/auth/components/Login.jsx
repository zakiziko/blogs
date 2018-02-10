import React, { Component } from 'react';
import authService from '../service/authService'

class Login extends Component {
  signin(){
    let user = {
      login : this.refs.email.value,
      password : this.refs.password.value
  }
  authService.login(user).then(data=>{
    if(data.success){
      localStorage.setItem('ds',data.token);
      window.location.reload();
      this.props.history.push('/');
    }else{
      alert(data.msg)
    }
      
      })
  }
  render() {
    return (
      <div>
       <form>
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
                    <input type="button" value="sign in" className="btn btn-primary" onClick={(e)=>this.signin(e)}/>
                </div>
            </div>
         </form>
      </div>
    );
  }
}

export default Login;