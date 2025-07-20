import { OrderList } from "@/components/organisms/orders";
import { useState } from "react";

// interface PaginationProps {
//     orders: any[];
//     itemsPerPage: number;
// }

const OrderPagination = ({ orders, itemsPerPage }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const getVisiblePages = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 2) {
            return [1, 2, 3, "..."];
        }

        if (currentPage >= totalPages - 1) {
            return ["...", totalPages - 2, totalPages - 1, totalPages];
        }

        return ["...", currentPage - 1, currentPage, currentPage + 1, "..."];
    };

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = orders.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="">
            {/* List Data */}
            <OrderList orders={currentData} />

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 my-28">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>

                {getVisiblePages().map((page, idx) =>
                    typeof page === "number" ? (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded ${
                                page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={idx} className="px-3 py-1 text-gray-500">
                            ...
                        </span>
                    )
                )}

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OrderPagination;
