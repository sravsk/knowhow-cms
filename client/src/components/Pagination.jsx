import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {}
    };
  }

  componentDidMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
        this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    var items = this.props.items;
    var pageSize = this.props.pageSize;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
        return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({
      pager: pager
    });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= pageSize) {
        startPage = 1;
        endPage = totalPages;
    } else {
      if (currentPage <= 6) {
          startPage = 1;
          endPage = pageSize;
      } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
      } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <div className="table">
        <ul className="pagination">
          <li className={pager.currentPage === 1 ? 'disabled' : ''}>
              <a onClick={() => this.setPage(1)}> &lt;&lt; </a>
          </li>
          <li className={pager.currentPage === 1 ? 'disabled' : ''}>
              <a onClick={() => this.setPage(pager.currentPage - 1)}> Previous </a>
          </li>
          {pager.pages.map((page, index) =>
             <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                  <a onClick={() => this.setPage(page)}>{page}</a>
              </li>
          )}
          <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
              <a onClick={() => this.setPage(pager.currentPage + 1)}> Next </a>
          </li>
          <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
              <a onClick={() => this.setPage(pager.totalPages)}> &gt;&gt; </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
