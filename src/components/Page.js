import React from 'react';
import { NavLink } from 'react-router-dom';

import 'styles/page.scss';
import { Select, Option } from 'components/Selection';

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('images', false, /\.(png|jpe?g|svg)$/));


class Page extends React.PureComponent {
  render() {
    // console.log(this.props.match.params);


    const { chapter, page, totalChapter, totalPage, light } = this.state;
    const style = light ? {left: 0} : {left: '50%'};

    return (
      <div className="page">
        <div className="change-page-area">
          <h3>
            <NavLink to="/my_hexschool">My Hexschool</NavLink>
          </h3>
          <i className="fas fa-caret-right next-icon" />

          <Select value={chapter} onChange={this.onChapterChange}>
            {this.renderOptionArray(totalChapter, v => `Chapter ${v}`)}
          </Select>
          <Select value={page} onChange={this.onPageChange} className="page-select">
            {this.renderOptionArray(totalPage, v => `Page ${v < 10 ? '0' + v : v} `)}
          </Select>

          <div className="light-change-button">
            <i className="fas fa-sun"></i>
            <div onClick={this.toggleLight}>
              <span style={ style }></span>
            </div>
            <i className="far fa-moon"></i>
          </div>          
        </div>

        <div className="page-content-area">
          <img src={images[`storyboard-${page}.png`]} alt="comic" />
          <div className="prev-page-bar" disabled={page === 1} onClick={ () => this.onPageChange(page - 1)}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="next-page-bar" disabled={page === totalPage} onClick={() => this.onPageChange(page + 1)}>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>

        <div className="page-slider-area">
          <div className="page-slider">
          { this.renderPagePrewImages(page, totalPage) }
          </div>
        </div>
      </div>
    );
  }

  renderPagePrewImages = (page, totalPage) => {
    let res = [];
    for (let i=1; i<=totalPage; i++) {
      const className = (i === page) ? 'preview-page current' : 'preview-page';

      res.push(
        <div 
          key={i} 
          page-text={i < 10 ? '0' + i : i} 
          className={className}
          onClick={() => this.onPageChange(i)}
          >
          <img 
            src={images[`storyboard-${i}.png`]} 
            alt="prev-view-img"
            />
        </div> 
      );
    }

    return res;
  };

  renderOptionArray(totalNum, displayFunc) {
    let result = [];

    for (let i = 1; i <= totalNum; i ++) {
      result.push(<Option key={i} value={i}>{ displayFunc(i) }</Option>)
    };

    return result;
  }

  state = {
    chapter: +this.props.match.params.chapter.split('ch')[1],
    page: +this.props.match.params.page,
    totalChapter: 2,
    totalPage: 12,
    light: true
  };

  onChapterChange = (chapter) => this.setState({chapter});
  onPageChange = (page) => this.setState({ page });
  toggleLight = () => this.setState(prevState => ({light: !prevState.light}));


  componentDidMount() {
    // console.log('component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('component did update');
    const { page, chapter } = this.state;
    if (prevState.page !== page || prevState.chapter !== chapter) {
      const {history, match} = this.props;
      const {params} = match;
      const newHistory = '/' + [params.book, 'ch' + chapter, page].join('/');

      history.push(newHistory);
    }
  }
}

export default Page;

