
## 问题？
1. 同步函数，异步函数？
2. history模式配置？
3. html5 history API 是什么东西？
4. action 和 mutation 不同在哪儿？ done
5. 为什么 mutation 必须是同步函数？ done
6. 如何使用 mapMutations? done

## 4-1~4-2  0-19min

vue默认hash路由，是不会被搜索引擎解析，不利于SEO

 
 怎么配置history？  
 	
 	mode: 'history'  

 base: 基路径       一级路径都是 base 值
 	
 	表现形式为
 	localhost:8080/base/app
 	
 
 router-link 会渲染成 a 标签，给 a 标签添加的样式
 
 ``` 
 linkActiveClass    路径部分匹配时，如浏览器中路径为 a/b, path: /a 会匹配到
 linkExtractActiveClass   //当前路径和 router-link 中路径完全相同时候
 ```
  
  
  第10分钟~
  
  使用history mode注意点：	
  需要配置 webpack的 devServer	
  你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面
  
  ```
  //base路径和 output中的 publicPath 一致
  
  historyApiFallback: {
  	index: '/base/index.html'
  }
  
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  }

  ```
  
  
### 滚动行为！13min（面试的时候问道了，
  
  如何跳转到上次滚动位置		
  页面进行跳转，要不要进行页面滚动		
  当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
  
  默认情况，每次回滚动到页面顶部。
  
  第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  
  
```
// 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
scrollBehavior(to, from, savedPostion){
	if(savedPostion) {
		return savedPostion
	}
	else {
		return {x:0, y:0}
	}
}
```
  
fallback: true
	
	如果浏览器不支持 history方式，我们自动转为 hash 模式
	
## 4-3  Vue-router之路由参数传递  20min~  


路由要name有啥用：  
可以代替 path进行路由跳转 

```	
{
  	path: '/app',
  	component: Todo,
  	name: 'app'
 }

  
// 当传对象时候，不是字符串，所以是 :to
<router-link :to="{name: 'app'}">
<router-link to="/app">
``` 
 
    
路由对象,和路由没啥关系的信息，放在meta中
在 route 对象的meta属性中可以拿到

``` 
  mata: {
  	title: 'this ia app',
  	description: 'abcd'
  }
```  

children: 和 routers 配置是一样的

> 条件：
	
+ 父路由组件中需要添加 <router-view>
+ path 是相对父组件路径，而且和父组件在同一页面, 不是跳转到新页面！！！注意！！！
	
	
``` 
children: [	
 	{
 		path: 'test',
 		component: Login
 	}  
  ]
``` 

如何给路由添加动画？
	
``` 	
<transition>
  <router-view></router-view>
</transition>    
``` 

动态路由匹配

	{ path: '/user/:id', component: User }  

query: ?开始到结束，后面的东西

```  
localhost:8080/app/123?a=123&b=456
 	
query
	a: 123
	b: 456
```  	
 	
props: true   //params中的参数给 children组件
  
好处：不需要再 组件中，通过 this.$route.params  获取值
  
```  
// 路由中定义：
{
  path: '/a/:id/:name',
  props: true,
  name: 'A',
  component: A
}

//组件A中
props: ['id', 'name'],
```  
 
 
## 4-4 Vue-router之导航守卫

### 1. 命名视图


同一个页面多个 router-view 怎么操作？	
给router-view 命名


> 使用场景：
	
	创建一个布局，有sidebar 和 main 两个视图，
	可以在界面中拥有多个单独命名的视图，而不是只有一个出口
	
	一个视图使用一个组件渲染，对于同个路由，多个视图就需要多个组件。
	路由和视图，一对多的关系


这时候，

```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
```


### 2. 路由守卫

#### 2.1全局导航守卫

使用场景： 
	
	beforeEach, 验证登陆
	beforeResolve: 同时在所有组件内守卫 和 异步路由组件被解析之后


```
router.beforeEach(to, from, next) {
	if(to.fullPath === '/login'){
		next()
	}
}
router. beforeResolve(to, from, next){}

// 注意，没有next 
router.afterEach(to, from)
```

#### 2.2路由独享的守卫

// 调用顺序，在 beforeEach 和 beforeResolve 之间，重要！

```
{
	path:
	component:
	beforeEnter: (to, from, next) => {
		next(); 
	}
}
```

#### 2.3   组件内的守卫

执行顺序：
	
	beforeEach
	beforeEnter
	beforeRouteEnter
	beforeResolve  // 在异步路由组件，和组件内守卫，都加载完毕之后
	afterEach
	 
