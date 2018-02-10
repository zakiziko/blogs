import React, { Component } from 'react';
import blogService from '../service/blogService';
import BlogItems from './BlogItems';

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            blogs : [],
            showAdd : false,
            curentPage : 1,
            itemPerPage : 3,
            activeNext :true,
            activeprev : false
        };
        this.handleClick = this.handleClick.bind(this);
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
    handleClick(event) {
        let nbr = Number(event.target.id);
        if(nbr>1){
            this.setState({
                curentPage: Number(event.target.id),
                activeprev : true
              });
        }
    }
    next(){
        if(this.state.curentPage===Math.ceil(this.state.blogs.length / this.state.itemPerPage)){
            this.setState({activeNext:false});
        }else{
            this.setState({curentPage : this.state.curentPage+1,activeprev:true})
        }
    }
    previous(){
        if(this.state.curentPage===1){
            this.setState({activeprev : false})     
        }else{
            this.setState({curentPage : this.state.curentPage-1, activeNext : true});
        }
    }
  render() {
      var pageNumbers = [];
      for(var i = 1;i<=Math.ceil(this.state.blogs.length / this.state.itemPerPage);i++){
          pageNumbers.push(i);
      }
      var pagination = pageNumbers.map((item,i)=>{
          return(
          <li className="page-item" key={i}><a className="btn btn-success" href="#" id={item} onClick={(e)=>this.handleClick(e)} >{item}</a></li>                
          )
      })
      var offset = this.state.curentPage*this.state.itemPerPage;
      var starset = (this.state.curentPage-1)*this.state.itemPerPage;
      var Items = this.state.blogs.map((item,i)=>{
        if(i>=starset && i<offset){ 
        return(
              <BlogItems item={item} key={i}/>
          )
        }
      })
    return (
        <div>
            {!this.state.showAdd ?
           <div>
                <div>
                    {Items}
                </div>
                <div className="position-fixed fixed-bottom">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {this.state.activeprev ?
                        
                        <li className="page-item"><a className="btn btn-success" href="#" onClick={(e)=>this.previous(e)}>Previous</a></li>:
                        <li className="page-item"><a className="btn btn-success disabled" href="#" onClick={(e)=>this.previous(e)}>Previous</a></li>}
                       
                        {pagination}
                        {this.state.activeNext ? 
                        <li className="page-item"><a className="btn btn-success" href="#" onClick={(e)=>this.next(e)}>Next</a></li>:
                        <li className="page-item"><a className="btn btn-success disabled" href="#" onClick={(e)=>this.next(e)}>Next</a></li>}
                    </ul>
                </nav>                
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