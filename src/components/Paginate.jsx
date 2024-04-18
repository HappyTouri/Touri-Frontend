import { FirstPage } from "@material-ui/icons";
import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

export default function Paginate({ list }) {
  const recordsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = list.slice(firstIndex, lastIndex);
  const npage = Math.ceil(list.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const handelPage = (n) => {
    setCurrentPage(n);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Pagination className="pagination mb-0">
        <Pagination.Item onClick={prePage}>Previous</Pagination.Item>

        {numbers.map((n, index) => (
          <Pagination.Item
            key={index}
            onClick={() => handelPage(n)}
            className={`page-item ${currentPage === n ? "active" : ""} `}
            // {...(currentPage === n ? "active" : null)}
          >
            {n}
          </Pagination.Item>
        ))}

        <Pagination.Item onClick={nextPage}>Next</Pagination.Item>
      </Pagination>
    </>
  );
}
