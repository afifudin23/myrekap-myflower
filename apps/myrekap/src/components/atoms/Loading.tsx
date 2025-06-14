function Loading() {
    return (
        <div className="flex fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 justify-center items-center">
            <div className="animate-spin rounded-full h-52 w-52 border-b-4 border-blue-500"></div>
        </div>
    );
}

export default Loading;
