import classNames from "classnames";
import { createSearchParams, Link } from "react-router-dom";

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page

[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

1 2 ... 4 5 [6] 8 9 ... 19 20

1 2 ...13 14 [15] 16 17 ... 19 20


1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */

const RANGE = 2;

export default function Pagination({ queryParams, totalPages: pageSize, pathname }) {
  const page = Number(queryParams.pageNo || 1);

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span key={index} className="mx-2 rounded border bg-white px-3 py-2 shadow-sm">
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span key={index} className="mx-2 rounded border bg-white px-3 py-2 shadow-sm">
            ...
          </span>
        );
      }
      return null;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        // Điều kiện để return về ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index);
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index);
        }

        return (
          <Link
            to={{
              pathname: pathname,
              search: createSearchParams({
                pageNo: pageNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={classNames("mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm", {
              "!border-cyan-500": pageNumber === page,
              "border-transparent": pageNumber !== page,
            })}
          >
            {pageNumber}
          </Link>
        );
      });
  };

  let content = "";
  if (pageSize === 0) {
    content = <div className="flex justify-center text-red-500">Không có đánh giá nào</div>;
  } else {
    content = (
      <div className="mt-6 flex flex-wrap justify-center">
        {page === 1 ? (
          <span className="mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm">Prev</span>
        ) : (
          <Link
            to={{
              pathname: pathname,
              search: createSearchParams({
                ...queryParams,
                pageNo: (page - 1).toString(),
              }).toString(),
            }}
            className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
          >
            Prev
          </Link>
        )}

        {renderPagination()}
        {page === pageSize ? (
          <span className="mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm">Next</span>
        ) : (
          <Link
            to={{
              pathname: pathname,
              search: createSearchParams({
                ...queryParams,
                pageNo: (page + 1).toString(),
              }).toString(),
            }}
            className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
          >
            Next
          </Link>
        )}
      </div>
    );
  }
  return <>{content}</>;
}
