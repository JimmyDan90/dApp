# dapp demo

使用solidity react hooks truffle ganache web3 metamask 写的dapp demo

# 环境要求

- node 和 npm 最新稳定版本
- truffle 最新稳定版本
- ganache-cli 或者 ganache gui 工具
- Chrome 安装 metamask 插件钱包

# 步骤

1. cd client && npm install
2. 确保本地的模拟区块链 ganache 已启动并连接到当前项目的 truffle-config.js
3. 根目录下运行 truffle compile 编译合约
4. 根目录下运行 truffle migrate 部署合约到链上
