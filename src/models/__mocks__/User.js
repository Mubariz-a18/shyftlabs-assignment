module.exports = {
    create:() => {
        return { token:"abcdef" }
    },
    findOne:({where}) =>{
        if(where.email == "mubariz1@abc.com"){

            return {
                id:10,
                username: "mubariz123",
                email: "mubariz1@abc.com",
                password: "password"
            }
        } else if ( where.email == "imran7@gmail.com") {
            return {
                id: "1",
                username: "imran",
                email: "imran@gmail.com",
                password: "password"
            }
        } else if ( where.email == "test@example.com") {
            return {
                id: "1",
                email: "test@example.com",
                password: "123456"
            }
        } 
        else return null;
    }
}