import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title, description, imageUrl, newsUrl,author,date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : '90%', zIndex: '1'}}> {source} </span>
        <img src={!imageUrl?"https://www.bing.com/images/search?view=detailv2&form=SBIHVR&iss=sbi&q=imgurl:https%3A%2F%2Fstatic.toiimg.com%2Fthumb%2Fmsid-103291540%2Cimgsize-64350%2Cwidth-400%2Cresizemode-4%2F103291540.jpg&pageurl=https%3A%2F%2Ftimesofindia.indiatimes.com%2Fsports%2Fcricket%2Fasia-cup%2Findia-vs-pakistan-asia-cup-virat-kohli-vs-shaheen-afridi-and-other-player-battles-to-watch-out-for%2Farticleshow%2F103291344.cms&pagetl=India+vs+Pakistan%2C+Asia+Cup%3A+Virat+Kohli+vs+Shaheen+Afridi+and+other+player+battles+to+watch+out+for+%7C+Cricket+News+-+Times+of+India&imgalt=India+vs+Pakistan%2C+Asia+Cup%3A+Virat+Kohli+vs+Shaheen+Afridi+and+other+player+battles+to+watch+out+for&imgsz=195x111&selectedindex=0&id=https%3A%2F%2Fstatic.toiimg.com%2Fthumb%2Fmsid-103291540%2Cimgsize-64350%2Cwidth-400%2Cresizemode-4%2F103291540.jpg&ccid=qOifeYqP&simid=6955629249185&ck=51F8C6667EB2D065E658309EC65FEFE8&thid=OIF.UfjGZn6y0GXmWDCexl%2Fv6A&mediaurl=https%3A%2F%2Fstatic.toiimg.com%2Fthumb%2Fmsid-103291540%2Cimgsize-64350%2Cwidth-400%2Cresizemode-4%2F103291540.jpg&exph=225&expw=400&vt=2&sim=1":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text"><small className="text-muted">By {!author? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <p className="card-text">{description}</p>

          <a rel = "noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
</div>
      </div>
    )
  }
}

export default NewsItem
