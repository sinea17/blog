---
title: Git操作笔记
date: 2018-06-16
---

# Git 操作笔记

- 克隆 `git clone {remote url}`
- 配置信息
  ```base
  git config --global user.email "你的邮箱"
  git config --global user.name "你的名字"
  ```
- 跟踪 `git add {文件名,如 abc.txt}`（添加到暂存区）
- 取消跟踪 `git reset HEAD {文件名}`
- 查看暂存 `git status`
- 生成版本 `git commit -m "备注"`（记录一个版本，并清空跟踪文件列表）
- 查看 remote url `git remote -v`（如果地址是 git 开头则表示是 git 协议）
- 撤销修改 `git checkout -- {文件名}`（未跟踪）
- 撤销新建文件 `git clean -f {文件名}`
- 撤销新建文件夹 `git clean -df {文件夹名}`
- 查看日志 `git log`
- 分支操作
  - 查看分支 `git branch`
  - 查看本地和远程分支 `git branch -a`
  - 创建分支 `git branch {分支名}`
  - 切换分支 `git checkout {分支名}`
  - 创建并切换分支 `git checkout -b {分支名}`
  - 删除分支 `git branch -D {分支名}`（先切换到其他分支）
  - 合并分支到当前分支 `git merge {分支名}`
  - 上传分支 `git push origin {分支名}`
  - 下拉分支 `git pull origin {分支名}`
- 版本
  - 查看以往版本号 `git reflog`（本地的 commit）
  - 回退至上一个版本 `git reset --hard HEAD`
  - 回退至指定版本 `git reset --hard HEAD@{5}`
- 标签
  - 查看所有标签 `git tag`（按字母排序）
  - 查看标签 `git show {标签名}`
  - 创建标签 `git tag {标签名} -m "说明"`
  - 删除本地标签 `git tag -d {标签名}`
  - 删除远程标签 `git push origin --delete {标签名}`
  - 为之前的 commit 和 merged 打标签 `git tag {标签名} {commit id}`
  - 上传标签 `git push origin {标签名}`
  - 上传所有标签 `git push origin --tags`

> 工作区、暂存区、版本库

### 代码同步不用验证身份（不账号输入密码）

1. 本地记住密码 `git config --global credential.helper store`
2. 使用 ssh 密钥
   1. 生成密钥
      - 生成 `ssh-keygen -t rsa -C "你的邮箱"`(不设置密码可直接 enter)
      - 查看 `cat ~/.ssh/id_rsa.pub`
   2. 设置远程仓库上的公钥，然后验证 `ssh -T git@github.com`
   3. remote url 选用 git 协议 `git remote set-url origin {remote url}`
