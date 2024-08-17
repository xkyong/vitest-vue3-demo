# Vitest-Vue3-Demo

> 注：Vitest 需要 Vite >=v5.0.0 和 Node >=v18.0.0！

[![codecov](https://codecov.io/gh/XKyong/vitest-vue3-demo/graph/badge.svg?token=7USV1RKSZH)](https://codecov.io/gh/XKyong/vitest-vue3-demo)

### 相关资源

vitest 官方文档：https://cn.vitest.dev/

vue test utils 官方文档：https://test-utils.vuejs.org/

单元测试入门可参看：[阮一峰-测试框架 Mocha 实例教程](https://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

TODO案例：https://todomvc.com/，然后到 [todomvc-app-template](https://github.com/tastejs/todomvc-app-template) 中拷贝 `index.html` DOM 结构代码，到 [todomvc-app-css](https://github.com/tastejs/todomvc-app-css) 中拷贝 `index.css`  CSS 代码。

### 终端命令

```bash
# 启动本地服务
$ pnpm dev
# 运行测试
$ pnpm test
```

### 开发形式

TDD：先写测试用例，然后根据测试用例来编写实际代码！



## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
