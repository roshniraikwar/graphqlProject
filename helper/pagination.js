const paginationData = (currentPage, limit) => {
    currentPage = currentPage ? currentPage : 1,
    limit = limit ? limit : 10
    currentPage = parseInt(currentPage)
    limit = parseInt(limit);
    const offset = (currentPage - 1) * limit
    return {offset, limit}
}

module.exports = {
    paginationData
};
