import React from 'react';
import { Pagination } from 'react-bootstrap';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <Pagination className="mb-0">
        {/* Previous Button */}
        <Pagination.Prev
          onClick={onPrevious}
          disabled={!hasPreviousPage}
        >
          Anterior
        </Pagination.Prev>

        {/* Page Info */}
        <Pagination.Item active>
          {currentPage} de {totalPages}
        </Pagination.Item>

        {/* Next Button */}
        <Pagination.Next
          onClick={onNext}
          disabled={!hasNextPage}
        >
          Siguiente
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
