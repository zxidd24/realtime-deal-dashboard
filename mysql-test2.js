const express=require('express');
const WebSocket=require('ws');
const mysql=require("mysql2");

const app=express();
app.use(express.static(__dirname));
const port=3000;
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Root@123456',
    database:'my_database'
})
db.connect((err) => {
    if (err) {
        console.error('数据库连接失败:', err.message);
    } else {
        console.log('数据库连接成功');
    }
});
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:3000/index-test2.html`);
});
// WebSocket服务器
const wss = new WebSocket.Server({ server });
const table_show=`
SELECT
    left(sys_article.village_code,6) as "区代码",
    sys_organization.name AS "街道",
    pt_pro_cq_type.name AS "项目类别", 
    sum(sys_article.amount) AS "成交金额",
    sum((SELECT count(pt_pro_tenders.pro_id) 
     from pt_pro_tenders 
     WHERE pt_pro_tenders.pro_id=sys_article.pro_id AND 
        pt_pro_tenders.status NOT IN (0,12) AND 
        pt_pro_tenders.loss_tenders_reason is NULL)) AS "成交笔数"
FROM
    sys_article
    LEFT JOIN
    (
        SELECT
            pt_pro_tenders.pro_id
        FROM
            pt_pro_tenders
        WHERE
            pt_pro_tenders.status <> 0 
        GROUP BY
            pt_pro_tenders.pro_id
    ) AS pt_pro_tenders
    ON 
        sys_article.pro_id = pt_pro_tenders.pro_id
    LEFT JOIN
    (
        SELECT
            *
        FROM
            pt_pro_cq_type
        WHERE
            pt_pro_cq_type.pid=0
    ) AS pt_pro_cq_type
    ON 
        sys_article.pro_type = pt_pro_cq_type.code
  left JOIN
  (
   SELECT 
    sys_organization.code,sys_organization.name,sys_organization.pid
   FROM
    sys_organization
   WHERE
    (LENGTH(sys_organization.code)=9 or 
    LENGTH(sys_organization.code)=6) AND
    sys_organization.code like '6101%'
  ) as sys_organization
  ON
   left(sys_article.village_code,9)=sys_organization.code
WHERE
    sys_article.article_title LIKE '%成交公示' AND
   sys_article.village_code like '6101%' 
GROUP BY
 left(sys_article.village_code,6) ,
 left(sys_article.village_code,9), 
 sys_organization.name,
 pt_pro_cq_type.name
 ORDER BY left(sys_article.village_code,6)
`;

//创建临时表


wss.on('connection', (ws) => {
    console.log('Client connected');

    // 定义SQL查询语句
    setInterval(() => {
        db.query(table_show, (err, results) => {
            if (err) {
                console.log("Query failed", err.message);
                return;
            }
            console.log('SQL查询成功，返回记录数:', results.length);
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(results));
                }
            });
        });
    }, 5000);

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});


