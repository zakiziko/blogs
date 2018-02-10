import React, { Component } from 'react';
import blogService from '../service/blogService';
import BlogItems from './BlogItems';

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            blogs : [],
            showAdd : false
        }
    }
    componentDidMount(){
        blogService.getAllBlogs().then(data=>{
            this.setState({blogs:data});
        })
    }
    componentDidUpdate(){
        //window.location.reload();
    }
    showBlogAdd(){
        var token = localStorage.getItem('ds');
        if(token === "" || token === undefined || token === null){
            alert('Sorry only registerd Users have the write to blog');
        }else{
            this.setState({showAdd:true});
        }
    }
    addBlog(){
        let blog = {
            title : this.refs.title.value,
            content : this.refs.content.value,
            token : localStorage.getItem('ds')
        }
        blogService.addBlog(blog).then(data=>{
            if(data.state){
                window.location.reload();
            }else{
                alert(data.msg);
            }
        })
    }
  render() {
      var Items = this.state.blogs.map((item,i)=>{
          return(
              <BlogItems item={item} key={i}/>
          )
      })
    return (
        <div>
            {!this.state.showAdd ?
           <div>
                <div>
                    {Items}
                </div>
                <div>
                    <button className="btn btn-danger btn-small" onClick={(e)=>{this.showBlogAdd(e)}}>ADD Blog</button>
                </div>   
           </div> 
        : 
            <div>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" ref="title" placeholder="title"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <textarea name="content" ref="content" id="blogcontent" cols="30" rows="10" className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="button" value="publier" className="btn btn-primary" onClick={(e)=>this.addBlog(e)}/>
                        </div>
                    </div>
                </form>
            </div>}
      </div>
    );
  }
}

export default Blog;