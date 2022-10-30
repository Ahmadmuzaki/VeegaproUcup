export const configApi = {
    headers: {
        'Authorization': 'Bearer' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}