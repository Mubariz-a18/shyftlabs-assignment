module.exports = {
    create:() => {
        return true;
    },
    findOne:({where}) =>{
        if(where.email == "mubariz1@abc.com"){

            return {
                id:10,
                username: "mubariz123",
                email: "mubariz1@abc.com",
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