# MySQL数据库管理

## 数据库信息
- **主机**: localhost
- **端口**: 3306
- **用户名**: root
- **密码**: Root@123456

## 现有数据库
- `cjgs` - 原有数据库
- `my_database` - 新创建的数据库

## 使用方法

### 1. 连接数据库
```bash
mysql -u root -pRoot@123456
```

### 2. 查看所有数据库
```sql
SHOW DATABASES;
```

### 3. 使用特定数据库
```sql
USE my_database;
```

### 4. 查看表
```sql
SHOW TABLES;
```

### 5. 执行SQL文件
使用提供的脚本：
```bash
./run_sql.sh [数据库名] [SQL文件路径]
```

示例：
```bash
# 执行基础示例
./run_sql.sh my_database sql_files/example.sql

# 执行测试数据
./run_sql.sh my_database sql_files/test_data.sql

# 执行模板文件
./run_sql.sh my_database sql_files/template.sql
```

### 6. 直接执行SQL命令
```bash
mysql -u root -pRoot@123456 my_database -e "SELECT * FROM users;"
```

### 7. 使用Sequel Ace可视化管理
1. 打开Sequel Ace应用
2. 创建新连接：
   - Host: 127.0.0.1
   - Port: 3306
   - Username: root
   - Password: Root@123456
   - Database: my_database
3. 连接后可以：
   - 查看表结构和数据
   - 执行SQL查询
   - 导入/导出数据
   - 可视化编辑数据

详细使用指南请查看 `Sequel_Ace_使用指南.md`

## 文件结构
```
Database/
├── sql_files/          # SQL文件目录
│   ├── example.sql     # 基础示例SQL文件
│   ├── test_data.sql   # 测试数据SQL文件
│   └── template.sql    # SQL文件模板
├── sequel_ace_queries.sql  # Sequel Ace查询集合
├── Sequel_Ace_使用指南.md   # Sequel Ace详细使用指南
├── sequel_ace_connection.json # 连接配置
├── run_sql.sh          # SQL执行脚本
├── mysql-test2.js      # Node.js测试文件
└── README.md           # 说明文档
```

## 注意事项
- 密码在命令行中显示会有安全警告，这是正常的
- 建议在生产环境中使用更安全的密码管理方式
- SQL文件请放在 `sql_files/` 目录中

## 快速开始
1. 复制 `sql_files/template.sql` 为您的SQL文件
2. 修改SQL文件内容
3. 使用 `./run_sql.sh my_database sql_files/your_file.sql` 执行

## 数据库表结构
当前 `my_database` 包含以下表：
- `users` - 用户表
- `products` - 产品表
- `orders` - 订单表
- `categories` - 分类表 