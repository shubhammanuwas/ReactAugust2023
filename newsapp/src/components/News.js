import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pagesize: 5,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("constructor running...");
        this.state = {

            articles: [],
            loading: false
        }
    }
    async componentDidMount() {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc7bde0205fc4b6181a54b8da73fb821&page=1&pageSize=${this.props.pagesize}`;
        let data = await fetch(url);
        this.setState({ loading: true })
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({ page: 1, articles: parsedData.articles, totalPages: parsedData.totalResults, loading: false })
    }
    handlePreviousClick = async () => {


        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc7bde0205fc4b6181a54b8da73fb821&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
        let data = await fetch(url);
        this.setState({ loading: true });
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({ page: this.state.page - 1, articles: parsedData.articles, loading: false })


    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalPages / this.props.pagesize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc7bde0205fc4b6181a54b8da73fb821&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
            let data = await fetch(url);
            this.setState({ loading: true });
            let parsedData = await data.json();
            console.log(parsedData)
            this.setState({ page: this.state.page + 1, articles: parsedData.articles, loading: false })
        }


    }
    render() {
        return (
            <div className='container my-2'>
                <h2>This is latest News</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div key={element.url} className='col-md-4'>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://image.cnbcfm.com/api/v1/image/107286139-1692035927641-NYSE_Traders-OB-20230814-CC-Press-8.jpg?v=1692828321&w=1920&h=1080"} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark " onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalPages / this.props.pagesize)} className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
