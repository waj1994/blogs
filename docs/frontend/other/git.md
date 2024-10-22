---
title: git常用命令
---

# {{$frontmatter.title}}

## 配置用户名和邮箱

```shell
git config --global user.name 'XXX'
git config --global user.emall 'xxx@xx.com'
# --global 全局
# --local 本项目
# --system 系统所有用户
```

## 查看配置的用户名密码

```shell
git config --list --global
```

## 初始化项目

```shell
# 已有项目
git init
# 没有项目
git init '项目名称'
```

## 远程仓库

```shell
# 添加远程仓库
git remote add origin '远程仓库地址'
# 查看所有远程仓库
git remote -v
# 删除远程仓库
git remote rm origin
# 修改远程仓库地址
git remote set-url origin '远程仓库地址'
# 增加一个备份远程仓库地址  当前项目中只能push不能pull
git remote set-url --add origin '远程仓库地址'
```

## 查看项目文件状态

```shell
git status
```

## 添加文件到暂存区

```shell
git add XXX XXX # 可以填写多个文件 或者文件夹
git add -u # 添加已经被git管理的文件的修改 已有文件的更新、删除
git add . # 将文件的修改，新增添加到暂存区
git add -A # 将文件的修改，删除，新建添加到暂存区
```

## 删除文件

```shell
git rm XXX # 注意：本地项目也会删除
```

## 暂存区合并到本地仓库

```shell
git commit -m 'XXXX' # 需要填写日志
git commit -am 'XXXX' # 工作区的内容直接合并到仓库（不推荐）
```

## 查看日志

```shell
git log # 查看所有日志
git log --oneline # 查看简洁日志   版本号+备注
git log -nX # 查看最近的几个日志  X：输入数字
git log --all # 所有的分支的所有日志
git log --graph # 图形化的
# 可以组合使用
```

## 变更文件名称

```shell
git mv <原名称> <新名称> # 修改后需要commit
```

## 分支

```shell
git branch -v # 查看分支
git checkout -b XXX # 创建分支
git branch -d XXX # 删除本地分支
git branch -D XXX # （强制）删除本地分支
git push origin --delete dev20181018 # 删除远程分支
```

## commit

```shell
git commit --amend  # 修改commit信息（vim用法）
git reset --hard # 即本次修改都会被复原清空(未commit的内容)
git reset --soft HEAD^ # 撤销最新的一次commit并恢复到暂存区
git reset --mixed HEAD^ # 撤销最新的commit并恢复到工作区
git reset --hard HEAD^ # 撤销最新的commit并放弃所有修改
```

## tag

```shell
git tag <tagName> # 创建本地tag
git push origin <tagName> # 推送某个tag
git push origin tags # 推送所有tag
git tag -a <tagName><commitId> # 基于某个commit创建tag
git tag # 查看本地所有tag
git show <tagName> # 查看某个tag具体信息
git tag -d <tagName> # 删除本地tag
git push origin :refs/tags/<tagName> # 删除远端tag
```

## stash

`git stash`命令用于暂时保存没有提交的工作,即未 commit 的都会保存到 stash。

```shell
git stash list # 查看stash列表
git stash # 保存到stash 系统会自动添加一个备注
git stash save "备注信息" # 保存到stash 手动添加备注
git stash pop # stash列表第一个恢复到工作区并从列表中删除
git stash pop stash@{index} # 指定恢复某个stash到工作区并从列表中删除
git stash apply # stash列表第一个恢复到工作区，不会从列表中删除记录
git stash apply stash@{index} # 指定恢复stash到工作区，不会从列表中删除记录
git stash drop stash@{index} # 从列表中删除某个存储
git stash clear # 清除存储列表中的所有stash
git stash show # 查看第一个stash的diff
git stash show -p # 查看第一个stash的全部diff（详细的）
git stash branch xxx # 将第一个stash创建新分支
```
