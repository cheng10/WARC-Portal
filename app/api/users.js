/**
 * API Users static class
 */
export default class ApiUsers
{
    static getList(action)
    {
        let users = [];
        return fetch('http://rest.learncode.academy/api/learncode/friends').then((res) => {
            return res.json();
        }).then((list) => {
            console.log(list)
            list.forEach((person, i) => {
                if (person.name && person.drink && person.id) {
                    users.push({
                        id: i,
                        username: person.name,
                        drink: person.drink
                    });
                }
            });
            console.log(users)
            return users;
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
