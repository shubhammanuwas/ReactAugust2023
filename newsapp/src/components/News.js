import React,{useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    // const capitalizeFirstLetter = (string) => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // ¯}
    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }



    // const updateNews= async ()=> {
    //     props.setProgress(10);
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=497e89b5f18243da9a739469f730a7d9&page=${page}&pageSize=${props.pagesize}`;
    //     let data = await fetch(url);
    //     props.setProgress(30);

    //     setLoading(true);
    //     let parsedData = await data.json();
    //     props.setProgress(70);

    //     setArticles(parsedData.articles);
    //     setPage(parsedData.page);
    //     setTotalResults(parsedData.totalResults);
    //     setLoading(false);
    //     // console.log(parsedData)
    //     props.setProgress(100);
    // }
    // const handlePreviousClick=async()=>{
    //     setPage(page -1);
    //     updateNews();
    // }
    // const handleNextClick=async()=>{
    //     setPage(page +1);
    //     updateNews();
    // }

    useEffect(()=>{
        updateNews();
    }, []);

    const fetchMoreData = async () => {   
        setPage(page+1) 
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };


    // const fetchMoreData = async () => {
    //     setPage(page+1);
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=497e89b5f18243da9a739469f730a7d9&page=1&pageSize=${props.pagesize}`;
    //     let data = await fetch(url);
    //     setLoading(true);
    //     let parsedData = await data.json();
    //     console.log(parsedData)
    //     // setPage(1);
    //     setArticles(articles.concat(parsedData.articles));
    //     setTotalResults(articles.totalResults);
    //     setLoading(false);
    // };
    // }
    
        return (
            <>
            <div className='container my-2'>
                <h2>This is latest News</h2>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                    >
                <div className="row">
                    
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                        </div>
                    </InfiniteScroll>
                


            </div>
            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pagesize: 5,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
