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
        } else if ( where.id == 1){
            return {
                id:1,
                title:"new post",
                content:"new post content",
                author_id: 10,
            }
        }
        else return null;
    },
    findByPk: (id)=>{
        if(id == 1){
            return {
                id:1,
                title:"new post",
                content:"new post content",
                author_id: 10,
                destroy: ()=>{
                    return true;
                }
    
            }
        
        }
        else if(id == 2){
            return {
                id:2,
                title:"new post",
                content:"new post content",
                author_id: 2,
                destroy: ()=>{
                    return false;
                }
            }
        }else if(id == 3){
            return {
                id:3,
                title:"new post",
                content:"new post content",
                author_id: 2
            }
        }
        else{
            return null
        }
    },
    update: ()=>{
        return true;
    },
    findAll:()=>{
        return [{
            id:1,
            title:"new post",
            content:"new post content",
            author_id: 10,
        },{
            id:2,
            title:"new post",
            content:"new post content",
            author_id: 11,
        },{
            id:3,
            title:"new post",
            content:"new post content",
            author_id: 13,
        }]
    }

}