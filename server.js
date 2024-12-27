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

app.listen(3000,() => {
    console.log(`서버가 잘 열렸는지 확인`);
})

app.get(`/create`,(rep,res) => {
   res.sendfile(path+"/create.html")
    
})
app.post(`/create`,(rep,res) => {
    const { writer, title, content}=rep.body
    console.log(writer, title, content);
    const index = userList[userList.length-1].id

    const user = 
    {
        id: index+1,
        user_id: `rhgPtjd`,
        writer: writer,
        title: title,
        content: content,
        hit: 0, 
    }
    userList.push(user)
    res.redirect(`/list?id=${user.id}`)
    
})

app.get(`/list`,(rep,res) => {
    const id = parseInt(rep.query.id)

    res.render(path+"/list.html",{
        userList
    })
})
app.get(`/view/:id`,(rep,res) => {
    const id =parseInt(rep.params.id)
    console.log(id);
    const List = userList.find((value) => value.id === id);
    console.log(List);
    
    
    res.render(path+"/view.html",{
        List
    })
    
    
})

app.get(`/modify`,(rep,res) => {
    console.log(`모디파이 잘 열렸는지 확인`);
})