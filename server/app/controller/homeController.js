class homeController{
    async index(req,res){
        res.render('home',{
            title:"Home Page"
        })
    }
}
module.exports=new homeController()