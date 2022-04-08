### Delete local branch

```shell
git checkout master 
git branch | grep -v 'master' | xargs git branch -D
```

then, use

```shell
git checkout --no-guess [branch]
```

to checkout to local branch. (with `tab` completion)

### Create-react-app project to generate gh-pages

In `package.json`, add

```json
"homepage": "./"
```

then,

```shell
git checkout -b build
yarn build
```

comment `/build` in  `.gitignore` , then

```shell
git add .
git commit -m "build"
git subtree push --prefix=build origin gh-pages
```

---

### git clone 太慢

解决方法：给 git 配置代理

  - 自己电脑：git config --global http.https://github.com.proxy socks5://127.0.0.1:1086
  - 公司电脑：git config --global http.https://github.com.proxy https://proxy2.intsig.net:10081
  - 取消设置代理：git config --global --unset http.proxy

---

`git-message` 可以用于配置 `git commit` 统一提交格式

---

拖了很久的 Git 学习，本周终于安排上了。`https://learngitbranching.js.org/` 是一个非常好玩的 Git 学习网站。

- `git describe <ref>`：描述离你最近的锚点（也就是标签 `tag`)。
  - `<ref>` 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会以你目前所检出的位置（HEAD）。
  - 输出的结果：`<tag>_<numCommits>_g<hash>`。`tag` 表示的是离 `ref` 最近的标签， `numCommits` 是表示这个 `ref` 与 `tag` 相差有多少个提交记录， `hash` 表示的是你所给定的 `ref` 所表示的提交记录哈希值的前几位。当 `ref` 提交记录上有某个标签时，则只输出标签名称
- `git pull` = `fetch` + `merge`; `git pull --rebase` = `fetch` + `rebase`
- 操作符 `^`：不仅可以指定向上返回一代，其后还可以接数字，当父节点有多个导致有多条返回路径可以选择时使用。
- `git revert`：与 `git reset` 一样，可以回到之前的提交，但不同的是 reset 是直接返回，revert 是复制之前的提交到当前提交之后。
- `git checkout -b [本地分支] [远程分支]` 用于远程跟踪分支。
- `git push origin <source>:<destination>` 和 `git fetch origin <source>:<destination>` 用来处理本地和远程仓库分支名称不同的情况，但特别的是，`git push origin :<destination>` 会删除远程仓库中的分支，`git fetch origin :<destination>` 会在本地创建一个新的分支。

---

### 关于 Git 的一些小知识

本地开发在自己的分支，要同步 master 的代码应该怎么做？

```shell
# rebase
git pull -r origin master

# merge
git pull origin master
```