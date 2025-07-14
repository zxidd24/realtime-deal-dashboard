# SQL文件导入完整指南

## 🎯 概述
本指南涵盖了在Mac上使用MySQL数据库和Sequel Ace导入SQL文件的完整流程。

## 📁 项目文件结构
```
Database/
├── sql_files/                    # SQL文件目录
│   ├── example.sql              # 基础示例
│   ├── test_data.sql            # 测试数据
│   ├── template.sql             # SQL模板
│   ├── demo_import.sql          # 演示导入
│   └── complete_demo.sql        # 完整演示
├── backups/                     # 备份文件目录
├── run_sql.sh                   # SQL执行脚本
├── backup_database.sh           # 备份脚本
├── restore_database.sh          # 恢复脚本
├── sequel_ace_queries.sql       # Sequel Ace查询集合
├── Sequel_Ace_导入SQL指南.md     # 详细导入指南
└── README.md                    # 项目说明
```

## 🔧 数据库连接信息
- **主机**: 127.0.0.1
- **端口**: 3306
- **用户名**: root
- **密码**: Root@123456
- **数据库**: my_database

## 📊 当前数据库内容

### 表 (Tables)
1. **users** - 用户表
2. **products** - 产品表
3. **orders** - 订单表
4. **categories** - 分类表
5. **employees** - 员工表
6. **projects** - 项目表
7. **employee_projects** - 员工项目关联表
8. **employee_audit_log** - 员工审计日志表
9. **demo_table** - 演示表

### 视图 (Views)
1. **demo_view** - 演示视图
2. **employee_project_view** - 员工项目视图
3. **department_stats_view** - 部门统计视图
4. **project_stats_view** - 项目统计视图

### 存储过程 (Procedures)
1. **GetDepartmentEmployees** - 获取部门员工
2. **GetProjectTeam** - 获取项目团队

### 触发器 (Triggers)
1. **employee_salary_update** - 员工薪资更新触发器

## 🚀 导入方法

### 方法一：使用脚本导入（推荐）
```bash
# 导入基础示例
./run_sql.sh my_database sql_files/example.sql

# 导入测试数据
./run_sql.sh my_database sql_files/test_data.sql

# 导入完整演示
./run_sql.sh my_database sql_files/complete_demo.sql
```

### 方法二：MySQL命令行导入
```bash
# 直接导入
mysql -u root -pRoot@123456 my_database < sql_files/your_file.sql

# 使用SOURCE命令
mysql -u root -pRoot@123456 -e "USE my_database; SOURCE sql_files/your_file.sql;"
```

### 方法三：Sequel Ace导入
1. 打开Sequel Ace
2. 连接到数据库
3. 点击 "Query" 标签页
4. 点击 "Open" 按钮
5. 选择SQL文件
6. 点击 "Run" 执行

## 💾 备份和恢复

### 备份数据库
```bash
./backup_database.sh my_database
```

### 恢复数据库
```bash
./restore_database.sh my_database backups/my_database_backup_20250714_103019.sql
```

## 🔍 验证导入结果

### 查看所有表
```sql
SHOW TABLES;
```

### 查看表数据
```sql
SELECT * FROM employees;
SELECT * FROM projects;
SELECT * FROM employee_project_view;
```

### 查看表结构
```sql
DESCRIBE employees;
SHOW CREATE TABLE projects;
```

## 📈 常用查询示例

### 员工统计
```sql
SELECT 
    department,
    COUNT(*) as employee_count,
    AVG(salary) as avg_salary
FROM employees
GROUP BY department;
```

### 项目分析
```sql
SELECT 
    p.name,
    p.status,
    p.budget,
    COUNT(ep.employee_id) as team_size
FROM projects p
LEFT JOIN employee_projects ep ON p.id = ep.project_id
GROUP BY p.id, p.name, p.status, p.budget;
```

### 复杂关联查询
```sql
SELECT 
    e.name as employee_name,
    p.name as project_name,
    ep.role,
    e.salary
FROM employees e
JOIN employee_projects ep ON e.id = ep.employee_id
JOIN projects p ON ep.project_id = p.id
WHERE e.salary > 7000
ORDER BY e.salary DESC;
```

## ⚠️ 注意事项

### 1. 文件编码
- 确保SQL文件使用UTF-8编码
- 避免使用特殊字符

### 2. 权限问题
- 确保用户有足够权限
- 检查数据库是否存在

### 3. 数据冲突
- 导入前检查表是否已存在
- 使用 `CREATE TABLE IF NOT EXISTS`
- 使用 `INSERT IGNORE` 避免重复数据

### 4. 性能考虑
- 大文件建议分批导入
- 导入前创建索引
- 使用事务包装大量操作

## 🛠️ 故障排除

### 常见错误及解决方案

1. **Access denied**
   ```bash
   mysql -u root -pRoot@123456 -e "SHOW GRANTS FOR 'root'@'localhost';"
   ```

2. **Database doesn't exist**
   ```bash
   mysql -u root -pRoot@123456 -e "CREATE DATABASE IF NOT EXISTS my_database;"
   ```

3. **Syntax error**
   - 检查SQL语法
   - 使用 `mysql --verbose` 查看详细错误

4. **Character set issues**
   ```bash
   mysql -u root -pRoot@123456 --default-character-set=utf8mb4 my_database < your_file.sql
   ```

## 🎉 成功标志

导入成功的标志：
- ✅ 脚本执行无错误
- ✅ 表创建成功
- ✅ 数据插入成功
- ✅ 视图创建成功
- ✅ 存储过程创建成功
- ✅ 触发器创建成功

## 📞 下一步

1. **在Sequel Ace中探索数据**
2. **执行复杂查询**
3. **创建自定义SQL文件**
4. **设置定期备份**
5. **优化数据库性能**

---

**恭喜！您已经成功掌握了SQL文件导入的完整流程！** 🎊 