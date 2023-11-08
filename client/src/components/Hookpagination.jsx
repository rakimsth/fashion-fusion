import Pagination from "react-bootstrap/Pagination";
import { usePagination, DOTS } from "../hooks/usePagination";

export default function Hookpagination({
  total,
  limit,
  currentPage,
  setCurrentPage,
  setLimit,
}) {
  let active = currentPage;
  let items = [];

  const totalNumberOfPages = Math.ceil(total / limit);
  for (let number = 1; number <= totalNumberOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  return (
    <div className="flex d-flex justify-content-center">
      <div className="row">
        <div className="col">
          <Pagination>
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(1);
              }}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => {
                currentPage !== 1 ? setCurrentPage(currentPage - 1) : null;
              }}
            />
            {paginationRange.map((number, index) => {
              if (number === DOTS) {
                return <Pagination.Ellipsis key={`${index}-${number}`} />;
              }

              return (
                <Pagination.Item
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  active={currentPage === number}
                >
                  {number}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              disabled={currentPage === totalNumberOfPages}
              onClick={() => {
                currentPage === totalNumberOfPages
                  ? null
                  : setCurrentPage(currentPage + 1);
              }}
            />
            <Pagination.Last
              disabled={currentPage === totalNumberOfPages}
              onClick={() => {
                setCurrentPage(totalNumberOfPages);
              }}
            />
          </Pagination>
        </div>
        <div className="col-auto">
          <select
            value={limit}
            className="form-select"
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={4}>4</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
}
