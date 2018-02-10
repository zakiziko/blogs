import React, { Component } from 'react';
//import blogService from '../service/blogService';

class BlogItems extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
        <div>
            <div className="card border-info mb-3">
                <div className="card-header">{this.props.item.title}</div>
                <div className="card-body text-primary">
                    <h4 className="card-title">wrote by : {this.props.item.creator.username}</h4>
                    <p className="card-text">{this.props.item.content}</p>
                </div>
            </div>
      </div>
    );
  }
}

export default BlogItems;