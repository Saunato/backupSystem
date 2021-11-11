# 项目结构



# 单向数据流

<img src="C:\Users\86180\Downloads\未命名文件 (3).png" alt="未命名文件 (3)" style="zoom: 80%;" />

最终实现的效果是 App ，但在开发 App 的过程中 和 用户使用 App 的过程中，我认为数据的流向是正好`相反`的。

- Dev

在 Dev 环境下，首先在 Model 中定义并暴露 Interface，目的是限定变量类型；然后在 Component 中要 consume 之前定义的Model，表现在定义变量以及定义操纵变量的函数（逻辑），变量和函数都是为 UI 组件服务的，





# 技术选型

## mui

> ToolBar 和 AppBar
>
> 参考: https://stackoverflow.com/questions/52653103/what-is-appbar-vs-toolbar

`Toolbar` component uses `display: flex` and default`flex-direction: row`, which is to display its children with an `inline` display  (elements are placed next to each other)

 `AppBar` component uses `display: flex` and `flex-direction: column`, that means direct descendants are stacked on top of each other. 



> Box

作为一个Wrapper使用，本质上就是 `<div>`

Box有一个重要属性 `sx`，参考 https://mui.com/system/the-sx-prop/



> Tabs

选项卡，用作导航

参考：https://mui.com/zh/components/tabs/#main-content









## react-router

> useHistory

通过 `onClick={() => history.push('/xxx')}` 的方式，使得任意元素具有 `Link` 的作用



> v5 与 v6 实现动态路由的方式

v5：https://ui.dev/react-router-v5-route-config

v6：https://ui.dev/react-router-route-config/

