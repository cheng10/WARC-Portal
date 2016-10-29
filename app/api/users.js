/**
 * API Users static class
 */
export default class ApiUsers
{
    static getDocs(action) {
        let users = [];
        console.log("getDocs");
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
}
