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
    res.redirect(`/list`)
})

app.get(`/list`,(rep,res) => {
    res.render(path+"/list.html",{
        userList
    })

})
app.get(`/view`,(rep,res) => {
    
})
app.post(`/view`,(rep,res) => {
   
    
})
app.get(`/modify`,(rep,res) => {
    console.log(`모디파이 잘 열렸는지 확인`);
})