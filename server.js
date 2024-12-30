const express = require("express")
const nunjucks = require('nunjucks');
const app = express();
const path = __dirname +"/html";

app.set('view engine','html');
nunjucks.configure('html',{
    express:app,
})
app.use(express.urlencoded({ extended: true }));

const userList = [
    {
        id: 1,
        user_id: `rhgPtjd`,
        writer: `고혜성`,
        title: `241230 월별평가`,
        content: `열심히 하시는 모습 보기 좋습니다`,
        hit: 0, 
    }
];

app.get(`/create`,(req,res) => {
   res.sendfile(path + "/create.html")
})

app.post(`/create`,(req,res) => {
    const { writer, title, content} = req.body

    const index = userList[userList.length-1].id+1

    const user = {
        id: index,
        user_id: `rhgPtjd`,
        writer: writer,
        title: title,
        content: content,
        hit: 0, 
    }
    userList.push(user)
    res.redirect(`/list?id=${user.id}`)
})

app.get(`/list`,(req,res) => {
    const id = parseInt(req.query.id)

    res.render(path+"/list.html",{
        userList
    })
})
app.get(`/view/:id`,(req,res) => {
    const id =parseInt(req.params.id)
    const List = userList.find((value) => value.id === id);
    
    res.render(path+"/view.html",{
        List
    })
    
    
})

app.get(`/modify/:id`,(req,res) => {
    const id =parseInt(req.params.id)
    const List =userList.find((value)=> value.id === id);
    res.render(path+`/modify.html`,{
        List
    })
})
app.post(`/modify/:id`,(req,res) => {
    const id =parseInt(req.params.id);
    const {writer, title, content }= req.body
    const index =userList.findIndex((value)=> value.id === id);
    if(index === -1){
        res.status(404).send("아이디를 찾지 못하였습니다.")
    }
    userList[index].writer =writer
    userList[index].title = title
    userList[index].content = content
    res.redirect(`/list`)
})
app.post(`/delete/:id`,(req,res) => {
    const id =parseInt(req.params.id);
    const index =userList.findIndex((value)=> value.id === id);
    if(index === -1){
        res.status(404).send("아이디를 찾지 못하였습니다.")
    }

    console.log(userList);
    console.log(index);
    userList.splice(index,1)
    res.redirect(`/list`)
})




app.listen(3000,() => {
    console.log(`서버가 잘 열렸는지 확인`);
})