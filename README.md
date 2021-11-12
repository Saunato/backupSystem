这是一个基于React、Redux、React-Router的SPA Demo，可以作为一个敏捷开发项目的 Base

虽然只是 Base，但是作者为了方便后续开发，提供了动态路由，持久化redux等功能，并且提供了一些个人对 React 开发项目中 数据流 的小小想法。

## 单向数据流

<img src="C:\Users\86180\Downloads\未命名文件 (3).png" alt="未命名文件 (3)" style="zoom: 80%;" />

最终实现的效果是 App ，但在开发 App 的过程中 和 用户使用 App 的过程中，我认为数据的流向是正好`相反`的。

- Dev

在开发中，并不是一上来就构建 UI 界面的，我们拿到设计草图，会先限定数据类型，（比如一个 form 表单，我们会先想好用户提交上来的内容是什么类型的），所以首先在 Model 中定义并暴露 Interface，目的是限定变量类型；

然后在 Component 中 consume 之前定义的 Model（实现接口），表现在定义变量以及定义操纵变量的函数（逻辑）。而变量和函数都是为 UI 组件服务的，最终都要嵌入 React 的 View 层，变成 JSX 文件。

代码拆分是非常重要的，一个页面往往由多个 UI组件 构成，因此在 Page层面，我们 consume 之前定义的 Component ，只需要稍加布局，就能完成一个单页面。

最后是 App，App comsume 之前定义的 Page（根据 route 挂载）。

- Pred

而在生产环境中，用户感受到的数据流向是相反的，是自顶向下的数据流，用户在 page 中触发事件，从而改变了某个 state，state 通过 prop 的方式传递到 Component 从而改变 UI



## 技术选型

### mui

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









### react-router

> useHistory

通过 `onClick={() => history.push('/xxx')}` 的方式，使得任意元素具有 `Link` 的作用



> v5 与 v6 实现动态路由的方式

v5：https://ui.dev/react-router-v5-route-config

v6：https://ui.dev/react-router-route-config/







### redux

> redux

![image-20211112174545504](C:\Users\86180\AppData\Roaming\Typora\typora-user-images\image-20211112174545504.png)



> redux-persist

简单来说就是每次改变 redux 储存的 state，就更新 localStorage

ref: https://blog.bam.tech/developer-news/redux-persist-how-it-works-and-how-to-change-the-structure-of-your-persisted-store

有个坑就是，在定义 initState 时，不能写死数据，如`theme: 'dark'`，因为这样的话，页面一刷新，原先在 localStorage 中存好的数据就会被写死的数据替换，因此定义 initState 时要判断一下  localStorage 中是否存了数据，如果存过就用 localStorage 的数据初始化，如：

```ts
const initMode: object = {
  selectPanel: (
    window.localStorage.getItem('persist:persistSelectPanel') && JSON.parse(window.localStorage.getItem('persist:persistSelectPanel') as any).selectPanel
    ? JSON.parse(window.localStorage.getItem('persist:persistSelectPanel') as any).selectPanel
    : 'home'
  )
}
```









