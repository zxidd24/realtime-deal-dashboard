# Sequel Ace 导入SQL文件指南

## 方法一：在Sequel Ace中直接导入

### 步骤：
1. **打开Sequel Ace并连接到数据库**
   - 使用连接信息：127.0.0.1:3306, root/Root@123456

2. **打开Query标签页**
   - 点击 "Query" 标签页
   - 或者按 Cmd+T 新建查询标签页

3. **导入SQL文件**
   - 点击工具栏中的 "Open" 按钮（文件夹图标）
   - 或者使用快捷键 Cmd+O
   - 选择您要导入的 .sql 文件
   - 文件内容会显示在查询编辑器中

4. **执行SQL文件**
   - 点击 "Run" 按钮（播放图标）
   - 或者按 Cmd+R 执行
   - 或者选择部分SQL语句后按 Cmd+R 执行选中的部分

## 方法二：使用终端命令行导入

### 导入到特定数据库：
```bash
# 导入到 my_database
mysql -u root -pRoot@123456 my_database < sql_files/your_file.sql

# 使用我们的脚本
./run_sql.sh my_database sql_files/your_file.sql
```

### 导入到默认数据库：
```bash
# 先指定数据库，再导入
mysql -u root -pRoot@123456 -e "USE my_database; SOURCE sql_files/your_file.sql;"
```

## 方法三：在Sequel Ace中逐段执行

### 步骤：
1. 打开SQL文件内容
2. 选择要执行的SQL语句
3. 按 Cmd+R 执行选中的部分
4. 重复步骤2-3直到执行完整个文件

## 方法四：使用Sequel Ace的批量导入功能

### 步骤：
1. 右键点击数据库名
2. 选择 "Import"
3. 选择 "SQL File"
4. 选择您的 .sql 文件
5. 点击 "Import" 开始导入

## 常用导入命令示例

### 导入示例文件：
```bash
# 导入基础示例
./run_sql.sh my_database sql_files/example.sql

# 导入测试数据
./run_sql.sh my_database sql_files/test_data.sql

# 导入模板文件
./run_sql.sh my_database sql_files/template.sql
```

### 在Sequel Ace中执行查询集合：
1. 打开 `sequel_ace_queries.sql`
2. 选择要执行的查询
3. 按 Cmd+R 执行

## 注意事项

### 1. 文件编码
- 确保SQL文件使用UTF-8编码
- 避免使用特殊字符

### 2. 文件大小
- 大文件建议分批导入
- 可以使用 `--max_allowed_packet` 参数调整

### 3. 错误处理
- 导入前建议备份数据库
- 检查SQL语法是否正确
- 注意外键约束

### 4. 权限问题
- 确保用户有足够的权限
- 检查数据库是否存在

## 故障排除

### 常见错误及解决方案：

1. **Access denied**
   ```bash
   # 检查用户权限
   mysql -u root -pRoot@123456 -e "SHOW GRANTS FOR 'root'@'localhost';"
   ```

2. **Database doesn't exist**
   ```bash
   # 创建数据库
   mysql -u root -pRoot@123456 -e "CREATE DATABASE IF NOT EXISTS my_database;"
   ```

3. **Syntax error**
   - 检查SQL文件语法
   - 使用 `mysql --verbose` 查看详细错误信息

4. **Character set issues**
   ```bash
   # 设置字符集
   mysql -u root -pRoot@123456 --default-character-set=utf8mb4 my_database < your_file.sql
   ```

## 最佳实践

1. **导入前备份**
   ```bash
   mysqldump -u root -pRoot@123456 my_database > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **测试导入**
   - 先在测试数据库导入
   - 确认无误后再导入生产数据库

3. **分批导入**
   - 大文件可以分割成小文件
   - 逐个导入避免超时

4. **记录导入日志**
   - 记录导入的文件和时间
   - 保存导入结果 