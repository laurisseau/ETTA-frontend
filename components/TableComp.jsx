'use client';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CenterModal from './CenterModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
export default function TableComp({
  title,
  tableRows,
  data,
  search,
  rowsPerPage,
  addBar,
  tabletitle,
  modalbutton,
  createcategory,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // how data is filterd to search
  const filterData = () => {
    return data.filter((tableData) =>
      Object.values(tableData).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const totalPages = Math.ceil(filterData().length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filterData().slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationControls = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            currentPage === i
              ? 'text-center active pagination-btn pagination-btn-active'
              : 'pagination-btn '
          }
        >
          {i}
        </button>
      );
    }

    return (
      <div className="d-flex justify-content-center align-items-center mt-2">
        <button
          className="pagination-btn "
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
        </button>
        {pageNumbers}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
        </button>
      </div>
    );
  };

  function tableDataLoop(data) {
    const tableCells = [];
    for (let i = 0; i < tableRows.length; i++) {
      tableCells.push(
        <td key={i}>
          <div className="fw-normal p-3  mb-1">{data[tableRows[i]]}</div>
        </td>
      );
    }
    return tableCells;
  }

  return (
    <div className="pe-4 mt-3 mb-5">
      <h1 className="mt-3">{title}</h1>
      {search && (
        <div className="d-flex justify-content-end">
          <div className="input-group mb-3 rounded" style={{ width: '250px' }}>
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
      )}
      <Card className="table-responsive">
        <table className="">
          <thead>
            <tr className="text-center">
              {tableRows.map((tableHeaders, index) => (
                <th key={index} className="p-3 bg-light">
                  {tableHeaders}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="p-2">
            {currentData.map((tableData, index) => (
              <tr key={index} className="text-center border-bottom">
                {tableDataLoop(tableData)}
              </tr>
            ))}
          </tbody>
        </table>
        {addBar ? (
          <Link href={addBar}>
            <div className="text-center pt-1 add-hover">
              <FontAwesomeIcon className="fs-2" icon={faPlus} />
            </div>
          </Link>
        ) : (
          <div></div>
        )}
      </Card>
      {renderPaginationControls()}
    </div>
  );
}
