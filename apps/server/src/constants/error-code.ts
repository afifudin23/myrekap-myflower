export enum ErrorCode {
    // User
    USER_NOT_FOUND = 1001,
    PASSWORD_MISMATCH = 1002,
    INVALID_PASSWORD = 1003,
    USER_ALREADY_EXISTS = 1004,
    FIRST_USER_MUST_BE_SUPERADMIN = 1005,
    INVALID_TOKEN = 2003,
    EMAIL_ALREADY_VERIFIED = 1006,
    EMAIL_NOT_VERIFIED = 1007,

    // Access Control
    UNAUTHORIZED = 2001,
    FORBIDDEN = 2002,

    // Order
    ORDER_NOT_FOUND = 3001,
    ORDER_PRINT_FAILED = 3002,
    ORDER_PRINT_HTML_NOT_FOUND = 3003,
    FINISHED_PRODUCT_ADD_FAILED = 3004,
    FINISHED_PRODUCT_NOT_FOUND = 3005,
    ORDER_MUST_CONTAIN_ITEMS = 3006,
    ORDER_NOT_IN_PROCESS = 3007,
    FAILED_TO_CREATE_ORDER = 3008,
    ORDER_ITEM_NOT_FOUND = 3009,

    // Product
    PRODUCT_CREATE_FAILED = 4001,
    PRODUCT_NOT_FOUND = 4002,
    PRODUCT_UPDATE_FAILED = 4003,
    PRODUCT_NAME_DUPLICATE = 4004,
    PRODUCT_NOT_ACTIVE = 4005,
    REVIEW_PRODUCT_NOT_FOUND = 4006,
    REVIEW_ALREADY_EXISTS = 4007,
    STOCK_NOT_ENOUGH = 4008,

    // Cart Item
    CART_ITEM_NOT_FOUND = 5001,

    // Transaction
    MIDTRANS_CREATE_TRANSACTION_ERROR = 6001,
    MIDTRANS_CANCEL_TRANSACTION_ERROR = 6002,
    MIDTRANS_REFUND_TRANSACTION_ERROR = 6003,
    MIDTRANS_EXPIRE_TRANSACTION_ERROR = 6004,

    // Invalid Data
    UNPROCESSABLE_ENTITY = 8001,

    // Internal Exception
    INTERNAL_EXCEPTION = 9001,
}

export default ErrorCode;
