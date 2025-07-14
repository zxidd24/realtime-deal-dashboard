# Sequel Ace 使用指南

## 连接数据库

### 方法一：手动添加连接
1. 打开 Sequel Ace
2. 点击 "New Connection" 或 "+" 按钮
3. 填写连接信息：
   - **Name**: 本地MySQL数据库
   - **Host**: 127.0.0.1
   - **Port**: 3306
   - **Username**: root
   - **Password**: Root@123456
   - **Database**: my_database
4. 点击 "Test Connection" 测试连接
5. 点击 "Connect" 连接数据库

### 方法二：使用连接字符串
```
mysql://root:Root@123456@127.0.0.1:3306/my_database
```

## 主要功能

### 1. 查看数据库结构
- 左侧边栏显示所有数据库
- 点击 `my_database` 展开查看表
- 右键表名可以查看表结构、数据等

### 2. 查看表数据
- 双击表名或右键选择 "Table Content"
- 可以查看、编辑、删除数据
- 支持排序和筛选

### 3. 执行SQL查询
- 点击 "Query" 标签页
- 输入SQL语句
- 点击 "Run" 或按 Cmd+R 执行

### 4. 常用SQL查询示例

#### 查看所有表
```sql
SHOW TABLES;
```

#### 查看表结构
```sql
DESCRIBE users;
-- 或
SHOW CREATE TABLE users;
```

#### 查看表数据
```sql
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM categories;
```

#### 复杂查询示例
```sql
-- 查看用户订单详情
SELECT 
    u.username,
    p.name as product_name,
    o.quantity,
    o.total_price,
    o.status,
    o.order_date
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id
ORDER BY o.order_date DESC;
```

#### 统计查询
```sql
-- 统计每个用户的订单总金额
SELECT 
    u.username,
    COUNT(o.id) as order_count,
    SUM(o.total_price) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username;
```

## 实用功能

### 1. 导出数据
- 右键表名 → "Export"
- 支持 CSV、JSON、SQL 等格式

### 2. 导入数据
- 右键表名 → "Import"
- 支持从文件导入数据

### 3. 备份数据库
- 右键数据库名 → "Export"
- 选择 "Structure and Data"

### 4. 执行SQL文件
- 点击 "Query" 标签页
- 点击 "Open" 按钮
- 选择您的 .sql 文件
- 点击 "Run" 执行

## 快捷键
- **Cmd+R**: 执行查询
- **Cmd+S**: 保存查询
- **Cmd+T**: 新建查询标签页
- **Cmd+W**: 关闭标签页
- **Cmd+Shift+R**: 刷新数据

## 注意事项
1. 确保MySQL服务正在运行
2. 密码在连接时会显示，注意安全
3. 建议定期备份重要数据
4. 在生产环境中谨慎使用删除操作

## 故障排除
如果连接失败：
1. 检查MySQL服务是否运行：`brew services list | grep mysql`
2. 检查端口是否被占用：`lsof -i :3306`
3. 确认密码是否正确
4. 检查防火墙设置 