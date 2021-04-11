function report(message) {
    return (data) => {
        console.log(message, data || '');
    };
};

module.exports = report;