beforeRouteUpdate，使用场景
	
	场景一：
	
	同一个组件，在不同路径下（用的都是同一个component），触发，
	如：监听动态路由的 参数改变
	
	通过获取，to, from, 获取 动态id
	如果不通过这种方式，
	需要监听组件，props id  ,watch ，拿到新旧路由信息
	
	场景二：
	
	两个路由参数不一样，但是使用的组件是一样的，
	组件的生命钩子，mounted 不会被触发
	我们需要在 beforeRouteUpdate 做监听
	或者需要使用 watch
	

beforeRouteEnter
	
	在 next 之前，拿不到this
	
	如何获取？
	在next 中，写一个回调函数

beforeRouteLeave
	
	表单未提交前，离开页面，弹出提醒





```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    
    console.log(this); //undefined
    next();
    
    next(vm => {  		 // 只能通过回调函数，获取
    	console.log(vm);
    })
    
    console.log(this); //undefind
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    
    
    
    自己试了一下，直接在浏览器中修改路由，监测不到，只有在router中配置的+满足条件的，才可以
    http://localhost:8080/a/123/zhangsan
    跳转到
    http://localhost:8080/a/123/lisi    //可以检测到
    
    http://localhost:8080/a/123/zhangsan
    跳转到
    http://localhost:8080/a/123/zhangsan/c    //也可以检测到
    
    
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}

```

#### 2.4 路由懒加载

```	
{
component: ()=> import('')

}

```


## 4-5 Vuex之集成


## 4-6 Vuex之state和getters

getter函数  
 相当于 计算属性？我理解的话  
 
 对state 进行处理，组装
 
 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。Getter 接受 state 作为其第一个参数：
 
 
```
  // 使用mapGetters
  import { mapGetters, mapState } from 'vuex'
  <li>{{ name }}</li>
  ...mapGetters(['name']),
  

  //不使用mapGetters
  <li>{{ this.$store.getters.name }}</li>
  
  
  // store中 getters 配置
  getters: {
    name: state => {
      return state.firstName + state.lastName
    }
  }

  //mapState 接受数组、对象作为参数
  //使用前后对比
  <li>{{ this.$store.state.count }}</li>
  <li>{{ count }}</li>
            
  ...mapState(['count']),
  
  
  // 使用别名， 不使用state 中的名字
  //count => counter
  
  ...mapState({
      counter: count
  }),
  
  ...mapState({
      counter: (state) => state.count
  }),
```
  
setter函数

## 4-7 Vuex之mutation和action

```
mutation 第二个参数是对象，没有第三个参数
action 也是这种结构

mutations: (state, obj) {}
actionMethod(store, data) {}



this.$store.dispatch('update', data) //action
this.$store.commit('update', data) //commit  

```


Action 类似于 mutation，不同在于：  
mutation 必须是同步函数。


Action 提交的是 mutation，而不是直接变更状态。  
		
	有异步代码的这种，有数据请求类型的，修改store中的state
	写在action里面
	Action 可以包含任意异步操作。

### Q:为什么 mutation 必须是同步函数？
现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

### 在组件中提交 Mutation
你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）

```
import { mapMutations } from 'vuex'

// 将 `this.add3(5)` 映射为 `this.$store.commit('changeState', 5)`
<li><button @click="add3(5)">点我+5</button></li>
methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}

// 将 `this.changeState()` 映射为 `this.$store.commit('changeState')`
...mapMutations(['changeState'])
```

### 在组件中提交Action


Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。


```
//store中配置

state: {
    count: 0,
    firstName: 'zhang',
    lastName: 'san'
  },
 mutations: {
    changeState(state, num) {
      this.state.count += num;
    }
  },
 actions: {
    updateState(store, data) {
      store.commit('changeState', 10)
    }
  }
  
//mapActions 使用

import { mapActions } from 'vuex'
...mapActions({
    add4: 'updateState'
}) 
  
```


## 4-8 vuex 模块

todo

热更替：

```
if(module.hot) {
	modele.hot.accept([
		'./state/state',
		'./mutations/mutations',
		'./actions/actions',
	],()=> {
	
	})
}
```

## 杂

```
// redirect的使用，怎么用的，首页默认跳转到某个路由
{
    path: '/',
    redirect: '/a',
}, {
    path: '/a',
    name: 'A',
    component: A
}


// to 的几种写法：
path: '/a/:id',
name: 'A'

<router-link to="a/123">点击跳到A页面</router-link>
<router-link :to="{name:'A', params: {id: 123}}">点击跳到A页面</router-link>
 <router-link :to="{name:'A', params:{id: 123}, query:{name: 456}}">点击跳到A页面</router-link>
router.push({ path: `/user/${userId}` }) // -> /user/123
 
path: '/b',
<router-link :to="{name: 'B'}">点击跳到B页面</router-link>
```
  
  
  
  
  
  