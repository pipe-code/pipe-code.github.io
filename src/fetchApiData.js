const fetchApiData = (section, handleData) => {
    fetch('https://pipe-code-api.herokuapp.com/' + section)
    .then(res => res.json())
    .then(response => {
        handleData({
            status: 'success',
            data: response
        })
    })
    .catch(err => {
        handleData({
            status: 'error',
            data: err
        })
    });
}

export default fetchApiData;