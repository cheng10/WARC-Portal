/**
 * Documents static class
 */
export default class ApiDocs
{
    static getDocs(action)
    {
        console.log("action", action);
        let list = [];
        return fetch(`http://192.168.33.10:8000/documents/?page=${action}`).then((res) => {
            return res.json();
        }).then((list) => {
            console.log(list)
            return list;
        });
    }

    static addUser(action) {
        const encode= (params) => {
            let formBody = []
            for (var property in params) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            return formBody;
        }
        
        let users = [];
        return fetch('http://rest.learncode.academy/api/learncode/friends', ({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encode({
                username: action.username,
                drink: action.drink
            })
        })
        )
    }
}
