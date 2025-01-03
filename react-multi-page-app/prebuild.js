const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');

// 获取当前日期和时间
const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

// 读取 .env 文件内容
const envFilePath = path.join(__dirname, '.env');

// 读取 .env 文件内容，如果文件不存在则创建
let envContent = '';
if (fs.existsSync(envFilePath)) {
  envContent = fs.readFileSync(envFilePath, 'utf8');
} else {
  fs.writeFileSync(envFilePath, '', 'utf8');
}

// 解析 .env 文件内容，获取上一次的版本号
const previousVersion = envContent.match(/APP_VERSION=(\d*)/)?.[1] || 0;

// 将上一次的版本号转换为数字并自增
const incrementedVersion = parseInt(previousVersion) + 1;

// 构建新的版本号
const newVersion = incrementedVersion.toString();

// 构建要写入的内容
const newEnvContent = `BUILD_TIME=${buildTime}\nAPP_VERSION=${newVersion}`;

// 将新的内容写入到 .env 文件
fs.writeFileSync('.env', newEnvContent);