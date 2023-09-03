import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=2eb16594e94245639a9d727016f7dfa5";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles})

  }
  render() {
    return (
       <div className="container my-3">
            <h1>NewsMonkey - Top Headlines</h1>
            <div className="row">
            {this.state.articles.map((element)=>{
              return  <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.
                description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl = {element.url}/>
            </div>  
            })}
            </div>
            <div className="container">
            <button type="button" className="btn btn-dark">Previous</button>
            <button type="button" className="btn btn-dark">Next</button>
            </div>
       </div>
        )
      }
    }

export default News